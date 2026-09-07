---
name: leyaa-visualizer-engine
description: Technical design and step-by-step trace generation guide for Leyaa.ai-style Django form validation execution visualizers.
---

# Leyaa.ai Visualizer Engine Specification

## Trace Structure
The tracer records each discrete state change across 7 execution phases:
- `step`: Integer sequence index (1 to 7).
- `phase`: Phase identifier (e.g. `RAW_POST`, `IS_VALID_INIT`, `BUILTIN_FIELDS`, `CUSTOM_FIELD_CLEAN`, `FORM_CLEAN`, `COMPILATION`, `DECISION`).
- `title`: Human-readable phase summary.
- `description`: Detailed technical explanation of what Django does under the hood.
- `call_stack`: Active call frames (e.g. `['RegistrationView.post()', 'RegistrationForm.is_valid()', 'RegistrationForm.clean_age()']`).
- `active_line`: Relevant line number in the visualized `forms.py` source code.
- `variables`: State snapshot of `cleaned_data`, `errors`, and field values.
- `status`: Step outcome (`INFO`, `VALID`, `ERROR`).
