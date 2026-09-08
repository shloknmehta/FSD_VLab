import sys
import copy
import ast
import textwrap
from django import forms
from django.core.exceptions import ValidationError
from .forms import StandardRegistrationForm

def run_validation_trace(raw_data, custom_field_config=None):
    """
    Executes a step-by-step trace of Django form validation lifecycle.
    Returns structured step logs showing variable states at each stage.
    """
    steps = []
    current_cleaned_data = {}
    current_errors = {}

    # STEP 1: Input raw POST dictionary received
    steps.append({
        "step_number": 1,
        "phase": "REQUEST_INSPECTION",
        "title": "Raw POST Dictionary Received",
        "description": "The HTTP request data is bound to the form instance. Django initializes internal data structures.",
        "code_snippet": "form = UserRegistrationForm(data=request.POST)\n# self.data is populated, self.is_bound is True",
        "line_number": 1,
        "cleaned_data_state": copy.deepcopy(current_cleaned_data),
        "errors_state": copy.deepcopy(current_errors),
        "status": "INFO",
        "details": {
            "raw_input": raw_data,
            "is_bound": True
        }
    })

    # STEP 2: form.is_valid() initiated
    steps.append({
        "step_number": 2,
        "phase": "IS_VALID_ENTRY",
        "title": "form.is_valid() Initiated",
        "description": "form.is_valid() triggers self.full_clean() if self._errors is None. The validation lifecycle officially begins.",
        "code_snippet": "def is_valid(self):\n    return self.is_bound and not self.errors\n# Triggers self.full_clean()",
        "line_number": 4,
        "cleaned_data_state": copy.deepcopy(current_cleaned_data),
        "errors_state": copy.deepcopy(current_errors),
        "status": "INFO",
        "details": {
            "action": "Invoking full_clean() lifecycle sequence"
        }
    })

    # STEP 3: Built-in field type validations run
    builtin_logs = []
    # Test built-in fields against raw_data
    fields = {
        'username': forms.CharField(max_length=50, required=True),
        'email': forms.EmailField(required=True),
        'age': forms.IntegerField(required=True),
        'password': forms.CharField(required=True),
        'confirm_password': forms.CharField(required=True),
    }

    for field_name, field_obj in fields.items():
        raw_val = raw_data.get(field_name)
        try:
            cleaned_val = field_obj.clean(raw_val)
            current_cleaned_data[field_name] = cleaned_val
            builtin_logs.append({
                "field": field_name,
                "raw_value": raw_val,
                "cleaned_value": cleaned_val,
                "status": "PASSED"
            })
        except ValidationError as ve:
            err_msg = ve.messages if hasattr(ve, 'messages') else [str(ve)]
            current_errors[field_name] = err_msg
            builtin_logs.append({
                "field": field_name,
                "raw_value": raw_val,
                "error": err_msg,
                "status": "FAILED"
            })

    steps.append({
        "step_number": 3,
        "phase": "FIELD_BUILTIN_VALIDATION",
        "title": "Built-in Field Type Validations Executed",
        "description": "Django executes self._clean_fields(). Each field runs to_python(), validate(), and run_validators(). Type casting occurs.",
        "code_snippet": "for name, field in self.fields.items():\n    value = field.clean(raw_value)\n    self.cleaned_data[name] = value",
        "line_number": 12,
        "cleaned_data_state": copy.deepcopy(current_cleaned_data),
        "errors_state": copy.deepcopy(current_errors),
        "status": "WARNING" if current_errors else "SUCCESS",
        "details": {
            "field_validations": builtin_logs
        }
    })

    # STEP 4: Custom clean_<fieldname>() methods run
    custom_field_logs = []
    # clean_username
    if 'username' in current_cleaned_data:
        uname = current_cleaned_data['username']
        if not str(uname).isalnum():
            err = ["Username must contain only alphanumeric characters."]
            current_errors['username'] = err
            del current_cleaned_data['username']
            custom_field_logs.append({
                "method": "clean_username()",
                "result": "FAILED",
                "error": err
            })
        else:
            custom_field_logs.append({
                "method": "clean_username()",
                "result": "PASSED",
                "value": uname
            })

    # clean_age
    if 'age' in current_cleaned_data:
        age_val = current_cleaned_data['age']
        try:
            if int(age_val) < 18:
                err = ["Must be at least 18 years old to register."]
                current_errors['age'] = err
                del current_cleaned_data['age']
                custom_field_logs.append({
                    "method": "clean_age()",
                    "result": "FAILED",
                    "error": err
                })
            else:
                custom_field_logs.append({
                    "method": "clean_age()",
                    "result": "PASSED",
                    "value": age_val
                })
        except (ValueError, TypeError):
            pass

    steps.append({
        "step_number": 4,
        "phase": "FIELD_CUSTOM_CLEAN",
        "title": "Custom clean_<fieldname>() Methods Invoked",
        "description": "Django checks for hasattr(self, 'clean_%s' % name). clean_age() and clean_username() run custom domain assertions.",
        "code_snippet": "if hasattr(self, 'clean_' + name):\n    value = getattr(self, 'clean_' + name)()\n    self.cleaned_data[name] = value",
        "line_number": 25,
        "cleaned_data_state": copy.deepcopy(current_cleaned_data),
        "errors_state": copy.deepcopy(current_errors),
        "status": "WARNING" if any(l.get('result') == 'FAILED' for l in custom_field_logs) else "SUCCESS",
        "details": {
            "custom_method_results": custom_field_logs
        }
    })

    # STEP 5: Form-level clean() method runs
    form_clean_logs = []
    if 'password' in current_cleaned_data and 'confirm_password' in current_cleaned_data:
        pwd = current_cleaned_data.get('password')
        cpwd = current_cleaned_data.get('confirm_password')
        if pwd != cpwd:
            err = ["Passwords do not match."]
            current_errors['__all__'] = err
            form_clean_logs.append({
                "check": "Cross-field password verification",
                "result": "FAILED",
                "error": err
            })
        else:
            form_clean_logs.append({
                "check": "Cross-field password verification",
                "result": "PASSED"
            })
    else:
        form_clean_logs.append({
            "check": "Cross-field password verification",
            "result": "SKIPPED",
            "reason": "One or both password fields failed prior individual validation."
        })

    steps.append({
        "step_number": 5,
        "phase": "FORM_LEVEL_CLEAN",
        "title": "Form-Level clean() Executed",
        "description": "self._clean_form() invokes clean(). Evaluates multi-field relationships (e.g. matching passwords). Attaches non-field errors to '__all__'.",
        "code_snippet": "def clean(self):\n    cleaned_data = super().clean()\n    if password != confirm_password:\n        raise forms.ValidationError('Passwords do not match.')\n    return cleaned_data",
        "line_number": 36,
        "cleaned_data_state": copy.deepcopy(current_cleaned_data),
        "errors_state": copy.deepcopy(current_errors),
        "status": "ERROR" if '__all__' in current_errors else "SUCCESS",
        "details": {
            "form_clean_results": form_clean_logs
        }
    })

    # STEP 6: Errors dictionary or valid cleaned_data populated
    is_valid_result = (len(current_errors) == 0)
    steps.append({
        "step_number": 6,
        "phase": "ERROR_AGGREGATION",
        "title": "Errors Dictionary & cleaned_data Finalized",
        "description": "Validation cycle finishes. If errors exist, self.errors contains ErrorDict; invalid keys are removed from cleaned_data.",
        "code_snippet": "if self._errors:\n    # cleaned_data stripped of invalid fields\nelse:\n    # cleaned_data ready for form.save() or business logic",
        "line_number": 45,
        "cleaned_data_state": copy.deepcopy(current_cleaned_data),
        "errors_state": copy.deepcopy(current_errors),
        "status": "SUCCESS" if is_valid_result else "ERROR",
        "details": {
            "total_errors": len(current_errors),
            "valid_fields_count": len(current_cleaned_data)
        }
    })

    # STEP 7: Validation result returned
    steps.append({
        "step_number": 7,
        "phase": "FINAL_DECISION",
        "title": "form.is_valid() Decision Returned",
        "description": f"is_valid() returns {is_valid_result}. Controller/View branches accordingly (e.g. HTTP 200 re-render with errors vs HTTP 302 redirect).",
        "code_snippet": f"if form.is_valid():\n    # returns {is_valid_result}\n    return redirect('success')\nreturn render(request, 'form.html', {{'form': form}})",
        "line_number": 52,
        "cleaned_data_state": copy.deepcopy(current_cleaned_data),
        "errors_state": copy.deepcopy(current_errors),
        "status": "SUCCESS" if is_valid_result else "ERROR",
        "details": {
            "is_valid": is_valid_result
        }
    })

    return {
        "is_valid": is_valid_result,
        "cleaned_data": current_cleaned_data,
        "errors": current_errors,
        "steps": steps
    }

