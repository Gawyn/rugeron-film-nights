import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import { parseEuropeanDate } from "@/lib/utils";

interface RugeronCardProps {
  id: string;
  title: string;
  date: string;
  place: string;
  attendants: string;
  thumbnail?: string;
}

export const RugeronCard = ({ id, title, date, place, attendants, thumbnail }: RugeronCardProps) => {
  const formattedDate = parseEuropeanDate(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Link to={`/rugeron/${id}`} className="block group">
      <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-golden-glow film-grain">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {thumbnail && (
              <div className="w-28 h-28 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                <img 
                  src={thumbnail} 
                  alt={title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                {title}
              </h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{place}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{attendants}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};