from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'department', 'roll_or_faculty_id', 'batch', 'is_staff', 'is_superuser']
        read_only_fields = ['id', 'is_staff', 'is_superuser']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6, required=True, style={'input_type': 'password'})
    confirm_password = serializers.CharField(write_only=True, required=False, style={'input_type': 'password'})

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'confirm_password', 'first_name', 'last_name', 'role', 'department', 'roll_or_faculty_id', 'batch']

    def validate_email(self, value):
        if value and CustomUser.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("An account with this email address already exists.")
        return value

    def validate(self, attrs):
        confirm_pwd = attrs.get('confirm_password')
        if confirm_pwd and attrs.get('password') != confirm_pwd:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password', None)
        validated_data.pop('role', None)  # Ensure self-registration cannot elevate role
        password = validated_data.pop('password')
        user = CustomUser(**validated_data, role='STUDENT')
        user.set_password(password)
        user.save()
        return user
