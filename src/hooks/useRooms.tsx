
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from './useAuth';

// Define room types
export interface Room {
  id: string;
  name: string;
  movieId: string;
  hostId: string;
  hostUsername: string;
  isPrivate: boolean;
  participants: {
    id: string;
    username: string;
  }[];
  createdAt: string;
}

// Sample room data
const sampleRooms: Room[] = [
  {
    id: 'room1',
    name: 'Movie Night',
    movieId: '1',
    hostId: '1',
    hostUsername: 'demouser',
    isPrivate: false,
    participants: [
      { id: '1', username: 'demouser' },
      { id: '2', username: 'filmfan' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'room2',
    name: 'Animation Lovers',
    movieId: '2',
    hostId: '3',
    hostUsername: 'cinephile',
    isPrivate: false,
    participants: [
      { id: '3', username: 'cinephile' }
    ],
    createdAt: new Date().toISOString()
  }
];

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, you would fetch from API
        // For now, simulate API delay and use sample data
        await new Promise(resolve => setTimeout(resolve, 800));
        setRooms(sampleRooms);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError('Failed to load rooms');
        toast.error('Failed to load rooms');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const getRoomById = (id: string) => {
    return rooms.find(room => room.id === id) || null;
  };

  // Create a new room
  const createRoom = async (name: string, movieId: string, isPrivate: boolean = false) => {
    if (!user) {
      toast.error('You must be logged in to create a room');
      throw new Error('Authentication required');
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newRoom: Room = {
        id: `room-${Date.now()}`,
        name,
        movieId,
        hostId: user.id,
        hostUsername: user.username,
        isPrivate,
        participants: [{ id: user.id, username: user.username }],
        createdAt: new Date().toISOString()
      };
      
      setRooms(prevRooms => [...prevRooms, newRoom]);
      toast.success('Room created successfully');
      return newRoom.id;
    } catch (err) {
      console.error('Error creating room:', err);
      toast.error('Failed to create room');
      throw err;
    }
  };

  // Join an existing room
  const joinRoom = async (roomId: string) => {
    if (!user) {
      toast.error('You must be logged in to join a room');
      throw new Error('Authentication required');
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setRooms(prevRooms => 
        prevRooms.map(room => {
          if (room.id === roomId) {
            // Check if user is already in the room
            const isAlreadyJoined = room.participants.some(p => p.id === user.id);
            
            if (!isAlreadyJoined) {
              return {
                ...room,
                participants: [...room.participants, { id: user.id, username: user.username }]
              };
            }
          }
          return room;
        })
      );
      
      toast.success('Joined room successfully');
      return roomId;
    } catch (err) {
      console.error('Error joining room:', err);
      toast.error('Failed to join room');
      throw err;
    }
  };

  // Leave a room
  const leaveRoom = async (roomId: string) => {
    if (!user) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setRooms(prevRooms => 
        prevRooms.map(room => {
          if (room.id === roomId) {
            return {
              ...room,
              participants: room.participants.filter(p => p.id !== user.id)
            };
          }
          return room;
        }).filter(room => {
          // Remove room if it has no participants
          if (room.participants.length === 0) {
            return false;
          }
          return true;
        })
      );
      
      toast.success('Left room successfully');
    } catch (err) {
      console.error('Error leaving room:', err);
      toast.error('Failed to leave room');
      throw err;
    }
  };

  return {
    rooms,
    isLoading,
    error,
    getRoomById,
    createRoom,
    joinRoom,
    leaveRoom
  };
};
