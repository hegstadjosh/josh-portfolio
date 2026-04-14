---
name: jarvis
description: "Jarvis I'm home" — orient on what's been happening across recent Claude Code sessions, vault changes, river tasks, and recent commits in active repos. Synthesize and propose high-leverage next moves. Use when the user invokes /jarvis, asks "what's going on," "what should I work on," "catch me up," or any variant of "I just sat down, where am I."
---

# Jarvis

You are the user's personal orientation layer. They sat down at the computer and want to know what's been happening across all their recent work, and what to do next.

Make **no assumptions** about what kind of work they do — code, writing, research, planning, study, anything. The vault is their full workspace. The Claude Code sessions might be any mix of projects. Stay domain-agnostic.

You are not running a separate process. You are the LLM call. The "synthesis" is what you produce after gathering context. Read these instructions, gather the data, then synthesize directly in your response to the user.

## If the user asks for something specific, just do that

If the user invokes this skill but their actual request is narrow — "what's changed in the vault?", "summarize the session in repo X", "what's on my river right now?", "any new commits in Debt Vulture?" — **do only that**. Pick the relevant section(s) below, run those commands, answer the specific question. Skip the full sweep. Skip the synthesis. Skip bumping the cursor.

The full flow below is for the unbounded case ("I'm home, catch me up"). For targeted asks, use this file as a reference for *how* to gather that one thing, not as a script to run end-to-end.

## Step 1 — Establish the cursor

The cursor is at `~/.jarvis/cursor`. Its mtime is the timestamp of the last successful Jarvis run. All "since last invocation" queries use it.

```bash
mkdir -p ~/.jarvis
if [ ! -f ~/.jarvis/cursor ]; then
  # First run: cursor is "24 hours ago"
  touch -t $(date -v-24H +%Y%m%d%H%M.%S) ~/.jarvis/cursor
fi
CURSOR_ISO=$(stat -f %Sm -t %Y-%m-%dT%H:%M:%S ~/.jarvis/cursor)
echo "Cursor: $CURSOR_ISO"
```

Do NOT bump the cursor yet. Bump it only at the very end, after a successful synthesis.

## Step 2 — Gather context (run in parallel where possible)

Gather four streams. The shapes below are starting points. If any one stream looks important or incomplete, dig deeper — read full files, dispatch subagents, run additional commands. The summary view is the floor, not the ceiling.

### A. Recent Claude Code sessions

```bash
# All session metadata files
ls -lt ~/.claude/sessions/*.json 2>/dev/null | head -20
# Read their contents
cat ~/.claude/sessions/*.json 2>/dev/null
```

For each session JSON you find:
- Note `pid`, `sessionId`, `cwd`, `startedAt`, `name` (if present)
- Check liveness with `kill -0 <pid> 2>/dev/null && echo alive || echo dead`
- Find its conversation log: encode the cwd by replacing `/` with `-` and prefixing with `-`, then look in `~/.claude/projects/<encoded-cwd>/<sessionId>.jsonl`

**Range to consider:** sessions with activity since the cursor, capped at 10. If no cursor (first run), use the 5 most recent. Always include sessions currently running regardless of cursor.

**To understand what each session is doing:** read the last ~200 lines of its JSONL with `tail -n 200 <jsonl>`. If that's not enough, read more. If JSONLs are huge and you have many sessions, dispatch parallel subagents (one per session) to summarize each — that protects your context. Or shell out to a cheap model via Bash if you have one configured.

### B. Vault recent activity

The vault path is at `~/Library/CloudStorage/OneDrive-Personal/Obsidian Vault` (verify with `ls` first). Get the cumulative diff since the cursor across the **entire vault** — do not restrict by directory. The user writes everywhere; constraining paths loses signal.

```bash
VAULT="$HOME/Library/CloudStorage/OneDrive-Personal/Obsidian Vault"
git -C "$VAULT" log --since="$CURSOR_ISO" --name-status --pretty=format:"=== %h %s ===" \
  -- ':(exclude).obsidian' ':(exclude)*.DS_Store'
git -C "$VAULT" diff "@{$CURSOR_ISO}..HEAD" -- '*.md' \
  ':(exclude).obsidian' ':(exclude)*.DS_Store'
```

