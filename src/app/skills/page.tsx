"use client";
import { useState } from "react";
import Link from "next/link";

const skills = [
  {
    name: "prompt-master",
    title: "Prompt Master",
    description:
      "Generates optimized prompts for any AI tool — LLMs, Cursor, Midjourney, image/video AI, coding agents.",
    tags: ["prompting", "all AI tools"],
    size: "28K",
  },
  {
    name: "human-writing",
    title: "Human Writing",
    description:
      "Write prose that reads like a real human. Kills AI patterns in essays, emails, cover letters, and any non-code text.",
    tags: ["writing", "anti-AI-voice"],
    size: "4.8K",
  },
  {
    name: "second-opinion",
    title: "Second Opinion",
    description:
      "Get a different perspective from other LLMs (GPT, Gemini, Opus, Grok) on design decisions, architecture, or debugging.",
    tags: ["multi-model", "decision-making"],
    size: "3.7K",
  },
  {
    name: "jarvis",
    title: "Jarvis",
    description:
      'Say "Jarvis I\'m home" and get oriented — recent sessions, vault changes, commits, and suggested next moves.',
    tags: ["workflow", "context"],
    size: "4.2K",
  },
  {
    name: "manager",
    title: "Session Manager",
    description:
      "Interact with other Claude Code sessions running on your machine. List, message, coordinate, and kill sessions.",
    tags: ["multi-session", "orchestration"],
    size: "6.2K",
  },
  {
    name: "autonomous-vm",
    title: "Autonomous VM",
    description:
      "Prep and launch autonomous Claude Code sessions in Docker VMs. Spec writing, repo setup, Docker config, and monitoring.",
    tags: ["autonomous", "Docker"],
    size: "2.7K",
  },
  {
    name: "study-guide",
    title: "Study Guide",
    description:
      "Create richly illustrated study guides from course materials — syllabi, textbooks, lecture notes. Generates images and diagrams.",
    tags: ["education", "study"],
    size: "3.1K",
  },
  {
    name: "condense-notes",
    title: "Condense Notes",
    description:
      "Turn verbose lecture notes into concise, documentation-style reference guides. Exam-ready.",
    tags: ["education", "notes"],
    size: "1.3K",
  },
  {
    name: "extract-image",
    title: "Extract Image",
    description:
      "Extract specific images, diagrams, or figures from PDF files by describing them. Includes Python script.",
    tags: ["PDF", "images"],
    size: "6.9K",
  },
  {
    name: "therapy",
    title: "Therapy",
    description:
      "Review logged gripes about Claude's behavior, identify patterns, and design structural fixes for recurring problems.",
    tags: ["meta", "self-improvement"],
    size: "1.7K",
  },
  {
    name: "vent",
    title: "Vent",
    description:
      "Log a gripe about Claude's behavior to the therapy system. Journal-style, not diagnostic.",
    tags: ["meta", "journaling"],
    size: "1.6K",
  },
  {
    name: "log-session",
    title: "Log Session",
    description:
      'Log the current session with git commits, timestamps, and resume info. Use when wrapping up work.',
    tags: ["workflow", "logging"],
    size: "2.3K",
  },
];

export default function SkillsPage() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-black">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-white font-semibold hover:text-gray-300 transition-colors">
            JH
          </Link>
          <div className="flex gap-8 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Claude Code Skills
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mb-8">
            Custom skills I&apos;ve built for{" "}
            <a
              href="https://claude.ai/code"
              target="_blank"
              className="text-[#6CACE4] hover:underline"
            >
              Claude Code
            </a>
            . Download individually or grab them all. Drop into{" "}
            <code className="text-gray-300 bg-gray-800 px-1.5 py-0.5 text-sm">
              ~/.claude/skills/
            </code>{" "}
            and they just work.
          </p>

          <a
            href="/skills/all-skills.zip"
            className="inline-flex items-center gap-2 bg-[#6CACE4] text-black px-6 py-3 font-medium hover:bg-[#6CACE4]/80 transition-all"
          >
            <svg
              className="w-5 h-5"
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
            Download All ({skills.length} skills)
          </a>
        </div>
      </header>

      {/* Skills Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className={`bg-gray-900/50 border p-5 transition-all ${
                  hoveredSkill === skill.name
                    ? "border-[#6CACE4]/50"
                    : "border-gray-800"
                }`}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-white font-semibold">{skill.title}</h3>
                  <span className="text-gray-600 text-xs">{skill.size}</span>
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
                  >
                    <svg
                      className="w-5 h-5"
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
                <p className="text-gray-400 mb-2">Download and unzip into your skills directory:</p>
                <pre className="bg-black border border-gray-800 p-3 text-gray-300 overflow-x-auto">
{`# Single skill
unzip prompt-master.zip -d ~/.claude/skills/

# All skills
unzip all-skills.zip -d ~/.claude/skills/`}
                </pre>
              </div>
              <div>
                <p className="text-gray-400 mb-2">
                  Each skill is a folder with a <code className="text-gray-300 bg-gray-800 px-1 py-0.5">SKILL.md</code> file.
                  Claude Code picks them up automatically — no restart needed.
                </p>
              </div>
              <div>
                <p className="text-gray-400">
                  Invoke with{" "}
                  <code className="text-gray-300 bg-gray-800 px-1 py-0.5">/skill-name</code>{" "}
                  in Claude Code, or let them trigger automatically based on context.
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
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Joshua Hegstad
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}
