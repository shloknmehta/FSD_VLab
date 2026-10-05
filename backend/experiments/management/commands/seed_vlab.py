from django.core.management.base import BaseCommand
from rest_framework.authtoken.models import Token
from authentication.models import CustomUser
from experiments.models import Experiment, QuizQuestion, QuizSubmission
from portal.models import FeedbackSubmission, BugReport, CodeSubmission

class Command(BaseCommand):
    help = 'Seeds initial users, experiment curriculum, and quizzes for FSD Virtual Lab'

    def handle(self, *args, **options):
        self.stdout.write('=== SEEDING VLAB DATABASE ===')

        # 1. Users
        users_data = [
            {
                'username': 'student',
                'email': 'student@vlab.edu',
                'password': 'student',
                'first_name': 'Shlok',
                'last_name': 'Mehta',
                'role': 'STUDENT',
                'roll_or_faculty_id': '16010124169',
                'department': 'Computer Engineering',
                'batch': 'D3'
            },
            {
                'username': 'faculty',
                'email': 'faculty@vlab.edu',
                'password': 'faculty',
                'first_name': 'Prof.',
                'last_name': 'Sharma',
                'role': 'FACULTY',
                'roll_or_faculty_id': 'FAC-CS-204',
                'department': 'Computer Engineering',
                'batch': 'D3'
            },
            {
                'username': 'admin',
                'email': 'admin@vlab.edu',
                'password': 'admin',
                'first_name': 'System',
                'last_name': 'Administrator',
                'role': 'ADMIN',
                'roll_or_faculty_id': 'ADM-001',
                'department': 'KJSSE Virtual Labs System Administration',
                'batch': 'D3'
            }
        ]

        for udata in users_data:
            user, _ = CustomUser.objects.get_or_create(username=udata['username'], defaults={
                'email': udata['email'],
                'first_name': udata['first_name'],
                'last_name': udata['last_name'],
                'role': udata['role'],
                'roll_or_faculty_id': udata['roll_or_faculty_id'],
                'department': udata['department'],
                'batch': udata.get('batch', 'D3')
            })
            user.set_password(udata['password'])
            user.email = udata['email']
            user.role = udata['role']
            user.first_name = udata['first_name']
            user.last_name = udata['last_name']
            user.roll_or_faculty_id = udata['roll_or_faculty_id']
            user.department = udata['department']
            user.batch = udata.get('batch', 'D3')
            if udata['role'] == 'ADMIN':
                user.is_staff = True
                user.is_superuser = True
            user.save()
            token, _ = Token.objects.get_or_create(user=user)
            self.stdout.write(f"  [User] {user.username} ({user.role}) - Token: {token.key}")

        # 2. Experiment Curriculum
        exp, _ = Experiment.objects.get_or_create(
            slug='django-form-validation',
            defaults={
                'title': 'Experiment 6: Django Form Validation Lifecycle',
                'aim': 'To understand, trace, and implement the complete Django Form Validation Lifecycle — analyzing built-in field conversions, field-specific clean_<field>() methods, and cross-field form-level clean() logic.',
                'overview': (
                    'Form validation in Django is a structured, multi-tier process designed to ensure data integrity '
                    'before application models or business workflows process incoming HTTP parameters. When a user submits '
                    'a form, the validation pipeline follows an exacting sequence:\n\n'
                    '1. Data Binding & Instantiation: The form binds raw request.POST dictionaries into self.data.\n'
                    '2. Lifecycle Entry: Calling form.is_valid() triggers self.full_clean().\n'
                    '3. Built-in Field Coercion (_clean_fields): Each field converts raw strings into Python objects (integers, dates, model instances) and runs registered field validators.\n'
                    '4. Individual Field Hook (clean_<fieldname>): If defined, custom logic is called. Must explicitly return the cleaned value!\n'
                    '5. Form-Wide Cleaning (clean): Cross-field constraints are validated (e.g. password confirmation). Non-field errors are attached to "__all__".\n'
                    '6. Errors Aggregation: Valid fields reside in form.cleaned_data; failed fields produce ErrorDict entries.\n'
                    '7. Boolean Decision: is_valid() returns True only if errors dictionary is empty.'
                ),
                'recap': (
                    'Key Rules of Django Form Validation:\n'
                    '• Always return cleaned value from clean_<fieldname>() — otherwise self.cleaned_data[fieldname] becomes None!\n'
                    '• Do NOT perform multi-field checks in clean_<fieldname>() because peer fields may not be validated or cleaned yet.\n'
                    '• In form-level clean(), always call super().clean() first to ensure parent class cleaned_data dictionary exists.\n'
                    '• Raise django.core.exceptions.ValidationError with informative user-facing error messages.'
                ),
                'analysis': (
                    'Comparison of Validation Tiers:\n'
                    '| Feature | Built-in Field Validation | clean_<fieldname>() | clean() Form-Level |\n'
                    '|---|---|---|---|\n'
                    '| Execution Order | First (Step 3) | Second (Step 4) | Third (Step 5) |\n'
                    '| Scope | Single field data type & constraints | Single field custom business rule | Multiple fields cross-dependencies |\n'
                    '| Skipped On Failure | N/A | Skipped if Built-in fails | Runs even if some fields failed |\n'
                    '| Error Location | form.errors[fieldname] | form.errors[fieldname] | form.errors[\'__all__\'] (non-field) |\n'
                    '| Return Requirement | Internal to Field class | MUST return cleaned field value | MUST return full cleaned_data dict |'
                ),
                'references': (
                    '• Official Django Form Validation Documentation (docs.djangoproject.com/en/stable/ref/forms/validation/)\n'
                    '• Two Scoops of Django: Best Practices for Forms\n'
                    '• Django Source Code: django.forms.forms.BaseForm'
                ),
                'estimated_time': '45 Minutes',
                'estimated_minutes': 45
            }
        )
        self.stdout.write(f"  [Experiment] {exp.title} (slug: {exp.slug})")

        # 3. Quiz Questions
        QuizQuestion.objects.filter(experiment=exp).delete()

        pretest_questions = [
            {
                'question_text': 'Which method in a Django form initiates the complete validation pipeline?',
                'options_json': ['form.validate()', 'form.is_valid()', 'form.run_clean()', 'form.check_data()'],
                'correct_answer': 'form.is_valid()',
                'explanation': 'In Django, invoking form.is_valid() initiates self.full_clean(), which systematically executes built-in field validations, clean_<fieldname>() methods, and finally form.clean().',
                'order': 1
            },
            {
                'question_text': 'What is the primary architectural purpose of the custom clean_<fieldname>() method?',
                'options_json': [
                    'To validate cross-field dependencies between multiple inputs',
                    'To validate and sanitize a single specific field with domain logic',
                    'To delete the field permanently from self.cleaned_data',
                    'To render HTML input widget markup in Django templates'
                ],
                'correct_answer': 'To validate and sanitize a single specific field with domain logic',
                'explanation': 'The clean_<fieldname>() hook is specifically designed for single-field domain validation and normalization (e.g., verifying age >= 18 or formatting an institutional username).',
                'order': 2
            },
            {
                'question_text': 'Where does Django store successfully sanitized and validated form values?',
                'options_json': ['form.raw_data', 'form.cleaned_data', 'form.valid_dict', 'request.POST'],
                'correct_answer': 'form.cleaned_data',
                'explanation': 'Django populates form.cleaned_data with Python type-cast and validated values. Unvalidated or failed fields are stripped out.',
                'order': 3
            },
            {
                'question_text': 'What occurs if a developer writes clean_<fieldname>() but forgets the "return value" statement?',
                'options_json': [
                    'Django automatically retains the raw input string',
                    'The field\'s value in self.cleaned_data becomes None',
                    'Django raises a CompilationError immediately',
                    'The form defaults to 0 or an empty string'
                ],
                'correct_answer': 'The field\'s value in self.cleaned_data becomes None',
                'explanation': 'Whatever is returned by clean_<fieldname>() overwrites self.cleaned_data[fieldname]. If no return statement exists, Python functions return None by default.',
                'order': 4
            },
            {
                'question_text': 'Which exception class must be raised to report input validation failures in Django forms?',
                'options_json': [
                    'django.core.exceptions.ValidationError',
                    'ValueError',
                    'django.forms.FormError',
                    'TypeError'
                ],
                'correct_answer': 'django.core.exceptions.ValidationError',
                'explanation': 'Django\'s internal validation loop specifically catches ValidationError instances and maps their error strings into the form\'s error collection.',
                'order': 5
            }
        ]

        for q in pretest_questions:
            QuizQuestion.objects.create(
                experiment=exp,
                quiz_type='PRETEST',
                question_text=q['question_text'],
                options_json=q['options_json'],
                correct_answer=q['correct_answer'],
                explanation=q['explanation'],
                order=q['order']
            )

        posttest_questions = [
            {
                'question_text': 'In what chronological order does Django execute validation methods during full_clean()?',
                'options_json': [
                    'clean() -> clean_<field>() -> Field.clean() built-in',
                    'Field.clean() built-in -> clean_<fieldname>() -> form.clean()',
                    'clean_<fieldname>() -> form.clean() -> Field.clean() built-in',
                    'form.save() -> clean_<fieldname>() -> form.clean()'
                ],
                'correct_answer': 'Field.clean() built-in -> clean_<fieldname>() -> form.clean()',
                'explanation': 'Django first executes field-level built-in type conversions and validators, followed by custom clean_<fieldname>() methods, and finishes with form-wide clean().',
                'order': 1
            },
            {
                'question_text': 'Where are errors stored when raised inside the form-wide clean() method without specifying a field key?',
                'options_json': [
                    'form.errors[\'__all__\'] (non-field errors)',
                    'form.errors[\'form\']',
                    'form.errors[\'global\']',
                    'form.errors[\'general\']'
                ],
                'correct_answer': 'form.errors[\'__all__\'] (non-field errors)',
                'explanation': 'Non-field errors generated in form.clean() are stored under \'__all__\' and accessed in templates via form.non_field_errors().',
                'order': 2
            },
            {
                'question_text': 'Why must cross-field comparisons (e.g., password matching) be placed in clean() instead of clean_password()?',
                'options_json': [
                    'clean_password() cannot raise ValidationError',
                    'The confirm_password field may not have been cleaned or validated yet',
                    'Django does not permit reading self.cleaned_data in clean_password()',
                    'clean() runs faster than clean_password()'
                ],
                'correct_answer': 'The confirm_password field may not have been cleaned or validated yet',
                'explanation': 'Individual fields are processed separately in clean_<field>(). To safely compare multiple fields, you must wait until form-level clean() when all individual fields have concluded validation.',
                'order': 3
            },
            {
                'question_text': 'Why is it best practice to invoke super().clean() inside a custom form-wide clean() method?',
                'options_json': [
                    'It guarantees that parent class cleaned_data dictionary is properly initialized and preserved',
                    'It wipes all previous field errors from the form',
                    'It writes the validated object directly to the database',
                    'It disables CSRF protection on the form'
                ],
                'correct_answer': 'It guarantees that parent class cleaned_data dictionary is properly initialized and preserved',
                'explanation': 'Calling super().clean() ensures that parent form classes, including ModelForm, maintain and return the initial cleaned_data dictionary safely.',
                'order': 4
            },
            {
                'question_text': 'If built-in validation fails on an IntegerField (e.g., user inputs "not_a_number"), does Django invoke clean_<fieldname>()?',
                'options_json': [
                    'Yes, clean_<fieldname>() is unconditionally called',
                    'No, Django skips clean_<fieldname>() because the field failed built-in validation',
                    'Only if settings.DEBUG is set to True',
                    'Yes, but the value is coerced to 0'
                ],
                'correct_answer': 'No, Django skips clean_<fieldname>() because the field failed built-in validation',
                'explanation': 'If field.clean() fails, Django records the error in self._errors and omits the field from cleaned_data, deliberately skipping clean_<fieldname>() to avoid handling invalid types.',
                'order': 5
            }
        ]

        for q in posttest_questions:
            QuizQuestion.objects.create(
                experiment=exp,
                quiz_type='POSTTEST',
                question_text=q['question_text'],
                options_json=q['options_json'],
                correct_answer=q['correct_answer'],
                explanation=q['explanation'],
                order=q['order']
            )

        self.stdout.write(self.style.SUCCESS('Successfully seeded VLab database!'))
