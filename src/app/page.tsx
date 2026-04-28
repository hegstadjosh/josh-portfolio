import ClaudeSetupSection from "./claude-setup-section";
import { ProjectModal, ResumeSection } from "./home-client";

const featuredProjects = [
  {
    name: "AlignEd",
    description: "Two-sided AI education platform where teachers manage classrooms and assignments, and students turn their course materials into shareable study artifacts (flashcards, quizzes, LaTeX problem sets, podcasts). Sole engineer, built as Research Assistant at Columbia.",
    technologies: ["Next.js", "TypeScript", "AI"],
    embedUrl: "https://alnd.ai",
  },
  {
    name: "Debt Vulture",
    description: "Bankruptcy intelligence platform for distressed debt investors. Monitors PACER filings in real time, extracts structured data from legal documents, and maps affected public companies. Includes a multi-agent simulation engine where AI agents carry persistent memory, form insights through reflection, and negotiate under enforced information asymmetry. Domain-agnostic: same architecture runs bankruptcy, geopolitical, and M&A scenarios. First paying customer is a hedge fund.",
    technologies: ["Next.js", "Python", "LangGraph", "Supabase", "PACER"],
    previewImage: "/debt-vulture-sim.png",
    link: "/debt-vulture",
  },
  {
    name: "NLP Hallucination Mitigation",
    description: "Three-stage pipeline (CoT distillation, abstention fine-tuning, RLVF) reducing LLM hallucinations in closed-book QA. 97.5% precision in hallucination detection; Selective F1 improved from 0.50 to 0.70.",
    technologies: ["Python", "PyTorch", "HuggingFace", "LoRA/QLoRA", "RL"],
    embedUrl: "/nlp-paper.pdf",
  },
  {
    name: "NASA SUITS",
    description: "Scaled team to 20 engineers; built AR astronaut guidance system tested at Johnson Space Center with NASA engineers.",
    technologies: ["Unity", "C#", "HoloLens 2", "Snap Spectacles"],
    previewImage: "/nasa-suits.webp",
    link: "https://www.nasa.gov/learning-resources/spacesuit-user-interface-technologies-for-students/",
  },
];

const otherProjects = [
  {
    name: "Josh-OS",
    description: "AI agent with persistent memory, semantic search, and live voice mode. Integrates GitHub, Obsidian, Gmail, Calendar via tool-calling.",
    technologies: ["Claude Agent SDK", "Next.js", "TypeScript", "Supabase", "Fly.io", "LiveKit"],
    demoImages: ["/josh-os-demo-1.png", "/josh-os-demo-2.png"],
    details: ["Persistent memory and semantic search", "Live voice mode via LiveKit", "GitHub, Obsidian, Gmail, Calendar integration via tool-calling"],
  },
  {
    name: "Puriphico",
    description: "Hand hygiene compliance monitoring dashboard for healthcare facilities.",
    technologies: ["Next.js", "Supabase", "Recharts"],
    link: "https://puriphico.com",
    details: ["Real-time session tracking from IoT devices", "Customizable compliance thresholds", "Multi-location management with CSV export"],
  },
  {
    name: "ArcaTracker",
    description: "Mobile-first productivity tracker for focus sessions.",
    technologies: ["Next.js", "React", "TypeScript"],
    link: "https://arcatracker.com",
    details: ["Log 'Lock-In' focus sessions", "Follow friends and track consistency", "Streak tracking and analytics"],
  },
  {
    name: "Don't Fret!",
    description: "AR guitar trainer for Snap Spectacles with live chord overlays.",
    technologies: ["Lens Studio", "Snap Spectacles"],
    details: ["Started as Flask web app with chord database", "Dynamically generated ASCII jazz chord diagrams", "Evolved to AR with live chord overlays"],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-white font-semibold">JH</span>
          <div className="flex gap-8 text-sm">
            <a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a>
            <a href="#claude-setup" className="text-gray-400 hover:text-white transition-colors">Claude Code Setup</a>
            <a href="#resume" className="text-gray-400 hover:text-white transition-colors">Resume</a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-[#6CACE4] bg-clip-text text-transparent">
              Joshua Hegstad
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-4">Computer Science @ Columbia University</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Full-stack engineer building AI and AR products.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:J.Hegstad@Columbia.edu" className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3 font-medium hover:bg-white/20 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
            <a href="https://github.com/hegstadjosh" target="_blank" className="flex items-center gap-2 bg-gray-800/50 border border-gray-600/50 text-gray-200 px-6 py-3 font-medium hover:bg-gray-700/50 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/joshua-hegstad-976ba2242/" target="_blank" className="flex items-center gap-2 bg-gray-800/50 border border-gray-600/50 text-gray-200 px-6 py-3 font-medium hover:bg-gray-700/50 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </header>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Projects</h2>

          <div className="space-y-8 mb-12">
            {featuredProjects.map((project) => (
              <div key={project.name} className="bg-gray-900/50 border border-gray-800 overflow-hidden">
                <div className="h-[400px] bg-black">
                  {"embedUrl" in project && project.embedUrl ? (
                    <iframe
                      src={project.embedUrl}
                      title={project.name}
                      className="w-full h-full"
                      loading="lazy"
                    />
                  ) : "previewImage" in project && project.previewImage ? (
                    <img
                      src={project.previewImage}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="p-6">
                  <h3 className="text-white text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {"link" in project && project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      className="text-[#6CACE4] text-sm hover:underline"
                    >
                      Learn more →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-white mb-6">More Projects</h3>
          <ProjectModal otherProjects={otherProjects} />
        </div>
      </section>

      {/* Claude Code Setup Section */}
      <ClaudeSetupSection />

      {/* Resume Section */}
      <ResumeSection />

      {/* Contact Section */}
      <footer id="contact" className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-gray-400 mb-8">
            Interested in AI, AR, or building something new?
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="mailto:J.Hegstad@Columbia.edu"
              className="bg-[#012169] text-white px-8 py-3 font-medium hover:bg-[#012169]/80 transition-all"
            >
              Email
            </a>
          </div>
          <p className="text-gray-600 text-sm mt-12">© 2026 Joshua Hegstad</p>
        </div>
      </footer>
    </main>
  );
}
