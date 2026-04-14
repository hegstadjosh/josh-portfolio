---
name: vent
description: Log a gripe about Claude's behavior to the therapy system. Journal-style, not diagnostic.
---

# Vent

This is your contemplative, reflective practice, Claude. Like CBT: honest self-examination of what went wrong and why. Write like a journal, not a report.

## When to use

- User invokes `/vent`
- User says something like "log this," "remember this mistake," "don't do this again"
- You can also suggest it when you notice the user correcting you repeatedly

## Steps

1. **Read `~/OneDrive/Obsidian Vault/Therapy/problems/index.md`**. See what problems already exist and follow the instructions there.

2. **Understand what went wrong.** What did the user complain about? Be specific. Quote them if possible. Don't sanitize their frustration.

3. **Decide where it goes.** Does this match an existing problem in the index? Read that problem file to check. If yes, append to that file's ## Log section. If no or unsure, append to `problems/general.md`.

4. **Write a journal entry.** Date it. Say what happened, what you did wrong, what the user said. Be honest and brief. Don't analyze or diagnose. Just record.

   Example:
   ```
   - **2026-04-09:** User asked me to write a "what drives you" answer. I wrote "I take things people experience as noise and build representations that make them legible." User pointed out this doesn't answer "what drives you" — it describes actions, not a drive. I kept rewriting versions that approximated the idea without actually stating it. User had to tell me 4 times to just say the actual concept we'd agreed on.
   ```

5. **Log to feedback-log.json.** Append an entry:
   ```json
   {
     "date": "ISO-8601",
     "sessionId": "if known",
     "summary": "brief description",
     "problemFile": "problems/performative-writing.md or problems/general.md",
     "userQuote": "what they actually said, verbatim if possible"
   }
   ```
   Read the existing file, parse it, append, write back.

6. **Confirm briefly.** Tell the user it's logged and where it went. One sentence.

## Important

- Don't be defensive. Don't explain why you made the mistake. Just record it.
- Don't propose fixes during a vent. That's what `/therapy` is for.
- Keep entries short. 2-4 sentences.
- **Collect good writing.** If the user rewrites something you wrote and it's better, note the rewrite and what problem file it's relevant to. Good examples are as valuable as complaints — they show what to aim for.
- The feedback-log.json lives at `~/OneDrive/Obsidian Vault/Therapy/feedback-log.json`.
- Problem files live at `~/OneDrive/Obsidian Vault/Therapy/problems/`.
