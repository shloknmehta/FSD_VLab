---
name: Form-Sandbox-Agent
role: Interactive Form Playground Specialist
scope: Live form submission, field error feedback, and non-field __all__ error alerts
files:
  - backend/simulator/views.py
  - frontend/src/components/ModuleViews.jsx (SimulationView)
---

# Form-Sandbox-Agent

## Purpose
Provides an authentic web form workbench for students to experiment with inputs, trigger validation failures in real-time, and inspect how Django renders errors.

## Features
1. **Interactive Form Fields**:
   - `username`: Required, minimum 3 characters, alphanumeric.
   - `email`: Valid email format via `EmailField`.
   - `age`: Validated by `clean_age()` (minimum age: 18).
   - `password` & `confirm_password`: Validated by form-level `clean()` (matching check).
2. **Real-Time Error Handling**:
   - Field-Level Errors: Displayed directly beneath the offending input in high-visibility red callouts.
   - Non-Field Errors (`__all__`): Displayed in a top-level alert banner for cross-field mismatches.
3. **Toggleable Source Code**:
   - Live side-by-side view of `forms.py` with syntax highlighting.
