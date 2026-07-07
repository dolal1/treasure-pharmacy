from django.template.loader import render_to_string


def render_booking_pdf(booking) -> bytes:
    # Imported lazily: WeasyPrint needs system Pango/Cairo libraries, and the
    # rest of the app must keep working where those are absent.
    from weasyprint import HTML

    html = render_to_string("pdf/booking.html", {"booking": booking})
    return HTML(string=html).write_pdf()
