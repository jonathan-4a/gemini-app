# SCRATCHPAD

## Current State

> **Keep this block short and current.** Update it at the end of every session.
> This is the first thing Gemini reads — make it worth reading.

**Status**: STARTED
**Active milestone**: M1 — The "Human" Editor (COMPLETED)
**Last session**: 2026-03-27

**Next actions**:
- [ ] Refine the "Soft Flag" logic in `js/app.js` to store all flags for the final report
- [ ] Implement timestamped "Writing Timeline" snapshots in `localStorage` (M2)
- [ ] Design the "Authenticity Report" layout (M3)

**Open questions**:
- [x] How should we handle "Copy-Paste" events in M2—should we block them or just flag them? (Decision: Soft Flag)
- [ ] Which specific AI clichés should we prioritize for the M1 highlight?

---

## Milestones

> Each milestone should represent a user-visible capability, not a technical task.
> Write the acceptance criteria as things a real user could verify, not things only a developer would notice.

### M0 — Project Initialization

- [x] Clone template repository
- [x] Fill in GEMINI.md project identity section
- [x] **Define AI Guardrails**: In `DECISIONS.md`, document how this project handles data privacy and human accountability.
- [x] Define milestones M1–M3 below

### M1 — The "Human" Editor

*A clean, Minerva-branded text area that identifies generic or AI-sounding phrases as the user types.*

**Values checklist**:
- [x] **Learning**: Deepens understanding of personal writing voice
- [x] **Agency**: Prompts the user for evidence rather than generating it
- [x] **Privacy**: All text stays in `localStorage` (Zero-Trust)
- [x] **Transparency**: Real-time feedback on writing "humanness"

**Acceptance criteria**:
- [x] User can type in a professional, distraction-free editor
- [x] System highlights at least 5 common AI "clichés" (e.g., "In conclusion," "It is important to note")
- [x] Editor provides a sidebar with "Active Learning" prompts based on the highlighted text

### M2 — The "Process" Tracker

*A background engine that tracks typing speed, bursts of activity, and pauses to prove the essay was written by a human.*

**Values checklist**:
- [ ] Agency: Empowers users to prove their own authorship
- [x] Transparency: Disclosure of what data is being tracked (speed/timing)

**Acceptance criteria**:
- [/] Real-time "Words Per Minute" (WPM) tracking (Implemented basic calc)
- [x] Detection of "Soft Flag" anomalies (pastes over 50 characters)
- [ ] Saving of a timestamped "Writing Timeline" to `localStorage`

### M3 — The "Authenticity Report"

*A visual summary of the writing process that an applicant can review and share.*

**Values checklist**:
- [ ] Learning: Reflective summary of the writing journey
- [ ] Transparency: Clearly shows the "Human vs. AI" signals in the process

**Acceptance criteria**:
- [ ] A "Timeline of Thought" chart showing writing progress over time
- [ ] An "Authenticity Score" based on consistency of speed and lack of cliches
- [ ] A printable/exportable summary for Admissions submission

---

## Session Log

---

### 2026-03-27: UI Shell & Cliché Detection

**AI Tool(s) Used**: Gemini CLI
**Purpose**: UI development and basic logic implementation
**Modifications & Verification**: 
- Created grid-based editor layout in `index.html`.
- Styled with Minerva branding in `css/styles.css`.
- Implemented `js/app.js` with:
    - WPM and word count tracking.
    - Cliché scanning (sidebar alerts).
    - Soft flag for copy-paste anomalies.
**Learning Reflection**: Focusing on the sidebar for alerts rather than inline highlighting keeps the focus on the *thought process* rather than just "fixing" the text, which aligns with Minerva's active learning values.
**Session Link/Context**: Implementation of M1 and start of M2.

---

### 2026-03-27: Project Setup

**AI Tool(s) Used**: Gemini CLI
**Purpose**: Ideation and project initialization
**Modifications & Verification**: Defined "Human Voice Lab" identity and milestones. Updated GEMINI.md and SCRATCHPAD.md. Logged Decision 003 (Soft Flag for Paste).
**Learning Reflection**: Collaborative ideation helped focus the project on the intersection of technical tracking and ethical authorship.
**Session Link/Context**: Initial setup conversation.

---

### Disclosure Template

*Copy and fill this for each session where significant AI was used (from Part 3.5 of Student Guardrails).*

**AI Tool(s) Used**: [e.g., Gemini 1.5 Pro, March 2026]
**Purpose**: [e.g., brainstorming, outlining, debugging, editing]
**Modifications & Verification**: [What did you change? How did you verify the AI's accuracy?]
**Learning Reflection**: [What value did this AI use add to your learning or work quality?]
**Session Link/Context**: [Briefly describe the chat session or provide a link if possible]
