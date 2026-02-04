Prescription Intelligence Platform (MVP)

It is a full-stack product that helps patients and caregivers turn handwritten or printed prescriptions into clear, actionable guidance. Instead of acting as a passive storage layer, RxIQ focuses on understanding, next steps, and continuity of care.

This project showcases how I approach building user-centric systems that combine product thinking, AI, and pragmatic engineering.

Problem
Prescriptions are often:
Hard to read or understand (handwritten, abbreviated, jargon-heavy)
Lost across WhatsApp, phone galleries, or paper
Disconnected across visits, doctors, and family members
Existing systems prioritize storage and compliance, but offer little immediate value to users.

Solution
After the prescription is written.
Users upload a prescription and instantly receive:
A plain-English summary of what the prescription says
A clear list of “things to do” (medications, dosage, duration)
Context on why something is prescribed (non-diagnostic, safety-first)
The ability to assign prescriptions to any family member

What I Built (MVP Scope)
Core Flow
Upload → Processing → Result
Functionality
Image/PDF upload for prescriptions
OCR + vision-based interpretation (printed & handwritten)
AI-generated, non-alarming summaries
Family member tagging via flexible text input
Explicit loading and processing states to build user trust

Technical Implementation
Frontend
Next.js (App Router)
Client Components for file handling and UX state
Minimal, task-focused UI (no dashboards in MVP)

Backend
Next.js API routes for secure server-side processing
Vision-language model integration for prescription understanding
Prompt design focused on clarity, safety, and explainability

Data & Auth
Supabase for authentication and planned persistence
Stateless MVP design to enable rapid iteration

Key Engineering Decisions
Server-side AI calls only (no client key exposure)
Explicit UX states for long-running AI tasks
MVP prioritizes correctness and trust over feature breadth

Project Structure
app/
├── page.js                # Upload flow
├── loading/page.js        # Processing state
├── result/page.js         # Plain-English output
├── api/analyze/route.js   # Vision AI integration
lib/
├── analyzePrescription.js # Client → API bridge
└── supabase.js            # Auth & data layer

Running Locally
npm install
npm run dev

Environment variables:
OPENAI_API_KEY=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

Product & Engineering Trade-offs
No dashboards or timelines in MVP → focus on immediate value
No clinical claims → safety-first, trust-building language
Session-based handoff initially → enables faster iteration before schema hardening
AI as an assistant, not an authority → ambiguity is surfaced, not hidden

What I’d Build Next
Structured medicine extraction (JSON + confidence scores)
Manual correction UI for ambiguous OCR
Persistent prescription timelines

Docs
See the detailed Pharmacy-Ready Prescription Standardizer specification: docs/pharmacy-ready-prescription-standardizer.md


Medication reminders and adherence tracking

Longitudinal insights across prescriptions
