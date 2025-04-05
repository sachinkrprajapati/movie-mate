
import React from 'react';
import MovieCard from './MovieCard';
import { Skeleton } from "@/components/ui/skeleton";

interface Movie {
  id: string;
  title: string;
  posterUrl: string;
}

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
}

const MovieGrid = ({ movies, isLoading = false }: MovieGridProps) => {
  // Generate skeletons for loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="movie-card">
            <div className="relative">
              <AspectRatioSkeleton />
            </div>
            <div className="p-4">
              <Skeleton className="h-5 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No movies available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          id={movie.id} 
          title={movie.title} 
          posterUrl={movie.posterUrl} 
        />
      ))}
    </div>
  );
};

// Helper component for loading state
const AspectRatioSkeleton = () => (
  <div className="relative pt-[150%] bg-muted rounded-t-lg overflow-hidden">
    <Skeleton className="absolute inset-0" />
  </div>
);

export default MovieGrid;
