from django.db import models
from django.conf import settings

class FeedbackSubmission(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='feedbacks', null=True, blank=True)
    rating = models.IntegerField(default=5)
    feedback_text = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        username = self.user.username if self.user else "Anonymous"
        return f"Feedback by {username} ({self.rating}/5)"

class BugReport(models.Model):
    STATUS_CHOICES = [
        ('OPEN', 'Open'),
        ('RESOLVED', 'Resolved'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bug_reports', null=True, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    steps_to_reproduce = models.TextField(blank=True, default='')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='OPEN')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.status}] {self.title}"

class CodeSubmission(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='code_submissions', null=True, blank=True)
    challenge_id = models.CharField(max_length=100)
    code = models.TextField()
    passed_tests = models.IntegerField(default=0)
    total_tests = models.IntegerField(default=0)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        username = self.user.username if self.user else "Anonymous"
        return f"{username} - {self.challenge_id} ({self.passed_tests}/{self.total_tests})"
