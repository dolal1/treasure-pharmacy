from rest_framework import generics
from rest_framework.throttling import ScopedRateThrottle

from .models import Booking
from .serializers import BookingCreateSerializer
from .services import process_booking


class BookingCreateView(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingCreateSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "bookings"

    def perform_create(self, serializer):
        booking = serializer.save()
        process_booking(booking)
