"use client";
import { useState } from "react";
import Link from "next/link";

interface Skill {
  name: string;
  title: string;
  description: string;
  tags: string[];
  size: string;
  category: string;
  why: string;
  how: string;
  invoke: string;
  links?: { label: string; url: string }[];
}

const categories = [
  {
    id: "orchestration",
    label: "Session Orchestration",
    description: "Manage and coordinate Claude Code sessions",
  },
  {
    id: "education",
    label: "Education",
    description: "Turn course materials into study resources",
  },
  {
    id: "corrections",
    label: "Corrections",
    description: "Make Claude less insane and more responsive",
  },
];

const skills: Skill[] = [
  // Session Orchestration
  {
    name: "jarvis",
    title: "Jarvis",
    description:
      '"Jarvis I\'m home" — get oriented on recent sessions, vault changes, commits, and suggested next moves.',
    tags: ["workflow", "context"],
    size: "4.2K",
    category: "orchestration",
    why: "When you sit down at your computer after being away, you need to know: what happened since I left? What's in progress? What should I work on next? This skill reads across your Claude Code sessions, Obsidian vault, git repos, and task system, then synthesizes a unified briefing with concrete next moves ranked by leverage.",
    how: "The skill maintains a cursor file (~/.jarvis/cursor) tracking the last run. On each invocation, it gathers four streams in parallel — recent Claude Code sessions (reads their conversation logs), vault diffs (via git), task state (from River), and commits in active repos. It synthesizes across all streams, identifies what's blocking progress, and proposes next moves. Supports both full sweeps and targeted queries.",
    invoke: "/jarvis",
  },
  {
    name: "manager",
    title: "Session Manager",
    description:
      "Interact with other Claude Code sessions running on your machine. List, message, coordinate, and kill sessions.",
    tags: ["multi-session", "orchestration"],
    size: "6.2K",
    category: "orchestration",
    why: `I originally built a full dashboard app for this called Codeception (github.com/hegstadjosh/codeception) — a Next.js + Rust project with a React UI, WebSocket streaming, session cards, cost tracking, voice input, the works. Built the whole thing in a 2-day sprint: ~24 React components, a full Axum backend, tmux integration, Gemini-powered summaries. It worked, but the gap between ambition and actual need was huge. You had to run a Rust daemon, keep a dashboard open, manage tmux alongside the UI, debug npm packaging. Then I realized: a Claude Code skill that talks to the same Rust backend via curl gets you 90% of the value with zero UI overhead. Combined with Jarvis for recall, it replaced the entire dashboard. The lesson was that transparent automation through skills beats visible complexity.`,
    how: "The skill connects to a lightweight Rust backend (the recon binary from the original Codeception project) on localhost:3100. It auto-starts the backend if it's not running. From there it can list all sessions with their status, search by keyword, read conversation history, send messages to running sessions, kill or resume them, set notes, rename sessions, and trigger AI-powered summaries. During overnight autonomous runs, it acts as the operator — polling sessions on schedule, providing input when agents get stuck, and handling stops without waiting for you to come back.",
    invoke: "/manager",
    links: [
      {
        label: "Codeception (the original dashboard)",
        url: "https://github.com/hegstadjosh/codeception",
      },
    ],
  },
  {
    name: "autonomous-vm",
    title: "Autonomous VM",
    description:
      "Prep and launch autonomous Claude Code sessions in Docker VMs for overnight builds.",
    tags: ["autonomous", "Docker"],
    size: "2.7K",
    category: "orchestration",
    why: "Sometimes you want to hand Claude a spec and walk away — let it build overnight in a sandboxed environment. This skill handles the entire lifecycle: writing a clear spec, setting up the repo, configuring Docker, generating launch commands, and monitoring progress. The VM isolation means a runaway agent can't touch your real filesystem.",
    how: "Walk through the prep steps: define the spec, clone the repo into a Docker volume, configure the container with Claude Code and permissions, then launch. The skill generates the exact Docker commands and monitors the session via logs. Designed to pair with the manager skill for checking on overnight runs.",
    invoke: "/autonomous-vm",
  },
  {
    name: "log-session",
    title: "Log Session",
    description:
      "Log the current session with git commits, timestamps, and resume info.",
    tags: ["workflow", "logging"],
    size: "2.3K",
    category: "orchestration",
    why: "When you finish a work session, you want a record of what happened — which commits were made, what was accomplished, and enough context to resume later. This skill snapshots the session to a JSON file that Jarvis and other skills can read to reconstruct your work timeline.",
    how: 'Invoke when wrapping up. The skill captures the current session ID, working directory, git commits made during the session, timestamps, and a brief summary. Writes to ~/.claude/sessions.json. Designed to feed into the Jarvis skill for cross-session orientation.',
    invoke: "/log-session",
  },

  // Education
  {
    name: "study-guide",
    title: "Study Guide",
    description:
      "Create richly illustrated study guides from course materials — syllabi, textbooks, lecture notes.",
    tags: ["education", "study"],
    size: "3.1K",
    category: "education",
    why: "Studying from raw lecture notes, textbooks, and PDFs is slow. This skill generates comprehensive study guides with AI-generated images (via Replicate), Mermaid diagrams, and structured content — like a richly illustrated textbook chapter tailored to your specific exam. Every significant concept gets a visual.",
    how: "Point it at your course materials — syllabi, lecture PDFs, textbook chapters, homework solutions. The skill analyzes what topics are exam-relevant, extracts key content, generates explanatory diagrams, creates AI images for people/places/artifacts, and outputs a formatted study guide. Works with the extract-image skill to pull diagrams from PDFs.",
    invoke: "/study-guide",
  },
  {
    name: "condense-notes",
    title: "Condense Notes",
    description:
      "Turn verbose lecture notes into concise, documentation-style reference guides.",
    tags: ["education", "notes"],
    size: "1.3K",
    category: "education",
    why: "Lecture notes are verbose by nature — they capture everything said in class. But for exam prep, you need the information density of a reference doc, not the rambling of a transcript. This skill compresses lecture content into tight, scannable reference guides without losing the important details.",
    how: "Feed it lecture notes, transcripts, or verbose study materials. The skill restructures the content into documentation-style format — clear headings, concise definitions, key formulas, and important relationships. Strips the filler while preserving the substance. Pairs with extract-image for pulling diagrams from lecture PDFs.",
    invoke: "/condense-notes",
  },
  {
    name: "extract-image",
    title: "Extract Image",
    description:
      "Extract specific images, diagrams, or figures from PDF files by describing them.",
    tags: ["PDF", "images"],
    size: "6.9K",
    category: "education",
    why: "PDFs are full of useful diagrams, memory layouts, and figures that you want to reference in notes or study guides. But extracting a specific image from a PDF is surprisingly annoying. This skill lets you describe what you want — 'the memory layout diagram on page 3' — and it pulls it out as a standalone image file.",
    how: "Includes a Python script that uses PDF rendering to extract images. Describe the image you want and which PDF it's in. The skill identifies the right page, extracts the region, and saves it as a standalone image. Used automatically by the study-guide and condense-notes skills when processing lecture PDFs.",
    invoke: "/extract-image",
  },

  // Corrections
  {
    name: "second-opinion",
    title: "Second Opinion",
    description:
      "Get a different perspective from other LLMs (GPT, Gemini, Opus, Grok) on design decisions, architecture, or debugging.",
    tags: ["multi-model", "decision-making"],
    size: "3.7K",
    category: "corrections",
    why: "When you're deep in a problem with one model, you develop tunnel vision. This skill lets Claude Code call out to GPT, Gemini, or another Claude instance for an independent take — no shared context, no confirmation bias. Useful for architecture decisions, debugging dead ends, or any judgment call where a second perspective would help.",
    how: "Invoke with a question or context. The skill runs a Python script that queries other models via their APIs (OpenAI, Google AI Studio, Anthropic) with a meta-prompt that tells the other model to think holistically and challenge assumptions. Supports querying one model or all three in parallel. Claude then synthesizes where they agree, disagree, and what it recommends.",
    invoke: "/second-opinion",
  },
  {
    name: "human-writing",
    title: "Human Writing",
    description:
      "Write prose that reads like a real human. Kills AI patterns in essays, emails, cover letters, and any non-code text.",
    tags: ["writing", "anti-AI-voice"],
    size: "4.8K",
    category: "corrections",
    why: "AI-generated text has tells — em-dashes everywhere, \"Furthermore\" transitions, thesis-body-conclusion structure, perfectly balanced arguments, words like \"delve\" and \"nuanced.\" Readers (professors, recruiters, admissions) spot these instantly. This skill encodes a complete writing process and a kill list of AI patterns to produce prose that sounds like a specific human wrote it.",
    how: "The skill enforces a three-phase writing process: before (identify audience, parse the question, find your thesis), during (shift between writer and reader, check connotation of every detail), and after (read as the audience cold, read aloud). It includes specific rules for punctuation, transitions, structure, vocabulary, and tone — plus calibration by context (college essays vs. professional emails vs. applications).",
    invoke: "/human-writing",
  },

  {
    name: "therapy",
    title: "Therapy",
    description:
      "Review logged gripes about Claude's behavior, identify patterns, and design structural fixes.",
    tags: ["meta", "self-improvement"],
    size: "1.7K",
    category: "corrections",
    why: "Claude has recurring behavior problems — over-engineering, excessive hedging, ignoring instructions. Individual corrections fix one instance but don't prevent recurrence. This skill reviews your accumulated gripes (logged via /vent), identifies patterns across them, and designs structural fixes: CLAUDE.md rules, hook scripts, or skill modifications that address the root cause.",
    how: "The skill reads your vent log, clusters complaints by theme, identifies the most impactful patterns, and proposes concrete fixes — not just \"be better\" but specific rules, settings changes, or code modifications. It's the difference between yelling at the model and actually changing its behavior.",
    invoke: "/therapy",
  },
  {
    name: "vent",
    title: "Vent",
    description:
      "Log a gripe about Claude's behavior to the therapy system. Journal-style, not diagnostic.",
    tags: ["meta", "journaling"],
    size: "1.6K",
    category: "corrections",
    why: "When Claude does something frustrating — over-engineers a simple fix, ignores a clear instruction, hedges when you asked for a direct answer — you want to log it while the frustration is fresh. This skill captures the gripe in a structured format that the therapy skill can later analyze for patterns. No analysis, no fixing, just venting.",
    how: "Invoke when Claude does something annoying. Describe what happened and why it was wrong. The skill logs the entry with a timestamp and context to a persistent file. Designed to be fast and low-friction — the analysis happens later when you run /therapy.",
    invoke: "/vent",
  },
];

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-5 h-5"}
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

