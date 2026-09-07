from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from .models import CustomUser
from .serializers import UserSerializer, RegisterSerializer

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "message": "User registered successfully",
                "token": token.key,
                "user": UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username_or_email = request.data.get('username') or request.data.get('email')
        password = request.data.get('password')

        if not username_or_email or not password:
            return Response(
                {"error": "Please provide both username/email and password"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Allow login via username or email
        user = None
        if '@' in username_or_email:
            try:
                user_obj = CustomUser.objects.get(email__iexact=username_or_email)
                user = authenticate(username=user_obj.username, password=password)
            except CustomUser.DoesNotExist:
                user = None
        else:
            user = authenticate(username=username_or_email, password=password)

        if not user:
            return Response(
                {"error": "Invalid username or password"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "message": "Login successful",
            "token": token.key,
            "user": UserSerializer(user).data
        }, status=status.HTTP_200_OK)

class MeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        if request.user and request.user.is_authenticated:
            token, _ = Token.objects.get_or_create(user=request.user)
            return Response({
                "user": UserSerializer(request.user).data,
                "token": token.key
            })
        
        # In case frontend calls /me without auth token, return fallback demo student if available
        demo_student = CustomUser.objects.filter(role='STUDENT').first()
        if demo_student:
            token, _ = Token.objects.get_or_create(user=demo_student)
            return Response({
                "user": UserSerializer(demo_student).data,
                "token": token.key,
                "is_demo_fallback": True
            })

        return Response({"error": "Unauthenticated"}, status=status.HTTP_401_UNAUTHORIZED)

class SwitchDemoRoleView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        target_role = (request.data.get('role') or 'STUDENT').upper()
        if target_role not in ['STUDENT', 'FACULTY', 'ADMIN']:
            return Response({"error": "Role must be one of: STUDENT, FACULTY, ADMIN"}, status=status.HTTP_400_BAD_REQUEST)

        role_emails = {
            'STUDENT': 'student@vlab.edu',
            'FACULTY': 'faculty@vlab.edu',
            'ADMIN': 'admin@vlab.edu'
        }
        target_email = role_emails.get(target_role)
        user = CustomUser.objects.filter(email=target_email).first()
        if not user:
            user = CustomUser.objects.filter(role=target_role).first()
        
        if not user:
            # Create user on the fly if not seeded yet
            user = CustomUser.objects.create_user(
                username=target_role.lower(),
                email=target_email,
                password=f"{target_role.capitalize()}@123",
                role=target_role,
                first_name="Demo",
                last_name=target_role.capitalize()
            )

        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "message": f"Switched to demo role: {user.get_role_display()}",
            "token": token.key,
            "role": user.role,
            "user": UserSerializer(user).data
        }, status=status.HTTP_200_OK)
