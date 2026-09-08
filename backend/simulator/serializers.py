from rest_framework import serializers

class TraceInputSerializer(serializers.Serializer):
    username = serializers.CharField(required=False, allow_blank=True, default='')
    email = serializers.CharField(required=False, allow_blank=True, default='')
    age = serializers.CharField(required=False, allow_blank=True, default='')
    password = serializers.CharField(required=False, allow_blank=True, default='')
    confirm_password = serializers.CharField(required=False, allow_blank=True, default='')

class CodeAssessmentInputSerializer(serializers.Serializer):
    challenge_id = serializers.CharField(required=True)
    code = serializers.CharField(required=True)
