from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from .models import Experiment, QuizQuestion, QuizSubmission
from .serializers import (
    ExperimentSerializer,
    QuizQuestionTakingSerializer,
    QuizQuestionAdminSerializer,
    QuizSubmissionSerializer
)

class ExperimentDetailsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        slug = request.query_params.get('slug')
        if slug:
            experiment = get_object_or_404(Experiment, slug=slug)
        else:
            experiment = Experiment.objects.first()
            if not experiment:
                return Response({"error": "No experiments found. Please seed the database."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ExperimentSerializer(experiment)
        return Response(serializer.data, status=status.HTTP_200_OK)

class QuizQuestionsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        quiz_type = (request.query_params.get('type') or 'PRETEST').upper()
        if quiz_type not in ['PRETEST', 'POSTTEST']:
            return Response({"error": "type must be PRETEST or POSTTEST"}, status=status.HTTP_400_BAD_REQUEST)

        slug = request.query_params.get('slug')
        if slug:
            experiment = get_object_or_404(Experiment, slug=slug)
        else:
            experiment = Experiment.objects.first()
            if not experiment:
                return Response({"error": "No experiment found. Please seed the database."}, status=status.HTTP_404_NOT_FOUND)

        questions = QuizQuestion.objects.filter(experiment=experiment, quiz_type=quiz_type)
        serializer = QuizQuestionTakingSerializer(questions, many=True)
        return Response({
            "experiment_slug": experiment.slug,
            "experiment_title": experiment.title,
            "quiz_type": quiz_type,
            "count": questions.count(),
            "questions": serializer.data
        }, status=status.HTTP_200_OK)

class QuizSubmitView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        quiz_type = (request.data.get('quiz_type') or 'PRETEST').upper()
        slug = request.data.get('experiment_slug')
        submitted_answers = request.data.get('answers') or {}

        if slug:
            experiment = get_object_or_404(Experiment, slug=slug)
        else:
            experiment = Experiment.objects.first()
            if not experiment:
                return Response({"error": "Experiment not found"}, status=status.HTTP_404_NOT_FOUND)

        questions = QuizQuestion.objects.filter(experiment=experiment, quiz_type=quiz_type)
        total_questions = questions.count()

        if total_questions == 0:
            return Response({"error": f"No {quiz_type} questions found for this experiment"}, status=status.HTTP_400_BAD_REQUEST)

        score = 0
        detailed_results = []

        for q in questions:
            raw_user_choice = submitted_answers.get(str(q.id))
            if raw_user_choice is None:
                raw_user_choice = submitted_answers.get(q.id)

            user_choice_str = str(raw_user_choice if raw_user_choice is not None else "").strip()
            correct_choice = str(q.correct_answer).strip()

            is_correct = False
            selected_display = user_choice_str

            if user_choice_str.lower() == correct_choice.lower():
                is_correct = True
            elif user_choice_str.isdigit() and isinstance(q.options_json, list):
                idx = int(user_choice_str)
                if 0 <= idx < len(q.options_json):
                    selected_display = str(q.options_json[idx])
                    if selected_display.strip().lower() == correct_choice.lower():
                        is_correct = True
            elif correct_choice.isdigit() and isinstance(q.options_json, list):
                idx = int(correct_choice)
                if 0 <= idx < len(q.options_json):
                    if user_choice_str.lower() == str(q.options_json[idx]).strip().lower():
                        is_correct = True

            if is_correct:
                score += 1

            detailed_results.append({
                "question_id": q.id,
                "question_text": q.question_text,
                "selected_answer": selected_display,
                "correct_answer": correct_choice,
                "is_correct": is_correct,
                "explanation": q.explanation
            })

        user = request.user if (request.user and request.user.is_authenticated) else None
        if not user:
            # Check for fallback user if username provided or fallback student
            from authentication.models import CustomUser
            user = CustomUser.objects.filter(role='STUDENT').first()

        submission = QuizSubmission.objects.create(
            user=user,
            experiment=experiment,
            quiz_type=quiz_type,
            score=score,
            total_questions=total_questions,
            answers_json=submitted_answers
        )

        percentage = round((score / total_questions) * 100, 2) if total_questions > 0 else 0.0

        return Response({
            "submission_id": submission.id,
            "quiz_type": quiz_type,
            "score": score,
            "total_questions": total_questions,
            "percentage": percentage,
            "results": detailed_results,
            "message": f"Quiz submitted successfully. You scored {score} out of {total_questions} ({percentage}%)."
        }, status=status.HTTP_200_OK)
