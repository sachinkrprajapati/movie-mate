
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Share2, ArrowLeft, Users, Link as LinkIcon } from 'lucide-react';
import VideoPlayer from '@/components/Player/VideoPlayer';
import ChatBox from '@/components/Chat/ChatBox';
import { useRooms } from '@/hooks/useRooms';
import { useMovies } from '@/hooks/useMovies';
import { useSocket } from '@/hooks/useSocket';
import { useAuth } from '@/hooks/useAuth';

const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRoomById, joinRoom, leaveRoom } = useRooms();
  const { getMovieById } = useMovies();
  const { user, isAuthenticated } = useAuth();
  const [isLoadingRoom, setIsLoadingRoom] = useState(true);
  const [roomData, setRoomData] = useState<any>(null);
  const [movieData, setMovieData] = useState<any>(null);
  const [videoReady, setVideoReady] = useState(false);
  
  // If we don't have a room ID, redirect
  useEffect(() => {
    if (!id) {
      navigate('/rooms');
    }
  }, [id, navigate]);
  
  // If not authenticated, redirect to login
  useEffect(() => {
    if (id && !isAuthenticated) {
      toast.error('You must be logged in to join a room');
      navigate(`/login?redirect=/rooms/${id}`);
    }
  }, [id, isAuthenticated, navigate]);
  
  // Initialize socket connection and room data
  const {
    isConnected,
    messages,
    roomState,
    sendMessage,
    updatePlayback,
    updateProgress
  } = useSocket(id || '');
  
  // Load room and movie data
  useEffect(() => {
    if (!id || !isAuthenticated) return;
    
    const loadRoomData = async () => {
      setIsLoadingRoom(true);
      
      try {
        // Join the room
        await joinRoom(id);
        
        // Get room data
        const room = getRoomById(id);
        
        if (!room) {
          toast.error('Room not found');
          navigate('/rooms');
          return;
        }
        
        setRoomData(room);
        
        // Get movie data
        const movie = getMovieById(room.movieId);
        
        if (!movie) {
          toast.error('Movie not found');
          navigate('/rooms');
          return;
        }
        
        setMovieData(movie);
      } catch (error) {
        console.error('Error loading room data:', error);
        toast.error('Failed to load room');
      } finally {
        setIsLoadingRoom(false);
      }
    };
    
    loadRoomData();
    
    // Clean up on unmount - leave the room
    return () => {
      if (id) {
        leaveRoom(id);
      }
    };
  }, [id, isAuthenticated, joinRoom, getRoomById, getMovieById, leaveRoom, navigate]);
  
  const handlePlay = () => {
    updatePlayback(true);
  };
  
  const handlePause = () => {
    updatePlayback(false);
  };
  
  const handleSeek = (seconds: number) => {
    updateProgress(seconds / (movieData?.duration || 1));
  };
  
  const handleProgress = (progress: { played: number }) => {
    // Only update if difference is significant to avoid too many updates
    const diff = Math.abs(progress.played - roomState.progress);
    if (diff > 0.01) {
      updateProgress(progress.played);
    }
  };
  
  const handleShareRoom = () => {
    // Generate a shareable link
    const roomUrl = `${window.location.origin}/rooms/${id}`;
    
    // Try to use the clipboard API
    if (navigator.clipboard) {
      navigator.clipboard.writeText(roomUrl)
        .then(() => toast.success('Room link copied to clipboard'))
        .catch(() => {
          // Fallback
          prompt('Copy this link to share the room:', roomUrl);
        });
    } else {
      // Fallback for browsers that don't support clipboard API
      prompt('Copy this link to share the room:', roomUrl);
    }
  };
  
  if (isLoadingRoom || !roomData || !movieData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-10 w-1/3 bg-muted rounded-md"></div>
          <div className="aspect-video bg-muted rounded-lg"></div>
          <div className="h-80 bg-muted rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate('/rooms')}
            className="-ml-2 gap-2 mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Rooms
          </Button>
          <h1 className="text-3xl font-bold">{roomData.name}</h1>
          <p className="text-muted-foreground mt-1">Watching: {movieData.title}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleShareRoom} className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          
          <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{roomState.participants.length}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VideoPlayer 
            url={movieData.videoUrl}
            playing={roomState.playing}
            progress={roomState.progress}
            onPlay={handlePlay}
            onPause={handlePause}
            onSeek={handleSeek}
            onProgress={handleProgress}
            onReady={() => setVideoReady(true)}
          />
          
          {!videoReady && (
            <div className="bg-card rounded-lg p-4 mt-4 text-center">
              <p className="text-muted-foreground">Loading video...</p>
            </div>
          )}
          
          {!isConnected && (
            <div className="bg-card rounded-lg p-4 mt-4 text-center">
              <p className="text-muted-foreground">Connecting to room...</p>
            </div>
          )}
        </div>
        
        <div className="h-[500px] lg:h-auto">
          <ChatBox 
            messages={messages}
            onSendMessage={sendMessage}
            currentUsername={user?.username || ''}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
