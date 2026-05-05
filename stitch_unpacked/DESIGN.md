---
name: Motis LeadFlow Design System
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45464d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#fcf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
  accent-orange: '#F97316'
  accent-yellow: '#FACC15'
  background-main: '#F8FAFC'
  surface-white: '#FFFFFF'
  status-new: '#3B82F6'
  status-contacted: '#8B5CF6'
  status-progress: '#F59E0B'
  status-success: '#16A34A'
  status-error: '#DC2626'
typography:
  h1:
    fontFamily: Work Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  h2:
    fontFamily: Work Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  h3:
    fontFamily: Work Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  button:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: '1'
  label:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

# Motis LeadFlow -- UI Design Specification (Version 2)

## Product Overview

Motis LeadFlow is a responsive web-based lead capture and sales
management interface designed for Motis Industries Limited, a Nigerian
paint and chemical manufacturing company producing the More Paint brand.

This document defines the frontend user interface design standards,
layout rules, navigation behavior, typography, and interaction
expectations for building a clean, professional, business-focused web
application.

This is a frontend MVP only. Backend functionality, payments, and
complex enterprise features are intentionally excluded.

------------------------------------------------------------------------

## Platform Definition

Platform: Web Application\
Layout: Responsive\
Primary Device: Desktop first, mobile responsive

The interface must function properly on:

-   Desktop computers
-   Tablets
-   Mobile phones

------------------------------------------------------------------------

## Core Screens

The UI must include the following screens:

1.  Landing Page\
2.  Lead Capture Form\
3.  Admin Dashboard\
4.  Lead Management Table\
5.  Lead Detail Modal / Page

------------------------------------------------------------------------

## Design Principles

-   Clean and professional
-   Business-focused
-   Fast and simple workflow
-   Mobile responsive
-   Minimal but modern animation
-   Clear visual hierarchy
-   Easy for non-technical staff to use

Avoid:

-   Overly flashy UI
-   Excessive colors
-   Complex enterprise layouts
-   Gaming-style interfaces
-   Visual clutter

------------------------------------------------------------------------

## Color System

Primary Color: Deep Navy / Charcoal

Accent Color: Orange or Golden Yellow

Background: White or Light Gray

Status Colors:

New: Blue or Orange

Contacted: Purple

In Progress: Amber / Yellow

Closed Won: Green

Closed Lost: Red

Example Palette:

Primary Dark: #0F172A

Secondary Dark: #1E293B

Accent Orange: #F97316

Accent Yellow: #FACC15

Background: #F8FAFC

Success: #16A34A

Warning: #F59E0B

Error: #DC2626

------------------------------------------------------------------------

## Navigation Layout

Navigation Style:

-   Top navigation bar
-   Company logo on the left
-   Navigation links on the right
-   Sticky navigation bar on scroll
-   Clear active page indicator
-   Admin dashboard accessible via navigation menu

Mobile Navigation:

-   Hamburger menu
-   Vertical navigation layout
-   Large tap targets
-   Smooth open/close animation

------------------------------------------------------------------------

## Typography

Primary Font Options:

-   Inter
-   Poppins
-   Roboto

Fallback:

-   Arial
-   sans-serif

Typography Rules:

-   Headings must be bold and readable
-   Body text must be clear and comfortable
-   Buttons should use medium font weight
-   Maintain strong readability on mobile devices
-   Maintain consistent spacing between text elements

------------------------------------------------------------------------

## Interaction Requirements

Include subtle UI interactions:

-   Button hover effects
-   Card hover lift animation
-   Smooth section transitions
-   Form submission loading state
-   Success confirmation animation
-   Modal open/close transition
-   Table row hover highlight

Animations must be minimal and professional.

------------------------------------------------------------------------

## Landing Page Requirements

Purpose:

Introduce More Paint and encourage customers to request a quote.

Sections:

Hero Section: - Business headline - Short description - Primary
call-to-action button

Product Categories:

-   Interior Paint
-   Exterior Paint
-   Industrial Coatings
-   Bulk Orders

Why Choose More Paint:

-   Durable finish
-   Strong coverage
-   Locally manufactured
-   Suitable for Nigerian conditions
-   Fast response time

------------------------------------------------------------------------

## Lead Capture Form

Required Fields:

-   Full Name
-   Phone Number
-   Product Type
-   Location
-   Message

Optional Fields:

-   Email
-   Quantity / Project Size

Form Behavior:

-   Inline validation
-   Required field indicators
-   Loading state on submit
-   Success confirmation message

Success Message:

Thank you. Your inquiry has been received. A Motis sales representative
will contact you shortly.

------------------------------------------------------------------------

## Admin Dashboard

Summary Cards:

-   Total Leads
-   New Leads
-   Contacted Leads
-   In Progress Leads
-   Closed Deals

Each card should display:

-   Number
-   Label
-   Icon
-   Subtle color accent

------------------------------------------------------------------------

## Lead Management Table

Columns:

-   Customer Name
-   Phone Number
-   Product Interest
-   Location
-   Status
-   Date Submitted
-   Action Button

Features:

-   Search bar
-   Status filter
-   Sort by date
-   Status badges
-   Click row to open details
-   Responsive layout

------------------------------------------------------------------------

## Lead Detail View

Display:

-   Customer information
-   Product interest
-   Location
-   Message
-   Date submitted
-   Current status

Actions:

-   Status dropdown
-   Save/update button
-   Notes field

------------------------------------------------------------------------

## Responsiveness Rules

Mobile Behavior:

-   Stack layout vertically
-   Use full-width inputs
-   Convert tables to scrollable view
-   Maintain readable font sizes
-   Maintain usable button sizes

------------------------------------------------------------------------

## Accessibility Requirements

-   Clear input labels
-   Good color contrast
-   Keyboard-friendly inputs
-   Readable font sizes
-   Visible focus states

------------------------------------------------------------------------

## Frontend MVP Constraints

Do not include:

-   Payment processing
-   Authentication systems
-   Complex analytics dashboards
-   Multi-tenant SaaS systems
-   Enterprise CRM features

Use:

-   Mock data
-   Local state
-   Simple UI interactions

------------------------------------------------------------------------

## Final Goal

Generate a polished responsive frontend UI for Motis LeadFlow that looks
like a realistic business system used by a Nigerian manufacturing
company to capture and manage customer leads.
