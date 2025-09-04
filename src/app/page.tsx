"use client";
import { useState, useEffect } from "react";
import ResumeModal from "./_components/ResumeModal";

export default function Home() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const workExperience = [
    {
      title: "Research Assistant of the Dean of Social Sciences",
      company: "Economics Department, Columbia University",
      duration: "Jun 2025 - Present",
      location: "New York, NY",
      description: "Independently developing AI studying, teaching, and grading tools using TypeScript, React, Next.js, and Vercel AI SDK.",
      technologies: ["TypeScript", "React", "Next.js", "Vercel AI SDK"]
    },
    {
      title: "Software Engineer",
      company: "Pure Poker",
      duration: "May 2025 - Aug 2025",
      location: "New York, NY",
      description: "Re-designed dozens of vital UI components and implemented key revenue-generating features.",
      achievements: [
        "Re-designed dozens of vital UI components using TypeScript, React, and Next.js to improve user experience",
        "Set up the fees system and deposit/withdrawal UIs, earning first revenue; implemented private games feature",
        "Created AI Avatar generation feature for all users, establishing a funnel for monetization",
        "Used serverless backend infrastructure including AWS Lambda, Step Functions, and DynamoDB"
      ],
      technologies: ["TypeScript", "React", "Next.js", "AWS Lambda", "Step Functions", "DynamoDB"]
    },
    {
      title: "Software Engineer Intern",
      company: "AMLAH - Real Estate Startup",
      duration: "Jan 2025 - Aug 2025",
      location: "New York, NY",
      description: "Designed and shipped the platform ahead of schedule while managing AWS infrastructure.",
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
      description: "Created and field-tested an AR platform for hedge fund investors.",
      achievements: [
        "Created Investor Goggles, a web and AR platform providing market insights using LLMs and financial APIs",
        "Deployed and tested platform in the field with hedge fund investors, gathering feedback to refine product features"
      ],
      technologies: ["LLMs", "Financial APIs", "AR", "Web Development"],
      link: "https://investorgoggles.com"
    },
    {
      title: "Cybersecurity and Field Automation Intern",
      company: "Hess Corporation",
      duration: "May 2024 - Aug 2024",
      location: "Minot, ND",
      description: "Developed secure LLM tools and conducted comprehensive cybersecurity analysis.",
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
      technologies: ["Unity", "C#", "TypeScript", "HoloLens 2", "Snap Spectacles"]
    },
    {
      title: "Co-Founder",
      organization: "Homebrew Computer Club",
      duration: "Feb 2025 - Present",
      location: "New York, NY",
      description: "Columbia's tech project hub",
      achievements: [
        "Co-founded Columbia's tech project hub, securing funding & growing membership to 20+ students",
        "Built website under time pressure to launch on 50th Anniversary of Silicon Valley Homebrew Computer Club"
      ],
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
      technologies: ["SQL", "Flask", "Python", "TypeScript", "Lens Studio", "Snap Spectacles"]
    },
    {
      name: "Hackathon Projects",
      description: "Columbia, Cornell Hackathons",
      technologies: ["Python", "Flask", "Figma", "OpenAI", "Anthropic", "CrewAI", "Spotify APIs"]
    },
    {
      name: "Web Server from Scratch",
      description: "Built custom web server in C",
      technologies: ["C"]
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-50 to-indigo-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Name & Title */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Joshua Hegstad
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                Computer Science @ Columbia University
              </p>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mb-6">
                Computer Science student at Columbia University with experience in AR/AI development, 
                full-stack programming, and cybersecurity. C.P. Davis Scholar and National Merit Scholar 
                passionate about building innovative tech solutions from web platforms to augmented reality systems.
              </p>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Available for opportunities</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:J.Hegstad@Columbia.edu" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Email
                </a>
                <a href="https://github.com/JoshHegstad" target="_blank" className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  GitHub
                </a>
                <button 
                  onClick={() => setIsResumeModalOpen(true)}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Resume
                </button>
              </div>
            </div>
            
            {/* Right: Skills */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Technologies</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "R", "SQL", "Java", "C#", "C", "TypeScript", "JavaScript"].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Frameworks & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "Flask", "AWS", "Unity", "Lens Studio"].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-12">
            {/* Education */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Columbia University, School of Engineering</h3>
                  <span className="text-sm text-gray-600">Sep 2023 - Dec 2026</span>
                </div>
                <p className="text-gray-700 mb-2">Bachelor of Science in Computer Science, Statistics Minor</p>
                <p className="text-blue-600 font-medium mb-4">C.P. Davis Scholar (Top Engineers), National Merit Scholar</p>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Coursework</h4>
                  <p className="text-sm text-gray-600">
                    Advanced Programming, Databases, Data Structures, AI, NLP, UI, 3DUI, VR/AR, 
                    Stats/Probability, Probability Theory, Linear Algebra, Multivariable Calculus
                  </p>
                </div>
              </div>
            </section>

            {/* Leadership */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Leadership</h2>
              <div className="space-y-6">
                {leadership.map((role, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{role.title}</h3>
                        <div className="flex items-center gap-2">
                          <p className="text-gray-700">{role.organization}</p>
                          {role.link && (
                            <a href={role.link} target="_blank" className="text-blue-600 hover:text-blue-800 text-sm">
                              →
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">{role.duration}</div>
                        <div className="text-xs text-gray-500">{role.location}</div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{role.description}</p>
                    {role.achievements && (
                      <ul className="space-y-1 mb-4">
                        {role.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm text-gray-700 flex">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {role.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {role.technologies.map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects</h2>
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    {project.details && (
                      <ul className="space-y-1 mb-4">
                        {project.details.map((detail, i) => (
                          <li key={i} className="text-sm text-gray-700 flex">
                            <span className="text-green-500 mr-2">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Work Experience */}
          <div>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Work Experience</h2>
              <div className="space-y-8">
                {workExperience.map((job, index) => (
                  <div key={index} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-6 mt-2">
                      <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    </div>
                    {/* Timeline line */}
                    {index < workExperience.length - 1 && (
                      <div className="absolute -left-5 mt-5 w-px h-20 bg-gray-200"></div>
                    )}
                    
                    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <div className="flex items-center gap-2">
                            <p className="text-gray-700">{job.company}</p>
                            {job.link && (
                              <a href={job.link} target="_blank" className="text-blue-600 hover:text-blue-800 text-sm">
                                →
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-blue-600">{job.duration}</div>
                          <div className="text-xs text-gray-500">{job.location}</div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{job.description}</p>
                      
                      {job.achievements && (
                        <ul className="space-y-2 mb-4">
                          {job.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-gray-700 flex">
                              <span className="text-blue-500 mr-2">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Let's Connect</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Whether you want to discuss AR/AI projects, cybersecurity solutions, 
              or just chat about the latest in tech - my inbox is always open.
            </p>
            <a 
              href="mailto:J.Hegstad@Columbia.edu"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <span>📧</span>
              <span>Get in touch</span>
            </a>
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