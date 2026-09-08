from rest_framework import serializers
from .models import FeedbackSubmission, BugReport, CodeSubmission
from authentication.models import CustomUser

class FeedbackSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    user_fullname = serializers.SerializerMethodField()
    comments = serializers.CharField(source='feedback_text', required=False)

    class Meta:
        model = FeedbackSubmission
        fields = ['id', 'user', 'username', 'user_fullname', 'rating', 'category', 'feedback_text', 'comments', 'submitted_at']
        read_only_fields = ['id', 'user', 'submitted_at']

    def get_user_fullname(self, obj):
        if obj.user:
            return f"{obj.user.first_name} {obj.user.last_name}".strip() or obj.user.username
        return "Anonymous"

class BugReportSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    user_fullname = serializers.SerializerMethodField()

    class Meta:
        model = BugReport
        fields = ['id', 'user', 'username', 'user_fullname', 'title', 'severity', 'section', 'description', 'steps_to_reproduce', 'status', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

    def get_user_fullname(self, obj):
        if obj.user:
            return f"{obj.user.first_name} {obj.user.last_name}".strip() or obj.user.username
        return "Anonymous"

class CodeSubmissionSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = CodeSubmission
        fields = ['id', 'user', 'username', 'challenge_id', 'code', 'passed_tests', 'total_tests', 'score', 'is_passed', 'submitted_at']
        read_only_fields = ['id', 'user', 'submitted_at']
