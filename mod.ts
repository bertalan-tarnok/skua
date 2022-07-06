import { copySync, emptyDirSync, ensureDirSync } from "https://deno.land/std@0.147.0/fs/mod.ts";

import { Attrs, Tagname } from "./html_types.ts";

const selfClosingTags = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
];

/**
 *
 * @param tagn `tagname`
 * @param attrs `attributes`
 * @param ins `stuff between the tags`
 * @returns `the html string`
 * @example
 * h("a", { href: "/" }, "link to ", h("em", {}, home)); // <a href="/">link to <em>home</em></a>
 */
export const h = <T extends Tagname>(
  tagn: T,
  attrs?: Attrs[T] | Record<string, string>,
  ...ins: string[]
) => {
  let t = `<${tagn}`;

  for (const k in attrs) {
    t += ` ${k}="${attrs[k as Extract<keyof NonNullable<Attrs[T]>, string>]}"`;
  }

  t += ">";

  if (!selfClosingTags.includes(tagn)) {
    t += ins.join("") || "";
    t += `</${tagn}>`;
  }

  return t;
};

/**
 * The (output) assets directory. (this is based on the date, to prevent caching issues)
 */
export const assets = Date.now().toString(16);

/**
 * Initialize the static site generation
 * @param assetsPath `assets directory` `(default is "assets")`
 */
export const init = (assetsPath = "assets") => {
  emptyDirSync("out");

  ensureDirSync(assetsPath);

  copySync(assetsPath, `out/${assets}`);
};

/**
 * Creates a page in the `out` directory
 */
export const page = (html: string, path: string) => {
  if (path.includes("/")) {
    Deno.mkdirSync("out/" + path.replace(/\/[^\/]*$/, ""), { recursive: true });
  }

  Deno.writeTextFileSync(`out/${path}`, html);
};
