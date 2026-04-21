"use client";
import { useState, useEffect } from "react";

interface OtherProject {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  demoImages?: string[];
  details?: string[];
}


export function ProjectModal({
  otherProjects,
}: {
  otherProjects: OtherProject[];
}) {
  const [selectedProject, setSelectedProject] = useState<OtherProject | null>(
    null
  );

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {otherProjects.map((project) => (
          <div
            key={project.name}
            className="bg-gray-900/30 border border-gray-800 p-4 cursor-pointer hover:border-[#6CACE4]/50 transition-all"
            onClick={() => setSelectedProject(project)}
          >
            <h4 className="text-white font-medium text-sm mb-1">
              {project.name}
            </h4>
            <p className="text-gray-500 text-xs">Click to view</p>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-gray-900 border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedProject.demoImages && selectedProject.demoImages.length > 0 ? (
              <div className="bg-black p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedProject.demoImages.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt={selectedProject.name}
                    className="w-full h-auto object-contain"
                  />
                ))}
              </div>
            ) : selectedProject.link ? (
              <div className="h-[400px] bg-black">
                <iframe
                  src={selectedProject.link}
                  title={selectedProject.name}
                  className="w-full h-full"
                />
              </div>
            ) : null}

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-white text-2xl font-semibold">
                  {selectedProject.name}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <p className="text-gray-400 mb-4">
                {selectedProject.description}
              </p>

              {selectedProject.details && (
                <ul className="space-y-2 mb-4">
                  {selectedProject.details.map((detail, i) => (
                    <li
                      key={i}
                      className="text-gray-300 text-sm flex items-start gap-2"
                    >
                      <span className="text-[#6CACE4]">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-800 text-gray-300 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  className="inline-block bg-[#6CACE4] text-black px-4 py-2 font-medium hover:bg-[#6CACE4]/80 transition-all"
                >
                  Visit Site →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ResumeSection() {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/resume-url")
      .then((res) => res.json())
      .then((data: { url: string }) => setResumeUrl(data.url))
      .catch((err) => console.error("Failed to load resume:", err));
  }, []);

  return (
    <section id="resume" className="py-20 px-6 bg-gray-900/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Resume</h2>
        {resumeUrl ? (
          <div className="bg-white" style={{ aspectRatio: "8.5/11" }}>
            <iframe
              src={resumeUrl}
              title="Resume"
              className="w-full h-full border-0"
            />
          </div>
        ) : (
          <div
            className="bg-gray-800/50 border border-gray-800 flex items-center justify-center"
            style={{ aspectRatio: "8.5/11" }}
          >
            <p className="text-gray-500">Loading resume...</p>
          </div>
        )}
      </div>
    </section>
  );
}
