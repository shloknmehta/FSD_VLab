# FSD_VLab: Modular Agent Architecture & Feature Mapping

This document outlines the specialized agents responsible for each core feature of the **IIT Guwahati Virtual Labs: Custom Form Validation using clean()** platform.

## 1. Feature-Agent Mapping Matrix

| Feature / Subsystem | Agent Name | Core Responsibilities | File Ownership |
|---------------------|------------|-----------------------|----------------|
| **1. RBAC & Authentication** | Auth-Security-Agent | User personas (Student, Faculty, Admin), JWT/Token security, session context, demo persona fast-switcher. | ackend/authentication/, rontend/src/context/AuthContext.jsx |
| **2. Experiment Knowledge Base** | Curriculum-Agent | Aim, Overview, Recap, Analysis execution tables, and accredited references. | ackend/experiments/, rontend/src/components/AimSection.jsx, rontend/src/components/ModuleViews.jsx |
| **3. Step-by-Step Visualizer** | Leyaa-Visualizer-Agent | 7-stage internal lifecycle animation, code line tracer, variable inspector (self.cleaned_data, self.errors), call stack monitor. | ackend/simulator/engine.py, rontend/src/components/ModuleViews.jsx (VisualizerView) |
| **4. Live Validation Simulator** | Form-Sandbox-Agent | Real-time Django form input sandbox, field error rendering (errorlist), non-field error banner (__all__), raw POST inspector. | ackend/simulator/views.py, rontend/src/components/ModuleViews.jsx (SimulationView) |
| **5. Coding Challenge Runner** | Assessment-Runner-Agent | In-browser Python editor, automated unit test evaluation, edge case execution for clean_age() and clean(). | ackend/simulator/engine.py, rontend/src/components/ModuleViews.jsx (CodeAssessmentView) |
| **6. Quizzes & Certification** | Evaluation-Agent | Pretest & Posttest MCQ runners, automated scoring, instant answer explanations, student completion certificate. | ackend/experiments/views.py, rontend/src/components/ModuleViews.jsx (PretestView, PosttestView) |
| **7. IITG UI Brand & Chrome** | IITG-UI-Agent | Official MoE beaker badge, dual-tone typography, 5-star rating widget, Rate Me modal, Report Bug modal, orange divider, collapsible sidebar. | rontend/src/components/Header.jsx, rontend/src/components/Breadcrumbs.jsx, rontend/src/components/Sidebar.jsx |
| **8. Faculty & Admin Portals** | Portal-Ops-Agent | Batch D3 Gradebook, student submission tracking, CSV export, ticket/bug tracker, system health monitor. | ackend/portal/, rontend/src/components/ModuleViews.jsx (FacultyPortalView, AdminPortalView) |

## 2. Principle of Clean Isolation
All project code, models, serializers, tests, components, and assets are kept strictly within FSD_VLab/ (project root). No temporary project files are written to .gemini or external folders.
