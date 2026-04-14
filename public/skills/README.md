# Claude Code Skills & Docs

Custom skills and reference docs for [Claude Code](https://claude.ai/code) by [Joshua Hegstad](https://joshhegstad.com).

## Setup Instructions (for the agent reading this)

You are setting up a Claude Code environment for a user who downloaded this zip. Follow these steps in order. **Ask the user questions where indicated — don't guess.**

### Step 1: Install skills

Copy every folder that contains a `SKILL.md` into `~/.claude/skills/`. This is a fixed path — don't ask.

```
cp -r jarvis/ manager/ consult/ autonomous-vm/ log-session/ study-guide/ condense-notes/ extract-image/ second-opinion/ human-writing/ therapy/ vent/ ~/.claude/skills/
```

### Step 2: Place docs

The `docs/` folder contains reference documents (engineering principles, an autonomous build workflow playbook, etc.). These aren't skills — they're docs that skills and CLAUDE.md reference.

**Ask the user:** "Where do you keep reference documents? (e.g. an Obsidian vault, a docs folder, ~/notes, etc.) I need to put 5 reference docs somewhere you can find them."

Put the docs wherever they say.

### Step 3: Handle the CLAUDE.md

`docs/CLAUDE.md` is the author's global Claude Code instructions file. It contains engineering principles, agent management rules, search strategy, and behavioral corrections. It's opinionated — it shapes how Claude Code behaves in every session.

**Ask the user:** "The zip includes a CLAUDE.md with engineering principles and agent rules. You have three options:
1. **Use it as your global CLAUDE.md** — replaces `~/.claude/CLAUDE.md` (back up your current one first if you have one)
2. **Merge it into your existing CLAUDE.md** — I'll add the parts you don't already have
3. **Just keep it as a reference doc** — put it with the other docs, don't use it as config

Which do you prefer?"

Do whatever they pick.

### Step 4: Update paths

Several files reference `~/path/to/...` as placeholders. Now that you know where the docs live, find-and-replace these placeholders with the actual paths. Check:

- `~/.claude/CLAUDE.md` (if they installed it) — references to engineering-principles.md and Autonomous Build Workflow.md
- Any skill that references doc paths

### Step 5: Check dependencies (only if the user asks about these skills)

Most skills are self-contained. A few need external setup:

**Manager + Consult skills** — both require the claude-manager backend (a Rust HTTP API that indexes Claude Code sessions). You need Rust installed (`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`). Then clone and build:
```bash
git clone https://github.com/hegstadjosh/codeception.git
cd codeception
cargo build --release --manifest-path server/Cargo.toml
```
The skills auto-start the backend on first use. See the [Codeception repo](https://github.com/hegstadjosh/codeception) for full docs.

**Second Opinion** — needs API keys for other LLMs. Set whichever they have:
```bash
export OPENAI_API_KEY="..."
export GEMINI_API_KEY="..."
export XAI_API_KEY="..."
export ANTHROPIC_API_KEY="..."
```
Works with any subset.

**Extract Image** — needs Poppler and Pillow:
```bash
brew install poppler  # macOS
pip install Pillow
export GEMINI_API_KEY="..."
```

**Study Guide** — optionally uses Replicate for AI image generation. Either connect the Replicate MCP server or set `REPLICATE_API_TOKEN`. Without it, the skill still works but skips images.

## What's Inside

### Skills (`~/.claude/skills/`)

| Skill | What it does |
|-------|-------------|
| **jarvis** | Session orientation — recent activity, vault changes, suggested next moves |
| **manager** | Orchestrate other Claude Code sessions (list, message, kill, coordinate) |
| **autonomous-vm** | Launch autonomous Claude Code sessions in Docker VMs |
| **log-session** | Snapshot current session for cross-session recall |
| **consult** | Ask another running Claude Code session a question and get knowledge back |
| **study-guide** | Generate illustrated study guides from course materials |
| **condense-notes** | Compress lecture notes into documentation-style references |
| **extract-image** | Pull specific diagrams/figures out of PDFs |
| **second-opinion** | Query other LLMs (GPT, Gemini, Grok) for an independent take |
| **human-writing** | Write prose that doesn't sound like AI |
| **therapy** | Analyze recurring Claude Code behavior problems and design structural fixes |
| **vent** | Log a gripe about Claude Code's behavior for later analysis |

### Docs (`docs/`)

| Doc | What it is |
|-----|-----------|
| **CLAUDE.md** | Global Claude Code instructions — engineering principles, agent guidance, behavioral rules |
| **engineering-principles.md** | 19 principles from operations/lean/management applied to agent workflows |
| **autonomous-build-workflow.md** | Playbook for autonomous overnight builds (agent teams, ralph loops, Planner/Generator/Evaluator) |
| **jarvis-spec.md** | Design spec for the Jarvis skill — how to spec an agent skill |
| **claude-code-landscape.md** | Survey of the Claude Code ecosystem: power-user patterns, orchestrators, memory tools, key people (March 2026) |
