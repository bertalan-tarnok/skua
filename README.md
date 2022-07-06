# skua

[![deno module](https://shield.deno.dev/x/skua)](https://deno.land/x/skua)

A super simple static site generator made with [Deno](https://deno.land)

## Example:

##### `index.ts`

```ts
import { h, assets, page, init } from "https://deno.land/x/skua/mod.ts";

init();

const layout = (body = "", head = "") => {
  return (
    "<!DOCTYPE html>" +
    h(
      "html",
      { lang: "en" },
      h(
        "head",
        {},
        h("meta", { charset: "utf-8" }),
        h("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
        h("title", {}, "new site"),
        h("link", { rel: "stylesheet", href: `${assets}/style.css` }),
        head
      ),
      h("body", {}, body)
    )
  );
};

const body = h("main", {}, h("h1", {}, "index"));

page(layout(body), "index.html");
```

##### `out/index.html` (formatted)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>new site</title>
    <link rel="stylesheet" href="181d449c208/style.css" />
  </head>

  <body>
    <main>
      <h1>index</h1>
    </main>
  </body>
</html>
```
