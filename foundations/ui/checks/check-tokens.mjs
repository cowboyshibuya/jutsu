#!/usr/bin/env node
/**
 * Token check: fails when a component uses a value that did not come from the tokens.
 *
 *   node checks/check-tokens.mjs [dirs...]          check components (default: app components src)
 *   node checks/check-tokens.mjs --decisions        list values marked @decide in the token files
 *   node checks/check-tokens.mjs --include-ui       also check shadcn's generated components/ui
 *
 * shadcn's generated components (components/ui) are skipped by default: they follow the theme
 * through shadcn.css. Include them once the project has customised them.
 *
 * Flags, outside the token files:
 *   - raw colours: #hex, rgb(), hsl(), oklch() literals
 *   - arbitrary Tailwind values with raw units: p-[10px], text-[13.5px], gap-[0.6rem]
 *   - Tailwind's default palette: text-gray-500, bg-red-500, border-zinc-200 …
 *   - primitives used directly: var(--gray-500), var(--space-4), var(--radius-md) …
 *
 * A real exception carries its reason on the line before: `// tokens-ignore: <reason>`
 * (or `/* tokens-ignore: <reason> *\/` in CSS). An ignore without a reason is itself a failure.
 * Node 18+, no dependencies.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const args = process.argv.slice(2);
const root = process.cwd();
const TOKEN_FILE = /(^|[/\\])(primitives|semantic|tailwind|shadcn|tokens?)\.css$/;
const SKIP_DIR = new Set(["node_modules", ".next", ".git", "dist", "build", "out", ".open-next", ".vercel", "coverage"]);
const EXT = /\.(tsx|jsx|ts|js|css|mdx)$/;

function walk(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIR.has(entry)) continue;
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path, files);
    else if (EXT.test(entry)) files.push(path);
  }
  return files;
}

if (args.includes("--decisions")) {
  const tokenFiles = walk(root).filter((file) => TOKEN_FILE.test(file));
  let count = 0;
  for (const file of tokenFiles) {
    readFileSync(file, "utf8").split("\n").forEach((line, index) => {
      const match = line.match(/@decide:\s*(.*?)\s*(\*\/)?$/);
      if (match) {
        count += 1;
        console.log(`${relative(root, file)}:${index + 1}  ${match[1]}`);
      }
    });
  }
  console.log(count ? `\n${count} open decision(s). Ask before using or changing these values.` : "No open decisions.");
  process.exit(0);
}

const PRIMITIVE = /var\(--(gray|blue|green|amber|red|accent)-\d+\)|var\(--(space|radius|shadow|text|weight|leading|duration)-[a-z0-9]+\)/;
const PALETTE = /\b(?:text|bg|border|ring|fill|stroke|from|via|to|outline|divide|placeholder|decoration|shadow|accent|caret)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/;
const ARBITRARY_UNIT = /-\[(?:-?\d*\.?\d+)(?:px|rem|em)\]/;
const RAW_COLOR = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch|oklab)\(\s*\d/;
const CSS_RAW_UNIT = /:\s*[^;]*\b\d*\.?\d+(px|rem)\b/;

const rules = [
  { test: RAW_COLOR, message: "raw colour; use a semantic colour token" },
  { test: ARBITRARY_UNIT, message: "arbitrary size; use the spacing scale or a semantic size" },
  { test: PALETTE, message: "Tailwind palette colour; use a semantic name (ink-muted, success, line…)" },
  { test: PRIMITIVE, message: "primitive used directly; use its semantic token" },
];

const named = args.filter((arg) => !arg.startsWith("--"));
const dirs = named.length ? named : ["app", "components", "src"];
const includeUi = args.includes("--include-ui");
const files = dirs
  .filter((dir) => !dir.startsWith("--"))
  .flatMap((dir) => walk(join(root, dir)))
  .filter((file) => !TOKEN_FILE.test(file))
  .filter((file) => includeUi || !/[/\\]components[/\\]ui[/\\]/.test(file));
const failures = [];

for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  const isCss = file.endsWith(".css");
  lines.forEach((line, index) => {
    const previous = lines[index - 1] ?? "";
    const ignore = previous.match(/tokens-ignore(?::\s*(\S.*?))?\s*(\*\/)?$/);
    if (ignore) {
      if (!ignore[1]) failures.push(`${relative(root, file)}:${index}  tokens-ignore needs a reason`);
      return;
    }
    if (/^\s*(\/\/|\*|\/\*)/.test(line) || /\burl\(|https?:\/\//.test(line)) return;
    for (const rule of rules) {
      if (rule.test.test(line)) failures.push(`${relative(root, file).split(sep).join("/")}:${index + 1}  ${rule.message}: ${line.trim().slice(0, 100)}`);
    }
    if (isCss && CSS_RAW_UNIT.test(line) && !/var\(--/.test(line)) {
      failures.push(`${relative(root, file)}:${index + 1}  raw size in CSS; use a token: ${line.trim().slice(0, 100)}`);
    }
  });
}

if (failures.length) {
  console.error(failures.join("\n"));
  console.error(`\n${failures.length} value(s) not from the tokens.`);
  process.exit(1);
}
console.log(`Token check passed (${files.length} files).`);
