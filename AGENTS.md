# FSD_VLab: Modular Agent Architecture & Feature Mapping

This document outlines the specialized agents responsible for each core feature of the **KJSSE (K. J. Somaiya School of Engineering) Virtual Labs: Custom Form Validation using clean()** platform.

## 1. Feature-Agent Mapping Matrix

| Feature / Subsystem | Agent Name | Core Responsibilities | File Ownership |
|---------------------|------------|-----------------------|----------------|
| **1. RBAC & Authentication** | Auth-Security-Agent | User personas (Student, Faculty, Admin), JWT/Token security, session context, demo persona fast-switcher. | backend/authentication/, frontend/src/context/AuthContext.jsx |
| **2. Experiment Knowledge Base** | Curriculum-Agent | Aim, Overview, Recap, Analysis execution tables, and accredited references. | backend/experiments/, frontend/src/components/AimSection.jsx, frontend/src/components/ModuleViews.jsx |
| **3. Step-by-Step Visualizer** | Leyaa-Visualizer-Agent | 7-stage internal lifecycle animation, code line tracer, variable inspector (self.cleaned_data, self.errors), call stack monitor. | backend/simulator/engine.py, frontend/src/components/ModuleViews.jsx (VisualizerView) |
| **4. Live Validation Simulator** | Form-Sandbox-Agent | Real-time Django form input sandbox, field error rendering (errorlist), non-field error banner (__all__), raw POST inspector. | backend/simulator/views.py, frontend/src/components/ModuleViews.jsx (SimulationView) |
| **5. Coding Challenge Runner** | Assessment-Runner-Agent | In-browser Python editor, automated unit test evaluation, edge case execution for clean_age() and clean(). | backend/simulator/engine.py, frontend/src/components/ModuleViews.jsx (CodeAssessmentView) |
| **6. Quizzes & Certification** | Evaluation-Agent | Pretest & Posttest MCQ runners, automated scoring, instant answer explanations, student completion certificate. | backend/experiments/views.py, frontend/src/components/ModuleViews.jsx (PretestView, PosttestView) |
| **7. KJSSE UI Brand & Chrome** | KJSSE-UI-Agent | Beaker badge, dual-tone typography, 5-star rating widget, Rate Me modal, Report Bug modal, orange divider, collapsible sidebar. | frontend/src/components/Header.jsx, frontend/src/components/Breadcrumbs.jsx, frontend/src/components/Sidebar.jsx |
| **8. Faculty & Admin Portals** | Portal-Ops-Agent | Batch D3 Gradebook, student submission tracking, CSV export, ticket/bug tracker, system health monitor. | backend/portal/, frontend/src/components/ModuleViews.jsx (FacultyPortalView, AdminPortalView) |

## 2. Principle of Clean Isolation
All project code, models, serializers, tests, components, and assets are kept strictly within FSD_VLab/ (project root). No temporary project files are written to .gemini or external folders.
