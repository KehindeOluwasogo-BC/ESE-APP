from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    RegisterView, 
    UserInfoView,
    RequestPasswordResetView,
    ValidateResetTokenView,
    ResetPasswordView,
    UpdateProfilePictureView
)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('user/', UserInfoView.as_view(), name='user_info'),
    path('profile/picture/', UpdateProfilePictureView.as_view(), name='update_profile_picture'),
    path('password-reset/request/', RequestPasswordResetView.as_view(), name='password_reset_request'),
    path('password-reset/validate/', ValidateResetTokenView.as_view(), name='password_reset_validate'),
    path('password-reset/confirm/', ResetPasswordView.as_view(), name='password_reset_confirm'),
]