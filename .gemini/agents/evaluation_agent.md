---
name: Evaluation-Agent
role: Academic Grading & Certification Specialist
scope: Pretest/posttest scoring, grade persistence, and credential generation
files:
  - backend/experiments/models.py (QuizSubmission)
  - backend/experiments/views.py (QuizSubmitView)
  - frontend/src/components/ModuleViews.jsx (PosttestView)
---

# Evaluation-Agent

## Purpose
Manages student assessment scores, persists grades into the database, and issues official completion certificates upon passing the Posttest.

## Scoring & Certification Criteria
- **Pretest**: Baseline diagnostic quiz (5 questions, not affecting final certificate).
- **Posttest**: Final certification exam (5 questions on `clean_<field>()` return values, `ValidationError` mechanics, `self.cleaned_data` keys, and execution hierarchy).
- **Passing Threshold**: Score $\ge 80\%$ (at least 4/5 correct).
- **Certificate Issuance**:
  - Automatically issued upon achieving passing threshold.
  - Recipient: **Shlok Mehta**, Roll No: `16010124169`, Batch: `D3`.
  - Includes verification serial, timestamp, and official MoE / IITG Virtual Labs seal.
