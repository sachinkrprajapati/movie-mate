
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useMovies, Movie } from '@/hooks/useMovies';
import MovieDetail from '@/components/Movie/MovieDetail';
import { toast } from 'sonner';

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getMovieById } = useMovies();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!id) {
      navigate('/movies');
      return;
    }
    
    const fetchMovie = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        const movieData = getMovieById(id);
        
        if (!movieData) {
          toast.error('Movie not found');
          navigate('/movies');
          return;
        }
        
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie:', error);
        toast.error('Failed to load movie details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovie();
  }, [id, navigate, getMovieById]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-muted rounded-md mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 aspect-[2/3] bg-muted rounded-lg"></div>
            <div className="md:col-span-2 space-y-4">
              <div className="h-10 w-3/4 bg-muted rounded-md"></div>
              <div className="h-4 w-1/4 bg-muted rounded-md"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded-md"></div>
                <div className="h-4 bg-muted rounded-md"></div>
                <div className="h-4 w-3/4 bg-muted rounded-md"></div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-32 bg-muted rounded-md"></div>
                <div className="h-10 w-32 bg-muted rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!movie) {
    return null; // Handled in useEffect with redirect
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate('/movies')}
        className="mb-6 -ml-2 gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Movies
      </Button>
      
      <MovieDetail movie={movie} />
    </div>
  );
};

export default MovieDetailPage;
