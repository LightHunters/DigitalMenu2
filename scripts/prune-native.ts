// Removes native binaries for the libc variant this machine does not use.
// npm/bun install both glibc and musl builds on Linux (~150MB of duplicates).
import { existsSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

if (process.platform === "linux") {
  const isMusl = readdirSync("/lib").some((f) => f.startsWith("ld-musl-"));
  const unused = isMusl ? /-(gnu|linux-x64)$|libvips-linux-/ : /musl/;
  const roots = ["node_modules", "node_modules/@next", "node_modules/@img"];
  let freed = 0;
  for (const root of roots) {
    if (!existsSync(root)) continue;
    for (const name of readdirSync(root)) {
      const native = /^(lightningcss-|swc-|sharp-)/.test(name) && name.includes("linux");
      if (native && unused.test(name)) {
        rmSync(join(root, name), { recursive: true, force: true });
        freed++;
      }
    }
  }
  if (freed) console.log(`prune-native: removed ${freed} unused ${isMusl ? "glibc" : "musl"} packages`);
}
