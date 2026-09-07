from django.urls import path
from .views import ExperimentDetailsView, QuizQuestionsView, QuizSubmitView

urlpatterns = [
    path('details/', ExperimentDetailsView.as_view(), name='experiment_details'),
    path('quiz/', QuizQuestionsView.as_view(), name='experiment_quiz'),
    path('quiz/submit/', QuizSubmitView.as_view(), name='experiment_quiz_submit'),
]
