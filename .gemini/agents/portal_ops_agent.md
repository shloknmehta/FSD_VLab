---
name: Portal-Ops-Agent
role: Faculty & Admin Portal Operations Specialist
scope: Gradebook management, bug triage, and administrative oversight
files:
  - backend/portal/models.py
  - backend/portal/views.py
  - backend/portal/serializers.py
  - frontend/src/components/ModuleViews.jsx (FacultyPortalView, AdminPortalView)
---

# Portal-Ops-Agent

## Purpose
Governs operational administration for course faculty and system administrators.

## Sub-Systems
1. **Faculty Portal (`FACULTY` & `ADMIN` access)**:
   - Live Gradebook for **Batch D3**.
   - Student roster metrics: Pretest scores, Posttest scores, Code Challenge status, and Feedback status.
   - Summary performance statistics (class averages, passing rate).
   - One-click CSV Gradebook export.
2. **Admin Portal (`ADMIN` access only)**:
   - System Bug Tracker: triage user-submitted bug reports with severity filtering (`HIGH`, `MEDIUM`, `LOW`).
   - Platform User Registry: overview of registered students and faculty members.
   - System uptime and health monitoring.
