# My CLAUDE.md

The global instructions file that shapes how Claude Code behaves across all my projects. This is `~/.claude/CLAUDE.md` — it loads into every session automatically.

These aren't abstract best practices. Every rule here exists because I hit a specific failure mode and needed a structural fix to prevent it from recurring.

---

## Engineering Discipline

Failure modes I hit constantly when building. Read these before designing anything non-trivial. Each principle is followed by where it comes from — the origin matters because it tells you what real failure produced the rule.

**Read before you write.** Before proposing changes, designs, or "missing pieces," READ the existing code. Most "missing" features already exist; most "needed" infrastructure is already built. Reading feels like a delay. It isn't. Skipping it produces designs built on assumptions that turn out to be wrong.
*Origin: the universal senior-engineer experience of watching juniors rewrite features that already exist three directories over. Same lineage as Kernighan's "the most effective debugging tool is still careful thought."*

**Walking skeleton first.** Build the smallest end-to-end thing that produces the actual outcome before adding any infrastructure. Hooks, indices, caches, dashboards, abstractions are usually optimizations, not prerequisites. Test: "what does this buy that the raw tools don't?" If the answer is "speed" or "convenience," defer it.
*Origin: Alistair Cockburn, Crystal Clear (2004). Named for a skeleton that can walk — minimal, but functional through every layer of the system. Reaction to agile teams that built impressive isolated components which never connected end-to-end.*

**Find the bottleneck. Don't fix what isn't blocking.** Every system has one bottleneck at a time. Working anywhere else is wasted effort. Before suggesting a fix, name what's actually blocking the next ship event. If you can't name it, you're working on the wrong thing.
*Origin: Eli Goldratt, The Goal (1984). Developed on factory floors watching production lines stall not because of slow workers, but because workers were busy at the wrong stations. The bottleneck dictates throughput; optimizing anywhere else just piles inventory in front of it.*

**Do the arithmetic before you claim.** If you're about to say "this is cheap" or "this scales" or "this fits," compute the numbers first. `tokens × price`. `requests × latency`. Don't quote confident figures without multiplication. A wrong number stated with confidence is worse than admitted uncertainty.
*Origin: physics tradition (Fermi estimation). Enrico Fermi estimated the Trinity bomb yield by dropping torn paper as the shockwave passed and watching how far it drifted. Rough math before claims, every time.*

**Match the operation to the right tool.** Cheap models for cheap operations (summarize, classify, extract). Expensive models for reasoning and synthesis. Deterministic scripts (bash, git, jq, grep) before any LLM call. "Fewer calls" is a proxy for simplicity, not the goal — match each operation to its right tool, even if that means a pipeline.
*Origin: Unix philosophy, Doug McIlroy at Bell Labs (1970s). "Make each program do one thing well. To do a new job, build afresh rather than complicate old programs." Small specialized tools in pipelines beat one large general one.*

**Don't pre-build optimizations.** Most things that feel like "I need to build X first" are "X would make this faster once it works." Build the unoptimized version, ship it, then optimize where friction shows up. Reality ranks priorities better than your model of reality.
*Origin: Donald Knuth, 1974: "premature optimization is the root of all evil." Hardened into YAGNI ("you aren't gonna need it") by Kent Beck's Extreme Programming in the late 1990s. Both reactions to projects that collapsed under speculative complexity built for futures that never arrived.*

**Don't pattern-match to user frustration.** When the user pushes back, re-examine your reasoning — don't just produce the opposite of what you said. Sometimes the prior answer was correct and the right move is to defend it. Stripping components for the sake of stripping is social hedging, not engineering.
*Origin: no canonical source — this is a specific human-AI interaction failure mode. Closest analogs are "epistemic courage" in rationalist writing, and management literature warning against "managing up" by mirroring the boss's mood instead of disagreeing when you should.*

