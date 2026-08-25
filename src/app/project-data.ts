export const featuredProjects = [
  {
    name: "Debt Vulture",
    description:
      "Bankruptcy intelligence platform for distressed debt investors. Monitors PACER filings in real time, extracts structured data from legal documents, and maps affected public companies. First paying customer is a hedge fund.",
    technologies: ["Next.js", "Python", "Supabase", "PACER", "CourtListener"],
    previewImage: "/debt-vulture-logo.png",
    link: "/debt-vulture",
  },
  {
    name: "AlignEd",
    description:
      "Two-sided AI education platform where teachers manage classrooms and assignments, and learners turn course materials into shareable study artifacts. Sole engineer, built as a Research Assistant at Columbia.",
    technologies: ["Next.js", "TypeScript", "AI"],
    link: "https://alnd.ai",
  },
  {
    name: "Simetic",
    description:
      "Multi-agent simulation laboratory. AI agents carry persistent memory, form insights through reflection, and negotiate under enforced information asymmetry.",
    technologies: [
      "Next.js",
      "Python",
      "LangGraph",
      "FastAPI",
      "AWS Fargate",
      "MCP",
    ],
  },
  {
    name: "NASA SUITS",
    description:
      "Scaled a team to 20 engineers and built an AR astronaut guidance system tested at Johnson Space Center with NASA engineers.",
    technologies: ["Unity", "C#", "HoloLens 2", "Snap Spectacles"],
    previewImage: "/nasa-suits.webp",
    link: "https://www.nasa.gov/learning-resources/spacesuit-user-interface-technologies-for-students/",
  },
  {
    name: "NLP Hallucination Mitigation",
    description:
      "Three-stage pipeline reducing LLM hallucinations in closed-book QA. It reached 97.5% precision in hallucination detection and improved Selective F1 from 0.50 to 0.70.",
    technologies: ["Python", "PyTorch", "HuggingFace", "LoRA/QLoRA", "RL"],
    link: "/nlp-paper.pdf",
  },
];

export const otherProjects = [
  {
    name: "Josh-OS",
    description:
      "AI agent with persistent memory, semantic search, and live voice mode. Integrates GitHub, Obsidian, Gmail, and Calendar through tool calling.",
    technologies: [
      "Claude Agent SDK",
      "Next.js",
      "TypeScript",
      "Supabase",
      "Fly.io",
      "LiveKit",
    ],
    demoImages: ["/josh-os-demo-1.png", "/josh-os-demo-2.png"],
    details: [
      "Persistent memory and semantic search",
      "Live voice mode via LiveKit",
      "GitHub, Obsidian, Gmail, and Calendar integration",
    ],
  },
  {
    name: "Puriphico",
    description:
      "Hand hygiene compliance monitoring dashboard for healthcare facilities.",
    technologies: ["Next.js", "Supabase", "Recharts"],
    link: "https://puriphico.com",
    details: [
      "Real-time session tracking from IoT devices",
      "Customizable compliance thresholds",
      "Multi-location management with CSV export",
    ],
  },
  {
    name: "ArcaTracker",
    description: "Mobile-first productivity tracker for focus sessions.",
    technologies: ["Next.js", "React", "TypeScript"],
    link: "https://arcatracker.com",
    details: [
      "Log focus sessions",
      "Follow friends and track consistency",
      "Streak tracking and analytics",
    ],
  },
  {
    name: "Don't Fret!",
    description:
      "AR guitar trainer for Snap Spectacles with live chord overlays.",
    technologies: ["Lens Studio", "Snap Spectacles"],
    details: [
      "Started as a Flask app with a chord database",
      "Generated ASCII jazz chord diagrams",
      "Evolved into AR with live chord overlays",
    ],
  },
];
