---
name: clean-human-code
description: Enforces clean, idiomatic, human-written code standards across backend and frontend, strictly prohibiting redundant commentary and bloated boilerplate.
---

# Clean Human Code Standard

## 1. Core Principles
- **Clarity Over Commentary**: Code must be self-describing through meaningful variable, function, and class names.
- **Zero AI Boilerplate**: Never insert obvious comments like `# import statements`, `# define function`, `# return value`, or excessive decorative dividers.
- **Concise Docstrings**: Use concise docstrings only where technical contracts or non-obvious domain logic require explanation.
- **No Dead Code**: Remove commented-out code blocks, unused imports, and empty pass statements.
- **Preserve Existing Architecture**: Respect project-wide patterns and existing frontend interfaces without unsolicited refactoring.

## 2. Python & Django Rules
- Follow standard PEP 8 naming conventions.
- Use idiomatic Django ORM and Django REST Framework serializers and views.
- Keep view functions and classes focused on request validation, business logic delegation, and clean HTTP responses.

## 3. Frontend Integration Rules
- Maintain exact payload contracts expected by frontend components.
- Do not modify existing UI designs or state handlers unless directly required for API integration.
