from django.test import TestCase
from rest_framework.test import APIClient
from .models import CustomUser

class AuthenticationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(
            username='teststudent',
            email='teststudent@vlab.edu',
            password='TestPassword@123',
            role='STUDENT',
            department='Computer Engineering',
            batch='D3'
        )

    def test_user_creation_and_attributes(self):
        self.assertEqual(self.user.role, 'STUDENT')
        self.assertEqual(self.user.department, 'Computer Engineering')
        self.assertEqual(self.user.batch, 'D3')

    def test_login_endpoint(self):
        response = self.client.post('/api/auth/login/', {
            'username': 'teststudent',
            'password': 'TestPassword@123'
        }, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('token', response.data)
        self.assertEqual(response.data['user']['username'], 'teststudent')

    def test_register_endpoint(self):
        response = self.client.post('/api/auth/register/', {
            'username': 'newuser',
            'email': 'newuser@vlab.edu',
            'password': 'NewUser@123',
            'confirm_password': 'NewUser@123',
            'first_name': 'New',
            'last_name': 'Student',
            'role': 'STUDENT',
            'roll_or_faculty_id': '16010124999',
            'batch': 'D3'
        }, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('token', response.data)
        self.assertEqual(response.data['user']['username'], 'newuser')

    def test_logout_endpoint(self):
        # Login first to get token
        login_res = self.client.post('/api/auth/login/', {
            'username': 'teststudent',
            'password': 'TestPassword@123'
        }, format='json')
        token = login_res.data['token']

        # Call logout with Bearer token
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        logout_res = self.client.post('/api/auth/logout/', format='json')
        self.assertEqual(logout_res.status_code, 200)

    def test_switch_demo_role(self):
        response = self.client.post('/api/auth/switch-demo-role/', {'role': 'FACULTY'}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['role'], 'FACULTY')
