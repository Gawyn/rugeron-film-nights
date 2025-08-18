import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Users, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import rugeroneData from "@/data/rugerones.json";
import { parseEuropeanDate } from "@/lib/utils";
import { useState } from "react";

const RugeronDetail = () => {
  const { id } = useParams<{ id: string }>();
  const rugeron = rugeroneData.find(r => r.id === id);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (!rugeron) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Rugerón No Encontrado</h1>
          <Link to="/">
            <Button variant="outline">Volver al Inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = parseEuropeanDate(rugeron.date).toLocaleDateString('es-ES', {
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
              Volver a Rugerones
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            {/* Thumbnail Image */}
            <div className="flex-shrink-0">
              <img 
                src={rugeron.thumbnail} 
                alt={`${rugeron.title} thumbnail`}
                className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-lg shadow-lg"
              />
            </div>
            
            {/* Title and Info */}
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-golden bg-clip-text text-transparent mb-4">
                {rugeron.title}
              </h1>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-muted-foreground">
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
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Attendants */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Users className="w-5 h-5" />
                Asistentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{rugeron.attendants}</p>
            </CardContent>
          </Card>

          {/* Movies */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-primary">Películas Vistas</CardTitle>
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

        {/* Photos Section */}
        {rugeron.photos && rugeron.photos.length > 0 && (
          <div className="mt-12 max-w-6xl mx-auto">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-primary">Fotos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rugeron.photos.map((photo, index) => (
                    <div key={index} className="overflow-hidden rounded-lg cursor-pointer group">
                      <img
                        src={photo}
                        alt={`${rugeron.title} photo ${index + 1}`}
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                        onClick={() => setSelectedPhoto(photo)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Photo Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-full max-h-full">
              <img
                src={selectedPhoto}
                alt="Full size photo"
                className="max-w-full max-h-full object-contain"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-4 bg-background hover:bg-background/80"
                onClick={() => setSelectedPhoto(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RugeronDetail;