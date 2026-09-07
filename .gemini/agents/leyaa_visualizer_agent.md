---
name: Leyaa-Visualizer-Agent
role: Execution Tracer & Visualizer Engine Specialist
scope: 7-step interactive Django form validation lifecycle visualization
files:
  - backend/simulator/engine.py (FormValidationTracer)
  - backend/simulator/views.py (TraceValidationView)
  - frontend/src/components/ModuleViews.jsx (VisualizerView)
---

# Leyaa-Visualizer-Agent

## Purpose
Implements the 7-phase step-by-step interactive execution visualizer inspired by [Leyaa.ai](https://leyaa.ai/codefly/learn/django/part-2/django-custom-form-validation-methods/visualize), exposing the internal lifecycle of Django's `form.is_valid()`.

## 7-Step Lifecycle Sequence
1. **Raw POST Binding**: HTTP POST dictionary received (`request.POST`) and bound to the form instance.
2. **`form.is_valid()` Invocation**: Triggers `self.errors`, which initiates `self.full_clean()`.
3. **Built-in Field Checks (`_clean_fields()`)**: Executes field-type conversions (`to_python()`) and field validators (`validate()`).
4. **Custom Field Hook (`clean_age()`)**: Executes single-field custom validation logic, asserting age $\ge 18$.
5. **Form-Level Hook (`clean()`)**: Executes multi-field cross-validation, asserting `password == confirm_password`.
6. **Error / Clean Compilation**: Populates `self.cleaned_data` for valid fields and `self._errors` (including `__all__` non-field errors).
7. **Decision Returned**: Returns boolean `True` if `len(self.errors) == 0`, otherwise `False`.

## Visualizer Capabilities
- **Preset Scenarios**:
  - Scenario 1: All Valid Inputs (Age: 21, Matching Passwords).
  - Scenario 2: Age Under 18 (`clean_age` raises `ValidationError`).
  - Scenario 3: Password Mismatch (`clean()` raises non-field `ValidationError`).
  - Scenario 4: Incomplete / Required Missing Data.
- **Interactive Controls**: Step Forward, Step Back, Play/Pause, Reset, Speed Slider.
- **State Inspector**: Live variable table watching `self.cleaned_data` and `self.errors`.
- **Call Stack & Line Highlighter**: Tracks active call stack frames and corresponding line numbers in `forms.py`.
