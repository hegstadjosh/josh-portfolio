"use client";
import Image from "next/image";
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
    null,
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {otherProjects.map((project) => (
          <button
            type="button"
            key={project.name}
            className="cursor-pointer border border-gray-800 bg-gray-900/30 p-4 text-left transition-all hover:border-[#6CACE4]/50"
            onClick={() => setSelectedProject(project)}
          >
            <h4 className="mb-1 text-sm font-medium text-white">
              {project.name}
            </h4>
            <p className="text-xs text-gray-300">Click to view</p>
          </button>
        ))}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedProject(null)}
          role="presentation"
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-auto border border-gray-700 bg-gray-900"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.name} details`}
          >
            {selectedProject.demoImages &&
            selectedProject.demoImages.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 bg-black p-4 sm:grid-cols-2">
                {selectedProject.demoImages.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt={selectedProject.name}
                    width={900}
                    height={1136}
                    className="h-auto w-full object-contain"
                  />
                ))}
              </div>
            ) : selectedProject.link ? (
              <div className="h-[400px] bg-black">
                <iframe
                  src={selectedProject.link}
                  title={selectedProject.name}
                  className="h-full w-full"
                />
              </div>
            ) : null}

            <div className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <h3 className="text-2xl font-semibold text-white">
                  {selectedProject.name}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white"
                  aria-label="Close project details"
                >
                  <svg
                    className="h-6 w-6"
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

              <p className="mb-4 text-gray-400">
                {selectedProject.description}
              </p>

              {selectedProject.details && (
                <ul className="mb-4 space-y-2">
                  {selectedProject.details.map((detail, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <span className="text-[#6CACE4]">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mb-4 flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-gray-800 px-3 py-1 text-sm text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-[#6CACE4] px-4 py-2 font-medium text-black transition-all hover:bg-[#6CACE4]/80"
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
    <section id="resume" className="bg-gray-900/30 px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-3xl font-bold text-white">Resume</h2>
        {resumeUrl ? (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex border border-[#6CACE4] px-6 py-3 font-medium text-[#6CACE4] transition-colors hover:bg-[#6CACE4]/10"
          >
            View resume
          </a>
        ) : (
          <p className="text-gray-300">Loading resume...</p>
        )}
      </div>
    </section>
  );
}
