from django.db import models
from django.conf import settings

class Experiment(models.Model):
    slug = models.SlugField(max_length=100, unique=True, default='django-form-validation')
    title = models.CharField(max_length=255)
    aim = models.TextField()
    overview = models.TextField()
    recap = models.TextField(blank=True, default='')
    analysis = models.TextField(blank=True, default='')
    references = models.TextField(blank=True, default='')
    estimated_time = models.CharField(max_length=50, default='45 Minutes')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class QuizQuestion(models.Model):
    QUIZ_TYPE_CHOICES = [
        ('PRETEST', 'Pre-test'),
        ('POSTTEST', 'Post-test'),
    ]

    experiment = models.ForeignKey(Experiment, on_delete=models.CASCADE, related_name='questions')
    quiz_type = models.CharField(max_length=20, choices=QUIZ_TYPE_CHOICES, default='PRETEST')
    question_text = models.TextField()
    options_json = models.JSONField(default=list, help_text="List of options, e.g. ['A', 'B', 'C', 'D'] or objects")
    correct_answer = models.CharField(max_length=255)
    explanation = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"[{self.quiz_type}] {self.question_text[:50]}"

class QuizSubmission(models.Model):
    QUIZ_TYPE_CHOICES = [
        ('PRETEST', 'Pre-test'),
        ('POSTTEST', 'Post-test'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='quiz_submissions', null=True, blank=True)
    experiment = models.ForeignKey(Experiment, on_delete=models.CASCADE, related_name='submissions')
    quiz_type = models.CharField(max_length=20, choices=QUIZ_TYPE_CHOICES)
    score = models.IntegerField()
    total_questions = models.IntegerField()
    answers_json = models.JSONField(default=dict)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        username = self.user.username if self.user else "Anonymous"
        return f"{username} - {self.quiz_type} - {self.score}/{self.total_questions}"
