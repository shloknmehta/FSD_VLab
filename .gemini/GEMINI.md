# KJSSE (K. J. Somaiya School of Engineering) Virtual Labs Project Standard

## Topic: Custom Form Validation using `clean()` & `clean_<fieldname>()` in Django

### Core Architectural Rules
1. **Design System**: Must adhere to official KJSSE / Virtual Labs styling:
   - Header with Green Beaker Flask logo and blue rounded "Rate Me" / "Report a Bug" action buttons.
   - `#f37021` signature orange horizontal divider.
   - Cyan breadcrumb navigation (`Computer Science and Engineering > Django Web Technologies > Experiments`).
   - Collapsible sidebar navigation with `#2c5282` navy text and bold `#e65100` orange active state.
2. **Pedagogical Alignment**:
   - Single-field custom validation: `clean_<fieldname>()` — must retrieve value via `self.cleaned_data.get('<field>')`, raise `forms.ValidationError` if invalid, and return the cleaned value.
   - Multi-field custom validation: `clean()` — must retrieve validated values via `super().clean()`, raise `forms.ValidationError` for cross-field mismatches, and return `self.cleaned_data`.
3. **RBAC Rules**:
   - `STUDENT`: Shlok Mehta, Roll No: 16010124169, Batch: D3.
   - `FACULTY`: Prof. Sharma. Gradebook access and CSV export.
   - `ADMIN`: Full management access to bug reports and user list.
4. **Agent Delegation**:
   - Every feature is governed by its dedicated agent specification located in `.gemini/agents/`.
