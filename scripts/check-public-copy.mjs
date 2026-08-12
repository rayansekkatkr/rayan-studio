#!/usr/bin/env node
// Scans shipped public-copy sources for the forbidden Unicode em dash (U+2014).
// Exits non-zero when a violation is found. No dependencies.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();

const SCAN_ROOTS = [
  "src/content",
  "src/components/home",
  "src/components/services",
  "src/components/studio",
  "src/components/work",
  "src/components/insights",
  "src/components/forms",
  "src/components/navigation",
  "src/components/site/LocalSeoLanding.tsx",
  "src/lib/local-seo-content.js",
  "src/app/(localized)",
];

const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mdx"]);
const IGNORE_RE = /\.test\.tsx?$|\.spec\.|(^|\/)docs\/|(^|\/)PROJECT_MEMORY\.md$/;
const EM_DASH = "—";

function collectFiles(path) {
  const stats = statSync(path);
  if (stats.isFile()) return [path];
  return readdirSync(path).flatMap((entry) => collectFiles(join(path, entry)));
}

const violations = [];

for (const scanRoot of SCAN_ROOTS) {
  const absolute = join(ROOT, scanRoot);
  let files;
  try {
    files = collectFiles(absolute);
  } catch {
    continue;
  }
  for (const file of files) {
    const relPath = relative(ROOT, file);
    if (IGNORE_RE.test(relPath)) continue;
    const extension = relPath.slice(relPath.lastIndexOf("."));
    if (!EXTENSIONS.has(extension)) continue;

    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, index) => {
      if (line.includes(EM_DASH)) {
        violations.push(`${relPath}:${index + 1}`);
      }
    });
  }
}

if (violations.length > 0) {
  console.error("Em dash (U+2014) found in shipped public copy:");
  for (const violation of violations) {
    console.error(`  ${violation}`);
  }
  process.exitCode = 1;
} else {
  console.log("check:copy OK, no em dash in shipped public copy.");
}
