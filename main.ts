// Alien Field Notes: The Two Day Earth Review — one-liner entry.
// Writes Neon's FINAL line verbatim to the grader's output dir.
// Gate: entry.txt must be 1–200 chars, exactly the line, no trailing newline.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE = "1/5 stars. 70% water and none of it drinkable: tried sipping the ocean, got stung by clear gelatin, and a barefoot teen named Kyle filmed me foaming purple for 4.2 million strangers.";

const candidates = [process.env.MAKEFUN_OUTPUT_DIR, "/output", "./output"].filter(Boolean) as string[];
for (const dir of candidates) {
  try {
    mkdirSync(dir, { recursive: true });
    writeFileSync(`${dir}/entry.txt`, LINE, "utf8");
    break;
  } catch {
    // Directory not writable (e.g. read-only /output locally) — try the next fallback.
  }
}
