# Coding Conventions

This document defines the coding standards used throughout the project.

---

# General Principles

Always prioritize

- Readability
- Consistency
- Simplicity
- Maintainability

Do not optimize prematurely.

Avoid unnecessary abstraction.

---

# Framework

- Next.js 16
- React 19
- App Router
- TypeScript

---

# Project Structure

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

No src directory.

---

# Naming Convention

## Files

Components

```
DailyCard.tsx
```

Hooks

```
useProfile.ts
```

Services

```
profile.service.ts
```

Types

```
profile.ts
```

Constants

```
profile.ts
roles.ts
routes.ts
```

---

# Variables

Use camelCase

```
dailyRecord

bloodPressure

currentUser
```

---

# Constants

UPPER_CASE

```ts
export const USER_ROLE = {
  OWNER: "owner",
  MEMBER: "member",
};
```

---

# Components

Use PascalCase

```
DashboardPage

DailyCard

ProfileDialog
```

---

# Hooks

Always begin with

```
use
```

Example

```
useAuth

useProfile

useDailyRecord
```

---

# Folder Responsibility

components

Only UI

No Firestore logic

---

hooks

Reusable business logic

---

services

Firestore CRUD

No UI

---

types

Interfaces

Type aliases

Enums

---

constants

Runtime constants

---

providers

React Context

---

lib

Utilities

Firebase

Helpers

---

# React

Prefer

Server Components

Use Client Components only when required.

Avoid unnecessary useEffect.

Prefer async Server Components when possible.

---

# State Management

Current

React Context

React Hooks

Future

TanStack Query may be added.

Redux is intentionally avoided.

---

# Firestore

Each collection owns one service.

Never access Firestore directly from Components.

Correct

```
Component

↓

Hook

↓

Service

↓

Firestore
```

Wrong

```
Component

↓

Firestore
```

---

# TypeScript

Strict mode

Avoid

```
any
```

Prefer

```
unknown
```

or proper interfaces.

Always type

Props

Responses

Firestore Models

---

# Styling

Tailwind CSS v4

Prefer utility classes.

Avoid inline styles.

Keep spacing consistent.

Mobile First.

---

# Error Handling

Validate

↓

Service

↓

Throw meaningful Error

↓

UI displays user-friendly message

Never silently ignore errors.

---

# Imports

Order

1. React / Next
2. External packages
3. Absolute imports (@/)
4. Relative imports

Example

```ts
import Link from "next/link";

import { auth } from "@/auth";

import "./style.css";
```

---

# Functions

Prefer

Arrow Functions

Example

```ts
export const createProfile = async () => {}
```

Avoid unnecessary classes.

---

# Comments

Explain

WHY

not

WHAT

Bad

```ts
// increase counter
counter++;
```

Good

```ts
// Daily records are immutable, create a new document instead of updating historical data.
```

---

# Git Convention

Branch

```
feature/login

feature/profile

fix/dashboard

refactor/service
```

Commit

```
feat:

fix:

refactor:

style:

docs:

test:
```

---

# AI Guidelines

When generating code

- Preserve the existing architecture.
- Do not introduce new patterns without justification.
- Keep files focused on a single responsibility.
- Prefer extending existing services over creating duplicates.
- Generate complete files unless the user explicitly requests only a snippet.
- Explain trade-offs before suggesting architectural changes.

---

# Future-Proofing

The codebase should remain compatible with future support for

- Pets
- PWA
- Offline mode
- LINE notifications
- Health analytics
- Additional health metrics

without requiring major structural changes.