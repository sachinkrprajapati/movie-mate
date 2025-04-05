
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Play } from 'lucide-react';

interface MovieCardProps {
  id: string;
  title: string;
  posterUrl: string;
}

const MovieCard = ({ id, title, posterUrl }: MovieCardProps) => {
  return (
    <div className="movie-card group">
      <div className="relative">
        <AspectRatio ratio={2/3} className="bg-muted">
          <img 
            src={posterUrl || '/placeholder.svg'}
            alt={title}
            className="object-cover w-full h-full rounded-t-lg"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
              <Play className="mr-2 h-4 w-4" />
              Watch
            </Button>
          </div>
        </AspectRatio>
      </div>
      <div className="p-4">
        <Link to={`/movies/${id}`} className="block">
          <h3 className="font-semibold truncate hover:text-primary transition-colors">{title}</h3>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
