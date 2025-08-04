import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RugeronLogo } from "@/components/RugeronLogo";
import rugeroneData from "@/data/rugerones.json";

const RugeronDetail = () => {
  const { id } = useParams<{ id: string }>();
  const rugeron = rugeroneData.find(r => r.id === id);

  if (!rugeron) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Rugerón Not Found</h1>
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(rugeron.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-background film-grain">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Rugerones
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <RugeronLogo size={80} />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-golden bg-clip-text text-transparent mb-4">
            {rugeron.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="text-lg">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{rugeron.place}</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Attendants */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Users className="w-5 h-5" />
                Attendants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{rugeron.attendants}</p>
            </CardContent>
          </Card>

          {/* Movies */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-primary">Movies Watched</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rugeron.movies.map((movie, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <span className="text-foreground font-medium">{movie.title}</span>
                      <span className="text-muted-foreground ml-2">({movie.year})</span>
                    </div>
                    {movie.imdbId && (
                      <a
                        href={`https://www.imdb.com/title/${movie.imdbId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-accent transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Photo Gallery */}
        {rugeron.photos && rugeron.photos.length > 0 && (
          <div className="mt-12 max-w-6xl mx-auto">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-primary text-center">Photo Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rugeron.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="aspect-video bg-muted rounded-lg overflow-hidden hover:shadow-purple-glow transition-shadow"
                    >
                      <img
                        src={photo}
                        alt={`${rugeron.title} - Photo ${index + 1}`}
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center text-muted-foreground">
                              Photo ${index + 1}
                            </div>
                          `;
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default RugeronDetail;