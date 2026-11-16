import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { createServer, type Plugin, type ResolvedConfig } from "vite";

/** The shape of src/seo/build.ts. It is loaded through Vite itself (so it can import the app's TypeScript data). */
type SeoBuild = {
  routes(): string[];
  headHtmlFor(path: string): string;
  bodyHtmlFor(path: string): string;
  notFoundPage(): { head: string; body: string };
  sitemapXml(): string;
  robotsTxt(): string;
};

const HEAD = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
const BODY = /<!--seo-body:start-->[\s\S]*?<!--seo-body:end-->/;

/**
 * After the build: one HTML file per route (with its own title, description, canonical, Open Graph, JSON-LD and the page's
 * text), a 404.html, robots.txt and sitemap.xml. Everything comes from src/seo and src/data/projects.ts.
 */
export default function seo(): Plugin {
  let config: ResolvedConfig;
  return {
    name: "portfolio-seo",
    apply: "build",
    configResolved(resolved) {
      config = resolved;
    },
    async closeBundle() {
      const out = join(config.root, config.build.outDir);
      // closeBundle also runs after a failed build: stay quiet then, so the real error is the one that is shown
      if (!existsSync(join(out, "index.html"))) return;
      const shell = readFileSync(join(out, "index.html"), "utf8");
      if (!HEAD.test(shell) || !BODY.test(shell)) throw new Error("seo: the <!--seo:start--> / <!--seo-body:start--> markers are missing from index.html");

      const server = await createServer({
        configFile: false,
        root: config.root,
        logLevel: "silent",
        appType: "custom",
        server: { middlewareMode: true, hmr: false, watch: null },
        optimizeDeps: { noDiscovery: true },
      });
      try {
        const build = (await server.ssrLoadModule("/src/seo/build.ts")) as SeoBuild;
        const write = (file: string, text: string) => {
          mkdirSync(dirname(join(out, file)), { recursive: true });
          writeFileSync(join(out, file), text);
        };
        const page = (head: string, body: string) => shell.replace(HEAD, () => `<!--seo:start-->\n    ${head}\n    <!--seo:end-->`).replace(BODY, () => `<!--seo-body:start-->${body}<!--seo-body:end-->`);

        for (const path of build.routes()) {
          write(path === "/" ? "index.html" : `${path.slice(1)}/index.html`, page(build.headHtmlFor(path), build.bodyHtmlFor(path)));
        }
        const missing = build.notFoundPage();
        write("404.html", page(missing.head, missing.body));
        write("sitemap.xml", build.sitemapXml());
        write("robots.txt", build.robotsTxt());
      } finally {
        await server.close();
      }
    },
  };
}
