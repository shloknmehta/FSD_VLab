from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from django.db import models
from django.db.models import F
from .models import FeedbackSubmission, BugReport, CodeSubmission
from .serializers import FeedbackSerializer, BugReportSerializer, CodeSubmissionSerializer
from authentication.models import CustomUser
from authentication.serializers import UserSerializer
from experiments.models import QuizSubmission

class FeedbackView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        feedbacks = FeedbackSubmission.objects.all().order_by('-submitted_at')
        serializer = FeedbackSerializer(feedbacks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user if (request.user and request.user.is_authenticated) else None
        if not user:
            user = CustomUser.objects.filter(role='STUDENT').first()

        rating = request.data.get('rating', 5)
        feedback_text = request.data.get('feedback_text', '')

        if not feedback_text.strip():
            return Response({"error": "Feedback text cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)

        feedback = FeedbackSubmission.objects.create(
            user=user,
            rating=rating,
            feedback_text=feedback_text
        )
        return Response(FeedbackSerializer(feedback).data, status=status.HTTP_201_CREATED)

class BugReportView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        reports = BugReport.objects.all().order_by('-created_at')
        serializer = BugReportSerializer(reports, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user if (request.user and request.user.is_authenticated) else None
        if not user:
            user = CustomUser.objects.filter(role='STUDENT').first()

        title = request.data.get('title', '').strip()
        description = request.data.get('description', '').strip()
        steps = request.data.get('steps_to_reproduce', '').strip()

        if not title or not description:
            return Response({"error": "Title and description are required"}, status=status.HTTP_400_BAD_REQUEST)

        bug = BugReport.objects.create(
            user=user,
            title=title,
            description=description,
            steps_to_reproduce=steps
        )
        return Response(BugReportSerializer(bug).data, status=status.HTTP_201_CREATED)

    def patch(self, request, bug_id):
        bug = get_object_or_404(BugReport, id=bug_id)
        new_status = request.data.get('status')
        if new_status in ['OPEN', 'RESOLVED']:
            bug.status = new_status
            bug.save()
            return Response(BugReportSerializer(bug).data, status=status.HTTP_200_OK)
        return Response({"error": "Status must be OPEN or RESOLVED"}, status=status.HTTP_400_BAD_REQUEST)

class GradebookView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        students = CustomUser.objects.filter(role='STUDENT').order_by('username')
        gradebook_entries = []

        for student in students:
            # Pretest
            pretest_sub = QuizSubmission.objects.filter(user=student, quiz_type='PRETEST').order_by('-score', '-submitted_at').first()
            # Posttest
            posttest_sub = QuizSubmission.objects.filter(user=student, quiz_type='POSTTEST').order_by('-score', '-submitted_at').first()
            # Code submissions
            code_subs = CodeSubmission.objects.filter(user=student)
            passed_challenges = set(code_subs.filter(passed_tests__gt=0, passed_tests=models.F('total_tests')).values_list('challenge_id', flat=True))
            # Feedback
            has_feedback = FeedbackSubmission.objects.filter(user=student).exists()

            # Status determination
            is_completed = (pretest_sub is not None and posttest_sub is not None and len(passed_challenges) >= 1)
            is_in_progress = (pretest_sub is not None or posttest_sub is not None or code_subs.exists() or has_feedback)

            gradebook_entries.append({
                "student_id": student.id,
                "username": student.username,
                "fullname": f"{student.first_name} {student.last_name}".strip() or student.username,
                "email": student.email,
                "roll_number": student.roll_or_faculty_id or "N/A",
                "department": student.department,
                "pretest": {
                    "attempted": pretest_sub is not None,
                    "score": pretest_sub.score if pretest_sub else 0,
                    "total": pretest_sub.total_questions if pretest_sub else 5,
                    "percentage": round((pretest_sub.score / pretest_sub.total_questions) * 100, 1) if pretest_sub else 0.0,
                    "submitted_at": pretest_sub.submitted_at if pretest_sub else None
                },
                "posttest": {
                    "attempted": posttest_sub is not None,
                    "score": posttest_sub.score if posttest_sub else 0,
                    "total": posttest_sub.total_questions if posttest_sub else 5,
                    "percentage": round((posttest_sub.score / posttest_sub.total_questions) * 100, 1) if posttest_sub else 0.0,
                    "submitted_at": posttest_sub.submitted_at if posttest_sub else None
                },
                "code_assessment": {
                    "total_attempts": code_subs.count(),
                    "passed_challenges_count": len(passed_challenges),
                    "passed_challenge_ids": list(passed_challenges),
                    "status": "COMPLETED" if len(passed_challenges) >= 2 else ("PARTIAL" if len(passed_challenges) >= 1 else "NOT_ATTEMPTED")
                },
                "feedback_submitted": has_feedback,
                "overall_status": "COMPLETED" if is_completed else ("IN_PROGRESS" if is_in_progress else "NOT_STARTED")
            })

        return Response({
            "total_students": len(gradebook_entries),
            "gradebook": gradebook_entries
        }, status=status.HTTP_200_OK)

class UsersListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        users = CustomUser.objects.all().order_by('id')
        serializer = UserSerializer(users, many=True)
        return Response({
            "count": users.count(),
            "users": serializer.data
        }, status=status.HTTP_200_OK)

    def patch(self, request, user_id):
        user = get_object_or_404(CustomUser, id=user_id)
        role = request.data.get('role')
        department = request.data.get('department')
        roll_or_faculty_id = request.data.get('roll_or_faculty_id')

        if role and role in ['STUDENT', 'FACULTY', 'ADMIN']:
            user.role = role
        if department is not None:
            user.department = department
        if roll_or_faculty_id is not None:
            user.roll_or_faculty_id = roll_or_faculty_id

        user.save()
        return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
