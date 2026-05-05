# Product Requirements Document (PRD)

## Product Name

Motis LeadFlow

## Organization

Motis Industries Limited

------------------------------------------------------------------------

# Executive Summary

Motis LeadFlow is a lightweight web-based lead capture and sales
management system designed for Motis Industries Limited, a Nigerian
manufacturing company specializing in chemical and allied products for
construction, industrial, and consumer applications.

The system supports multiple product lines under the company, including
the More Paint brand, and enables the business to capture, manage, and
convert customer inquiries efficiently.

------------------------------------------------------------------------

# Product Line Architecture

Motis Industries Limited operates multiple product lines.

Primary Product Lines:

1.  Paints & Decorative Coatings (More Paint brand)
2.  Industrial Coatings
3.  Construction Chemicals
4.  Cleaning & Hygiene Chemicals
5.  Adhesives & Sealants
6.  Surface Preparation Chemicals
7.  Specialty Chemical Solutions

Each customer inquiry must be associated with a product line.

------------------------------------------------------------------------

# Core Objectives

-   Capture all customer inquiries
-   Provide centralized lead management
-   Support multiple product lines
-   Improve response time
-   Track conversion performance

------------------------------------------------------------------------

# Core Features

1.  Lead Capture System
2.  Lead Management Dashboard
3.  Lead Status Tracking
4.  Product Line Selection
5.  Customer Database
6.  Notifications
7.  Reporting Dashboard

------------------------------------------------------------------------

# Lead Capture Fields

Required Fields:

-   Full Name
-   Phone Number
-   Product Line
-   Location
-   Message

Optional Fields:

-   Email
-   Quantity or Project Size

------------------------------------------------------------------------

# Dashboard Requirements

The dashboard must allow users to:

-   View all leads
-   Filter by status
-   Filter by product line
-   Search by customer name
-   View lead details
-   Update lead status

------------------------------------------------------------------------

# Data Model

Leads Table:

id name phone email product_line location message status created_at
updated_at

------------------------------------------------------------------------

# Success Criteria

-   At least 10 leads captured weekly
-   All leads assigned to a product line
-   Response time reduced
-   Improved conversion tracking

---

# Additional PRD Sections (Added)

## 1. User Personas & Use Cases

- **Sales Representative** – needs to view new leads, filter by status, and contact leads quickly.
- **Admin** – manages lead data, updates status, and generates simple reports.
- **Marketing Lead** – monitors lead volume and conversion metrics.

**Sample User Stories**
- *As a Sales Rep I want to filter leads by status so I can call the newest leads first.*
- *As an Admin I want to edit a lead’s status and add notes to keep the sales pipeline up‑to‑date.*
- *As a Marketing Lead I want a quick view of the number of new leads per week.*

## 2. Non‑Functional Requirements

- **Performance** – page load < 2 s on a typical 3G connection; API latency < 300 ms.
- **Security** – all inputs must be sanitised; use HTTPS; Content‑Security‑Policy header to mitigate XSS.
- **Scalability** – the leads table should comfortably store up to 10 k records without UI slowdown.
- **Compliance** – include a consent checkbox and a short privacy notice (NDPR/GDPR compatible).

## 3. Simple Role‑Based Access Control (Lightweight)

- **Admin** – full CRUD on leads, can change status, view analytics.
- **Viewer** – read‑only access to the dashboard.
- Implemented with a very basic token stored in localStorage (no server side auth required for this MVP).

## 4. Notifications & Communication Flow

- **On form submit** – show a loading spinner then a success toast.
- **Optional email confirmation** – a simple “Thank you” email can be sent via a mock API (no cost for MVP).

## 5. Validation & Error Handling

- Inline validation for required fields, email format, and phone pattern.
- Graceful error messages displayed beneath inputs.
- Server‑side fallback validation (simulated with a mock response).

## 6. Basic Analytics & Reporting (Lightweight)

- Dashboard cards show totals for **New**, **Contacted**, **In‑Progress**, **Closed Won**, **Closed Lost**.
- Simple CSV export button for the leads table (client‑side generation, no backend).

## 7. Audit Trail / Change Log

- Each lead record stores `updated_by` and `updated_at` fields.
- Optional client‑side “history” array can be displayed in the lead detail view.

## 8. Internationalisation (Optional)

- UI strings are kept in a JSON file (`i18n.json`). English is the default; additional languages can be added later without code changes.

## 9. Deployment / Hosting (Free Options)

- Deploy the static site to **GitHub Pages**, **Netlify**, or **Azure Static Web Apps** – all have free tiers.
- Build script: `npm run build` → `dist/` folder.

## 10. Testing Strategy

- **Unit tests** for form validation using Jest.
- **End‑to‑end tests** for dashboard flows using Playwright or Cypress (run locally).

## 11. Accessibility (WCAG 2.1 AA)

- Minimum contrast ratios ≥ 4.5:1 for text.
- All interactive elements have visible focus states.
- ARIA labels for icons and form controls.
- Keyboard‑only navigation verified.

## 12. Browser Compatibility

Supported browsers: Chrome ≥ 108, Edge ≥ 107, Firefox ≥ 106, Safari ≥ 15. Graceful degradation for older browsers (no animations).

## 13. Data Migration / Import (Future)

- Define a CSV template (`leads_import_template.csv`) for bulk import if legacy data ever needs to be migrated.

## 14. Backup & Recovery (Local‑only for MVP)

- Use a simple JSON export (`backup.json`) that can be downloaded and re‑imported.

## 15. Legal / Privacy

- Add a short privacy notice with a consent checkbox on the lead capture form.
- Link to a placeholder privacy policy page.

## 16. Versioning & Change Log

- **Version 2.0 – 2026‑05‑03** – Initial PRD.
- **Version 2.1 – 2026‑05‑03** – Added missing sections (this block).

## 17. Success Metrics Beyond Lead Count

- **Average response time** from capture to first contact.
- **Conversion rate** (lead → quotation → sale).
- **Customer satisfaction** measured via a short post‑quote survey.

## 18. Mock Data Specification

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "phone": "+2348012345678",
    "email": "john@example.com",
    "product_line": "Paints & Decorative Coatings",
    "location": "Lagos",
    "message": "Interested in bulk order of 200 litres.",
    "status": "New",
    "created_at": "2026-04-30T10:12:00Z",
    "updated_at": "2026-04-30T10:12:00Z"
  }
]
```

---

## 19. Stakeholder Review Sign‑offs

| Role | Name | Signature |
|------|------|-----------|
| Product Owner | – | – |
| UI/UX Lead | – | – |
| Legal Advisor | – | – |

---

*All sections added respect the self‑funded constraint: they rely on free tooling, client‑side logic, or optional features that can be omitted later.*
