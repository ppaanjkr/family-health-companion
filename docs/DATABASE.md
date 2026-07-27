# Database Design

## Database

Firebase Firestore

The database is designed to be simple for the MVP while remaining extensible for future features.

The primary owner of all health information is a Health Profile rather than a User.

This allows the system to support multiple people (and pets in the future) under a single account.

---

# Collection Overview

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

---

# Collection Relationships

```
users
    │
    ▼
health_profiles
    │
    ├──────────────┐
    ▼              ▼
daily_records   appointments
    │              │
    ▼              ▼
medications   health_checks
                    │
                    ▼
          health_check_items
                    │
                    ▼
               documents
```

---

# users

Represents an authenticated account.

Document ID

```
auto-id
```

Example

```json
{
  "lineUserId": "Uxxxxxxxx",
  "displayName": "John",
  "pictureUrl": "...",
  "role": "owner",
  "status": "active",
  "createdAt": "...",
  "updatedAt": "..."
}
```

Fields

| Field | Type |
|---------|------|
| lineUserId | string |
| displayName | string |
| pictureUrl | string |
| role | owner/member |
| status | pending/active/rejected |
| createdAt | timestamp |
| updatedAt | timestamp |

---

# health_profiles

Represents a family member.

One User can own multiple Health Profiles.

Example

```json
{
  "ownerId": "...",
  "type": "human",
  "firstName": "John",
  "lastName": "Doe",
  "gender": "male",
  "birthday": "...",
  "photoUrl": "...",
  "displayOrder": 1,
  "createdAt": "...",
  "updatedAt": "..."
}
```

Fields

| Field | Type |
|---------|------|
| ownerId | string |
| type | human/pet |
| firstName | string |
| lastName | string |
| gender | male/female |
| birthday | timestamp |
| photoUrl | string |
| displayOrder | number |

---

# daily_records

One document represents one profile on one day.

Example

```json
{
  "profileId": "...",
  "recordDate": "2026-08-01",
  "bloodPressureHigh": 120,
  "bloodPressureLow": 80,
  "heartRate": 72,
  "temperature": 36.6,
  "weight": 65,
  "bloodSugar": 110,
  "oxygen": 98,
  "note": ""
}
```

Fields

| Field | Type |
|---------|------|
| profileId | string |
| recordDate | string |
| bloodPressureHigh | number |
| bloodPressureLow | number |
| heartRate | number |
| temperature | number |
| weight | number |
| bloodSugar | number |
| oxygen | number |
| note | string |

---

# medications

Stores medication schedules.

Fields

- profileId
- medicineName
- dosage
- frequency
- startDate
- endDate
- note

---

# appointments

Stores appointments.

Fields

- profileId
- hospital
- doctor
- appointmentDate
- note

---

# health_checks

Represents one health check visit.

Fields

- profileId
- hospital
- checkDate
- note

---

# health_check_items

Stores laboratory values.

Each document represents one measurement.

Example

```json
{
  "healthCheckId": "...",
  "code": "HbA1c",
  "value": 5.8,
  "unit": "%",
  "referenceMin": 4.0,
  "referenceMax": 6.0
}
```

This design allows new laboratory items without database changes.

---

# vaccinations

Stores vaccination history.

Fields

- profileId
- vaccineName
- vaccinationDate
- hospital
- note

---

# documents

Stores uploaded medical documents.

Files are stored in Firebase Storage.

Firestore stores only metadata.

Example

```json
{
    "profileId":"...",
    "category":"health-check",
    "fileName":"blood-test.pdf",
    "storagePath":"...",
    "downloadUrl":"..."
}
```

---

# Common Fields

Most collections should contain

```
createdAt

updatedAt
```

Soft delete may be introduced later

```
deletedAt
```

---

# Index Strategy

Likely composite indexes

daily_records

```
profileId ASC
recordDate DESC
```

appointments

```
profileId ASC
appointmentDate ASC
```

health_checks

```
profileId ASC
checkDate DESC
```

---

# Security Rules (Future)

User

↓

Owns

↓

Health Profiles

↓

Owns

↓

All related documents

Users cannot access another family's data.

---

# Design Principles

- One profile owns all health information
- One service per collection
- Avoid deeply nested documents
- Prefer references instead of embedding
- Optimize for query simplicity