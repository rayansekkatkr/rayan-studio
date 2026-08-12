# Tracking migration map

## Homepage section_view

| Old section | New section | Decision |
| --- | --- | --- |
| hero | hero | preserve name |
| probleme-solution | none | retire; content no longer exists as a dedicated section |
| services | services | preserve name |
| realisations | selected-work | rename |
| process | method | rename |
| tarifs | offers | rename |
| temoignages | none | retire; no testimonial section in approved V1 |
| faq | none on homepage | retire homepage section; FAQ is now a dedicated Studio page |
| contact | final-cta | rename homepage endpoint; contact is now a dedicated page |

New section_view IDs:
hero, expertise, selected-work, services, studio, method, offers, insights, final-cta

## Preserved events
- scroll_depth { threshold }
- section_view { section_id, page_path? }
- cookie_consent { choice: accepted } when analytics consent is granted

## CTA event
- cta_click { cta_id, source, destination, locale }

Approved cta_id values:
- hero_start_project
- hero_view_work
- nav_start_project
- home_services
- home_studio
- home_method
- home_offers
- home_insights
- final_start_project
- service_start_project
- case_study_start_project
- contact_submit
- project_submit

## Form events
Contact:
- contact_form_start
- contact_form_submit
- contact_form_success
- contact_form_error { code }

Project:
- project_form_start
- project_form_step { step }
- project_form_submit
- project_form_success
- project_form_error { code }

## PII rule

Analytics payloads never contain user-entered values: no name, email, company, subject, message,
objective, budget content, user-entered URL or honeypot value. Only categorical/context values
listed above are allowed.
