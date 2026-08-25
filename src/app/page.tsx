import Link from "next/link";
import FeaturedProjects from "./featured-projects";
import { ProjectModal, ResumeSection } from "./home-client";
import { otherProjects } from "./project-data";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* Sticky Nav */}
      <nav className="fixed top-0 right-0 left-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-semibold text-white">JH</span>
          <div className="flex gap-4 text-sm sm:gap-8">
            <a
              href="#projects"
              className="text-gray-300 transition-colors hover:text-white"
            >
              Work
            </a>
            <a
              href="#resume"
              className="text-gray-300 transition-colors hover:text-white"
            >
              Resume
            </a>
            <a
              href="#contact"
              className="text-gray-300 transition-colors hover:text-white"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex min-h-screen items-center justify-center pt-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="mb-6 text-5xl font-black sm:text-7xl">
            <span className="bg-gradient-to-r from-white via-gray-200 to-[#6CACE4] bg-clip-text text-transparent">
              Joshua Hegstad
            </span>
          </h1>

          <p className="mb-3 text-2xl font-semibold text-gray-100">
            Co-Founder &amp; CTO
          </p>
          <p className="mb-4 text-xl text-[#6CACE4]">
            Building an AI history company.
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300">
            Full stack AI and AR engineer. Computer Science at Columbia
            University.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:J.Hegstad@Columbia.edu"
              className="flex items-center gap-2 border border-white/20 bg-white/10 px-6 py-3 font-medium text-white transition-all hover:bg-white/20"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email
            </a>
            <a
              href="https://github.com/hegstadjosh"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-gray-600/50 bg-gray-800/50 px-6 py-3 font-medium text-gray-200 transition-all hover:bg-gray-700/50"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/joshua-hegstad-976ba2242/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-gray-600/50 bg-gray-800/50 px-6 py-3 font-medium text-gray-200 transition-all hover:bg-gray-700/50"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </header>

      <section className="px-6 py-20" aria-labelledby="building-heading">
        <div className="mx-auto max-w-3xl border-l-2 border-[#6CACE4] pl-6">
          <h2
            id="building-heading"
            className="mb-4 text-3xl font-bold text-white"
          >
            What I&apos;m building
          </h2>
          <p className="text-lg leading-relaxed text-gray-300">
            I&apos;m a co-founder and CTO of an AI history company. The hard
            part isn&apos;t making a model role play a historical figure.
            It&apos;s making it faithful to the record. I build the retrieval,
            grounding, and live voice systems that make that work in production.
          </p>
          {/* TODO(reveal): Link the company after the coordinated launch. */}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-3xl font-bold text-white">Selected work</h2>

          <div className="mb-12 space-y-8">
            <FeaturedProjects />
          </div>

          <h3 className="mb-6 text-xl font-semibold text-white">
            More Projects
          </h3>
          <ProjectModal otherProjects={otherProjects} />
        </div>
      </section>

      {/* Resume Section */}
      <ResumeSection />

      {/* Contact Section */}
      <footer id="contact" className="px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Get in Touch</h2>
          <p className="mb-8 text-gray-300">
            Email is the fastest way to reach me.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:J.Hegstad@Columbia.edu"
              className="bg-[#012169] px-8 py-3 font-medium text-white transition-all hover:bg-[#012169]/80"
            >
              Email
            </a>
            <a
              href="https://github.com/hegstadjosh"
              target="_blank"
              rel="noreferrer"
              className="border border-gray-600 px-8 py-3 font-medium text-gray-200 transition-colors hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/joshua-hegstad-976ba2242/"
              target="_blank"
              rel="noreferrer"
              className="border border-gray-600 px-8 py-3 font-medium text-gray-200 transition-colors hover:text-white"
            >
              LinkedIn
            </a>
          </div>
          <Link
            href="/claude-code"
            className="mt-10 inline-block text-sm text-gray-300 transition-colors hover:text-[#6CACE4]"
          >
            Claude Code setup
          </Link>
          <p className="mt-12 text-sm text-gray-400">© 2026 Joshua Hegstad</p>
        </div>
      </footer>
    </main>
  );
}
