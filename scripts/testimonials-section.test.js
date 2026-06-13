const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const source = readFileSync(path.join(process.cwd(), "src/components/site/Testimonials.tsx"), "utf8");

test("Testimonials section does not use duplicated scrolling testimonial columns", () => {
  assert.doesNotMatch(source, /TestimonialsColumn/);
  assert.doesNotMatch(source, /testimonials\.slice/);
});

test("Testimonials section presents synthesized feedback instead of repeated portraits", () => {
  assert.match(source, /Retours synthétisés/);
  assert.match(source, /Synthesized feedback/);
  assert.doesNotMatch(source, /images\.unsplash\.com/);
});
