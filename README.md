# Virtual Labs (VLab) — Django Custom Form Validation using clean()

[![Django](https://img.shields.io/badge/Django-6.1-green.svg)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-19_Vite-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-cyan.svg)](https://tailwindcss.com/)
[![Virtual Labs](https://img.shields.io/badge/VLab-KJSSE%20Somaiya-orange.svg)](https://kjsse.somaiya.edu/)

An authentic, full-stack implementation of the **K. J. Somaiya School of Engineering (KJSSE) Virtual Labs** platform tailored specifically for Experiment 6: **"Custom Form Validation using `clean()` and `clean_<fieldname>()` in Django"**.

---

## Architecture & Design Fidelity

This platform adheres to the aesthetic, functional, and pedagogical standards of the **KJSSE Virtual Labs portal**:

- **Official KJSSE Header Branding**: Green beaker flask icon with MoE subtext ("An MoE Govt of India Initiative"), collapsible hamburger navigation, 5-star interactive rating, "Rate Me" modal, and "Report a Bug" modal.
- **Signature Styling**: Distinctive `#f37021` orange accent divider, cyan breadcrumb navigation (`Computer Science and Engineering > Django Web Technologies > Experiments`), and high-contrast orange active indicator on the sidebar.
- **Role-Based Access Control (RBAC)**:
  - **Student Persona (`STUDENT`)**: Enrolled student (**Shlok Mehta**, Roll No: `16010124169`, Batch `D3`) with full interactive lab access, real-time code evaluation, pre/post quizzes, and certificate generation.
  - **Faculty Persona (`FACULTY`)**: Course instructor (**Prof. Sharma**) with live Gradebook monitoring, student score tracking, and CSV export.
  - **Administrator Persona (`ADMIN`)**: System admin managing users, bug reports, and lab metrics.
  - *Instant Persona Switcher*: Easily switch roles from the top-right user menu with zero re-login hassle.

---

## Laboratory Modules & Features

| # | Module | Description |
|---|---|---|
| 1 | **Aim** | Clear academic learning objectives, prerequisites, and target competencies. |
| 2 | **Overview** | Detailed architectural breakdown of Django validation pipeline (`to_python()`, `validate()`, `run_validators()`), built-in vs custom validation, and lifecycle flowcharts. |
| 3 | **Recap** | The "Golden Rules" of Django validation: raising `forms.ValidationError`, returning `cleaned_data`, and cross-field synchronization. |
| 4 | **Pretest** | 5-question conceptual diagnostic quiz with instant feedback and scoring. |
| 5 | **Step-by-Step Visualizer** | Interactive Leyaa.ai-style execution tracer displaying real-time call stack, source code highlighting, and live variable watcher (`self.cleaned_data`, `self.errors`) across 7 validation phases. |
| 6 | **Simulation Playground** | Live form testing workbench with real-time field errors, form-wide non-field errors (`__all__`), and toggleable `forms.py` source code preview. |
| 7 | **Code Assessment** | In-browser Python IDE with sandbox automated test runner for student-submitted `clean_age()` and `clean()` logic. |
| 8 | **Analysis** | Comparative analysis matrix (Built-in vs Field-level vs Form-level validation) and execution order reference tables. |
| 9 | **Posttest & Certificate** | 5-question certification test with automated certificate issuance upon passing. |
| 10 | **References** | Authoritative citations to Django official documentation, Leyaa.ai, and MoE Virtual Labs. |
| 11 | **Feedback** | Direct 5-star feedback and qualitative survey submission stored in the database. |
| 12 | **Faculty Portal** | Real-time gradebook for Batch D3 with average score metrics and CSV export. |
| 13 | **Admin Portal** | System issue tracker with severity filters and user registry. |

---

## Dedicated Agentic Structure

To ensure modularity and zero cross-contamination, all features are orchestrated by dedicated agents defined in `AGENTS.md`:

1. **`Auth-Security-Agent`**: Custom user model, token/session authentication, and RBAC enforcement.
2. **`Curriculum-Agent`**: Pedagogical content, aims, overviews, recaps, quizzes, and reference citations.
3. **`Leyaa-Visualizer-Agent`**: 7-step execution trace engine modeling `form.is_valid()`.
4. **`Form-Sandbox-Agent`**: Live form submission workbench and error rendering.
5. **`Assessment-Runner-Agent`**: Python code sandbox, dynamic AST execution, and test assertion harness.
6. **`Evaluation-Agent`**: Automated grading, gradebook analytics, and completion certification.
7. **`KJSSE-UI-Agent`**: Replication of KJSSE Virtual Labs branding, layout, and responsive design.
8. **`Portal-Ops-Agent`**: Bug tracking, feedback pipeline, and administrative controls.

---

## Quick Start Guide

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 1. Backend Setup (Django REST Framework)
```bash
cd backend

# Apply database migrations
python manage.py migrate

# Seed database with initial users, experiment, and quiz data
python seed_db.py

# Launch development server
python manage.py runserver 127.0.0.1:8000
```
Backend API will be accessible at: `http://127.0.0.1:8000/`

### 2. Frontend Setup (React + Vite)
```bash
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
Frontend will be accessible at: `http://127.0.0.1:5173/`

---

## Default Credentials

| Persona | Email | Password | Role | Metadata |
|---|---|---|---|---|
| **Student** | `student@vlab.edu` | `Student@123` | `STUDENT` | Shlok Mehta, Batch D3, Roll: 16010124169 |
| **Faculty** | `faculty@vlab.edu` | `Faculty@123` | `FACULTY` | Prof. Sharma (Dept. of CSE) |
| **Admin** | `admin@vlab.edu` | `Admin@123` | `ADMIN` | System Administrator |

*(Note: You can switch between personas instantly using the dropdown in the top-right header!)*

---

## Automated Testing
Run the comprehensive backend integration test suite:
```bash
cd backend
python test_api.py
```
Expected output:
```text
18 passed, 0 failed. All backend services operational!
```
