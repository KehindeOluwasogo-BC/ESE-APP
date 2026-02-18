from django.db import models

class Booking(models.Model):
    full_name = models.CharField(max_length=120)
    email = models.EmailField()
    service = models.CharField(max_length=120) # e.g., "Haircut", "Massage", etc.
    booking_date = models.DateField()
    booking_time = models.TimeField()
    notes = models.TextField(blank=True)

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("cancelled", "Cancelled"),
        ("completed", "Completed"),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name} - {self.service} ({self.booking_date} {self.booking_time})"