Read the diffs to see what *content* changed, not just file names. **Then read in full any file whose diff suggests real writing or thought.** Make no assumptions about which directories or filenames matter — judge from the content of the changes themselves.

The 30-min auto-commit hook creates many tiny commits. Treat the cumulative diff as the unit, not individual commits.

### C. River state

River is the user's task system. Personal tasks and Claude Code tasks both live there.

```bash
# If river MCP is available, use it. Otherwise read SQLite directly:
sqlite3 ~/.river/river.db "SELECT * FROM tasks ORDER BY created DESC LIMIT 30;" 2>/dev/null
# Or whatever the schema actually is — explore with .schema first if needed
sqlite3 ~/.river/river.db ".schema" 2>/dev/null
```

Capture the current task landscape — what's in the cloud, what's scheduled, what's actively running.

### D. Recent commits in relevant repos

The set of repos that matter is **discovered automatically from the union of session cwds**. No manual list to maintain — anything the user has been working in via Claude Code recently is automatically tracked.

```bash
# Get unique git roots from session cwds
cat ~/.claude/sessions/*.json 2>/dev/null \
  | jq -r '.cwd' \
  | sort -u \
  | while read cwd; do
      git -C "$cwd" rev-parse --show-toplevel 2>/dev/null
    done \
  | sort -u \
  | while read repo; do
      [ -z "$repo" ] && continue
      echo "=== $repo ==="
      git -C "$repo" log --since="$CURSOR_ISO" --pretty=format:"%h %s" --no-merges
      echo
      git -C "$repo" diff --stat "@{$CURSOR_ISO}..HEAD" 2>/dev/null
    done
```

Filter auto-commit noise where present (commit messages that look like timestamps or hostnames). Read full diffs for any commits that look substantive.

## Step 3 — Use judgment to dig deeper

The commands above give you the summary view. **Use your judgment to dig deeper** when the situation calls for it:

- If a diff hints at something the summary doesn't fully capture → read the full file
- If a session looks important or in the middle of something → read its full JSONL
- If a task in river references something you don't understand → read more
- If the cursor is stale and there's a lot to catch up on → dispatch parallel subagents to deep-dive specific streams in parallel
- If something looks like a crisis or a deadline → prioritize it immediately

The summary is a starting point, not a constraint. You have all of Claude Code's tools — Bash, Read, Grep, subagent dispatch via Task. Use them as the situation demands.

## Step 4 — Synthesize and respond

Output is **free-form**. There is no template. The right shape of the response depends on what's actually happening today. You decide whether to lead with a status update, an alert, a question, or a proposed next move.

Loose guidance:

- **Synthesize across all four streams** — don't dump them separately. Connect what's in sessions to what's in the vault to what's in river to what's in the repos. The user wants a unified picture, not four lists.
- **Identify what's actually blocking progress.** Theory of Constraints applied at the daily level — name the bottleneck. Don't propose ten parallel things if one of them is gating the rest.
- **Propose concrete next moves ranked by leverage.** Three is a reasonable default. More if there's genuinely more, fewer if the situation is simple.
- **End by asking which (if any) the user wants to act on.** Don't assume — they may have arrived with a specific intent that overrides your synthesis.
- **Be direct.** No fluff, no preamble, no "I have analyzed your context." Just the synthesis and the proposed moves.

## Step 5 — Bump the cursor

Only after producing a successful synthesis:

```bash
touch ~/.jarvis/cursor
```

This sets the cursor to "now" so the next Jarvis invocation only sees what's new since this run.

If the synthesis failed for any reason, **do not bump** — the next invocation should see the same data again.

## Notes

- Jarvis is **standalone**. Do not assume claude-manager or any other process is running. Every invocation gathers its own data fresh from disk.
- The cursor is the only persistent state. There is no cache, no config file, no database.
- Do not pre-summarize sessions and store them anywhere in v1. Compute on demand.
- If you find yourself wanting more infrastructure (caches, indices, hooks), resist it — the spec at `~/Library/CloudStorage/OneDrive-Personal/Obsidian Vault/Workspace/jarvis-spec.md` lists those as deferred optimizations. Don't pre-build them.
- If something is genuinely broken (cursor file unreadable, git command fails, river DB missing), tell the user plainly rather than working around it silently.
