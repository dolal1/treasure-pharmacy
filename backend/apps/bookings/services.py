import logging

from django.conf import settings
from django.core.files.base import ContentFile
from django.core.mail import EmailMessage
from django.template.loader import render_to_string

from .pdf import render_booking_pdf

logger = logging.getLogger(__name__)


def process_booking(booking):
    """Run the intake pipeline: compile the PDF, then notify both parties.

    Failures are logged, never raised — a booking must survive an outage of
    the PDF renderer or the mail provider.
    """
    pdf_bytes = None
    try:
        pdf_bytes = render_booking_pdf(booking)
        booking.pdf_file.save(f"{booking.reference}.pdf", ContentFile(pdf_bytes), save=True)
    except Exception:
        logger.exception("PDF generation failed for booking %s", booking.reference)

    try:
        _mail_pharmacy(booking, pdf_bytes)
    except Exception:
        logger.exception("Pharmacy notification failed for booking %s", booking.reference)

    try:
        _mail_client(booking)
    except Exception:
        logger.exception("Client confirmation failed for booking %s", booking.reference)


def _mail_pharmacy(booking, pdf_bytes):
    message = EmailMessage(
        subject=f"New booking {booking.reference} — {booking.service.name}",
        body=render_to_string("email/pharmacy_notification.txt", {"booking": booking}),
        to=[settings.PHARMACY_INBOX_EMAIL],
    )
    if pdf_bytes:
        message.attach(f"{booking.reference}.pdf", pdf_bytes, "application/pdf")
    message.send()


def _mail_client(booking):
    EmailMessage(
        subject=f"Booking received — {booking.reference} | Treasure Pharmacy",
        body=render_to_string("email/client_confirmation.txt", {"booking": booking}),
        to=[booking.email],
    ).send()
