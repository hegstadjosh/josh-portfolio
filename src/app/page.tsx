"use client";
import { useState } from "react";
import ResumeModal from "./_components/ResumeModal";

export default function Home() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const workExperience = [
    {
      title: "Software Engineer/Product Manager",
      company: "Research Assistant, Dean of Social Sciences, Columbia University",
      duration: "Jun 2025 - Present",
      location: "New York, NY",
      description: "Independently building an AI courseware platform, including study tools for students and assignment creation & grading tools for teachers.",
      technologies: ["TypeScript", "React", "Next.js", "Vercel AI SDK"]
    },
    {
      title: "Software Engineer",
      company: "Pure Poker",
      duration: "May 2025 - Aug 2025",
      location: "New York, NY",
      achievements: [
        "Re-designed dozens of vital UI components using TypeScript, React, and Next.js to improve user experience",
        "Set up the fees system and deposit/withdrawal UIs, earning first revenue; implemented private games feature",
        "Created AI Avatar generation feature for all users, establishing a funnel for monetization",
        "Used serverless backend infrastructure including AWS Lambda, Step Functions, and DynamoDB"
      ],
      technologies: ["TypeScript", "React", "Next.js", "AWS Lambda", "Step Functions", "DynamoDB"],
      link: "https://purepoker.club"
    },
    {
      title: "Software Engineer Intern",
      company: "AMLAH - Real Estate Startup",
      duration: "Jan 2025 - Aug 2025",
      location: "New York, NY",
      achievements: [
        "Designed the platform with React, Javascript, and MongoDB, shipping the website & user waitlist ahead of schedule",
        "Managed the application on AWS (EC2, S3, Cognito, CloudWatch); fixed 10+ critical bugs and security vulnerabilities"
      ],
      technologies: ["React", "JavaScript", "MongoDB", "AWS EC2", "S3", "Cognito", "CloudWatch"]
    },
    {
      title: "Software Engineer Contractor",
      company: "Standard Partners Fund LP",
      duration: "Dec 2024 - Feb 2025",
      location: "New York, NY",
      achievements: [
        "Created Investor Goggles, a web and AR platform providing market insights using LLMs and financial APIs",
        "Deployed and tested platform in the field with hedge fund investors, gathering feedback to refine product features"
      ],
      technologies: ["LLMs", "Financial APIs", "AR", "Web Development"]
    },
    {
      title: "Cybersecurity and Field Automation Intern",
      company: "Hess Corporation",
      duration: "May 2024 - Aug 2024",
      location: "Minot, ND",
      achievements: [
        "Developed secure LLM tools to automate cybersecurity analysis workflows within stringent data security constraints",
        "Identified and documented 100+ vulnerabilities by analyzing cybersecurity policies, network traffic, and device data"
      ],
      technologies: ["Python", "LLMs", "Cybersecurity", "Network Analysis"]
    }
  ];

  const leadership = [
    {
      title: "Co-Leader, Developer",
      organization: "Columbia Space Initiative - NASA SUITS Challenge",
      duration: "Jan 2024 - May 2025",
      location: "New York, NY",
      description: "Leading AR astronaut guidance system development",
      achievements: [
        "Scaled software team 2x (to 20 engineers) and directed development of augmented reality astronaut guidance system",
        "Implemented Agile development workflows; secured funding by co-authoring successful NASA & NY Space Grant proposals",
        "Successfully tested AR system at Johnson Space Center; collaborated with NASA engineers and Wichita State University"
      ],
      technologies: ["Unity", "C#", "TypeScript", "HoloLens 2", "Snap Spectacles"],
      link: undefined
    },
    {
      title: "Founder",
      organization: "Homebrew Computer Club",
      duration: "Feb 2025 - Present",
      location: "New York, NY",
      description: "Columbia's tech project hub",
      achievements: [
        "Co-founded Columbia's tech project hub, securing funding & growing membership to 20+ students",
        "Built website under time pressure to launch on 50th Anniversary of Silicon Valley Homebrew Computer Club"
      ],
      technologies: [],
      link: "http://HCC.NYC"
    }
  ];

  const projects = [
    {
      name: "Don't Fret! - AR Guitar Trainer",
      description: "Evolved from web app to AR guitar trainer for Snap Spectacles",
      details: [
        "Initiated as web app (Flask, SQL, Python) with song database & dynamically generated ASCII jazz chord diagrams",
        "Evolved into augmented reality guitar trainer for Snap Spectacles displaying live chord overlays & feedback"
      ],
      technologies: ["SQL", "Flask", "Python", "TypeScript", "Lens Studio", "Snap Spectacles"],
      link: undefined
    },
    {
      name: "Hackathon Projects",
      description: "Columbia, Cornell Hackathons",
      technologies: ["Python", "Flask", "Figma", "OpenAI", "Anthropic", "CrewAI", "Spotify APIs"],
      details: undefined,
      link: undefined
    },
    {
      name: "Web Server from Scratch",
      description: "Built custom web server in C",
      technologies: ["C"],
      details: undefined,
      link: undefined
    }
  ];

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/20 to-gray-800/20"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6CACE4]/10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#6CACE4]/8 blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-3/4 left-1/2 w-80 h-80 bg-[#6CACE4]/6 blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '50px 50px'}}></div>
        
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 bg-[#6CACE4]/10 border border-[#6CACE4]/20 px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-[#6CACE4] animate-pulse"></div>
              <span className="text-[#6CACE4] text-sm font-medium">Available for Opportunities</span>
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-[#6CACE4] bg-clip-text text-transparent">
              Joshua Hegstad
            </span>
          </h1>
          
          <div className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-300 mb-8 space-y-2">
            <div>Computer Science @ Columbia University</div>
            {/* <div className="text-lg text-gray-400 max-w-3xl mx-auto">
              Building the future of AR/AI • Full-stack engineer • Cybersecurity specialist
            </div> */}
          </div>
          
          <p className="text-lg text-gray-400 leading-relaxed max-w-4xl mx-auto mb-12">

          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a href="mailto:J.Hegstad@Columbia.edu" className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 font-semibold hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </span>
            </a>
            
            <a href="https://github.com/hegstadjosh" target="_blank" className="group bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 text-gray-200 px-8 py-4 font-semibold hover:bg-gray-700/50 hover:border-gray-500/50 hover:text-black transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </span>
            </a>
            
            <button 
              onClick={() => setIsResumeModalOpen(true)}
              className="group bg-[#012169] text-white px-8 py-4 font-semibold hover:bg-[#012169]/80 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume
              </span>
            </button>
          </div>
          
          {/* Scroll indicator - positioned below buttons */}
          <div className="mt-16">
            <div className="flex justify-center animate-bounce">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </header>
      
      {/* Skills Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Technical Expertise</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Building with modern technologies across the full stack
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800/50 border border-gray-600/50 p-6 hover:border-[#6CACE4]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[#6CACE4]/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#6CACE4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "R", "SQL", "Java", "C#", "C", "TypeScript", "JavaScript", "HTML/CSS"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-[#6CACE4]/10 text-[#6CACE4] text-sm border border-[#6CACE4]/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-800/50 border border-gray-600/50 p-6 hover:border-[#6CACE4]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[#6CACE4]/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#6CACE4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-3">Frameworks/Libraries</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "Express", "Flask", "Pandas", "NumPy"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-[#6CACE4]/10 text-[#6CACE4] text-sm border border-[#6CACE4]/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-800/50 border border-gray-600/50 p-6 hover:border-[#6CACE4]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[#6CACE4]/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#6CACE4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-3">Developer Tools</h3>
              <div className="flex flex-wrap gap-2">
                {["Git", "Docker", "AWS", "Unity", "Lens Studio", "Unix"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-[#6CACE4]/10 text-[#6CACE4] text-sm border border-[#6CACE4]/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-800/50 border border-gray-600/50 p-6 hover:border-[#6CACE4]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[#6CACE4]/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#6CACE4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-3">Methodologies</h3>
              <div className="flex flex-wrap gap-2">
                {["Agile/Scrum", "CI/CD", "REST APIs", "UI/UX Design (Figma)"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-[#6CACE4]/10 text-[#6CACE4] text-sm border border-[#6CACE4]/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Featured Work</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {/* Featured Project Cards */}
            <div className="bg-gray-800/50 border border-gray-600/50 p-8 hover:border-[#6CACE4]/50 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-[#6CACE4]/20 flex items-center justify-center group-hover:bg-[#6CACE4]/30 transition-colors">
                  <svg className="w-7 h-7 text-[#6CACE4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="px-3 py-1 bg-[#6CACE4]/10 text-[#6CACE4] text-sm border border-[#6CACE4]/20">AR/AI</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">NASA SUITS Leadership</h3>
              <p className="text-gray-400 mb-4">Led the SUITS club to develop an augmented reality astronaut guidance system. Scaled team to 20 engineers and successfully tested at Johnson Space Center.</p>
              <div className="flex flex-wrap gap-2">
                {["Unity", "C#", "HoloLens 2"].map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-800/50 border border-gray-600/50 p-8 hover:border-[#6CACE4]/50 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-[#6CACE4]/20 flex items-center justify-center group-hover:bg-[#6CACE4]/30 transition-colors">
                  <svg className="w-7 h-7 text-[#6CACE4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <span className="px-3 py-1 bg-[#6CACE4]/10 text-[#6CACE4] text-sm border border-[#6CACE4]/20">Full-Stack</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Pure Poker Internship</h3>
              <p className="text-gray-400 mb-4">Re-designed vital UI components and implemented revenue-generating features including private games and AI avatar generation.</p>
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "React", "AWS Lambda"].map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-16">Experience Timeline</h2>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[#6CACE4]"></div>
            
            {/* Timeline items */}
            {workExperience.map((job, index) => (
              <div key={index} className="relative flex items-start mb-12">
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-br from-[#6CACE4] to-[#009EFF] border-2 border-white/20 "></div>
                <div className="ml-20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-gray-700/50  p-6 hover:border-gray-600/50 transition-all duration-300 flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                      <p className="text-[#6CACE4] font-medium">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-300">{job.duration}</div>
                      <div className="text-xs text-gray-500">{job.location}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{job.description}</p>
                  
                  {job.achievements && (
                    <ul className="space-y-1 mb-4">
                      {job.achievements.slice(0, 2).map((achievement, i) => (
                        <li key={i} className="text-sm text-gray-300 flex items-start">
                          <div className="w-1.5 h-1.5 bg-[#6CACE4]  mt-2 mr-2 flex-shrink-0"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Education */}
            <div className="relative flex items-start">
              <div className="absolute left-6 w-4 h-4 bg-gradient-to-br from-[#6CACE4] to-[#009EFF] border-2 border-white/20 "></div>
              <div className="ml-20 bg-[#012169]/20 border border-[#6CACE4]/20  p-6 flex-1">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Columbia University</h3>
                    <p className="text-[#6CACE4] font-medium">School of Engineering</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-300">Sep 2023 - Dec 2026</div>
                    <div className="text-xs text-gray-500">New York, NY</div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-2">Bachelor of Science in Computer Science, Statistics Minor</p>
                <p className="text-[#6CACE4] font-medium text-sm mb-4">C.P. Davis Scholar • National Merit Scholar</p>
                
                <div className="flex flex-wrap gap-2">
                  {["AI/ML", "Databases", "Data Structures", "VR/AR", "UI/3DUI"].map((course) => (
                    <span key={course} className="px-2 py-1 bg-[#6CACE4]/10 text-[#6CACE4] text-xs border border-[#6CACE4]/20">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Leadership & Projects */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#012169]  flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                Leadership
              </h2>
              
              <div className="space-y-8">
                {leadership.map((role, index) => (
                  <div key={index} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-gray-700/50  p-6 hover:border-gray-600/50 transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-[#6CACE4] transition-colors">{role.title}</h3>
                        <div className="flex items-center gap-2">
                          <p className="text-gray-300">{role.organization}</p>
                          {role.link && (
                            <a href={role.link} target="_blank" className="text-[#6CACE4] hover:text-[#6CACE4]/80 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-300">{role.duration}</div>
                        <div className="text-xs text-gray-500">{role.location}</div>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-4">{role.description}</p>
                    {role.achievements && (
                      <ul className="space-y-2 mb-4">
                        {role.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-start">
                            <div className="w-1.5 h-1.5 bg-[#6CACE4]  mt-2 mr-2 flex-shrink-0"></div>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {role.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {role.technologies.map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#012169]  flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                Projects
              </h2>
              
              <div className="space-y-8">
                {projects.map((project, index) => (
                  <div key={index} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-gray-700/50  p-6 hover:border-gray-600/50 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white group-hover:text-[#6CACE4] transition-colors">{project.name}</h3>
                      {project.link && (
                        <a href={project.link} target="_blank" className="text-[#6CACE4] hover:text-[#6CACE4] transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    {project.details && (
                      <ul className="space-y-2 mb-4">
                        {project.details.map((detail, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-start">
                            <div className="w-1.5 h-1.5 bg-[#6CACE4]  mt-2 mr-2 flex-shrink-0"></div>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer className="bg-black py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-[#012169]/20 border border-[#6CACE4]/20 p-6 flex-1">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Let&apos;s Connect</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Whether you want to discuss AI projects or chat about the latest in tech — let&apos;s connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:J.Hegstad@Columbia.edu"
                className="inline-flex items-center justify-center gap-3 bg-[#012169] text-white px-8 py-4  font-semibold hover:bg-[#012169]/80 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </a>
              <a 
                href="https://github.com/hegstadjosh" 
                target="_blank"
                className="inline-flex items-center justify-center gap-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 text-gray-200 px-8 py-4  font-semibold hover:bg-gray-700/50 hover:border-gray-500/50 hover:text-black transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-800">
              <p className="text-gray-500 text-sm">
                © 2025 Joshua Hegstad.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Resume Modal */}
      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />
    </main>
  );
}