from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('STUDENT', 'Student'),
        ('FACULTY', 'Faculty'),
        ('ADMIN', 'Admin'),
    ]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='STUDENT')
    department = models.CharField(max_length=100, default='Computer Engineering')
    roll_or_faculty_id = models.CharField(max_length=50, blank=True, null=True)
    batch = models.CharField(max_length=20, default='D3')

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

