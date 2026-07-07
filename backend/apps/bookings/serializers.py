from django.utils import timezone
from rest_framework import serializers

from apps.catalog.models import Branch, Service

from .models import Booking


class BookingCreateSerializer(serializers.ModelSerializer):
    service = serializers.SlugRelatedField(
        slug_field="slug", queryset=Service.objects.filter(is_active=True)
    )
    branch = serializers.PrimaryKeyRelatedField(
        queryset=Branch.objects.filter(is_active=True), required=False, allow_null=True
    )

    class Meta:
        model = Booking
        fields = [
            "reference",
            "full_name",
            "email",
            "phone",
            "service",
            "branch",
            "home_address",
            "preferred_date",
            "preferred_time",
            "notes",
            "status",
            "created_at",
        ]
        read_only_fields = ["reference", "status", "created_at"]

    def validate_preferred_date(self, value):
        if value < timezone.localdate():
            raise serializers.ValidationError("Preferred date cannot be in the past.")
        return value
