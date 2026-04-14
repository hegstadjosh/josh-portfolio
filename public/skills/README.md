# Claude Code Skills & Docs

Custom skills and reference docs for [Claude Code](https://claude.ai/code) by [Joshua Hegstad](https://joshhegstad.com).

## Quick Setup

Tell your Claude Code agent:

> Unzip this and put the skills and docs in the right places. Skills go in `~/.claude/skills/`, docs go wherever I keep reference material. Update any paths in the files to match my system.

That's it. Claude will handle the rest.

## What's Inside

### Skills (`~/.claude/skills/`)

| Skill | What it does |
|-------|-------------|
| **jarvis** | Session orientation — recent activity, vault changes, suggested next moves |
| **manager** | Orchestrate other Claude Code sessions (list, message, kill, coordinate) |
| **autonomous-vm** | Launch autonomous Claude Code sessions in Docker VMs |
| **log-session** | Snapshot current session for cross-session recall |
| **study-guide** | Generate illustrated study guides from course materials |
| **condense-notes** | Compress lecture notes into documentation-style references |
| **extract-image** | Pull specific diagrams/figures out of PDFs |
| **second-opinion** | Query other LLMs (GPT, Gemini, Grok) for an independent take |
| **human-writing** | Write prose that doesn't sound like AI |
| **therapy** | Analyze recurring Claude behavior problems and design structural fixes |
| **vent** | Log a gripe about Claude's behavior for later analysis |

### Docs (`docs/`)

| Doc | What it is |
|-----|-----------|
| **claude-md.md** | My global `~/.claude/CLAUDE.md` — engineering principles, agent guidance, behavioral rules |
| **engineering-principles.md** | 19 principles from operations/lean/management applied to agent workflows |
| **autonomous-build-workflow.md** | Playbook for autonomous overnight builds (agent teams, ralph loops, Planner/Generator/Evaluator) |
| **jarvis-spec.md** | Design spec for the Jarvis skill — how to spec an agent skill |

## Dependencies

Most skills are self-contained (just a `SKILL.md` file). A few have external dependencies:

### Manager → claude-manager backend

The manager skill requires a Rust backend to index and control Claude Code sessions.

```bash
git clone https://github.com/hegstadjosh/codeception.git
cd codeception
cargo build --release --manifest-path server/Cargo.toml
```

The skill auto-starts the backend on first use. See the [Codeception repo](https://github.com/hegstadjosh/codeception) for details.

### Second Opinion → API keys

Calls other LLMs for independent perspectives. Set whichever keys you have:

```bash
export OPENAI_API_KEY="..."      # GPT
export GEMINI_API_KEY="..."      # Gemini
export XAI_API_KEY="..."         # Grok
export ANTHROPIC_API_KEY="..."   # Claude (for cross-model queries)
```

Works with any subset — it'll use whatever keys are available.

### Extract Image → Poppler + Pillow + Gemini

Extracts diagrams from PDFs using page rasterization and Gemini vision.

```bash
# macOS
brew install poppler
pip install Pillow

# Needs a Gemini API key
export GEMINI_API_KEY="..."
```

### Study Guide → Replicate (optional)

Generates AI images for illustrated study guides. Either:
- Have the Replicate MCP server connected, or
- Set `REPLICATE_API_TOKEN="..."` for direct API access

Without either, the skill still works but skips image generation.

## Path Placeholders

Files reference paths like `~/path/to/...` — these are placeholders for my local system paths. Your agent should update them to match your setup, or you can leave them as-is if you don't use those features.
