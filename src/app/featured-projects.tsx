import Image from "next/image";
import Link from "next/link";
import { featuredProjects } from "./project-data";

function ProjectPreview({
  project,
}: {
  project: (typeof featuredProjects)[number];
}) {
  if ("previewImage" in project && project.previewImage) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={project.previewImage}
          alt={`${project.name} preview`}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-contain p-12"
        />
      </div>
    );
  }
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-950 to-gray-900 text-4xl font-bold text-gray-500">
      {project.name}
    </div>
  );
}

function ProjectLink({ href }: { href: string }) {
  const classes = "text-sm text-[#6CACE4] hover:underline";
  return href.startsWith("/") ? (
    <Link href={href} className={classes}>
      Learn more →
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noreferrer" className={classes}>
      Learn more →
    </a>
  );
}

export default function FeaturedProjects() {
  return featuredProjects.map((project) => (
    <article
      key={project.name}
      className="overflow-hidden border border-gray-800 bg-gray-900/50"
    >
      <div className="relative h-[400px] bg-black">
        <ProjectPreview project={project} />
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-semibold text-white">
          {project.name}
        </h3>
        <p className="mb-4 text-gray-300">{project.description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-gray-800 px-3 py-1 text-sm text-gray-200"
            >
              {tech}
            </span>
          ))}
        </div>
        {"link" in project && project.link ? (
          <ProjectLink href={project.link} />
        ) : null}
      </div>
    </article>
  ));
}
