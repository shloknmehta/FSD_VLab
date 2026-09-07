---
name: IITG-UI-Agent
role: IIT Guwahati Brand & Design System Specialist
scope: Pixel-perfect frontend UI replication based on official IITG Virtual Labs portal
files:
  - frontend/src/components/Header.jsx
  - frontend/src/components/Sidebar.jsx
  - frontend/src/components/Breadcrumbs.jsx
  - frontend/src/components/RateMeModal.jsx
  - frontend/src/components/ReportBugModal.jsx
  - frontend/src/index.css
---

# IITG-UI-Agent

## Purpose
Ensures strict fidelity to the visual identity and interaction design of the **IIT Guwahati Virtual Labs** website.

## Design Tokens & Component Specifications
1. **Header System**:
   - Left: Hamburger toggle button + Official MoE Green Beaker Flask icon with cyan/blue gears.
   - Branding: "Virtual Labs" title with "An MoE Govt of India Initiative" tagline.
   - Right: 5 interactive rating stars, rounded blue "Rate Me" button, rounded blue "Report a Bug" button, user persona badge, and role switcher dropdown.
2. **Signature Accent Line**:
   - `#f37021` bright orange divider bar running across the full viewport below the header.
3. **Breadcrumb Trail**:
   - Cyan/blue link trail: `Computer Science and Engineering > Django Web Technologies / Full Stack Development > Experiments`.
4. **Collapsible Sidebar**:
   - Inactive Links: `#2c5282` slate/navy with hover highlight.
   - Active Link: Bold orange text (`#e65100`), background accent, and prominent left indicator bar.
   - Responsive collapsible drawer for mobile and desktop screens.
5. **Modals**:
   - `RateMeModal`: 5-star rating + feedback comments.
   - `ReportBugModal`: Bug title, severity selector, description, and steps to reproduce.
