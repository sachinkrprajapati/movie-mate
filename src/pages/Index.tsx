
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Film, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useMovies } from '@/hooks/useMovies';
import MovieCard from '@/components/Movie/MovieCard';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const { movies, isLoading } = useMovies();
  
  // Show only 4 movies for the featured section
  const featuredMovies = movies.slice(0, 4);
  
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="py-20 bg-gradient-to-br from-background to-background/80">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Watch Movies Together, <span className="gradient-text">Anytime</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Synchronize your movie experience with friends and family, no matter where they are.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild size="lg" className="gap-2">
                <Link to={isAuthenticated ? "/movies" : "/register"}>
                  <Film className="h-5 w-5" />
                  {isAuthenticated ? "Browse Movies" : "Get Started"}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/rooms">
                  <Users className="h-5 w-5" />
                  Join a Room
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured movies section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Movies</h2>
            <Link to="/movies" className="text-primary flex items-center gap-1 text-sm font-medium hover:underline">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading ? (
              // Placeholder for loading state
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="movie-card animate-pulse">
                  <div className="w-full aspect-[2/3] bg-muted rounded-t-lg"></div>
                  <div className="p-4">
                    <div className="h-5 bg-muted rounded-md"></div>
                  </div>
                </div>
              ))
            ) : featuredMovies.length === 0 ? (
              <p className="col-span-full text-center py-12 text-muted-foreground">
                No movies available yet
              </p>
            ) : (
              featuredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  posterUrl={movie.posterUrl}
                />
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg border border-border">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <Film className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose a Movie</h3>
              <p className="text-muted-foreground">
                Browse our collection of movies and pick something you all want to watch.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg border border-border">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create a Room</h3>
              <p className="text-muted-foreground">
                Start a watch room and invite friends by sharing the unique room link.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg border border-border">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Watch Together</h3>
              <p className="text-muted-foreground">
                Enjoy synchronized playback and chat with your friends while watching.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Watch Together?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join CineSync today and experience movies with friends and family.
          </p>
          <Button asChild size="lg">
            <Link to={isAuthenticated ? "/movies" : "/register"}>
              {isAuthenticated ? "Browse Movies" : "Sign Up Now"}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
