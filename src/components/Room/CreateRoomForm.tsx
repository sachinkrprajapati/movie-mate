
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FilmIcon } from 'lucide-react';
import { useRooms } from '@/hooks/useRooms';
import { useMovies } from '@/hooks/useMovies';

const CreateRoomForm = () => {
  const [searchParams] = useSearchParams();
  const preSelectedMovieId = searchParams.get('movieId');
  
  const [roomName, setRoomName] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(preSelectedMovieId || '');
  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { movies, isLoading: isLoadingMovies } = useMovies();
  const { createRoom } = useRooms();
  const navigate = useNavigate();
  
  // Set movie ID when preSelectedMovieId changes
  useEffect(() => {
    if (preSelectedMovieId) {
      setSelectedMovieId(preSelectedMovieId);
    }
  }, [preSelectedMovieId]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!roomName.trim()) {
      setError('Room name is required');
      return;
    }
    
    if (!selectedMovieId) {
      setError('Please select a movie');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const roomId = await createRoom(roomName, selectedMovieId, isPrivate);
      navigate(`/rooms/${roomId}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create room. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create Watch Room</CardTitle>
        <CardDescription>
          Set up a new room to watch movies with friends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="room-name">Room Name</Label>
            <Input
              id="room-name"
              placeholder="Movie Night"
              required
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="movie">Select Movie</Label>
            <Select
              value={selectedMovieId}
              onValueChange={setSelectedMovieId}
              disabled={isLoadingMovies}
            >
              <SelectTrigger id="movie" className="w-full">
                <SelectValue placeholder="Select a movie" />
              </SelectTrigger>
              <SelectContent>
                {movies?.map((movie: any) => (
                  <SelectItem key={movie.id} value={movie.id}>
                    {movie.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="private"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            <Label htmlFor="private">Private Room</Label>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating...' : (
              <>
                <FilmIcon className="mr-2 h-4 w-4" />
                Create Room
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateRoomForm;
