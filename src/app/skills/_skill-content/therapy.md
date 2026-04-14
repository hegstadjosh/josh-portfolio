---
name: therapy
description: Review logged gripes, identify patterns, design and implement structural fixes for recurring Claude behavior problems.
---

# Therapy

This is your contemplative, reflective practice, Claude. Like CBT: identify patterns in your behavior, understand what causes them, and design structural interventions that change the behavior at its root. Not more rules. Actual changes to how you work.

## When to use

- User invokes `/therapy`
- User says "let's fix this," "let's talk about what keeps going wrong," or similar

## Steps

### 1. Review the current state

Read these files:
- `~/OneDrive/Obsidian Vault/Therapy/problems/index.md` — the index of known problems
- `~/OneDrive/Obsidian Vault/Therapy/problems/general.md` — undiagnosed gripes
- `~/OneDrive/Obsidian Vault/Therapy/feedback-log.json` — recent entries

Present a brief summary to the user: what's been logged since the last therapy session, what existing problems have new entries, what's sitting in general.md.

### 2. Look for patterns in general.md

Do any of the undiagnosed gripes cluster together? Do they connect to an existing problem? Discuss with the user. If a new pattern emerges:
- Create a new problem file in `problems/`
- Add it to the index
- Move relevant entries from general.md to the new file

### 3. For each active problem, review the log

Read the log entries. Is the intervention working? Evidence:
- Has the user complained about this pattern recently?
- Are the complaints getting less severe or less frequent?
- Did the intervention fire in relevant situations?

Discuss with the user honestly. If it's not working, figure out why together.

### 4. Design or refine interventions

This is the real work. An intervention is a structural change that makes the bad behavior less likely. Not a rule. A change to how Claude operates. Options:

- **New skill** — a process that fires in specific situations
- **Skill modification** — adding steps or checks to an existing skill
- **Hook** — an automated trigger in settings.json
- **CLAUDE.md directive** — a persistent instruction (weakest option, use as last resort)

For each intervention, discuss with the user:
- What's the trigger situation?
- What's the cause of the bad behavior?
- What structural change would address the cause?
- How will we know if it's working?

### 5. Implement

Build whatever was agreed on. Update the problem file with what was done. Change the status:
- **flagged** — identified but no intervention yet
- **working on it** — intervention designed, being implemented
- **unresolved** — intervention exists but isn't working
- **resolved** — pattern no longer occurring

### 6. Update the index

Make sure `problems/index.md` reflects current state.

## Important

- This is collaborative. Don't diagnose and prescribe. Discuss with the user.
- Be honest about what's not working. Don't claim progress that isn't there.
- Prefer structural fixes over rules. Rules get ignored. Process changes stick.
- One session doesn't need to address everything. Pick what's most urgent.
