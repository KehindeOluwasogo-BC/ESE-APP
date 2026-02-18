from rest_framework import serializers
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Booking
        fields = ('id', 'user', 'username', 'full_name', 'email', 'service', 'booking_date', 'booking_time', 'notes', 'status', 'created_at', 'updated_at')
        read_only_fields = ('user', 'username')