import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("root metadata uses one canonical founder identity", () => {
  const metadata = `${read("src/app/layout.tsx")}\n${read("src/app/site.ts")}`;
  assert.match(metadata, /https:\/\/www\.joshhegstad\.org/);
  assert.match(metadata, /Co-Founder/);
  assert.match(metadata, /FULL_TITLE/);
  assert.match(metadata, /ProfilePage/);
  assert.match(metadata, /verification/);
  assert.doesNotMatch(metadata, /\bCTO\b/);
  assert.doesNotMatch(metadata, /retrieval-augmented generation|voice AI/);
  assert.doesNotMatch(metadata, /Software Engineer/);
});

test("metadata routes and generated images exist", () => {
  for (const path of [
    "src/app/icon.tsx",
    "src/app/apple-icon.tsx",
    "src/app/opengraph-image.tsx",
    "src/app/manifest.ts",
    "src/app/robots.ts",
    "src/app/sitemap.ts",
  ]) {
    assert.ok(read(path).length > 0, `${path} should not be empty`);
  }
});

test("homepage leads with founder positioning and links the setup route", () => {
  const homepage = read("src/app/page.tsx");
  assert.match(homepage, /Co-Founder/);
  assert.match(homepage, /Building an AI history company\./);
  assert.match(homepage, /Selected work/);
  assert.match(homepage, /href="\/claude-code"/);
  assert.doesNotMatch(homepage, /\bCTO\b|retrieval|grounding|live voice/);
  assert.doesNotMatch(homepage, /What I(?:&apos;|')m building/);
  assert.doesNotMatch(homepage, /href="#claude-setup"/);
});

test("active pages do not link to the retired Simetic domain", () => {
  const activeSite = `${read("src/app/project-data.ts")}\n${read(
    "src/app/debt-vulture/page.tsx",
  )}`;
  assert.doesNotMatch(activeSite, /https?:\/\/(?:www\.)?simetic\.com/i);
});

test("homepage omits the resume and renders a real paper preview", () => {
  const homepage = read("src/app/page.tsx");
  const featuredProjects = read("src/app/featured-projects.tsx");
  const projects = read("src/app/project-data.ts");
  assert.doesNotMatch(homepage, /href="#resume"|<ResumeSection/);
  assert.doesNotMatch(featuredProjects, /bg-gradient-to-br/);
  assert.match(projects, /previewImage: "\/nlp-paper-title-preview\.png"/);
  assert.equal(
    existsSync(new URL("../src/app/api/resume-url/route.ts", import.meta.url)),
    false,
  );
  assert.equal(
    existsSync(
      new URL("../src/app/api/upload-resume/route.ts", import.meta.url),
    ),
    false,
  );
});

test("nested page titles let the root template add the site name once", () => {
  const docsRoute = read("src/app/skills/docs/[slug]/page.tsx");
  assert.doesNotMatch(docsRoute, /title: `\$\{doc\.title\} — Joshua Hegstad`/);
});

test("duplicate deployment hosts permanently redirect to the canonical site", () => {
  const middlewarePath = new URL("../src/middleware.ts", import.meta.url);
  assert.equal(existsSync(middlewarePath), true);
  const middleware = read("src/middleware.ts");
  assert.match(middleware, /endsWith\("\.vercel\.app"\)/);
  assert.match(middleware, /NextResponse\.redirect\(url, 308\)/);
});
