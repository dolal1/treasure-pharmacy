import secrets

from django.db import models

# No 0/O/1/I/L — references get read out over the phone.
_REFERENCE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"


def _generate_reference():
    return "TRP-" + "".join(secrets.choice(_REFERENCE_ALPHABET) for _ in range(6))


class Booking(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        CONFIRMED = "confirmed", "Confirmed"
        COMPLETED = "completed", "Completed"
        CANCELLED = "cancelled", "Cancelled"

    class PaymentStatus(models.TextChoices):
        UNPAID = "unpaid", "Unpaid"
        PAID = "paid", "Paid"
        REFUNDED = "refunded", "Refunded"

    reference = models.CharField(max_length=12, unique=True, editable=False)
    full_name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=32)
    service = models.ForeignKey(
        "catalog.Service", on_delete=models.PROTECT, related_name="bookings"
    )
    branch = models.ForeignKey(
        "catalog.Branch",
        on_delete=models.PROTECT,
        related_name="bookings",
        null=True,
        blank=True,
    )
    home_address = models.CharField(
        max_length=255, blank=True, help_text="For home care and bedside nursing visits."
    )
    preferred_date = models.DateField()
    preferred_time = models.TimeField()
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
    # Reserved for the payment-gateway phase (Flutterwave).
    payment_status = models.CharField(
        max_length=10, choices=PaymentStatus.choices, default=PaymentStatus.UNPAID
    )
    payment_ref = models.CharField(max_length=64, blank=True)
    pdf_file = models.FileField(upload_to="booking-pdfs/", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.reference} — {self.full_name}"

    def save(self, *args, **kwargs):
        if not self.reference:
            self.reference = self._unique_reference()
        super().save(*args, **kwargs)

    @classmethod
    def _unique_reference(cls):
        for _ in range(20):
            reference = _generate_reference()
            if not cls.objects.filter(reference=reference).exists():
                return reference
        raise RuntimeError("Could not generate a unique booking reference")
