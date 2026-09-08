import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'vlab_core.settings')
django.setup()

from rest_framework.test import APIClient
from authentication.models import CustomUser

client = APIClient()

def test_suite():
    results = []
    
    def log_test(name, passed, details=""):
        status_str = "PASS" if passed else "FAIL"
        results.append((name, passed, details))
        print(f"[{status_str}] {name} {('- ' + details) if details else ''}")

    print("\n==========================================")
    print("RUNNING FSD VLAB BACKEND INTEGRATION TESTS")
    print("==========================================\n")

    # 1. API Root
    resp = client.get('/api/')
    log_test("GET /api/ (Root)", resp.status_code == 200, f"Status: {resp.status_code}")

    # 2. Auth Login (Student)
    resp = client.post('/api/auth/login/', {
        "username": "student@vlab.edu",
        "password": "Student@123"
    }, format='json')
    log_test("POST /api/auth/login/ (Student Email)", resp.status_code == 200, f"Token: {resp.data.get('token')[:8]}...")
    student_token = resp.data.get('token')

    # Auth Me with token
    client.credentials(HTTP_AUTHORIZATION='Token ' + student_token)
    resp = client.get('/api/auth/me/')
    log_test("GET /api/auth/me/", resp.status_code == 200 and resp.data['user']['username'] == 'shlok', f"User: {resp.data.get('user', {}).get('username')}")

    # Auth Switch Demo Role
    resp = client.post('/api/auth/switch-demo-role/', {"role": "FACULTY"}, format='json')
    log_test("POST /api/auth/switch-demo-role/ (to FACULTY)", resp.status_code == 200 and resp.data['role'] == 'FACULTY', f"New Role: {resp.data.get('role')}")

    # Switch back to student
    resp = client.post('/api/auth/switch-demo-role/', {"role": "STUDENT"}, format='json')
    client.credentials(HTTP_AUTHORIZATION='Token ' + resp.data['token'])

    # 3. Experiments Details
    resp = client.get('/api/experiments/details/')
    log_test("GET /api/experiments/details/", resp.status_code == 200, f"Title: {resp.data.get('title')[:35]}...")

    # Experiments Pretest
    pre_resp = client.get('/api/experiments/quiz/?type=PRETEST')
    q_count = len(pre_resp.data.get('questions', []))
    log_test("GET /api/experiments/quiz/?type=PRETEST", pre_resp.status_code == 200 and q_count == 5, f"Questions count: {q_count}")

    # Experiments Posttest
    post_resp = client.get('/api/experiments/quiz/?type=POSTTEST')
    q_count_post = len(post_resp.data.get('questions', []))
    log_test("GET /api/experiments/quiz/?type=POSTTEST", post_resp.status_code == 200 and q_count_post == 5, f"Questions count: {q_count_post}")

    # Experiments Quiz Submit
    q1 = pre_resp.data['questions'][0]['id']
    resp = client.post('/api/experiments/quiz/submit/', {
        "quiz_type": "PRETEST",
        "answers": {
            str(q1): "form.is_valid()"
        }
    }, format='json')
    log_test("POST /api/experiments/quiz/submit/", resp.status_code == 200 and resp.data.get('score') >= 1, f"Score: {resp.data.get('score')}/{resp.data.get('total_questions')}")

    # 4. Simulator Trace
    sample_trace_input = {
        "username": "superCoder",
        "email": "user@example.com",
        "age": 16,  # Under 18: should trigger clean_age failure
        "password": "secretPassword1",
        "confirm_password": "differentPassword"  # Mismatch: should trigger clean() failure
    }
    resp = client.post('/api/simulator/trace/', sample_trace_input, format='json')
    step_count = len(resp.data.get('steps', []))
    is_valid = resp.data.get('is_valid')
    has_age_err = 'age' in resp.data.get('errors', {})
    has_all_err = '__all__' in resp.data.get('errors', {})
    log_test("POST /api/simulator/trace/ (Validation Tracer)", 
             resp.status_code == 200 and step_count == 7 and not is_valid and has_age_err and has_all_err,
             f"Steps: {step_count}, is_valid: {is_valid}, age_err: {has_age_err}, cross_field_err: {has_all_err}")

    # Simulator Challenges
    resp = client.get('/api/simulator/challenges/')
    challenges_count = len(resp.data.get('challenges', []))
    log_test("GET /api/simulator/challenges/", resp.status_code == 200 and challenges_count >= 2, f"Count: {challenges_count}")

    # Simulator Assess (clean_age solution)
    student_code = """def clean_age(self):
    age = self.cleaned_data.get('age')
    if age is not None and age < 18:
        raise forms.ValidationError('Must be at least 18 years old')
    return age"""
    resp = client.post('/api/simulator/assess/', {
        "challenge_id": "challenge_clean_age",
        "code": student_code
    }, format='json')
    log_test("POST /api/simulator/assess/ (Task 1: clean_age)", 
             resp.status_code == 200 and resp.data.get('all_passed') is True,
             f"Passed: {resp.data.get('passed_tests')}/{resp.data.get('total_tests')}")

    # Simulator Assess (clean passwords solution)
    pwd_code = """def clean(self):
    cleaned_data = super().clean()
    pwd = cleaned_data.get('password')
    cpwd = cleaned_data.get('confirm_password')
    if pwd and cpwd and pwd != cpwd:
        raise forms.ValidationError('Passwords do not match')
    return cleaned_data"""
    resp = client.post('/api/simulator/assess/', {
        "challenge_id": "challenge_clean_passwords",
        "code": pwd_code
    }, format='json')
    log_test("POST /api/simulator/assess/ (Task 2: clean)", 
             resp.status_code == 200 and resp.data.get('all_passed') is True,
             f"Passed: {resp.data.get('passed_tests')}/{resp.data.get('total_tests')}")

    # 5. Portal Feedback
    resp = client.post('/api/portal/feedback/', {
        "rating": 5,
        "feedback_text": "Automated integration test feedback."
    }, format='json')
    log_test("POST /api/portal/feedback/", resp.status_code == 201, f"ID: {resp.data.get('id')}")

    resp = client.get('/api/portal/feedback/')
    log_test("GET /api/portal/feedback/", resp.status_code == 200 and len(resp.data) >= 1, f"Count: {len(resp.data)}")

    # Portal Bug Report
    resp = client.post('/api/portal/bug-report/', {
        "title": "Test bug report",
        "description": "Integration test bug description",
        "steps_to_reproduce": "Step 1, Step 2"
    }, format='json')
    log_test("POST /api/portal/bug-report/", resp.status_code == 201, f"ID: {resp.data.get('id')}")

    resp = client.get('/api/portal/bug-reports/')
    log_test("GET /api/portal/bug-reports/", resp.status_code == 200 and len(resp.data) >= 1, f"Count: {len(resp.data)}")

    # Portal Gradebook (Faculty)
    resp = client.get('/api/portal/gradebook/')
    students = resp.data.get('gradebook', [])
    shlok_entry = next((s for s in students if s['username'] == 'shlok'), None)
    log_test("GET /api/portal/gradebook/", 
             resp.status_code == 200 and shlok_entry is not None,
             f"Students: {len(students)}, Shlok Pretest: {shlok_entry['pretest']['score']}, Posttest: {shlok_entry['posttest']['score']}, Status: {shlok_entry['overall_status']}")

    # Portal Users List (Admin)
    resp = client.get('/api/portal/users/')
    log_test("GET /api/portal/users/", resp.status_code == 200 and resp.data.get('count', 0) >= 3, f"Total Users: {resp.data.get('count')}")

    print("\n==========================================")
    all_passed = all(r[1] for r in results)
    total_passed = sum(1 for r in results if r[1])
    print(f"SUMMARY: {total_passed}/{len(results)} tests passed. Overall: {'SUCCESS' if all_passed else 'FAILURE'}")
    print("==========================================\n")

if __name__ == '__main__':
    test_suite()
