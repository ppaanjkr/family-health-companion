# API Design Guidelines

## Overview

This project uses Next.js App Router Route Handlers.

There is no separate backend server.

All backend APIs are implemented inside:

```
app/api/
```

The UI communicates only with Route Handlers.

Firestore should never be accessed directly from React components.

---

# Architecture

```
React Component

↓

Hook

↓

Service

↓

Route Handler (if required)

↓

Firestore
```

---

# API Principles

- REST-style APIs
- JSON request/response
- TypeScript everywhere
- Predictable response format
- Proper HTTP status codes
- Validation before database operations

---

# Response Format

Every API should return a consistent response.

Success

```json
{
  "success": true,
  "data": {}
}
```

Error

```json
{
  "success": false,
  "message": "Something went wrong."
}
```

Validation Error

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": {}
}
```

---

# HTTP Status Codes

200

Success

201

Created

204

No Content

400

Bad Request

401

Unauthorized

403

Forbidden

404

Not Found

409

Conflict

422

Validation Error

500

Internal Server Error

---

# Authentication

Authentication uses

NextAuth Session

Protected APIs should verify

```
auth()
```

before accessing Firestore.

---

# Route Naming

Collections

```
/api/profile

/api/daily

/api/appointment
```

Resource

```
/api/profile/[id]
```

Avoid verbs in URL.

Bad

```
/api/createProfile
```

Good

```
POST /api/profile
```

---

# CRUD Convention

Create

POST

```
/api/profile
```

Read List

GET

```
/api/profile
```

Read One

GET

```
/api/profile/{id}
```

Update

PATCH

```
/api/profile/{id}
```

Delete

DELETE

```
/api/profile/{id}
```

---

# Pagination

Future

Cursor-based pagination.

Avoid page number pagination for Firestore.

---

# Validation

Validate

↓

Request Body

↓

Business Rules

↓

Firestore

Never trust client input.

---

# Date Format

Store

Firestore Timestamp

Expose

ISO8601

Example

```
2026-07-25T10:15:00Z
```

---

# Error Handling

Services throw errors.

Route Handlers convert them into API responses.

Avoid exposing internal errors.

Bad

```
Firebase permission denied
```

Good

```
Unable to save record.
```

---

# Logging

Development

console.error()

Production

Future support for structured logging.

---

# File Upload

Medical files

↓

Firebase Storage

↓

Store metadata in

documents

collection.

Never store large Base64 strings inside Firestore.

---

# Future APIs

Future modules

- Medication
- Appointment
- Vaccination
- Documents
- Health Check
- Analytics
- Notifications

should follow the same API conventions.

---

# AI Guidelines

When generating APIs

- Follow REST conventions.
- Reuse existing services.
- Return consistent JSON.
- Validate inputs.
- Keep Route Handlers thin.
- Put business logic inside services.