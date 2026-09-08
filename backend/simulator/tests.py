from django.test import TestCase
from rest_framework.test import APIClient
from .engine import run_validation_trace, evaluate_code_submission

class SimulatorTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_validation_trace_invalid_age_and_password(self):
        payload = {
            'username': 'coder',
            'email': 'student@vlab.edu',
            'age': 16,
            'password': 'passA',
            'confirm_password': 'passB'
        }
        result = run_validation_trace(payload)
        self.assertFalse(result['is_valid'])
        self.assertIn('age', result['errors'])
        self.assertIn('__all__', result['errors'])
        self.assertEqual(len(result['steps']), 7)

    def test_validation_trace_valid_input(self):
        payload = {
            'username': 'coder123',
            'email': 'student@vlab.edu',
            'age': 20,
            'password': 'safePassword123',
            'confirm_password': 'safePassword123'
        }
        result = run_validation_trace(payload)
        self.assertTrue(result['is_valid'])
        self.assertEqual(len(result['errors']), 0)
        self.assertEqual(result['cleaned_data']['age'], 20)

    def test_evaluate_clean_age_challenge(self):
        code = """def clean_age(self):
    age = self.cleaned_data.get('age')
    if age is not None and age < 18:
        raise forms.ValidationError('Must be at least 18')
    return age"""
        res = evaluate_code_submission('clean_age', code)
        self.assertTrue(res['all_passed'])
        self.assertEqual(res['passed_tests'], 4)

    def test_evaluate_security_violation(self):
        malicious_code = """import os
def clean_age(self):
    os.system('echo test')
    return self.cleaned_data.get('age')"""
        res = evaluate_code_submission('clean_age', malicious_code)
        self.assertFalse(res['all_passed'])
        self.assertIn('Security restriction', res['error'])