# Assessment Challenge Evaluator
CHALLENGES = {
    "challenge_clean_age": {
        "id": "challenge_clean_age",
        "title": "Task 1: Custom Field Validation (clean_age)",
        "description": "Implement the `clean_age(self)` method to ensure the age entered is at least 18. If under 18, raise forms.ValidationError('Must be at least 18 years old'). Remember to return `age` if valid.",
        "starter_code": "def clean_age(self):\n    age = self.cleaned_data.get('age')\n    # TODO: Add your validation logic here\n    return age",
        "test_cases": [
            {"input": {"age": 22}, "expected_valid": True, "description": "Adult age (22) should pass validation"},
            {"input": {"age": 16}, "expected_valid": False, "description": "Minor age (16) should raise ValidationError"},
            {"input": {"age": 18}, "expected_valid": True, "description": "Exact boundary age (18) should pass validation"},
            {"input": {"age": 12}, "expected_valid": False, "description": "Young child age (12) should raise ValidationError"}
        ]
    },
    "challenge_clean_passwords": {
        "id": "challenge_clean_passwords",
        "title": "Task 2: Form-Level Cross-Field Validation (clean)",
        "description": "Implement the `clean(self)` method to verify that `password` and `confirm_password` match. If they differ, raise forms.ValidationError('Passwords do not match'). Remember to return `cleaned_data`.",
        "starter_code": "def clean(self):\n    cleaned_data = super().clean()\n    password = cleaned_data.get('password')\n    confirm_password = cleaned_data.get('confirm_password')\n    # TODO: Add matching check\n    return cleaned_data",
        "test_cases": [
            {
                "input": {"password": "securePass123", "confirm_password": "securePass123"},
                "expected_valid": True,
                "description": "Matching passwords should pass validation"
            },
            {
                "input": {"password": "securePass123", "confirm_password": "differentPassword"},
                "expected_valid": False,
                "description": "Mismatched passwords must raise ValidationError"
            },
            {
                "input": {"password": "Admin@2026", "confirm_password": "Admin@2026"},
                "expected_valid": True,
                "description": "Complex matching passwords should pass validation"
            }
        ]
    }
}

