---
name: autonomous-vm
description: Prep and launch autonomous Claude Code sessions in Docker VMs. Handles spec writing, repo setup, Docker config, launch commands, and monitoring. Use when the user wants to run overnight/autonomous agents.
user-invocable: true
argument-hint: "[repo-path] [--task description]"
---

# Autonomous VM Session — Setup & Launch

Guide the user through setting up and launching autonomous Claude Code sessions in Docker containers.

## Overview

This skill handles the full workflow:
1. Figure out what the agent should do (write the spec)
2. Set up the repo (branch, spec file, PROGRESS.md)
3. Verify Docker prerequisites
4. Generate launch commands
5. Provide monitoring instructions

## Step 1: Determine the Task

Ask the user:
- Which repo? (check `~/Build_2026/BK_Monitor/`, `~/Econ/econ-next/`, or ask)
- What should the agent do? (refactor, build features, test, document, etc.)
- How long should it run?
- Any constraints? (no new features, 300 line max, etc.)

## Step 2: Write the Spec

Create `REFACTOR-SPEC.md` (or `BUILD-SPEC.md`, `TASK-SPEC.md` — whatever fits) in the repo root. The spec must be:
- **Self-contained** — the agent reads only this file and PROGRESS.md
- **Specific** — measurable targets, not vague goals ("every file under 300 lines" not "clean up the code")
- **Constrained** — explicit rules about what NOT to do

Include in every spec:
- The mission (what to accomplish)
- The file list or scope (what to touch)
- Rules (build checks, commit style, what's off-limits)
- How to use agent teams
- "Do NOT push to any remote. Do NOT access external services."

## Step 3: Set Up the Repo

```bash
# Create a feature branch (never work on main)
cd <REPO> && git checkout -b <branch-name>

# Write PROGRESS.md
cat > PROGRESS.md << 'EOF'
# Task — Progress
## Status: IN PROGRESS
## What's Done
(nothing yet)
## What's Next
See spec file.
EOF

# Commit spec + progress
git add REFACTOR-SPEC.md PROGRESS.md && git commit -m "docs: add spec and progress for autonomous session"
```

## Step 4: Verify Docker Prerequisites

Run these checks:
```bash
# Image exists and has jq?
docker run --rm claude-sandbox bash -c "which jq" 2>/dev/null || echo "REBUILD NEEDED: add jq to Dockerfile"

# Config synced?
docker run --rm -v claude-sandbox-config:/config alpine ls /config/.claude.json 2>/dev/null || echo "RESYNC NEEDED"
```

If rebuild needed:
```bash
cd ~/Build_2026/claude-sandbox && docker build -t claude-sandbox .
```

If resync needed:
```bash
docker run --rm -v "$HOME/.claude":/host-claude:ro -v claude-sandbox-config:/target alpine sh -c "cp -a /host-claude/* /target/ 2>/dev/null || true; cp -a /host-claude/.* /target/ 2>/dev/null || true; echo done"
docker run --rm -v "$HOME/.claude.json":/host-claude.json:ro -v claude-sandbox-config:/target alpine sh -c "cp /host-claude.json /target/.claude.json"
```

## Step 5: Launch

```bash
caffeinate -di &
cd ~/Build_2026/claude-sandbox
tmux new -s <session-name> './run.sh <repo-path>'
```

Inside the container:
1. Run `/login`
2. Paste the prompt (see below)
3. `Ctrl+B` then `D` to detach

### The Prompt

The prompt must include:
- Reference to the spec file (`Read /workspaces/project/SPEC-FILE.md`)
- "Work autonomously using agent teams — NOT just normal subagents, but AGENT TEAMS"
- "Do NOT stop between tasks. Work continuously. When you finish one task, immediately start the next."
- The deadline if applicable

Example:
```
Read /workspaces/project/REFACTOR-SPEC.md and /workspaces/project/PROGRESS.md.
[Brief description of the mission].
Work autonomously using agent teams — NOT just normal subagents, but AGENT TEAMS.
Do NOT stop between tasks. Work continuously. When you finish one task, immediately start the next. Never pause. Never wait for input.
```

### Container Paths

Inside the Docker container, the repo is at `/workspaces/project/`. Always use this path in prompts and specs, not the Mac path.

If mounting a parent directory (e.g., `~/Econ` to include both `econ-next` and `econ-pdf-api`), the repos are at `/workspaces/project/econ-next/` and `/workspaces/project/econ-pdf-api/`.

## Step 6: Monitor

```bash
tmux attach -t <session-name>       # watch (Ctrl+B D to detach)
cd <REPO> && git log --oneline -20  # see commits
cat <REPO>/PROGRESS.md              # see status
```

### If Claude Stops Working

It will. Just attach to the tmux session and type "keep going" or paste the prompt again.

### If /compact Fails with Permission Denied

Fix without killing the session:
```bash
docker exec -u root $(docker ps -q --filter ancestor=claude-sandbox | head -1) chown -R vscode:vscode /home/vscode/.claude
```

## Key Facts

- **Firewall:** Anthropic API only. No npm/pip/external services. Pre-install deps on host before launching.
- **Ralph loop stop hook does NOT work in interactive mode.** The hook only fires on process exit. In interactive sessions, Claude just waits for input. Use "never stop" in the prompt instead.
- **The `/ralph-loop` skill command does NOT work in Docker.** The plugin marketplace isn't reachable.
- **Agent teams work in Docker.** The agent can spawn teammates.
- **Pre-install deps on host:** `npm install` / `pnpm install` before launching so builds work inside the container.
- **Never stash/pop across branches** — creates merge conflicts.
- **Cloud scheduled tasks (claude.ai/code/scheduled)** are an alternative for recurring hourly tasks on main branch. Not good for continuous multi-hour work or feature branches.
