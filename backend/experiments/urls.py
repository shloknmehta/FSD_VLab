from django.urls import path
from .views import ExperimentListView, ExperimentDetailsView, QuizQuestionsView, QuizSubmitView

urlpatterns = [
    path('list/', ExperimentListView.as_view(), name='experiment_list'),
    path('details/', ExperimentDetailsView.as_view(), name='experiment_details'),
    path('quiz/', QuizQuestionsView.as_view(), name='experiment_quiz'),
    path('quiz/submit/', QuizSubmitView.as_view(), name='experiment_quiz_submit'),
]
