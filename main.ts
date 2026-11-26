import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const message =
  "fix: I approved my own Friday PR, deleted the prod backups, and prod has never looked braver";

// Mirror the gate: UTF-8 text of 1-159 characters, not only white space.
function assertValidMessage(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 159 || text.trim() === "") {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

assertValidMessage(message);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, ".entry.txt.tmp");
writeFileSync(tmp, message, "utf8");
renameSync(tmp, join(outDir, "entry.txt"));