def evaluate_code_submission(challenge_id, user_code):
    """
    Safely executes and tests student validation methods against automated test cases.
    """
    cid = str(challenge_id or '').strip().lower()
    if cid in ['clean_age', 'challenge_clean_age', 'age']:
        effective_cid = 'challenge_clean_age'
    elif cid in ['clean_form', 'clean', 'challenge_clean_passwords', 'passwords', 'clean_passwords']:
        effective_cid = 'challenge_clean_passwords'
    else:
        effective_cid = challenge_id

    challenge = CHALLENGES.get(effective_cid)
    if not challenge:
        return {
            "success": False,
            "passed": False,
            "all_passed": False,
            "error": f"Unknown challenge ID: {challenge_id}. Available challenges: {list(CHALLENGES.keys())}"
        }

    # AST Security Validation
    try:
        parsed_ast = ast.parse(user_code)
        for node in ast.walk(parsed_ast):
            if isinstance(node, ast.Import):
                for alias in node.names:
                    if alias.name in ['os', 'sys', 'subprocess', 'shutil', 'pathlib', 'socket']:
                        return {
                            "success": False,
                            "passed": False,
                            "all_passed": False,
                            "error": f"Security restriction: Import of '{alias.name}' is not permitted."
                        }
            elif isinstance(node, ast.ImportFrom):
                if node.module in ['os', 'sys', 'subprocess', 'shutil', 'pathlib', 'socket']:
                    return {
                        "success": False,
                        "passed": False,
                        "all_passed": False,
                        "error": f"Security restriction: Import from '{node.module}' is not permitted."
                    }
            elif isinstance(node, ast.Call):
                if isinstance(node.func, ast.Name) and node.func.id in ['__import__', 'open', 'eval', 'exec']:
                    return {
                        "success": False,
                        "passed": False,
                        "all_passed": False,
                        "error": f"Security restriction: Direct call to '{node.func.id}()' is not permitted."
                    }
    except SyntaxError as se:
        return {
            "success": False,
            "passed": False,
            "all_passed": False,
            "syntax_error": str(se),
            "error": f"Python syntax error in submitted code: {str(se)}"
        }

    test_results = []
    passed_count = 0
    total_tests = len(challenge['test_cases'])

    safe_namespace = {
        'forms': forms,
        'ValidationError': ValidationError
    }

    try:
        if effective_cid == "challenge_clean_age":
            if "class " in user_code:
                exec(user_code, safe_namespace)
                FormClass = next((v for v in safe_namespace.values() if isinstance(v, type) and issubclass(v, forms.Form) and v is not forms.Form), None)
            else:
                wrapped_code = f"class EvaluatedForm(forms.Form):\n    age = forms.IntegerField(required=True)\n\n" + textwrap.indent(user_code.strip(), "    ")
                exec(wrapped_code, safe_namespace)
                FormClass = safe_namespace.get('EvaluatedForm')

            if not FormClass or not hasattr(FormClass, 'clean_age'):
                return {
                    "success": False,
                    "passed": False,
                    "all_passed": False,
                    "error": "Method 'clean_age(self)' was not found in submitted code."
                }

            for tc in challenge['test_cases']:
                form = FormClass(data=tc['input'])
                is_valid = form.is_valid()
                passed = (is_valid == tc['expected_valid'])
                if passed:
                    passed_count += 1

                test_results.append({
                    "description": tc['description'],
                    "input": str(tc['input']),
                    "expected_valid": tc['expected_valid'],
                    "expected": "Validation Passed" if tc['expected_valid'] else "ValidationError raised",
                    "status": "PASSED" if passed else "FAILED",
                    "got_valid": is_valid,
                    "passed": passed,
                    "errors": {k: [str(e) for e in v] for k, v in form.errors.items()} if not is_valid else {}
                })

        elif effective_cid == "challenge_clean_passwords":
            if "class " in user_code:
                exec(user_code, safe_namespace)
                FormClass = next((v for v in safe_namespace.values() if isinstance(v, type) and issubclass(v, forms.Form) and v is not forms.Form), None)
            else:
                wrapped_code = f"class EvaluatedForm(forms.Form):\n    password = forms.CharField(required=True)\n    confirm_password = forms.CharField(required=True)\n\n" + textwrap.indent(user_code.strip(), "    ")
                exec(wrapped_code, safe_namespace)
                FormClass = safe_namespace.get('EvaluatedForm')

            if not FormClass or FormClass.clean is forms.Form.clean:
                return {
                    "success": False,
                    "passed": False,
                    "all_passed": False,
                    "error": "Method 'clean(self)' was not found or overridden in submitted code."
                }

            for tc in challenge['test_cases']:
                form = FormClass(data=tc['input'])
                is_valid = form.is_valid()
                passed = (is_valid == tc['expected_valid'])
                if passed:
                    passed_count += 1

                test_results.append({
                    "description": tc['description'],
                    "input": str(tc['input']),
                    "expected_valid": tc['expected_valid'],
                    "expected": "Validation Passed" if tc['expected_valid'] else "ValidationError raised",
                    "status": "PASSED" if passed else "FAILED",
                    "got_valid": is_valid,
                    "passed": passed,
                    "errors": {k: [str(e) for e in v] for k, v in form.errors.items()} if not is_valid else {}
                })
    except Exception as e:
        return {
            "success": False,
            "passed": False,
            "all_passed": False,
            "syntax_error": str(e),
            "passed_tests": 0,
            "testsPassed": 0,
            "total_tests": total_tests,
            "totalTests": total_tests,
            "message": f"Execution error: {str(e)}"
        }

    all_passed = (passed_count == total_tests)
    score = round((passed_count / total_tests) * 100, 1) if total_tests > 0 else 0.0

    return {
        "success": True,
        "passed": all_passed,
        "all_passed": all_passed,
        "testsPassed": passed_count,
        "passed_tests": passed_count,
        "totalTests": total_tests,
        "total_tests": total_tests,
        "score": score,
        "challenge_id": challenge_id,
        "challenge_title": challenge['title'],
        "testCases": test_results,
        "test_results": test_results,
        "feedback": "All test cases passed! Proper validation exception raised and cleaned value returned." if all_passed else f"{passed_count} of {total_tests} test cases passed. Review failing test cases above."
    }
