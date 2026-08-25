import type { Metadata } from "next";
import Link from "next/link";
import ClaudeSetupSection from "../claude-setup-section";

export const metadata: Metadata = {
  title: "Claude Code Setup",
  description:
    "The Claude Code skills and operating setup Joshua Hegstad uses to build and coordinate AI software.",
  alternates: { canonical: "/claude-code" },
};

export default function ClaudeCodePage() {
  return (
    <main className="min-h-screen bg-black">
      <nav className="border-b border-gray-800 bg-black/90 px-6 py-4">
        <div className="mx-auto flex max-w-4xl justify-between">
          <Link href="/" className="font-semibold text-white">
            JH
          </Link>
          <Link
            href="/"
            className="text-gray-300 transition-colors hover:text-white"
          >
            Home
          </Link>
        </div>
      </nav>
      <ClaudeSetupSection />
      <footer className="border-t border-gray-800 px-6 py-12 text-center">
        <Link
          href="/"
          className="text-sm text-gray-300 transition-colors hover:text-white"
        >
          Joshua Hegstad
        </Link>
      </footer>
    </main>
  );
}
