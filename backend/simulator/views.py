from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .engine import run_validation_trace, evaluate_code_submission, CHALLENGES
from portal.models import CodeSubmission
from authentication.models import CustomUser

class SimulatorTraceView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        raw_data = request.data or {}
        # Default sample if empty
        if not raw_data:
            raw_data = {
                "username": "coder123",
                "email": "student@vlab.edu",
                "age": "16",
                "password": "password123",
                "confirm_password": "mismatch456"
            }

        trace_result = run_validation_trace(raw_data)
        return Response(trace_result, status=status.HTTP_200_OK)

class SimulatorChallengesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            "challenges": list(CHALLENGES.values())
        }, status=status.HTTP_200_OK)

class SimulatorAssessView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        challenge_id = request.data.get('challenge_id')
        code = request.data.get('code')

        if not challenge_id or not code:
            return Response(
                {"error": "Please provide both 'challenge_id' and 'code'"},
                status=status.HTTP_400_BAD_REQUEST
            )

        evaluation = evaluate_code_submission(challenge_id, code)

        if evaluation.get("success"):
            # Save submission if possible
            user = request.user if (request.user and request.user.is_authenticated) else None
            if not user:
                user = CustomUser.objects.filter(role='STUDENT').first()

            CodeSubmission.objects.create(
                user=user,
                challenge_id=challenge_id,
                code=code,
                passed_tests=evaluation.get('passed_tests', 0),
                total_tests=evaluation.get('total_tests', 0)
            )

        return Response(evaluation, status=status.HTTP_200_OK)
