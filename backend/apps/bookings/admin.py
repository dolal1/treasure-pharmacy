from django.contrib import admin
from unfold.admin import ModelAdmin
from unfold.decorators import action

from .models import Booking


@admin.register(Booking)
class BookingAdmin(ModelAdmin):
    list_display = [
        "reference",
        "full_name",
        "service",
        "branch",
        "preferred_date",
        "status",
        "created_at",
    ]
    list_filter = ["status", "service__category", "branch", "preferred_date"]
    search_fields = ["reference", "full_name", "email", "phone"]
    readonly_fields = ["reference", "pdf_file", "payment_status", "payment_ref", "created_at"]
    date_hierarchy = "created_at"
    actions = ["mark_confirmed", "mark_completed", "mark_cancelled"]

    @action(description="Mark selected as confirmed")
    def mark_confirmed(self, request, queryset):
        queryset.update(status=Booking.Status.CONFIRMED)

    @action(description="Mark selected as completed")
    def mark_completed(self, request, queryset):
        queryset.update(status=Booking.Status.COMPLETED)

    @action(description="Mark selected as cancelled")
    def mark_cancelled(self, request, queryset):
        queryset.update(status=Booking.Status.CANCELLED)
