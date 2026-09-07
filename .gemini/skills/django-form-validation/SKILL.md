---
name: django-form-validation
description: Comprehensive standard and guidelines for implementing custom form validation in Django using clean_<fieldname>() and clean() methods.
---

# Django Custom Form Validation Standard

## 1. Field-Level Validation (`clean_<fieldname>()`)
Use `clean_<fieldname>()` when you want to enforce custom business logic on a single field:
```python
class RegistrationForm(forms.Form):
    age = forms.IntegerField()

    def clean_age(self):
        age = self.cleaned_data.get('age')
        if age is not None and age < 18:
            raise forms.ValidationError("You must be at least 18 years old to register.")
        return age  # MUST always return the cleaned value!
```

## 2. Form-Level Cross-Field Validation (`clean()`)
Use `clean()` when validating multiple dependent fields:
```python
class RegistrationForm(forms.Form):
    password = forms.CharField(widget=forms.PasswordInput)
    confirm_password = forms.CharField(widget=forms.PasswordInput)

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')

        if password and confirm_password and password != confirm_password:
            raise forms.ValidationError("Passwords do not match.")
        return cleaned_data  # MUST always return cleaned_data!
```

## 3. Execution Pipeline Order
1. `to_python()`: Data type coercion.
2. `validate()`: Built-in field validation.
3. `run_validators()`: Field validator list checks.
4. `clean_<fieldname>()`: Custom field hook.
5. `clean()`: Cross-field form-level hook.
