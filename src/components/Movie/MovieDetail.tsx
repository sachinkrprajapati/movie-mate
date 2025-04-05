
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Play, Users, Calendar, Clock } from 'lucide-react';

interface MovieDetailProps {
  movie: {
    id: string;
    title: string;
    posterUrl: string;
    videoUrl: string;
    description?: string;
    duration?: string;
    releaseYear?: string;
  };
}

const MovieDetail = ({ movie }: MovieDetailProps) => {
  const navigate = useNavigate();
  
  const handleCreateRoom = () => {
    navigate(`/rooms/create?movieId=${movie.id}`);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <div className="rounded-lg overflow-hidden border border-border shadow-lg">
          <img 
            src={movie.posterUrl || '/placeholder.svg'} 
            alt={movie.title}
            className="w-full object-cover"
          />
        </div>
      </div>
      
      <div className="md:col-span-2 space-y-6">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {movie.releaseYear && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{movie.releaseYear}</span>
            </div>
          )}
          {movie.duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{movie.duration}</span>
            </div>
          )}
        </div>
        
        {movie.description && (
          <p className="text-muted-foreground leading-relaxed">{movie.description}</p>
        )}
        
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleCreateRoom} className="gap-2">
            <Play className="h-4 w-4" />
            Create Watch Room
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <a href={`/rooms?movieId=${movie.id}`}>
              <Users className="h-4 w-4" />
              Join Existing Room
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
