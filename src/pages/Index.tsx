import { RugeronCard } from "@/components/RugeronCard";
import rugeroneData from "@/data/rugerones.json";

const Index = () => {
  // Sort rugerones by date, newest first
  const sortedRugerones = [...rugeroneData].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-background film-grain">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-golden bg-clip-text text-transparent mb-6">
            Rugerón
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Rugerón is a recurring movie night in honor of <span className="text-primary font-semibold">Rutger Hauer</span>. 
              Each edition features a theme — usually a director or genre — and brings together friends 
              for a night of film and fun.
            </p>
          </div>
        </div>

        {/* Rugerones List */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Past Rugerones
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
