from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "project": "FSD Virtual Lab - Django Form Validation Lifecycle",
        "version": "1.0.0",
        "status": "online",
        "endpoints": {
            "auth": {
                "register": "/api/auth/register/",
                "login": "/api/auth/login/",
                "me": "/api/auth/me/",
                "switch_demo_role": "/api/auth/switch-demo-role/"
            },
            "experiments": {
                "details": "/api/experiments/details/",
                "quiz": "/api/experiments/quiz/?type=PRETEST|POSTTEST",
                "submit_quiz": "/api/experiments/quiz/submit/"
            },
            "simulator": {
                "trace": "/api/simulator/trace/",
                "challenges": "/api/simulator/challenges/",
                "assess": "/api/simulator/assess/"
            },
            "portal": {
                "feedback": "/api/portal/feedback/",
                "bug_reports": "/api/portal/bug-reports/",
                "gradebook": "/api/portal/gradebook/",
                "users": "/api/portal/users/"
            }
        }
    })

urlpatterns = [
    path('', api_root, name='root'),
    path('api/', api_root, name='api_root'),
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/experiments/', include('experiments.urls')),
    path('api/simulator/', include('simulator.urls')),
    path('api/portal/', include('portal.urls')),
]
