import { Helmet } from "react-helmet-async";
import { RugeronCard } from "@/components/RugeronCard";
import rugeroneData from "@/data/rugerones.json";
import { parseEuropeanDate } from "@/lib/utils";

const Index = () => {
  // Sort rugerones by date, newest first
  const sortedRugerones = [...rugeroneData].sort((a, b) => 
    parseEuropeanDate(b.date).getTime() - parseEuropeanDate(a.date).getTime()
  );

  return (
    <>
      <Helmet>
        <title>Rugerón - Noches de Cine en Honor a Rutger Hauer</title>
        <meta name="description" content="Rugerón es una noche de cine recurrente en honor a Rutger Hauer. Cada edición presenta un tema — generalmente un director o género — y reúne a amigos para una noche de cine y diversión." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Rugerón - Noches de Cine en Honor a Rutger Hauer" />
        <meta property="og:description" content="Rugerón es una noche de cine recurrente en honor a Rutger Hauer. Cada edición presenta un tema — generalmente un director o género — y reúne a amigos para una noche de cine y diversión." />
        <meta property="og:image" content="/rugeron-header.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Rugerón - Logo" />
        <meta property="og:site_name" content="Rugerón" />
        <meta property="og:locale" content="es_ES" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rugerón - Noches de Cine en Honor a Rutger Hauer" />
        <meta name="twitter:description" content="Rugerón es una noche de cine recurrente en honor a Rutger Hauer. Cada edición presenta un tema — generalmente un director o género — y reúne a amigos para una noche de cine y diversión." />
        <meta name="twitter:image" content="/rugeron-header.png" />
        <meta name="twitter:image:alt" content="Rugerón - Logo" />
        
        {/* Additional meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Rugerón" />
        <link rel="canonical" href="/" />
      </Helmet>
      
      <div className="min-h-screen bg-background film-grain">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-16">
            <div className="flex flex-col lg:flex-row items-center gap-8 max-w-5xl mx-auto">
              <div className="w-full lg:w-auto lg:flex-shrink-0">
                <img 
                  src="/rugeron-header.png" 
                  alt="Rugerón" 
                  className="w-full lg:w-auto lg:max-w-md h-auto"
                />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Rugerón es un evento de cine que celebramos periódicamente. Nació en 2022 inspirado por el gran <span className="text-primary font-semibold">Rutger Hauer</span>. 
                  Cada edición tiene un tema, a menudo un director, y nos reúne para disfrutar juntos de la magia del cine.
                </p>
              </div>
            </div>
          </div>

          {/* Rugerones List */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Rugerones Anteriores
            </h2>
            <div className="space-y-6">
              {sortedRugerones.map((rugeron) => (
                <RugeronCard
                  key={rugeron.id}
                  id={rugeron.id}
                  title={rugeron.title}
                  date={rugeron.date}
                  place={rugeron.place}
                  attendants={rugeron.attendants}
                  thumbnail={rugeron.thumbnail}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
