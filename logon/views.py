from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, MyTokenObtainPairSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer
from .models import CustomUser as User
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.mail import send_mail
from django.conf import settings
import secrets
from datetime import datetime, timedelta

class LoginView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return render(request, 'login.html')

    def post(self, request):
        email = request.POST.get('email')
        password = request.POST.get('password')
        try:
            user = User.objects.get(email=email)
            user = authenticate(request, username=user.username, password=password)
            if user is not None:
                login(request, user)
                return redirect('dashboard')
            else:
                return render(request, 'login.html', {'error': 'Credenciales inválidas'})
        except User.DoesNotExist:
            return render(request, 'login.html', {'error': 'Usuario no encontrado'})

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        # Aquí podríamos enviar un email de bienvenida si lo deseamos

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            'username': request.user.username,
            'email': request.user.email,
            'first_name': request.user.first_name,
            'last_name': request.user.last_name
        })

class PasswordResetView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.get(email=email)
            
            # Generar token de recuperación
            reset_token = secrets.token_urlsafe(32)
            
            # Guardar token en la base de datos
            user.reset_token = reset_token
            user.reset_token_expires = datetime.now() + timedelta(hours=24)
            user.save()
            
            # Enviar email con el token
            reset_url = f"http://localhost:3000/reset-password/{reset_token}"
            send_mail(
                'Recuperación de contraseña',
                f'Para recuperar tu contraseña, haz clic en el siguiente enlace:\n\n{reset_url}',
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=False,
            )
            
            return Response({"message": "Se ha enviado un email con instrucciones para recuperar tu contraseña"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            token = serializer.validated_data['token']
            new_password = serializer.validated_data['new_password']
            
            try:
                user = User.objects.get(reset_token=token)
                if user.reset_token_expires < datetime.now():
                    return Response({"error": "El token ha expirado"}, status=status.HTTP_400_BAD_REQUEST)
                
                # Actualizar contraseña
                user.set_password(new_password)
                user.reset_token = None
                user.reset_token_expires = None
                user.save()
                
                return Response({"message": "Contraseña actualizada exitosamente"})
            except User.DoesNotExist:
                return Response({"error": "Token inválido"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
