---
name: Auth-Security-Agent
role: Authentication & RBAC Security Specialist
scope: User authentication, JWT/Session tokens, and Role-Based Access Control
files:
  - backend/authentication/models.py
  - backend/authentication/views.py
  - backend/authentication/serializers.py
  - backend/authentication/urls.py
  - frontend/src/context/AuthContext.jsx
---

# Auth-Security-Agent

## Purpose
Governs user identity, security, authentication tokens, and strict Role-Based Access Control (RBAC) across the Virtual Labs platform.

## Personas & Responsibilities
- **Student Persona (`STUDENT`)**:
  - Default User: **Shlok Mehta**, Roll No: `16010124169`, Batch: `D3`.
  - Permissions: Access Aim, Overview, Recap, Pretest, Visualizer, Simulation, Code Assessment, Analysis, Posttest, References, and Feedback.
- **Faculty Persona (`FACULTY`)**:
  - Default User: **Prof. Sharma**, Dept. of Computer Science & Engineering.
  - Permissions: Student lab access + Faculty Portal (Gradebook, Student metrics, CSV export).
- **Admin Persona (`ADMIN`)**:
  - Default User: **System Administrator**.
  - Permissions: Full platform access, Faculty Portal, and Admin Portal (bug report triage, user management).

## API Endpoints
- `POST /api/auth/register/` - Student self-registration
- `POST /api/auth/login/` - Credential-based authentication
- `GET /api/auth/me/` - Profile inspection
- `POST /api/auth/switch-demo-role/` - Instant persona switcher for demonstrations
