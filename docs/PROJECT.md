# Family Health Companion

## Overview

Family Health Companion is a mobile-first web application for recording and managing family health information.

The application allows a family to store daily health records, appointments, medications, health check results, and medical documents in one place.

This project is designed to be simple enough for home use while remaining extensible for future healthcare features.

---

# Goals

- Record daily health information
- Manage multiple family members
- Track health trends
- Store health check results
- Manage appointments
- Store medical documents
- Receive LINE notifications (future)
- Installable as a PWA (future)

---

# Target Users

- Parents
- Children
- Elderly family members
- Caregivers

One LINE account represents one user.

A family consists of multiple health profiles.

---

# Technology Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4

## Backend

- Next.js Route Handlers

## Database

- Firebase Firestore

## Authentication

- NextAuth v5 (Auth.js)
- LINE Login OAuth

## Hosting

- Vercel

---

# Architecture

Client

↓

Next.js

↓

NextAuth

↓

Firestore

↓

Firebase Storage (future)

---

# Authentication Flow

User

↓

Login with LINE

↓

NextAuth

↓

LINE OAuth

↓

Session

↓

Firestore User

↓

Dashboard

---

# Main Navigation

- Dashboard
- Daily
- Family
- Profile

---

# Features

## Dashboard

- Health summary
- Upcoming appointments
- Notifications
- Quick actions

## Daily

Daily health recording

Supported values

- Blood Pressure
- Heart Rate
- Temperature
- Weight
- Blood Sugar
- Oxygen Saturation
- Notes

---

## Family

Manage family members

- Add
- Edit
- Delete

Future support

- Human
- Pet

---

## Profile

Current user information

- Avatar
- Name
- LINE Account
- Logout

---

## Health Trend

Historical graphs

Examples

- Weight
- Blood Pressure
- Blood Sugar
- Heart Rate

---

# Firestore Collections

users

health_profiles

daily_records

medications

appointments

health_checks

health_check_items

vaccinations

documents

---

# Folder Structure

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

# Development Phases

## Phase 1

- Authentication
- Dashboard
- Family
- Daily Records

## Phase 2

- Health Trends
- Medication
- Appointment

## Phase 3

- Health Check
- Documents
- Vaccination
- Notifications
- PWA

---

# Design Principles

- Mobile First
- Simple UI
- Easy for elderly users
- Clean Architecture
- Feature-based development
- Easy to extend