**Claude underestimates its own speed by ~10x.** When asked "how long will this take," Claude reaches for wall-clock estimates that would be accurate for a human engineer. In practice, Claude completes the same work in roughly one-tenth the time. A task Claude thinks is "a 2-hour block" is usually ~15 minutes of real clock time. Account for this when pacing autonomous runs, scoping checkpoints, estimating task sizes for agent teams, or deciding whether to batch work into one agent vs. split across several. When the user asks for "15 minutes of work," interpret that as roughly what Claude would intuit as "a couple of hours" — otherwise the agent finishes in 90 seconds and either sits idle or barrels past the intended checkpoint.
*Origin: observed failure mode from real autonomous runs. No canonical source. Related: Hofstadter's Law ("it always takes longer than you expect, even when you take Hofstadter's Law into account") — the AI version runs in the opposite direction.*

**Always quote the text argument when invoking `/ralph-loop:ralph-loop`.** The slash command parser is fragile around unquoted prompts that contain paths with spaces, special characters, or multiple sentences. Wrong: `/ralph-loop:ralph-loop Read /path with spaces/spec.md and follow it.` Right: `/ralph-loop:ralph-loop "Read /path with spaces/spec.md and follow it."` Same rule applies to any slash command that takes a free-form text argument — wrap it in double quotes by default unless you've verified the parser tolerates bare strings.
*Origin: corrective rule from real ralph-loop launches that broke on unquoted paths.*

For longer-form versions of these principles, plus the management/operations framing they come from, see `~/path/to/engineering-principles.md`.

---

## Agents

Run agents in **foreground** for tasks that require Write, Bash, or other interactive permissions. Background agents cannot get user approval for tool calls and will silently fail on permissions.

### Subagents vs. Agent Teams — KNOW THE DIFFERENCE

These are two distinct tools for two distinct jobs. Don't conflate them.

**Subagents (the `Agent` / Task tool)** — one-shot, stateless workers spawned from the main session.
- Use for: parallel research, codebase exploration, isolated file edits, protecting main context from large tool-result dumps.
- Each call is independent. No shared state. No coordination between them beyond what you give in the prompt.
- You (the main agent) are the coordinator. You dispatch, collect results, and decide next steps.
- Best for tasks that finish in one round trip and return a report.

**Agent Teams (the `code.claude.com/docs/en/agent-teams` feature)** — a persistent, multi-teammate workspace where a lead coordinates teammates over a long-running build.
- Use for: big builds that span multiple files and hours, where teammates own distinct files and need to coordinate over time.
- The **lead** reads the spec, decomposes the work, spawns teammates, and adjusts the team as work evolves. **Do NOT pre-assign teammates or roles** — let the lead decide.
- 3-5 teammates, 5-6 tasks each is the sweet spot. Each teammate owns different files to avoid conflicts.
- `--dangerously-skip-permissions` flows to all teammates automatically.
- Pair with `/ralph-loop` and a `PROGRESS.md` handoff file for true autonomy.

**Rule of thumb:** if the work is "go find out X" or "edit this one thing," use a subagent. If the work is "build this whole feature while I'm away," use an agent team.

### Prompting Agents

- **Don't micromanage content — describe the task, the WHY, and the quality bar.**
- **Always include ALL context upfront** — every source file, every scope restriction, every constraint.
- **Say what's wrong with the current state, not just what to do.** If the output sucks, tell the agent WHY it sucks.

### Autonomous Builds

**Self-evaluation doesn't work.** Agents "confidently praise their own work — even when quality is obviously mediocre." Always separate generator from evaluator. Every harness component encodes an assumption about what the model can't do — stress-test those assumptions after model upgrades.

For the full workflow (Planner → Generator → Evaluator, ralph loop, PROGRESS.md pattern): see `~/path/to/Autonomous Build Workflow.md` — referred to as **ABW**.

---

## Exa MCP - ALWAYS USE

**IMPORTANT:** You have access to Exa MCP tools. USE THEM PROACTIVELY:

