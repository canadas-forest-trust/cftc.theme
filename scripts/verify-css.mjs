#!/usr/bin/env node
/**
 * Fail the publish if theme CSS is syntactically broken.
 * Catches the class of bug that shipped in 0.7.8 (unterminated attribute quotes).
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const STYLES_DIR = join(dirname(fileURLToPath(import.meta.url)), "../src/styles");
const files = readdirSync(STYLES_DIR)
  .filter((f) => f.endsWith(".css"))
  .map((f) => join(STYLES_DIR, f));

let failed = false;

function fail(file, line, message, text) {
  failed = true;
  console.error(`${file}:${line}: ${message}`);
  if (text) console.error(`  ${text}`);
}

for (const file of files) {
  const source = readFileSync(file, "utf8");
  const lines = source.split(/\r?\n/);
  let fileFailed = false;

  let braceDepth = 0;
  let inBlockComment = false;

  for (let i = 0; i < lines.length; i++) {
    const lineNo = i + 1;
    let line = lines[i];

    // Strip block comments (including multi-line) before checks.
    let cleaned = "";
    for (let j = 0; j < line.length; j++) {
      if (!inBlockComment && line[j] === "/" && line[j + 1] === "*") {
        inBlockComment = true;
        j++;
        continue;
      }
      if (inBlockComment && line[j] === "*" && line[j + 1] === "/") {
        inBlockComment = false;
        j++;
        continue;
      }
      if (!inBlockComment) cleaned += line[j];
    }
    // Strip line comments.
    cleaned = cleaned.replace(/\/\/.*$/, "");

    if ((cleaned.match(/"/g) || []).length % 2 !== 0) {
      fail(file, lineNo, "unterminated double quote", lines[i]);
      fileFailed = true;
    }

    // Broken attribute selectors like [type="hidden] (missing closing quote before ]).
    if (/\[[^\]]*"[^"\]]+\]/.test(cleaned)) {
      fail(file, lineNo, "attribute selector looks missing a closing quote before ]", lines[i]);
      fileFailed = true;
    }

    for (const ch of cleaned) {
      if (ch === "{") braceDepth++;
      if (ch === "}") braceDepth--;
      if (braceDepth < 0) {
        fail(file, lineNo, "unexpected closing }", lines[i]);
        fileFailed = true;
        braceDepth = 0;
      }
    }
  }

  if (braceDepth !== 0) {
    fail(file, lines.length, `unbalanced braces (depth ${braceDepth})`);
    fileFailed = true;
  }

  if (!fileFailed) console.log(`ok ${file}`);
}

if (failed) {
  console.error("\nCSS verification failed — fix before publish.");
  process.exit(1);
}

console.log("\nCSS verification passed.");
