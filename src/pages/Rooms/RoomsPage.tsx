
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FilmIcon } from 'lucide-react';
import { useRooms } from '@/hooks/useRooms';
import { useMovies } from '@/hooks/useMovies';
import RoomCard from '@/components/Room/RoomCard';

const RoomsPage = () => {
  const { rooms, isLoading } = useRooms();
  const { movies } = useMovies();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter rooms based on search term
  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get movie details for each room
  const roomsWithMovies = filteredRooms.map(room => {
    const movie = movies.find(m => m.id === room.movieId);
    return {
      ...room,
      movieTitle: movie?.title || 'Unknown Movie',
      moviePosterUrl: movie?.posterUrl || ''
    };
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Watch Rooms</h1>
        
        <Button asChild>
          <Link to="/rooms/create" className="flex items-center gap-2">
            <FilmIcon className="h-4 w-4" />
            Create Room
          </Link>
        </Button>
      </div>
      
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search rooms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 max-w-lg"
        />
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-card rounded-lg overflow-hidden border border-border animate-pulse">
              <div className="h-40 bg-muted"></div>
              <div className="p-4">
                <div className="h-5 w-3/4 bg-muted rounded mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-muted rounded"></div>
                  <div className="h-4 w-8 bg-muted rounded"></div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <div className="h-9 bg-muted rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : roomsWithMovies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No rooms available</p>
          <Button asChild>
            <Link to="/rooms/create">Create a Room</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {roomsWithMovies.map((room) => (
            <RoomCard
              key={room.id}
              id={room.id}
              name={room.name}
              hostUsername={room.hostUsername}
              movieTitle={room.movieTitle}
              moviePosterUrl={room.moviePosterUrl}
              participantCount={room.participants.length}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomsPage;
