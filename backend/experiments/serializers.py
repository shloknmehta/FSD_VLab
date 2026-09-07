from rest_framework import serializers
from .models import Experiment, QuizQuestion, QuizSubmission

class ExperimentSerializer(serializers.ModelSerializer):
    pretest_count = serializers.SerializerMethodField()
    posttest_count = serializers.SerializerMethodField()

    class Meta:
        model = Experiment
        fields = [
            'id', 'slug', 'title', 'aim', 'overview',
            'recap', 'analysis', 'references', 'estimated_time',
            'pretest_count', 'posttest_count', 'created_at'
        ]

    def get_pretest_count(self, obj):
        return obj.questions.filter(quiz_type='PRETEST').count()

    def get_posttest_count(self, obj):
        return obj.questions.filter(quiz_type='POSTTEST').count()

class QuizQuestionTakingSerializer(serializers.ModelSerializer):
    """Used when students are taking the quiz (hides correct_answer and explanation)."""
    class Meta:
        model = QuizQuestion
        fields = ['id', 'quiz_type', 'question_text', 'options_json', 'order']

class QuizQuestionAdminSerializer(serializers.ModelSerializer):
    """Used for administrative or answer verification display."""
    class Meta:
        model = QuizQuestion
        fields = ['id', 'quiz_type', 'question_text', 'options_json', 'correct_answer', 'explanation', 'order']

class QuizSubmissionSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    user_fullname = serializers.SerializerMethodField()

    class Meta:
        model = QuizSubmission
        fields = ['id', 'user', 'username', 'user_fullname', 'quiz_type', 'score', 'total_questions', 'answers_json', 'submitted_at']

    def get_user_fullname(self, obj):
        if obj.user:
            return f"{obj.user.first_name} {obj.user.last_name}".strip() or obj.user.username
        return "Anonymous"
