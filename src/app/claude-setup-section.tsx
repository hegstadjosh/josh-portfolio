import fs from "fs";
import path from "path";
import SkillsTree, { type TreeNode } from "./skills/skills-tree";

function DownloadIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
}

function readDoc(filename: string): string {
  return fs.readFileSync(
    path.join(process.cwd(), "src/app/skills/docs/_content", filename),
    "utf-8"
  );
}

function readSkill(name: string): string {
  return fs.readFileSync(
    path.join(process.cwd(), "src/app/skills/_skill-content", `${name}.md`),
    "utf-8"
  );
}

function readPublic(filename: string): string {
  return fs.readFileSync(
    path.join(process.cwd(), "public/skills", filename),
    "utf-8"
  );
}

export default function ClaudeSetupSection() {
  const entries: TreeNode[] = [
    {
      type: "file",
      entry: {
        name: "",
        filename: "README.md",
        description: "Setup instructions",
        downloadUrl: "/skills/README.md",
        readContent: readPublic("README.md"),
      },
    },
    {
      type: "folder",
      name: "skills",
      description: "~/.claude/skills/",
      children: [
        {
          type: "folder",
          name: "orchestration",
          description: "Manage and coordinate sessions",
          children: [
            {
              type: "file",
              entry: {
                name: "jarvis",
                filename: "SKILL.md",
                description: "Get oriented on recent sessions, vault changes, commits, and next moves",
                downloadUrl: "/skills/jarvis.zip",
                readContent: readSkill("jarvis"),
                detail: {
                  why: "After being away, you need to know: what happened, what's in progress, what to work on next. This skill reads across your Claude Code sessions, Obsidian vault, git repos, and task system, then synthesizes a briefing with concrete next moves ranked by leverage.",
                  how: "Maintains a cursor file (~/.jarvis/cursor) tracking the last run. Gathers four streams in parallel — session logs, vault diffs, task state, and commits. Synthesizes across all streams, identifies what's blocking progress, and proposes next moves.",
                  invoke: "/jarvis",
                },
              },
            },
            {
              type: "file",
              entry: {
                name: "manager",
                filename: "SKILL.md",
                description: "Interact with other Claude Code sessions — list, message, coordinate, kill",
                downloadUrl: "/skills/manager.zip",
                readContent: readSkill("manager"),
                detail: {
                  why: "When you're running multiple Claude Code sessions — overnight builds, parallel research, team agents — you need a way to see what they're all doing, send them messages, and intervene when they get stuck. This skill turns any session into an operator that can manage the others.",
                  how: "Connects to a lightweight Rust backend (recon) on localhost:3100. Auto-starts it. Lists sessions, searches, reads history, sends messages, kills/resumes, triggers AI summaries. Acts as operator during overnight autonomous runs.",
                  invoke: "/manager",
                  dependencies: "Requires the claude-manager backend (Rust). Clone hegstadjosh/codeception and build with cargo.",
                  links: [{ label: "Codeception repo", url: "https://github.com/hegstadjosh/codeception" }],
                },
              },
            },
            {
              type: "file",
              entry: {
                name: "autonomous-vm",
                filename: "SKILL.md",
                description: "Prep and launch autonomous Claude Code sessions in Docker VMs",
                downloadUrl: "/skills/autonomous-vm.zip",
                readContent: readSkill("autonomous-vm"),
                detail: {
                  why: "Hand Claude Code a spec and walk away — let it build overnight in a sandboxed environment. VM isolation means a runaway agent can't touch your real filesystem.",
                  how: "Define the spec, clone the repo into a Docker volume, configure the container with Claude Code and permissions, then launch. Generates the exact Docker commands. Pairs with the manager skill for monitoring.",
                  invoke: "/autonomous-vm",
                },
              },
            },
            {
              type: "file",
              entry: {
                name: "log-session",
                filename: "SKILL.md",
                description: "Log the current session with git commits, timestamps, and resume info",
                downloadUrl: "/skills/log-session.zip",
                readContent: readSkill("log-session"),
                detail: {
                  why: "When you finish a work session, you want a record — which commits were made, what was accomplished, enough context to resume later.",
                  how: "Captures session ID, working directory, git commits, timestamps, and a brief summary. Writes to ~/.claude/sessions.json. Feeds into the Jarvis skill for cross-session orientation.",
                  invoke: "/log-session",
                },
              },
            },
            {
              type: "file",
              entry: {
                name: "consult",
                filename: "SKILL.md",
                description: "Ask another running Claude Code session a question and get knowledge back",
                downloadUrl: "/skills/consult.zip",
                readContent: readSkill("consult"),
                detail: {
                  why: "When one session has context you need — docs it read, decisions it made — you shouldn't have to re-read everything. This skill finds the right session, sends it the question, and brings back the answer. Both sessions are aware of the interaction.",
                  how: "Searches for the target session via the manager API, sends a consult message with correlation tracking, polls for the response. Falls back to targeted summarization if the session is unreachable. Uses tmux capture-pane for live monitoring.",
                  invoke: "/consult",
                  dependencies: "Requires the claude-manager backend (same as manager skill). Clone hegstadjosh/codeception and build with cargo.",
                },
              },
            },
          ],
        },
        {
          type: "folder",
          name: "corrections",
          description: "Make Claude Code less insane and more responsive",
          children: [
            {
              type: "file",
              entry: {
                name: "second-opinion",
                filename: "SKILL.md",
                description: "Get a different perspective from other LLMs (GPT, Gemini, Grok)",
                downloadUrl: "/skills/second-opinion.zip",
                readContent: readSkill("second-opinion"),
                detail: {
                  why: "When you're deep in a problem with one model, you develop tunnel vision. Call out to other LLMs for an independent take — no shared context, no confirmation bias.",
                  how: "Runs a Python script that queries other models via their APIs with a meta-prompt to think holistically and challenge assumptions. Supports one model or all in parallel.",
                  invoke: "/second-opinion",
                  dependencies: "Needs API keys: OPENAI_API_KEY, GEMINI_API_KEY, XAI_API_KEY, and/or ANTHROPIC_API_KEY. Works with any subset.",
                },
              },
            },
            {
              type: "file",
              entry: {
                name: "human-writing",
                filename: "SKILL.md",
                description: "Write prose that reads like a real human — kills AI patterns",
                downloadUrl: "/skills/human-writing.zip",
                readContent: readSkill("human-writing"),
                detail: {
                  why: 'AI text has tells — em-dashes, "Furthermore" transitions, words like "delve." This skill encodes a writing process and a kill list of AI patterns.',
                  how: "Three-phase process: before (audience, question, thesis), during (writer/reader shift, connotation check), after (cold read, read aloud). Rules for punctuation, transitions, structure, tone.",
                  invoke: "/human-writing",
                },
              },
            },
            {
              type: "file",
              entry: {
                name: "therapy",
                filename: "SKILL.md",
                description: "Review logged gripes, identify patterns, design structural fixes",
                downloadUrl: "/skills/therapy.zip",
                readContent: readSkill("therapy"),
                detail: {
                  why: "Claude Code has recurring behavior problems. Individual corrections don't prevent recurrence. This skill reviews accumulated gripes, identifies patterns, and designs structural fixes.",
                  how: 'Reads your vent log, clusters by theme, proposes concrete fixes — specific rules, settings changes, or code modifications. Not "be better" but actual changes.',
                  invoke: "/therapy",
                },
              },
            },
            {
              type: "file",
              entry: {
                name: "vent",
                filename: "SKILL.md",
                description: "Log a gripe about Claude Code's behavior to the therapy system",
                downloadUrl: "/skills/vent.zip",
                readContent: readSkill("vent"),
                detail: {
                  why: "Log frustrations while they're fresh. Captures the gripe in a structured format for the therapy skill to analyze later.",
                  how: "Describe what happened and why it was wrong. Logs with timestamp and context. Fast, low-friction. Analysis happens when you run /therapy.",
                  invoke: "/vent",
                },
              },
            },
          ],
        },
        {
          type: "folder",
          name: "education",
          description: "Turn course materials into study resources",
          children: [
            {
              type: "file",
              entry: {
                name: "study-guide",
                filename: "SKILL.md",
                description: "Create richly illustrated study guides from course materials",
                downloadUrl: "/skills/study-guide.zip",
                readContent: readSkill("study-guide"),
                detail: {
                  why: "Generates comprehensive study guides with AI-generated images (via Replicate), Mermaid diagrams, and structured content — like a richly illustrated textbook chapter tailored to your specific exam.",
                  how: "Analyzes course materials for exam-relevant topics, extracts key content, generates diagrams and AI images, outputs a formatted study guide. Works with extract-image for pulling diagrams from PDFs.",
                  invoke: "/study-guide",
                },
              },
            },
            {
              type: "file",
              entry: {
                name: "condense-notes",
                filename: "SKILL.md",
                description: "Turn verbose lecture notes into concise reference guides",
                downloadUrl: "/skills/condense-notes.zip",
                readContent: readSkill("condense-notes"),
                detail: {
                  why: "For exam prep, you need the information density of a reference doc, not the rambling of a transcript. Compresses lecture content into tight, scannable guides.",
                  how: "Restructures content into documentation-style format — clear headings, concise definitions, key formulas, important relationships. Strips filler, preserves substance.",
                  invoke: "/condense-notes",
                },
              },
            },
            {
              type: "file",
              entry: {
                name: "extract-image",
                filename: "SKILL.md",
                description: "Extract specific images or diagrams from PDFs by describing them",
                downloadUrl: "/skills/extract-image.zip",
                readContent: readSkill("extract-image"),
                detail: {
                  why: "PDFs are full of useful diagrams you want in notes or study guides, but extracting a specific image is annoying. Describe what you want — 'the memory layout diagram on page 3' — and it pulls it out as a standalone image file.",
                  how: "Python script using PDF rendering and Gemini vision. Identifies the right page, extracts the region, saves as standalone image.",
                  invoke: "/extract-image",
                  dependencies: "Requires Poppler (pdftoppm), Pillow, and a Gemini API key.",
                },
              },
            },
          ],
        },
      ],
    },
    {
      type: "folder",
      name: "docs",
      description: "Reference documents",
      children: [
        {
          type: "file",
          entry: {
            name: "",
            filename: "CLAUDE.md",
            description: "My global CLAUDE.md — engineering principles, agent guidance, behavioral rules",
            downloadUrl: "/skills/claude-md.zip",
            readContent: readDoc("claude-md.md"),
            detail: {
              why: "The global instructions file that loads into every Claude Code session. Contains engineering principles (read before you write, walking skeleton first, find the bottleneck), agent coordination rules, search strategy, and behavioral corrections accumulated from real failure modes.",
              how: "Lives at ~/.claude/CLAUDE.md. Claude Code reads it automatically at session start. Paths are genericized — update them to match your system.",
            },
          },
        },
        {
          type: "file",
          entry: {
            name: "",
            filename: "engineering-principles.md",
            description: "19 principles from operations, lean, and management applied to agent workflows",
            downloadUrl: "/skills/engineering-principles.zip",
            readContent: readDoc("engineering-principles.md"),
            detail: {
              why: "Each principle exists because of a specific failure. Covers Theory of Constraints, walking skeletons, generator/evaluator separation, Fermi estimation, premature optimization, and more — all applied to managing AI agents, not just human teams.",
              how: "Reference document. The CLAUDE.md file contains the short versions; this has the full write-ups with origins, failure modes, and worked examples.",
            },
          },
        },
        {
          type: "file",
          entry: {
            name: "",
            filename: "autonomous-build-workflow.md",
            description: "Playbook for autonomous overnight builds — agent teams, ralph loops, Planner/Generator/Evaluator",
            downloadUrl: "/skills/autonomous-build-workflow.zip",
            readContent: readDoc("autonomous-build-workflow.md"),
            detail: {
              why: "The protocol for handing Claude Code a spec and walking away. Covers the Planner/Generator/Evaluator separation, ralph loops for persistent iteration, PROGRESS.md as the handoff artifact, agent team coordination, and the specific rules that prevent agents from spinning or drifting.",
              how: "Reference document. Skills like autonomous-vm and manager implement parts of this workflow. Read this first to understand the overall pattern.",
            },
          },
        },
        {
          type: "file",
          entry: {
            name: "",
            filename: "jarvis-spec.md",
            description: "Design spec for the Jarvis skill — architecture, data sources, what to deliberately defer",
            downloadUrl: "/skills/jarvis-spec.zip",
            readContent: readDoc("jarvis-spec.md"),
            detail: {
              why: "A worked example of how to spec an agent skill before building it. Covers data sources (session logs, vault diffs, git, tasks), output format, cursor management, and what was deliberately deferred to avoid over-engineering.",
              how: "Reference document. The actual Jarvis skill was built from this spec. Useful as a template if you're designing your own skills.",
            },
          },
        },
        {
          type: "file",
          entry: {
            name: "",
            filename: "claude-code-landscape.md",
            description: "Survey of the Claude Code ecosystem: power-user patterns, orchestrators, memory tools, key people (March 2026)",
            downloadUrl: "/skills/claude-code-landscape.zip",
            readContent: readDoc("claude-code-landscape.md"),
            detail: {
              why: "Snapshot of the Claude Code ecosystem as of March 2026. Covers how power users structure their setups (4-layer system), multi-agent orchestrators (Gas Town, OpenClaw, KERNEL), memory tools, autonomous execution methods, and the key people building in the space.",
              how: "Compiled from X/Twitter via Grok API + Exa web search. Point-in-time survey, not continuously updated.",
            },
          },
        },
      ],
    },
  ];

  return (
    <section id="claude-setup" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">
          Claude Code Setup
        </h2>
        <p className="text-base text-gray-400 max-w-2xl mb-6">
          I tutor non-technical professionals on AI. The thing I keep
          learning:{" "}
          <a
            href="https://claude.ai/code"
            target="_blank"
            className="text-[#6CACE4] hover:underline"
          >
            Claude Code
          </a>
          {" "}ships like a MacBook Pro with no software installed. Writing
          clear instructions, documenting failure modes, and building
          repeatable workflows-- that&apos;s the software. Here&apos;s mine!
        </p>

        <p className="text-base text-gray-400 max-w-2xl mb-3">
          The orchestration skills get the most use. I usually have 5+
          Claude Code sessions running at once, and Jarvis, Manager, and
          Consult are how I keep track of what they&apos;re all doing.
          Jarvis reads my recent sessions, git commits, and vault changes
          so the current session knows what I&apos;ve been up to without me
          explaining it. Manager lets any
          session monitor, message, or kill the others. Consult lets one
          session ask another session a question without me switching
          windows. For overnight builds I hand a spec to the autonomous-vm
          skill and check in the morning.
        </p>
        <p className="text-base text-gray-400 max-w-2xl mb-6">
          The corrections skills exist because Claude Code has habits that
          drive me crazy. It over-engineers, hedges when I want a direct
          answer, and writes prose that sounds like AI. So I built /vent to
          log the frustration while it&apos;s fresh, /therapy to cluster the
          gripes and design actual fixes (CLAUDE.md rules, hook scripts),
          /human-writing to kill AI patterns in anything it writes for me,
          and /second-opinion to break tunnel vision by querying GPT or
          Gemini for an independent take.
        </p>

        <div className="bg-gray-900/50 border border-gray-700 p-4 max-w-2xl mb-8">
          <p className="text-gray-300 text-sm leading-relaxed">
            <span className="text-white font-semibold">
              Easiest way to install:
            </span>{" "}
            Download All, extract the zip, and point Claude Code at it.
            The zip includes a README with setup instructions that Claude
            Code will read and follow — it&apos;ll ask you where to put things
            and handle the rest.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <a
            href="/skills/all.zip"
            className="inline-flex items-center gap-2 bg-[#6CACE4] text-black px-5 py-2.5 text-sm font-medium hover:bg-[#6CACE4]/80 transition-all"
          >
            <DownloadIcon />
            Download All
          </a>
          <a
            href="/skills/all-skills.zip"
            className="inline-flex items-center gap-2 bg-transparent text-[#6CACE4] border border-[#6CACE4] px-5 py-2.5 text-sm font-medium hover:bg-[#6CACE4]/10 transition-all"
          >
            <DownloadIcon />
            Skills Only
          </a>
          <a
            href="/skills/all-docs.zip"
            className="inline-flex items-center gap-2 bg-transparent text-[#6CACE4] border border-[#6CACE4] px-5 py-2.5 text-sm font-medium hover:bg-[#6CACE4]/10 transition-all"
          >
            <DownloadIcon />
            Docs Only
          </a>
        </div>

        <SkillsTree entries={entries} />
      </div>
    </section>
  );
}
