from django.contrib import admin
from django.urls import path
from django.views.generic import RedirectView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from logon.views import RegisterView, DashboardView, MyTokenObtainPairView, LoginView, PasswordResetView, PasswordResetConfirmView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('', RedirectView.as_view(url='/login/')),  # Redirigir la raíz al login
    path('admin/', admin.site.urls),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/dashboard/', DashboardView.as_view(), name='dashboard'),
    path('api/password-reset/', PasswordResetView.as_view(), name='password_reset'),
    path('api/password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]
