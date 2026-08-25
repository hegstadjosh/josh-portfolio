import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const docs: Record<
  string,
  { title: string; description: string; file: string }
> = {
  "claude-md": {
    title: "My CLAUDE.md",
    description:
      "The global instructions file that shapes how Claude Code behaves across all my projects.",
    file: "claude-md.md",
  },
  "engineering-principles": {
    title: "Engineering Principles for Building & Managing Agents",
    description:
      "19 principles from operations, lean, and management — applied to agent workflows. Each one exists because of a specific failure.",
    file: "engineering-principles.md",
  },
  "autonomous-build-workflow": {
    title: "Autonomous Build Workflow (ABW)",
    description:
      "The full playbook for autonomous overnight builds — agent teams, ralph loops, PROGRESS.md handoffs, and the Planner/Generator/Evaluator pattern.",
    file: "autonomous-build-workflow.md",
  },
  "jarvis-spec": {
    title: "Jarvis Design Spec",
    description:
      "The design document written before building the Jarvis skill. Architecture, data sources, behavior, and what was deliberately deferred.",
    file: "jarvis-spec.md",
  },
  "claude-code-landscape": {
    title: "Claude Code Landscape — March 2026",
    description:
      "Survey of the Claude Code ecosystem: power-user patterns, multi-agent orchestrators, memory tools, autonomous execution methods, and key people.",
    file: "claude-code-landscape.md",
  },
};

export function generateStaticParams() {
  return Object.keys(docs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = docs[slug];
  if (!doc) return { title: "Not Found" };
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/skills/docs/${slug}` },
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = docs[slug];
  if (!doc) notFound();

  const contentPath = path.join(
    process.cwd(),
    "src/app/skills/docs/_content",
    doc.file,
  );
  const content = fs.readFileSync(contentPath, "utf-8");

  return (
    <main className="min-h-screen bg-black">
      {/* Nav */}
      <nav className="fixed top-0 right-0 left-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-semibold text-white transition-colors hover:text-gray-300"
          >
            JH
          </Link>
          <div className="flex gap-8 text-sm">
            <Link
              href="/claude-code"
              className="text-gray-400 transition-colors hover:text-white"
            >
              Skills
            </Link>
            <Link
              href="/"
              className="text-gray-400 transition-colors hover:text-white"
            >
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="px-6 pt-32 pb-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/skills"
            className="mb-4 inline-block text-sm text-gray-500 transition-colors hover:text-[#6CACE4]"
          >
            &larr; Back to Claude Code setup
          </Link>
          <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
            {doc.title}
          </h1>
          <p className="text-gray-400">{doc.description}</p>
        </div>
      </header>

      {/* Rendered Markdown */}
      <article className="px-6 pb-20">
        <div className="prose-custom mx-auto max-w-3xl">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="mt-12 mb-4 text-3xl font-bold text-white">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="mt-10 mb-3 border-b border-gray-800 pb-2 text-2xl font-bold text-white">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-8 mb-2 text-xl font-semibold text-white">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="mt-6 mb-2 text-lg font-semibold text-gray-200">
                  {children}
                </h4>
              ),
              p: ({ children }) => (
                <p className="mb-4 leading-relaxed text-gray-300">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-white">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="text-gray-400 italic">{children}</em>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  className="text-[#6CACE4] hover:underline"
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="mb-4 ml-4 list-outside list-disc space-y-1 text-gray-300">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-4 ml-4 list-outside list-decimal space-y-1 text-gray-300">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed text-gray-300">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-4 border-l-2 border-[#6CACE4] pl-4 text-gray-400 italic">
                  {children}
                </blockquote>
              ),
              code: ({ className, children }) => {
                const isBlock = className?.includes("language-");
                if (isBlock) {
                  return (
                    <code className="text-sm text-gray-300">{children}</code>
                  );
                }
                return (
                  <code className="rounded bg-gray-800/50 px-1.5 py-0.5 text-sm text-[#6CACE4]">
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className="mb-4 overflow-x-auto border border-gray-800 bg-gray-900/80 p-4 text-sm">
                  {children}
                </pre>
              ),
              hr: () => <hr className="my-8 border-gray-800" />,
              table: ({ children }) => (
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full border-collapse text-sm text-gray-300">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="border-b border-gray-700 text-white">
                  {children}
                </thead>
              ),
              th: ({ children }) => (
                <th className="px-3 py-2 text-left font-semibold">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border-b border-gray-800 px-3 py-2">
                  {children}
                </td>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </article>

      <footer className="border-t border-gray-800 px-6 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm text-gray-600">
            Built by{" "}
            <Link
              href="/"
              className="text-gray-400 transition-colors hover:text-white"
            >
              Joshua Hegstad
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}
