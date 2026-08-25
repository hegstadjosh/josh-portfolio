import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("root metadata uses one canonical founder identity", () => {
  const metadata = `${read("src/app/layout.tsx")}\n${read("src/app/site.ts")}`;
  assert.match(metadata, /https:\/\/www\.joshhegstad\.org/);
  assert.match(metadata, /Co-Founder & CTO/);
  assert.match(metadata, /FULL_TITLE/);
  assert.match(metadata, /ProfilePage/);
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
  assert.match(homepage, /Co-Founder &amp; CTO/);
  assert.match(homepage, /Building an AI history company\./);
  assert.match(homepage, /Selected work/);
  assert.match(homepage, /href="\/claude-code"/);
  assert.doesNotMatch(homepage, /href="#claude-setup"/);
});
