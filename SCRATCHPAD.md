# SCRATCHPAD

## Current State

> **Keep this block short and current.** Update it at the end of every session.
> This is the first thing Gemini reads — make it worth reading.

**Status**: COMPLETED
**Active milestone**: M3 — The "Authenticity Report" (COMPLETED)
**Last session**: 2026-04-12

**Next actions**:
- [x] Implement Behavioral Fingerprinting (Keystroke Dynamics)
- [x] Implement Revision Mapping (Churn Rate)
- [x] Finalize Authenticity Score algorithm
- [x] Deploy to GitHub Pages (User action required)

**Open questions**:
- [x] How should we weight "Revision Churn" in the authenticity score? (Decision: 1:1 ratio up to 15%)

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
- [x] Agency: Empowers users to prove their own authorship
- [x] Transparency: Disclosure of what data is being tracked (speed/timing/keystrokes)

**Acceptance criteria**:
- [x] Real-time "Words Per Minute" (WPM) tracking
- [x] Detection of "Soft Flag" anomalies (pastes over 50 characters)
- [x] **New**: Keystroke dynamics tracking (latency and variance)
- [x] **New**: Revision mapping (backspace/delete tracking)

### M3 — The "Authenticity Report"

*A visual summary of the writing process that an applicant can review and share.*

**Values checklist**:
- [x] Learning: Reflective summary of the writing journey
- [x] Transparency: Clearly shows the "Human vs. AI" signals in the process

**Acceptance criteria**:
- [x] A "Timeline of Thought" chart showing writing progress over time
- [x] An "Authenticity Score" based on consistency of speed, lack of cliches, and revision churn.
- [x] A printable/exportable summary for Admissions submission

---

## Session Log

---

### 2026-04-10: Finalizing M3 & Advanced Metrics

**AI Tool(s) Used**: Gemini CLI
**Purpose**: Completion of the Authenticity Report and scoring algorithm.
**Modifications & Verification**: 
- Implemented `renderFinalReport` with full visual layout.
- Added Authenticity Score calculation (Revision + Variance - Anomalies).
- Verified that PDF export works via `window.print()`.
**Learning Reflection**: Seeing the "Revision Churn" as a positive metric changes the student's perspective on editing; it becomes a badge of honor rather than a sign of failure.

---

### 2026-04-09: Behavioral Fingerprinting

**AI Tool(s) Used**: Gemini CLI
**Purpose**: Implementing advanced forensic tracking.
**Modifications & Verification**: 
- Added `handleKeydown` to track millisecond latencies.
- Added revision tracking for backspaces and deletes.
- Integrated metrics into the state object for M3.
**Learning Reflection**: Behavioral biometrics provide a much higher level of proof than simple WPM, making the tool more robust against sophisticated AI injections.

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

### Disclosure Template

*Copy and fill this for each session where significant AI was used (from Part 3.5 of Student Guardrails).*

**AI Tool(s) Used**: [e.g., Gemini 1.5 Pro, March 2026]
**Purpose**: [e.g., brainstorming, outlining, debugging, editing]
**Modifications & Verification**: [What did you change? How did you verify the AI's accuracy?]
**Learning Reflection**: [What value did this AI use add to your learning or work quality?]
**Session Link/Context**: [Briefly describe the chat session or provide a link if possible]
