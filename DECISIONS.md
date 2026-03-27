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
