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
    title: `${doc.title} — Joshua Hegstad`,
    description: doc.description,
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
    doc.file
  );
  const content = fs.readFileSync(contentPath, "utf-8");

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
              href="/skills"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Skills
            </Link>
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
      <header className="pt-32 pb-8 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/skills"
            className="text-gray-500 text-sm hover:text-[#6CACE4] transition-colors mb-4 inline-block"
          >
            &larr; Back to Skills
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {doc.title}
          </h1>
          <p className="text-gray-400">{doc.description}</p>
        </div>
      </header>

      {/* Rendered Markdown */}
      <article className="px-6 pb-20">
        <div className="max-w-3xl mx-auto prose-custom">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-white mt-12 mb-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-white mt-10 mb-3 pb-2 border-b border-gray-800">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold text-white mt-8 mb-2">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg font-semibold text-gray-200 mt-6 mb-2">
                  {children}
                </h4>
              ),
              p: ({ children }) => (
                <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="text-white font-semibold">{children}</strong>
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
                <ul className="text-gray-300 space-y-1 mb-4 ml-4 list-disc list-outside">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="text-gray-300 space-y-1 mb-4 ml-4 list-decimal list-outside">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-300 leading-relaxed">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-[#6CACE4] pl-4 my-4 text-gray-400 italic">
                  {children}
                </blockquote>
              ),
              code: ({ className, children }) => {
                const isBlock = className?.includes("language-");
                if (isBlock) {
                  return (
                    <code className="text-gray-300 text-sm">{children}</code>
                  );
                }
                return (
                  <code className="text-[#6CACE4] bg-gray-800/50 px-1.5 py-0.5 text-sm rounded">
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className="bg-gray-900/80 border border-gray-800 p-4 overflow-x-auto mb-4 text-sm">
                  {children}
                </pre>
              ),
              hr: () => <hr className="border-gray-800 my-8" />,
              table: ({ children }) => (
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm text-gray-300 border-collapse">
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
                <th className="text-left px-3 py-2 font-semibold">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-3 py-2 border-b border-gray-800">
                  {children}
                </td>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </article>

      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
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
