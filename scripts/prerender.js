import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const rugeronDir = path.join(distDir, "rugeron");

const rugeronesData = JSON.parse(
  fs.readFileSync(path.join(rootDir, "src/data/rugerones.json"), "utf8")
);
const packageJson = JSON.parse(
  fs.readFileSync(path.join(rootDir, "package.json"), "utf8")
);
const baseHTMLPath = path.join(distDir, "index.html");

if (!fs.existsSync(baseHTMLPath)) {
  throw new Error("Run `vite build` before prerendering pages.");
}

const baseHTML = fs.readFileSync(baseHTMLPath, "utf8");
const siteUrl = (process.env.SITE_URL || packageJson.homepage).replace(/\/$/, "");
const basePath = new URL(siteUrl).pathname.replace(/\/$/, "");

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function parseEuropeanDate(dateString) {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function assetUrl(assetPath) {
  if (/^https?:/.test(assetPath)) {
    return assetPath;
  }

  const normalizedPath = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return `${siteUrl}${normalizedPath}`;
}

function pageUrl(rugeron) {
  return `${siteUrl}/rugeron/${rugeron.id}/`;
}

function routePath(rugeron) {
  return `${basePath}/rugeron/${rugeron.id}/`;
}

function generateRugeronMetadata(rugeron) {
  const formattedDate = parseEuropeanDate(rugeron.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const moviesList = rugeron.movies.map((movie) => `${movie.title} (${movie.year})`).join(", ");

  return {
    title: `${rugeron.title} - Rugerón`,
    description: `Rugerón: ${rugeron.title} - ${formattedDate} en ${rugeron.place}. Películas: ${moviesList}. Asistentes: ${rugeron.attendants}`,
    image: assetUrl(rugeron.thumbnail),
    url: pageUrl(rugeron),
  };
}

function generateRugeronHTML(rugeron) {
  const metadata = generateRugeronMetadata(rugeron);
  const metaTags = `
    <meta name="description" content="${escapeHTML(metadata.description)}" />
    <meta name="author" content="Rugerón" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${escapeHTML(metadata.url)}" />
    <meta property="og:title" content="${escapeHTML(metadata.title)}" />
    <meta property="og:description" content="${escapeHTML(metadata.description)}" />
    <meta property="og:image" content="${escapeHTML(metadata.image)}" />
    <meta property="og:image:width" content="400" />
    <meta property="og:image:height" content="400" />
    <meta property="og:image:alt" content="${escapeHTML(`${rugeron.title} - Thumbnail`)}" />
    <meta property="og:site_name" content="Rugerón" />
    <meta property="og:locale" content="es_ES" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHTML(metadata.title)}" />
    <meta name="twitter:description" content="${escapeHTML(metadata.description)}" />
    <meta name="twitter:image" content="${escapeHTML(metadata.image)}" />
    <meta name="twitter:image:alt" content="${escapeHTML(`${rugeron.title} - Thumbnail`)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${escapeHTML(metadata.url)}" />`;

  return baseHTML
    .replace(/<title>.*?<\/title>/, `<title>${escapeHTML(metadata.title)}</title>`)
    .replace("</head>", `${metaTags}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root" data-prerender-route="${escapeHTML(routePath(rugeron))}"></div>`);
}

if (!fs.existsSync(rugeronDir)) {
  fs.mkdirSync(rugeronDir, { recursive: true });
}

console.log("Generating static HTML files for individual Rugeron pages...");

rugeronesData.forEach((rugeron) => {
  const html = generateRugeronHTML(rugeron);
  const routeDir = path.join(rugeronDir, rugeron.id);
  const indexPath = path.join(routeDir, "index.html");
  const legacyPath = path.join(rugeronDir, `${rugeron.id}.html`);

  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(indexPath, html);
  fs.writeFileSync(legacyPath, html);
  console.log(`Generated: rugeron/${rugeron.id}/index.html`);
});

fs.copyFileSync(baseHTMLPath, path.join(distDir, "404.html"));

console.log(`\nGenerated ${rugeronesData.length} static detail pages.`);
console.log("Copied dist/index.html to dist/404.html for React Router fallback.");
