# UI Guidelines

## Design Philosophy

The application should feel

- Clean
- Friendly
- Calm
- Easy to understand

It is designed for everyday family use.

Many users may be elderly.

The interface should reduce cognitive load.

---

# Design Principles

Mobile First

Simple

Readable

Minimal

Accessible

---

# Theme

Modern healthcare

Avoid overly clinical appearance.

Prefer

- White
- Light Gray
- Soft Green
- Soft Blue

Avoid excessive colors.

---

# Typography

Clear hierarchy.

Use

Heading

↓

Section

↓

Body

↓

Caption

Avoid tiny text.

---

# Spacing

Prefer generous spacing.

Avoid crowded layouts.

Use consistent spacing throughout the application.

---

# Components

Cards

Rounded corners

Soft shadows

Simple icons

Large touch targets

Buttons should be easy to press.

---

# Navigation

Bottom Navigation

Dashboard

Daily

Family

Profile

No complex menus.

---

# Forms

One task at a time.

Avoid long forms.

Group related fields.

Use sensible defaults.

Large input controls.

---

# Health Cards

Each family member is represented by one card.

Card displays

- Avatar
- Name
- Age
- Latest health summary

Tap card

↓

Open detail

---

# Daily Record

One screen

↓

One date

↓

Multiple family cards

↓

Tap

↓

Edit

↓

Save

Fast and simple.

---

# Dashboard

Should immediately answer

How is everyone today?

Widgets

- Today's summary
- Recent health records
- Upcoming appointments
- Quick actions

---

# Trend Charts

Simple line charts.

Avoid excessive controls.

Allow

7 Days

30 Days

90 Days

1 Year

---

# Loading States

Always display loading indicators.

Never leave blank screens.

---

# Empty States

Explain

What the page is

Why it is empty

How to start

Example

"No health records yet."

Button

"Add First Record"

---

# Error States

Friendly language.

Never expose technical errors.

Bad

```
Firestore permission denied
```

Good

```
Unable to load your records.

Please try again.
```

---

# Confirmation

Use confirmations only for destructive actions.

Examples

Delete

Remove Family Member

Cancel Appointment

---

# Accessibility

Minimum touch target

44px

Readable font size

High contrast

Keyboard accessible

Screen reader friendly

---

# Responsive Design

Primary target

Mobile

Secondary

Tablet

Desktop

Desktop should use centered content with maximum width.

Avoid stretching content across very wide screens.

---

# Icons

Use one icon library consistently.

Recommended

Lucide React

Avoid mixing icon sets.

---

# Animations

Subtle only.

Examples

Fade

Slide

Scale

Avoid excessive animations.

---

# Dark Mode

Future feature.

Design components with dark mode compatibility.

---

# AI Guidelines

When generating UI

Always

- Keep layouts simple.
- Use reusable components.
- Prefer cards over tables.
- Keep forms short.
- Design mobile-first.
- Use Tailwind CSS utilities.
- Reuse existing design patterns.

Do not introduce radically different UI styles between pages.

Maintain consistency across the entire application.