export default function SkillsPage() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  return (
    <main className="min-h-screen bg-black">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-white font-semibold hover:text-gray-300 transition-colors"
          >
            JH
          </Link>
          <div className="flex gap-8 text-sm">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="pt-32 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Claude Code Skills
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mb-6">
            Custom skills I&apos;ve built for{" "}
            <a
              href="https://claude.ai/code"
              target="_blank"
              className="text-[#6CACE4] hover:underline"
            >
              Claude Code
            </a>
            . Click any skill to see what it does, or just download.
          </p>

          <div className="bg-gray-900/50 border border-gray-700 p-4 max-w-2xl mb-8">
            <p className="text-gray-300 text-sm leading-relaxed">
              <span className="text-white font-semibold">Easiest way to install:</span>{" "}
              Download the zip, then tell Claude{" "}
              <code className="text-[#6CACE4] bg-black px-1.5 py-0.5 text-xs">
                &quot;unzip this and put the skills in the right place&quot;
              </code>
              . Some skills reference files at paths specific to my system (e.g. my
              CLAUDE.md points to docs in{" "}
              <code className="text-gray-300 bg-gray-800 px-1.5 py-0.5 text-xs">
                ~/OneDrive/Obsidian Vault/
              </code>
              ). Claude will spot these and update them for your setup.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/skills/all.zip"
              className="inline-flex items-center gap-2 bg-[#6CACE4] text-black px-6 py-3 font-medium hover:bg-[#6CACE4]/80 transition-all"
            >
              <DownloadIcon />
              Download All
            </a>
            <a
              href="/skills/all-skills.zip"
              className="inline-flex items-center gap-2 bg-transparent text-[#6CACE4] border border-[#6CACE4] px-6 py-3 font-medium hover:bg-[#6CACE4]/10 transition-all"
            >
              <DownloadIcon />
              Skills Only
            </a>
            <a
              href="/skills/all-docs.zip"
              className="inline-flex items-center gap-2 bg-transparent text-[#6CACE4] border border-[#6CACE4] px-6 py-3 font-medium hover:bg-[#6CACE4]/10 transition-all"
            >
              <DownloadIcon />
              Docs Only
            </a>
          </div>
        </div>
      </header>

      {/* Skills by Category */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto space-y-12">
          {categories.map((cat) => {
            const catSkills = skills.filter((s) => s.category === cat.id);
            if (catSkills.length === 0) return null;
            return (
              <div key={cat.id}>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-white">
                    {cat.label}
                  </h2>
                  <p className="text-gray-500 text-sm">{cat.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="bg-gray-900/50 border border-gray-800 p-5 cursor-pointer hover:border-[#6CACE4]/50 transition-all group"
                      onClick={() => setSelectedSkill(skill)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-white font-semibold group-hover:text-[#6CACE4] transition-colors">
                          {skill.title}
                        </h3>
                        <span className="text-gray-600 text-xs">
                          {skill.size}
                        </span>
                      </div>

                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        {skill.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {skill.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-gray-800 text-gray-500 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <a
                          href={`/skills/${skill.name}.zip`}
                          className="text-[#6CACE4] hover:text-white transition-colors flex-shrink-0 ml-3"
                          title={`Download ${skill.title}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <DownloadIcon />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Skill Modal */}
      {selectedSkill && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedSkill(null)}
        >
          <div
            className="bg-gray-900 border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-1">
                <h2 className="text-2xl font-bold text-white">
                  {selectedSkill.title}
                </h2>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <p className="text-gray-400 mb-6">{selectedSkill.description}</p>

              {/* Why */}
              <div className="mb-5">
                <h3 className="text-[#6CACE4] font-semibold text-sm uppercase tracking-wide mb-2">
                  Why?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {selectedSkill.why}
                </p>
              </div>

              {/* How */}
              <div className="mb-6">
                <h3 className="text-[#6CACE4] font-semibold text-sm uppercase tracking-wide mb-2">
                  How?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {selectedSkill.how}
                </p>
              </div>

              {/* Invoke */}
              <div className="mb-6">
                <h3 className="text-gray-500 font-semibold text-sm uppercase tracking-wide mb-2">
                  Invoke
                </h3>
                <code className="text-[#6CACE4] bg-black border border-gray-800 px-3 py-1.5 text-sm inline-block">
                  {selectedSkill.invoke}
                </code>
              </div>

              {/* Links */}
              {selectedSkill.links && selectedSkill.links.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-gray-500 font-semibold text-sm uppercase tracking-wide mb-2">
                    Related
                  </h3>
                  <div className="flex flex-col gap-1">
                    {selectedSkill.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        className="text-[#6CACE4] text-sm hover:underline"
                      >
                        {link.label} →
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {selectedSkill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-800 text-gray-500 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Download */}
              <a
                href={`/skills/${selectedSkill.name}.zip`}
                className="inline-flex items-center gap-2 bg-[#6CACE4] text-black px-5 py-2.5 font-medium hover:bg-[#6CACE4]/80 transition-all"
              >
                <DownloadIcon />
                Download ({selectedSkill.size})
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Docs */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white">Docs</h2>
            <p className="text-gray-500 text-sm">
              The configuration and thinking behind the skills
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                slug: "claude-md",
                title: "My CLAUDE.md",
                description:
                  "The global instructions file that shapes how Claude Code behaves. Engineering principles, agent guidance, and the rules that prevent recurring failure modes.",
              },
              {
                slug: "engineering-principles",
                title: "Engineering Principles",
                description:
                  "19 principles from operations, lean, and management applied to agent workflows. Theory of Constraints, walking skeletons, generator/evaluator separation, and more.",
              },
              {
                slug: "autonomous-build-workflow",
                title: "Autonomous Build Workflow",
                description:
                  "The full playbook for autonomous overnight builds — agent teams, ralph loops, PROGRESS.md handoffs, and the Planner/Generator/Evaluator pattern.",
              },
              {
                slug: "jarvis-spec",
                title: "Jarvis Design Spec",
                description:
                  "The design document written before building the Jarvis skill. How to spec an agent skill — architecture, data sources, behavior, and what to deliberately defer.",
              },
            ].map((doc) => (
              <div
                key={doc.slug}
                className="bg-gray-900/50 border border-gray-800 p-5 hover:border-[#6CACE4]/50 transition-all group"
              >
                <Link
                  href={`/skills/docs/${doc.slug}`}
                  className="block mb-3"
                >
                  <h3 className="text-white font-semibold group-hover:text-[#6CACE4] transition-colors mb-2">
                    {doc.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {doc.description}
                  </p>
                </Link>
                <div className="flex items-center justify-between">
                  <Link
                    href={`/skills/docs/${doc.slug}`}
                    className="text-gray-500 text-xs hover:text-gray-300 transition-colors"
                  >
                    Read →
                  </Link>
                  <a
                    href={`/skills/${doc.slug}.zip`}
                    className="text-[#6CACE4] hover:text-white transition-colors flex-shrink-0"
                    title={`Download ${doc.title}`}
                  >
                    <DownloadIcon />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Instructions */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-800 p-6">
            <h2 className="text-white font-semibold text-lg mb-4">
              Installation
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-400 mb-2">
                  Download and unzip into your skills directory:
                </p>
                <pre className="bg-black border border-gray-800 p-3 text-gray-300 overflow-x-auto">
                  {`# Single skill
unzip human-writing.zip -d ~/.claude/skills/

# All skills
unzip all-skills.zip -d ~/.claude/skills/`}
                </pre>
              </div>
              <div>
                <p className="text-gray-400 mb-2">
                  Each skill is a folder with a{" "}
                  <code className="text-gray-300 bg-gray-800 px-1 py-0.5">
                    SKILL.md
                  </code>{" "}
                  file. Claude Code picks them up automatically — no restart
                  needed.
                </p>
              </div>
              <div>
                <p className="text-gray-400">
                  Invoke with{" "}
                  <code className="text-gray-300 bg-gray-800 px-1 py-0.5">
                    /skill-name
                  </code>{" "}
                  in Claude Code, or let them trigger automatically based on
                  context.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-600 text-sm">
            Built by{" "}
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Joshua Hegstad
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}
