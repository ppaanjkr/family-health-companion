# Architecture

## Project Name

Family Health Companion

---

# System Overview

Family Health Companion is a mobile-first health management platform designed for families.

The system allows one family to maintain health records for multiple family members in a single application.

The application is intentionally simple for everyday use while remaining extensible for future healthcare features.

---

# High Level Architecture

```
                Browser

                    │

                    ▼

            Next.js 16 (App Router)

                    │

      ┌─────────────┴─────────────┐

      ▼                           ▼

 Route Handlers             React Components

      │                           │

      └─────────────┬─────────────┘

                    ▼

              Service Layer

                    ▼

             Firebase Firestore

                    ▼

            Firebase Storage
            (Future Phase)
```

---

# Authentication Architecture

Authentication is handled by NextAuth v5.

OAuth Provider

- LINE Login

Authentication Flow

```
User

↓

Login with LINE

↓

LINE OAuth

↓

NextAuth

↓

Session

↓

Firestore User

↓

Dashboard
```

The project does NOT implement custom OAuth logic unless explicitly required.

Authentication APIs are provided by

```
app/api/auth/[...nextauth]
```

---

# Authorization

Current roles

Owner

Member

Future

Admin

Permission model

Owner

- Manage family
- Manage members
- Approve users
- Full access

Member

- View allowed profiles
- Record health information

Pending

- Cannot access application

Rejected

- Cannot access application

---

# Folder Architecture

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

# Folder Responsibilities

## app

Pages

Layouts

API Route Handlers

Server Components

---

## components

Reusable UI components only.

Business logic should not exist here.

---

## hooks

Contains reusable React hooks.

Examples

- useAuth
- useProfile
- useDailyRecord

---

## providers

React Context providers.

Examples

- SessionProvider
- ThemeProvider

---

## constants

Runtime constants.

Examples

- Routes
- Roles
- Status
- Profile Types

---

## types

TypeScript models only.

Contains

- Interfaces
- Types
- Enums represented through TypeScript types

Should never contain runtime values.

---

## services

Business logic layer.

Every Firestore collection owns one service.

Example

```
profile.service.ts

daily.service.ts

appointment.service.ts
```

No Generic Repository Pattern.

---

## lib

Framework helpers.

Examples

Firebase

Date

Formatter

Utilities

---

# Firestore Architecture

Collections

```
users

health_profiles

daily_records

medications

appointments

health_checks

health_check_items

vaccinations

documents
```

Each collection has its own service.

Services never call each other directly unless necessary.

---

# Collection Relationships

```
users

    │

    └──────────────┐

                   │

                   ▼

          health_profiles

                   │

    ┌──────────────┼──────────────┐

    ▼              ▼              ▼

daily_records  appointments  medications

                   │

                   ▼

            health_checks

                   │

                   ▼

         health_check_items

                   │

                   ▼

             documents
```

---

# Health Profile Concept

The application stores all family members inside

```
health_profiles
```

Future support

Human

Pet

Current structure

```
type

human

pet
```

All future collections reference

```
profileId
```

instead of userId.

This keeps the system extensible.

---

# Service Layer

UI

↓

Hook

↓

Service

↓

Firestore

The UI never directly communicates with Firestore.

Example

```
Dashboard

↓

useProfile()

↓

profile.service.ts

↓

Firestore
```

---

# State Management

Current

React Hooks

Context

Future

React Query may be introduced if server synchronization becomes complex.

Redux is intentionally avoided.

---

# Data Ownership

Authentication User

↓

users

↓

health_profiles

↓

daily_records

The authenticated account owns multiple profiles.

Profiles own health records.

---

# Navigation

Bottom Navigation

```
Dashboard

Daily

Family

Profile
```

No Settings page.

---

# Feature Modules

Dashboard

Daily

Family

Profile

Health Trend

Medication

Appointment

Health Check

Vaccination

Documents

---

# Daily Record Flow

Select Date

↓

Display all family members

↓

Tap member card

↓

Edit health values

↓

Save

↓

Firestore

---

# Health Check Flow

Create health check

↓

Add laboratory values

↓

Save

↓

Generate Trend

Health check values should be stored as structured data.

Do NOT store only images.

---

# File Storage

Medical images

↓

Firebase Storage

↓

documents collection

↓

Reference URL

---

# Error Handling

Always

Validate Input

↓

Service Validation

↓

Firestore

↓

Meaningful Error Message

Never silently ignore failures.

---

# Naming Convention

Collections

snake_case

Example

```
daily_records
```

Fields

camelCase

Example

```
bloodPressureHigh
```

Components

PascalCase

Example

```
DailyCard.tsx
```

Hooks

camelCase

```
useProfile
```

Services

```
profile.service.ts
```

Constants

UPPER_CASE object values

```
PROFILE_TYPE

USER_ROLE
```

---

# Development Principles

- Mobile First

- Clean Architecture

- Keep Components Small

- Keep Services Independent

- Prefer Composition

- Avoid Over Engineering

- Feature Driven Development

- Readability over Cleverness

---

# Future Roadmap

Phase 1

Authentication

Dashboard

Family

Daily Records

Phase 2

Health Trend

Medication

Appointment

Phase 3

Health Check

Vaccination

Documents

LINE Notifications

PWA

Offline Support

---

# Important Design Decisions

- No Generic Firestore Repository
- One Firestore Service per Collection
- App Router only
- NextAuth v5 for Authentication
- LINE Login as OAuth Provider
- Firestore as Primary Database
- Mobile-first UI
- Future support for pets without changing database design
- Keep MVP simple while allowing future expansion