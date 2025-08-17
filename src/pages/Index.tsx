import { RugeronCard } from "@/components/RugeronCard";
import rugeroneData from "@/data/rugerones.json";
import { parseEuropeanDate } from "@/lib/utils";

const Index = () => {
  // Sort rugerones by date, newest first
  const sortedRugerones = [...rugeroneData].sort((a, b) => 
    parseEuropeanDate(b.date).getTime() - parseEuropeanDate(a.date).getTime()
  );

  return (
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
                Rugerón es una noche de cine recurrente en honor a <span className="text-primary font-semibold">Rutger Hauer</span>. 
                Cada edición presenta un tema — generalmente un director o género — y reúne a amigos 
                para una noche de cine y diversión.
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
  );
};

export default Index;
