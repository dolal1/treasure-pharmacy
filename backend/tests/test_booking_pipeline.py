import datetime

import pytest
from django.core import mail
from django.utils import timezone
from rest_framework.throttling import ScopedRateThrottle

from apps.bookings.models import Booking


def _payload(service, branch, **overrides):
    payload = {
        "full_name": "Akello Grace",
        "email": "grace@example.com",
        "phone": "+256700000001",
        "service": service.slug,
        "branch": branch.id,
        "preferred_date": str(timezone.localdate() + datetime.timedelta(days=3)),
        "preferred_time": "10:30",
    }
    payload.update(overrides)
    return payload


@pytest.mark.django_db
def test_booking_creates_pdf_and_sends_both_emails(api_client, service, branch, settings):
    response = api_client.post("/api/bookings/", _payload(service, branch), format="json")

    assert response.status_code == 201
    reference = response.data["reference"]
    assert reference.startswith("TRP-")

    booking = Booking.objects.get(reference=reference)
    assert booking.status == Booking.Status.PENDING
    assert booking.pdf_file
    assert booking.pdf_file.size > 1000  # a real PDF, not an empty stub
    with booking.pdf_file.open("rb") as fh:
        assert fh.read(5) == b"%PDF-"

    assert len(mail.outbox) == 2
    pharmacy_mail, client_mail = mail.outbox
    assert pharmacy_mail.to == [settings.PHARMACY_INBOX_EMAIL]
    assert reference in pharmacy_mail.subject
    assert len(pharmacy_mail.attachments) == 1
    assert pharmacy_mail.attachments[0][0] == f"{reference}.pdf"
    assert client_mail.to == ["grace@example.com"]
    assert reference in client_mail.body


@pytest.mark.django_db
def test_past_preferred_date_is_rejected(api_client, service, branch):
    payload = _payload(
        service, branch, preferred_date=str(timezone.localdate() - datetime.timedelta(days=1))
    )
    response = api_client.post("/api/bookings/", payload, format="json")
    assert response.status_code == 400
    assert "preferred_date" in response.data
    assert Booking.objects.count() == 0


@pytest.mark.django_db
def test_inactive_service_is_rejected(api_client, service, branch):
    service.is_active = False
    service.save()
    response = api_client.post("/api/bookings/", _payload(service, branch), format="json")
    assert response.status_code == 400
    assert "service" in response.data


@pytest.mark.django_db
def test_branch_is_optional_for_home_visits(api_client, service, branch):
    payload = _payload(service, branch)
    payload.update(branch=None, home_address="Plot 5, Ntinda, Kampala")
    response = api_client.post("/api/bookings/", payload, format="json")
    assert response.status_code == 201
    booking = Booking.objects.get(reference=response.data["reference"])
    assert booking.branch is None
    assert booking.home_address == "Plot 5, Ntinda, Kampala"


@pytest.mark.django_db
def test_booking_endpoint_is_throttled(api_client, service, branch, monkeypatch):
    monkeypatch.setitem(ScopedRateThrottle.THROTTLE_RATES, "bookings", "2/hour")

    for _ in range(2):
        response = api_client.post("/api/bookings/", _payload(service, branch), format="json")
        assert response.status_code == 201
    response = api_client.post("/api/bookings/", _payload(service, branch), format="json")
    assert response.status_code == 429


@pytest.mark.django_db
def test_booking_survives_email_outage(api_client, service, branch, monkeypatch):
    def boom(*args, **kwargs):
        raise ConnectionError("SMTP down")

    monkeypatch.setattr("apps.bookings.services.EmailMessage.send", boom)
    response = api_client.post("/api/bookings/", _payload(service, branch), format="json")
    assert response.status_code == 201
    assert Booking.objects.count() == 1
