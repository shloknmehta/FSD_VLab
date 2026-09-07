from django.urls import path
from .views import SimulatorTraceView, SimulatorAssessView, SimulatorChallengesView

urlpatterns = [
    path('trace/', SimulatorTraceView.as_view(), name='simulator_trace'),
    path('assess/', SimulatorAssessView.as_view(), name='simulator_assess'),
    path('challenges/', SimulatorChallengesView.as_view(), name='simulator_challenges'),
]
