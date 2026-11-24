// Alien Field Notes: The Two Day Earth Review — make.fun entry program.
// Writes one line (164 chars, <=200) to /output/entry.txt (or the dir given
// by argv[2], $MAKEFUN_OUTPUT_DIR, falling back to ./output).
// Node stdlib only. No trailing newline: the file holds exactly the entry.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Came for the rings, stayed for the snacks. Four stars: gorgeous oceans, but the locals wave glowing rectangles at the sky and call it connection. Will abduct again.";

function resolveOutputDir(): string {
  const fromArgv = process.argv[2];
  if (fromArgv) return fromArgv;
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv) return fromEnv;
  return "/output";
}

function validateEntry(entry: string): void {
  // The brief requires one line, 1-200 chars. Fail loudly instead of
  // writing an entry the harness would reject.
  if (entry.length < 1 || entry.length > 200) {
    throw new Error(`entry must be 1-200 chars, got ${entry.length}`);
  }
  if (/[\r\n]/.test(entry)) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validateEntry(ENTRY);
  let outDir = resolveOutputDir();
  try {
    mkdirSync(outDir, { recursive: true });
  } catch {
    // /output may not be writable outside the harness; use ./output instead.
    outDir = "./output";
    mkdirSync(outDir, { recursive: true });
  }
  writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf-8");
}

main();
