"use client";
import { useState, type ReactNode } from "react";

interface OtherProject {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  details?: string[];
}

interface Job {
  logo?: string;
  company: string;
  role: string;
  date: string;
  summary: string;
  details: string[];
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
            {selectedProject.link ? (
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

export function ExperienceList({ experience }: { experience: Job[] }) {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {experience.map((job, index) => (
        <div
          key={index}
          className="bg-gray-900/50 border border-gray-800 overflow-hidden"
        >
          <div
            className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-800/30 transition-all"
            onClick={() =>
              setExpandedJob(expandedJob === index ? null : index)
            }
          >
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gray-800 rounded">
              {job.logo ? (
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-6 h-6 object-contain"
                />
              ) : (
                <span className="text-gray-600 text-xs">•</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div>
                  <span className="text-white font-medium">{job.company}</span>
                  <span className="text-gray-500 mx-2">·</span>
                  <span className="text-gray-400">{job.role}</span>
                </div>
                <span className="text-gray-500 text-sm">{job.date}</span>
              </div>
              <p className="text-gray-500 text-sm">{job.summary}</p>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${expandedJob === index ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {expandedJob === index && (
            <div className="px-4 pb-4 pl-18">
              <ul className="space-y-1 ml-14">
                {job.details.map((detail, i) => (
                  <li
                    key={i}
                    className="text-gray-400 text-sm flex items-start gap-2"
                  >
                    <span className="text-[#6CACE4]">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