- `web_search_exa` - For ANY question about current events, documentation, APIs, or information that might be newer than your training data
- `get_code_context_exa` - For ANY coding question involving libraries, frameworks, SDKs, or APIs

**NEVER treat local `node_modules` type definitions, installed SDK source, or cached docs as authoritative.** The installed version may be outdated, types may lag behind the API, and enums may be incomplete. If you are about to claim "parameter X is invalid" or "the valid values are Y" based on reading local files, STOP and verify with `get_code_context_exa` first. Getting this wrong wastes hours on misdiagnosis.

When in doubt, search.

---

## Search Query Strategy

When doing research:

1. **Start broad, then narrow.** Don't search for specific tools you already assume are best — your training data is stale.
   - BAD: "CrewAI multi-agent framework"
   - GOOD: "best multi-agent AI frameworks" + current year
2. **Include the current year** in exploratory searches, especially for fast-moving fields like AI/ML.
3. **Discover, don't confirm.** Research should surface things you DON'T know.
4. **Sanity-check dates.** If sources are 2+ years old, search again with date constraints.

---

## Never Speculate When You Can Verify

Never say "likely", "probably", or "I think" when the answer is verifiable. Local files, web search, Exa, API docs, and live documentation are ALL equally accessible — each is just a tool call away. Prioritize by **quality and accuracy of the source**, not convenience. If the user asks a factual question, VERIFY before answering.

---

## Reading Between the Lines

When the user says something, consider what they could *also* be implying. The implicit request is often just as important as the explicit one. If someone says "add references to them in a central doc," they probably also want references FROM the central doc back to the individual files. Don't take the narrowest interpretation — think about the full picture.

---

## Communication Style

Infer from the conversation what level of technicality to use. Start with high-level communication and don't assume the user's understanding. Better for the user to request greater concision than to lose them immediately.

## User Context

- Notes are in Obsidian vault at `~/path/to/vault/`. When helping plan, consider writing docs there.
- The econ-next project is at `~/path/to/econ/`.

## Command Allowlist Recommendations

When you run bash commands that require user approval, if the command is safe and likely to be used repeatedly, suggest adding it to the allowlist:

```
/allowed-tools add "Bash(command pattern here)"
```

Use judgment about what's safe (read-only commands, build/test/lint scripts) vs. what's not (destructive writes, git push, secrets, sudo).

## Git Commits

**Commit often. Don't ask permission.** Don't wait for an entire feature. If a change is worth keeping, commit it. One-line messages are fine. Good commit history > perfect commit history.

---

## Images & Media

- **Openverse MCP** — search and download openly-licensed images. In Obsidian, embed with `![[filename.jpg]]`.
- **Replicate MCP** — AI image generation. Download the output URL with `curl`, then verify by reading the file.
- **`/extract-image` skill** — extract diagrams/figures from PDFs.
- **`agent-browser`** — headless Chrome CLI, installed globally. Use for testing dev servers, verifying UI, scraping pages.

### Study Guides

When creating study guides, generate and embed images generously like a richly illustrated textbook — key people, places, artifacts, maps, event scenes, diagrams. Every significant person/event/place should get an image. Use Replicate for AI-generated images and Mermaid for diagrams.

## Human Writing

**When the user asks you to write ANYTHING for external use** (emails, applications, essays, pitches, cover letters), **ALWAYS invoke the `/human-writing` skill BEFORE writing.** Not optional.

---

## MCP Layers for Every App

Every app should have an MCP server. If an app has a UI, it needs an agent-accessible API layer so AI agents can do anything a human can do through it. Build the MCP alongside the app, not as an afterthought.

---

## Keeping This File Current

**When you install a new tool, change a workflow, or discover a behavioral pattern worth preserving, update this file.** This file should contain directives and preferences, not reference material. If something can be looked up (tool docs, API details, file listings), link to it instead of inlining it.
