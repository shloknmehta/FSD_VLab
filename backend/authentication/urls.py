from django.urls import path
from .views import RegisterView, LoginView, MeView, SwitchDemoRoleView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('login/', LoginView.as_view(), name='auth_login'),
    path('me/', MeView.as_view(), name='auth_me'),
    path('switch-demo-role/', SwitchDemoRoleView.as_view(), name='auth_switch_demo_role'),
]
