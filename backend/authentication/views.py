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
        
        # Flatten first error message for frontend toast/alert
        error_msg = "Registration failed."
        for field, errors in serializer.errors.items():
            if isinstance(errors, list) and len(errors) > 0:
                error_msg = f"{field.replace('_', ' ').capitalize()}: {errors[0]}"
                break
        return Response({"error": error_msg, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username_or_email = (request.data.get('username') or request.data.get('email') or '').strip()
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

        # Support sample credentials: admin/admin, faculty/faculty, student/student
        if not user:
            lower_u = username_or_email.lower()
            sample_accounts = {
                'admin': ('admin', 'ADMIN', 'System', 'Administrator', 'ADM-001', 'Virtual Lab Technical Core', ['admin', 'Admin@123']),
                'faculty': ('faculty', 'FACULTY', 'Mrs. Kirti', 'Mishra', 'FAC-CS-204', 'Computer Science & Engineering', ['faculty', 'Faculty@123']),
                'student': ('student', 'STUDENT', 'Shlok', 'Mehta', '16010124169', 'Computer Science (Batch D3)', ['student', 'Student@123']),
            }
            for key, (uname, urole, fname, lname, roll_id, dept, valid_pwds) in sample_accounts.items():
                if (lower_u == key or lower_u == f"{key}@vlab.edu") and password in valid_pwds:
                    user = CustomUser.objects.filter(username=uname).first() or CustomUser.objects.filter(role=urole).first()
                    if not user:
                        user = CustomUser.objects.create_user(
                            username=uname,
                            email=f"{uname}@vlab.edu",
                            password=password,
                            role=urole,
                            first_name=fname,
                            last_name=lname,
                            roll_or_faculty_id=roll_id,
                            department=dept
                        )
                    break

        if not user:
            return Response(
                {"error": "Invalid username or password. Please check your credentials."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "message": "Login successful",
            "token": token.key,
            "user": UserSerializer(user).data
        }, status=status.HTTP_200_OK)

class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        if request.user and request.user.is_authenticated:
            if hasattr(request.user, 'auth_token'):
                try:
                    request.user.auth_token.delete()
                except Exception:
                    pass
        return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)

class MeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        if request.user and request.user.is_authenticated:
            token, _ = Token.objects.get_or_create(user=request.user)
            return Response({
                "user": UserSerializer(request.user).data,
                "token": token.key
            })
        
        return Response({"error": "Unauthenticated", "user": None}, status=status.HTTP_401_UNAUTHORIZED)

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
