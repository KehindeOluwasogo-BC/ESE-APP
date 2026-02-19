from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.views import APIView

from .serializers import (
    RegisterSerializer, 
    UserSerializer, 
    PasswordResetRequestSerializer, 
    PasswordResetConfirmSerializer,
    UpdateProfilePictureSerializer
)
from .models import PasswordResetToken, PasswordResetAttempt, UserProfile
from .utils import generate_reset_token, send_password_reset_email


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)


class UserInfoView(APIView):
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class RequestPasswordResetView(APIView):
    permission_classes = (AllowAny,)
    
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            
            # Check rate limiting
            is_limited, seconds_remaining = PasswordResetAttempt.is_rate_limited(email)
            if is_limited:
                minutes_remaining = seconds_remaining // 60
                seconds_in_minute = seconds_remaining % 60
                return Response({
                    'error': 'Too many reset attempts. Please try again later.',
                    'rate_limited': True,
                    'seconds_remaining': seconds_remaining,
                    'retry_message': f'Please wait {minutes_remaining} minutes and {seconds_in_minute} seconds before trying again.'
                }, status=status.HTTP_429_TOO_MANY_REQUESTS)
            
            # Log this attempt
            PasswordResetAttempt.objects.create(email=email)
            
            # Clean up old attempts (optional optimization)
            PasswordResetAttempt.cleanup_old_attempts()
            
            user = User.objects.get(email=email)
            
            # Generate token
            token = generate_reset_token()
            
            # Create password reset token record
            PasswordResetToken.objects.create(
                user=user,
                token=token
            )
            
            # Send email
            email_sent = send_password_reset_email(user.email, token)
            
            if email_sent:
                return Response({
                    'message': 'Password reset email sent successfully. Please check your inbox.'
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'error': 'Failed to send email. Please try again later.'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ValidateResetTokenView(APIView):
    permission_classes = (AllowAny,)
    
    def post(self, request):
        token = request.data.get('token')
        
        if not token:
            return Response({
                'error': 'Token is required.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            reset_token = PasswordResetToken.objects.get(token=token)
            
            if reset_token.is_valid():
                return Response({
                    'valid': True,
                    'message': 'Token is valid.'
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'valid': False,
                    'error': 'Token has expired or already been used.'
                }, status=status.HTTP_400_BAD_REQUEST)
        
        except PasswordResetToken.DoesNotExist:
            return Response({
                'valid': False,
                'error': 'Invalid token.'
            }, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordView(APIView):
    permission_classes = (AllowAny,)
    
    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        
        if serializer.is_valid():
            token = serializer.validated_data['token']
            new_password = serializer.validated_data['new_password']
            
            try:
                reset_token = PasswordResetToken.objects.get(token=token)
                
                if not reset_token.is_valid():
                    return Response({
                        'error': 'Token has expired or already been used.'
                    }, status=status.HTTP_400_BAD_REQUEST)
                
                # Update user's password
                user = reset_token.user
                user.set_password(new_password)
                user.save()
                
                # Mark token as used
                reset_token.is_used = True
                reset_token.save()
                
                return Response({
                    'message': 'Password has been reset successfully. You can now login with your new password.'
                }, status=status.HTTP_200_OK)
            
            except PasswordResetToken.DoesNotExist:
                return Response({
                    'error': 'Invalid token.'
                }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateProfilePictureView(APIView):
    permission_classes = (IsAuthenticated,)
    
    def post(self, request):
        serializer = UpdateProfilePictureSerializer(data=request.data)
        
        if serializer.is_valid():
            profile_picture_url = serializer.validated_data['profile_picture']
            
            # Get or create user profile
            profile, created = UserProfile.objects.get_or_create(user=request.user)
            profile.profile_picture = profile_picture_url
            profile.save()
            
            return Response({
                'message': 'Profile picture updated successfully',
                'profile_picture': profile_picture_url
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
