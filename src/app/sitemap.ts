import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "./site";

const LAST_MODIFIED = new Date("2026-08-24T00:00:00-04:00");
const ROUTES = [
  "",
  "/claude-code",
  "/debt-vulture",
  "/skills/docs/claude-md",
  "/skills/docs/engineering-principles",
  "/skills/docs/autonomous-build-workflow",
  "/skills/docs/jarvis-spec",
  "/skills/docs/claude-code-landscape",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_ORIGIN}${route}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : 0.7,
  }));
}
