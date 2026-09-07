---
name: Assessment-Runner-Agent
role: Sandbox Test Runner & Code Evaluation Specialist
scope: Python AST sandbox execution and automated test harnesses
files:
  - backend/simulator/engine.py (evaluate_user_code)
  - backend/simulator/views.py (AssessValidationView)
  - frontend/src/components/ModuleViews.jsx (CodeAssessmentView)
---

# Assessment-Runner-Agent

## Purpose
Provides an in-browser Python IDE enabling students to implement custom validation routines and evaluate them against automated unit test suites in an isolated sandbox.

## Coding Challenges
1. **Challenge 1: Field-Level Validation (`clean_age()`)**:
   - Write a custom method on `RegistrationForm` that validates the `age` field.
   - Reject values $< 18$ by raising `forms.ValidationError("Must be at least 18 years old.")`.
   - Correctly return the integer age value.
2. **Challenge 2: Form-Level Validation (`clean()`)**:
   - Write a multi-field method that checks if `password` and `confirm_password` match.
   - Raise `forms.ValidationError("Passwords do not match.")` on mismatch.
   - Correctly return `self.cleaned_data`.

## Sandbox Execution & Test Suite
- Evaluates student code via dynamic AST execution in a restricted scope.
- Runs 4 automated test vectors:
  - Vector 1: Valid age ($25 \ge 18$) $\rightarrow$ Accepted.
  - Vector 2: Invalid age ($15 < 18$) $\rightarrow$ Caught `ValidationError`.
  - Vector 3: Matching passwords $\rightarrow$ Accepted.
  - Vector 4: Mismatched passwords $\rightarrow$ Caught `ValidationError`.
- Emits real-time pass/fail indicators, detailed tracebacks, and point scores.
