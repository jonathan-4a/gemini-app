# Architecture Decision Record

> Log every significant technical or design decision here.
> This file is **append-only** — never edit or remove past decisions.
> A decision is significant if a future session would benefit from knowing why it was made.

**Format for each entry:**

```
## Decision NNN — [Short title]
**Date**: YYYY-MM-DD
**Decision**: [What was decided, in one sentence]
**Rationale**: [Why this was the right choice for this project]
**Alternatives considered**: [What else was on the table]
**Trade-offs**: [What we gain, what we give up]

**Guardrails Alignment**:
- **Privacy & IP**: [How does this decision protect student data and clarify ownership?]
- **Disclosure**: [How will this choice be disclosed to users/stakeholders?]
- **Responsibility**: [Who is the human responsible for this decision's impact?]
- **Bias & Trust**: [What measures mitigate bias in this specific choice?]
- **Values**: [Which core Minerva value does this align with?]
```

---

## Decision 001 — Vanilla HTML/CSS/JS, no framework

**Date**: [YYYY-MM-DD]
**Decision**: Use plain HTML, CSS, and JavaScript with no build step and no framework.
**Rationale**: GitHub Pages hosts static files directly. No framework means no build pipeline, no dependencies to update, no abstraction between the code and the browser. The project remains readable and modifiable by anyone with basic web knowledge, which aligns with the learning-orientation principle of clarity over cleverness.
**Alternatives considered**: React, Vue, Svelte — all require a build step or CDN dependency; Astro — adds complexity for a single-page app
**Trade-offs**: We lose component reuse patterns and reactive state management. We gain zero setup friction, full control over output, and a codebase that doesn't rot when npm packages break.

## Decision 002 — Ethical AI & Data Privacy Guardrails

**Date**: [YYYY-MM-DD]
**Decision**: Adoption of Minerva University's AI Guardrails for all project development and deployment.
**Rationale**: To protect data privacy (especially student PII), ensure intellectual property integrity, and maintain human-centered learning. This project prioritizes human agency and accountability, treating AI as a "thinking partner" rather than a substitute.
**Specific Guardrails for this Project**:
1. **No Sensitive Data**: The app will not store or process real student records or PII.
2. **Human-in-the-Loop**: All AI-suggested code and content are reviewed by the human developer before commit.
3. **Mandatory Disclosure**: AI use is logged in `SCRATCHPAD.md`.
**Trade-offs**: Development may be slower due to mandatory human review and documentation overhead, but the resulting system is more ethical, secure, and aligned with institutional values.

## Decision 003 — Soft Flag for Copy-Paste Events

**Date**: 2026-03-27
**Decision**: Allow users to paste text into the editor but highlight it as a potential anomaly in the "Authenticity Report."
**Rationale**: Hard-blocking paste events can be frustrating (e.g., if a user is moving a sentence they wrote elsewhere). A "Soft Flag" preserves **Human Agency** while maintaining **Transparency**—the user is informed that the action will be noted in the final report, but they aren't stopped from doing it.
**Alternatives considered**: Hard Block (preventing all paste events)
**Trade-offs**: We gain a smoother user experience and trust-building; we give up the absolute certainty that every single character was typed inside the app.

**Guardrails Alignment**:
- **Privacy & IP**: No data leaves the browser; flags are stored locally.
- **Disclosure**: The app will clearly inform the user when a paste event is flagged.
- **Responsibility**: The user is responsible for their own writing process and how they choose to use the tool.
- **Bias & Trust**: This approach builds trust by not "policing" the user but instead providing a transparent report of their process.
- **Values**: Aligns with **Human Agency** and **Clarity over Cleverness**.

<!-- Add new decisions below, incrementing the number. -->

## Decision 004 — Behavioral Biometrics & Revision Mapping

**Date**: 2026-04-09
**Decision**: Implement Keystroke Dynamics (latency tracking) and Revision Mapping (churn rate).
**Rationale**: To provide high-fidelity evidence of human authorship, we must move beyond simple WPM tracking. Capturing the millisecond "rhythm" of typing and the "churn" of revision (backspaces/deletes) provides a unique behavioral fingerprint that is nearly impossible for current AI to replicate.
**Alternatives considered**: Traditional WPM only — too easy to spoof with automated injection; Keylogging — too invasive and privacy-violating.
**Trade-offs**: We gain a much more robust "Authenticity Score." We give up some UI simplicity to explain these advanced metrics to the user.

**Guardrails Alignment**:
- **Privacy & IP**: Latency data is aggregated into variance and average metrics; no raw key-by-key timing log is exported unless the user generates the report.
- **Disclosure**: The "Writing Rhythm" card in the sidebar clearly shows when these metrics are being captured.
- **Responsibility**: The user remains the author; the tool simply provides a "forensic mirror" of their existing process.
- **Bias & Trust**: We build trust by rewarding the *struggle* of writing (revision) rather than just the final, polished output.
- **Values**: Aligns with **Human Agency** and **Learning Orientation**.

## Decision 005 — Authenticity Scoring Algorithm

**Date**: 2026-04-10
**Decision**: Implement a weighted "Authenticity Score" that rewards human-like variability and revision.
**Rationale**: Users and admissions staff need a clear, high-level indicator of the "human signal" in a piece of writing. By weighting revision churn positively and robotic consistency negatively, we create a metric that values the *process* of thought.
**Alternatives considered**: A simple "Pass/Fail" flag — too binary and doesn't capture the nuances of human effort.
**Trade-offs**: We gain a powerful summary metric. We give up some "neutrality"—the algorithm makes a value judgment about what "human writing" looks like.

**Guardrails Alignment**:
- **Privacy & IP**: The score is calculated entirely on the client side.
- **Disclosure**: The final report explains *how* the score was calculated (e.g., "High churn and moderate latency variance are strong human signals").
- **Responsibility**: The human admissions officer remains the final judge; the score is a piece of evidence, not a verdict.
- **Bias & Trust**: The algorithm is transparent and focuses on behavioral signals rather than linguistic ones, which reduces bias against non-native speakers who may have unique vocabulary patterns.
- **Values**: Aligns with **Human-Centered Accountability**.
