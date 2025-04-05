
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// Define movie types
export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  videoUrl: string;
  description?: string;
  duration?: string;
  releaseYear?: string;
}

// Sample movie data
const sampleMovies: Movie[] = [
  {
    id: '1',
    title: 'Big Buck Bunny',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Big_buck_bunny_poster_big.jpg',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself.',
    duration: '9m 56s',
    releaseYear: '2008'
  },
  {
    id: '2',
    title: 'Sintel',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Sintel_poster.jpg/640px-Sintel_poster.jpg',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    description: 'A lonely young woman, Sintel, searches for a baby dragon she called Scales.',
    duration: '14m 48s',
    releaseYear: '2010'
  },
  {
    id: '3',
    title: 'Tears of Steel',
    posterUrl: 'https://mango.blender.org/wp-content/uploads/2013/05/01_thom_celia_bridge.jpg',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    description: 'In an apocalyptic future, a group of soldiers and scientists takes refuge in Amsterdam to try to retake the city from an army of robots.',
    duration: '12m 14s',
    releaseYear: '2012'
  },
  {
    id: '4',
    title: 'Elephant Dream',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Elephants_Dream_poster.jpg/640px-Elephants_Dream_poster.jpg',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: 'Friends Proog and Emo journey inside the folds of a seemingly infinite Machine.',
    duration: '10m 53s',
    releaseYear: '2006'
  }
];

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, you would fetch from API
        // For now, simulate API delay and use sample data
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMovies(sampleMovies);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies');
        toast.error('Failed to load movies');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const getMovieById = (id: string) => {
    return movies.find(movie => movie.id === id) || null;
  };

  // In a real app, this would make an API call
  const addMovie = async (movie: Omit<Movie, 'id'>) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newMovie: Movie = {
        ...movie,
        id: `movie-${Date.now()}`
      };
      
      setMovies(prevMovies => [...prevMovies, newMovie]);
      toast.success('Movie added successfully');
      return newMovie;
    } catch (err) {
      console.error('Error adding movie:', err);
      toast.error('Failed to add movie');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    movies,
    isLoading,
    error,
    getMovieById,
    addMovie
  };
};
