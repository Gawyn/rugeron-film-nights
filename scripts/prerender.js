import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the rugerones data
const rugeronesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/rugerones.json'), 'utf8'));

// Read the base HTML template
const baseHTML = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

// Function to generate metadata for a rugeron
function generateRugeronMetadata(rugeron) {
  const formattedDate = new Date(rugeron.date.split('-').reverse().join('-')).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const moviesList = rugeron.movies.map(m => `${m.title} (${m.year})`).join(', ');
  
  return {
    title: `${rugeron.title} - Rugerón`,
    description: `Rugerón: ${rugeron.title} - ${formattedDate} en ${rugeron.place}. Películas: ${moviesList}. Asistentes: ${rugeron.attendants}`,
    image: rugeron.thumbnail,
    url: `/rugeron/${rugeron.id}`
  };
}

// Function to generate HTML for a rugeron page
function generateRugeronHTML(rugeron) {
  const metadata = generateRugeronMetadata(rugeron);
  
  // Create the HTML content with proper metadata
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${metadata.title}</title>
    <meta name="description" content="${metadata.description}" />
    <meta name="author" content="Rugerón" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${metadata.url}" />
    <meta property="og:title" content="${metadata.title}" />
    <meta property="og:description" content="${metadata.description}" />
    <meta property="og:image" content="${metadata.image}" />
    <meta property="og:image:width" content="400" />
    <meta property="og:image:height" content="400" />
    <meta property="og:image:alt" content="${rugeron.title} - Thumbnail" />
    <meta property="og:site_name" content="Rugerón" />
    <meta property="og:locale" content="es_ES" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${metadata.title}" />
    <meta name="twitter:description" content="${metadata.description}" />
    <meta name="twitter:image" content="${metadata.image}" />
    <meta name="twitter:image:alt" content="${rugeron.title} - Thumbnail" />
    
    <!-- Additional meta tags -->
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${metadata.url}" />
    
    <!-- Include the same CSS and JS as the main app -->
    <link rel="stylesheet" href="/src/index.css" />
  </head>
  <body>
    <div id="root">
      <!-- This will be replaced by React when the app loads -->
      <div style="text-align: center; padding: 2rem; font-family: Arial, sans-serif;">
        <h1>${rugeron.title}</h1>
        <p>${metadata.description}</p>
        <p>Redirigiendo a la aplicación...</p>
      </div>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

  return html;
}

// Create the dist directory if it doesn't exist
const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Create the rugeron subdirectory
const rugeronDir = path.join(distDir, 'rugeron');
if (!fs.existsSync(rugeronDir)) {
  fs.mkdirSync(rugeronDir, { recursive: true });
}

// Generate HTML files for each rugeron
console.log('Generating static HTML files for individual Rugeron pages...');

rugeronesData.forEach(rugeron => {
  const html = generateRugeronHTML(rugeron);
  const filePath = path.join(rugeronDir, `${rugeron.id}.html`);
  
  fs.writeFileSync(filePath, html);
  console.log(`✅ Generated: ${rugeron.id}.html`);
});

console.log(`\n🎬 Generated ${rugeronesData.length} static HTML files with metadata!`);
console.log('📁 Files are saved in: dist/rugeron/');
console.log('\n💡 These files contain the proper meta tags for social media crawlers.');
console.log('🔗 When someone shares a link to /rugeron/[id], the crawler will see the correct metadata!');
