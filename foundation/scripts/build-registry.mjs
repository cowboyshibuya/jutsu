#!/usr/bin/env node
/**
 * Builds the shadcn registry: one JSON file per item in r/, with every file's content inlined,
 * plus r/registry.json as the index. Run from foundation/ after changing a token, block or check:
 *
 *   node scripts/build-registry.mjs
 *
 * FOUNDATION_URL sets where r/ is served (default: the GitHub raw URL), used for dependencies
 * between items. Node 18+, no dependencies.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const base = (process.env.FOUNDATION_URL ?? "https://raw.githubusercontent.com/cowboyshibuya/jutsu/main/foundation/r").replace(/\/$/, "");
const registry = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
const out = join(root, "r");
mkdirSync(out, { recursive: true });

for (const item of registry.items) {
  const built = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...item,
    registryDependencies: item.registryDependencies?.map((dependency) => dependency.replace("{{base}}", base)),
    files: item.files.map((file) => ({ ...file, content: readFileSync(join(root, file.path), "utf8") })),
  };
  if (!built.registryDependencies) delete built.registryDependencies;
  writeFileSync(join(out, `${item.name}.json`), `${JSON.stringify(built, null, 2)}\n`);
}

writeFileSync(
  join(out, "registry.json"),
  `${JSON.stringify({ ...registry, items: registry.items.map(({ files, ...rest }) => ({ ...rest, files: files.map(({ path, type, target }) => ({ path, type, target })) })) }, null, 2)}\n`,
);
console.log(`Built ${registry.items.length} items into r/ (base ${base}).`);
