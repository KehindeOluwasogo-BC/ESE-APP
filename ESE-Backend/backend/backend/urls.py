from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todo import views
from booking import views as booking_views

router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todo')
router.register(r'bookings', booking_views.BookingView, 'booking')
                
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/', include('authentication.urls')),
]

