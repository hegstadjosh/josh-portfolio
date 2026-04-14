import Link from "next/link";
import ClaudeSetupSection from "../claude-setup-section";

export default function SkillsPage() {
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

      <div className="pt-16">
        <ClaudeSetupSection />
      </div>

      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
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
