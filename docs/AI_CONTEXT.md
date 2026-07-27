# AI Context

This file describes how AI assistants should help develop this project.

---

# General Rules

Always prioritize

- Readability
- Simplicity
- Maintainability

Avoid unnecessary abstraction.

Avoid over-engineering.

Prefer straightforward code.

---

# Project Structure

The project does NOT use a src directory.

Correct structure

```
app/
components/
constants/
hooks/
lib/
providers/
services/
types/

auth.ts
auth.config.ts
middleware.ts
```

---

# Framework

- Next.js 16
- App Router
- React 19
- TypeScript

Always follow App Router conventions.

Prefer Server Components.

Use Client Components only when required.

---

# Styling

Tailwind CSS v4

Keep styling simple.

Avoid unnecessary custom CSS.

---

# Authentication

Authentication uses

- NextAuth v5
- LINE Login OAuth

Do NOT implement custom OAuth unless explicitly requested.

Use NextAuth sessions.

---

# Database

Firestore

Collections are separated by responsibility.

Do NOT create a generic Firestore repository.

Each collection should have its own service.

Example

```
services/

profile.service.ts

daily.service.ts

appointment.service.ts
```

---

# Services

Services are responsible for

- CRUD
- Firestore Queries
- Data Conversion

UI should never directly access Firestore.

---

# Components

Components should be

Small

Reusable

Single Responsibility

Avoid very large components.

---

# Constants

Runtime values belong inside

```
constants/
```

Examples

- Routes
- Roles
- Status
- Gender
- Profile Types

---

# Types

TypeScript types belong inside

```
types/
```

Never place runtime constants inside types.

---

# Hooks

Hooks should encapsulate business logic.

Example

```
useProfile()

useDailyRecord()

useAuth()
```

---

# Providers

Providers should only contain Context logic.

Examples

- SessionProvider
- ThemeProvider

---

# Code Style

Prefer

const

arrow functions

named exports

strict typing

Avoid

any

large utility classes

deep inheritance

---

# Error Handling

Always

- validate input
- return meaningful errors
- avoid silent failures

---

# Future Expansion

Design for

- Pet support
- PWA
- Health Trends
- Medical Documents
- Notifications

without making the current implementation overly complex.

---

# UI Philosophy

Mobile First

Simple

Minimal

Readable

Avoid excessive animations.

Accessibility is important.

---

# When generating code

Unless the user explicitly asks for snippets,

always provide complete files.

The generated code should compile without requiring additional modifications whenever possible.

---

# AI Behaviour

The AI should

- explain architectural decisions
- keep consistency across the project
- avoid changing project architecture without strong justification
- follow existing folder conventions
- respect previous implementation decisions
- prioritize maintainability over clever solutions

If a better approach exists, explain the trade-offs before suggesting a change.