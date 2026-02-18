from rest_framework import serializers
from .models import Booking
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('id', 'full_name', 'email', 'service', 'booking_date', 'booking_time', 'notes', 'status', 'created_at', 'updated_at')