from django.urls import path
from .views import FeedbackView, BugReportView, GradebookView, UsersListView

urlpatterns = [
    path('feedback/', FeedbackView.as_view(), name='portal_feedback'),
    path('bug-report/', BugReportView.as_view(), name='portal_bug_report_create'),
    path('bug-reports/', BugReportView.as_view(), name='portal_bug_reports'),
    path('bug-reports/<int:bug_id>/', BugReportView.as_view(), name='portal_bug_report_update'),
    path('gradebook/', GradebookView.as_view(), name='portal_gradebook'),
    path('users/', UsersListView.as_view(), name='portal_users'),
    path('users/<int:user_id>/', UsersListView.as_view(), name='portal_user_detail'),
]
