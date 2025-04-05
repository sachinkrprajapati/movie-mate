
import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuth';

// For demonstration - in a real app, this would connect to your backend
// Using a mock URL for now since we don't have a real backend yet
const SOCKET_URL = 'http://localhost:3000';

interface Message {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: string;
}

interface RoomState {
  playing: boolean;
  progress: number;
  participants: {
    id: string;
    username: string;
  }[];
}

export const useSocket = (roomId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomState, setRoomState] = useState<RoomState>({
    playing: false,
    progress: 0,
    participants: []
  });
  
  const { user } = useAuth();
  
  // For demo purposes, we'll add some mock messages
  useEffect(() => {
    setMessages([
      {
        id: 'msg1',
        userId: 'user2',
        username: 'filmfan',
        text: 'Hello everyone! Ready for the movie?',
        timestamp: new Date(Date.now() - 120000).toISOString()
      },
      {
        id: 'msg2',
        userId: 'user3',
        username: 'cinephile',
        text: 'Yes! Been waiting all day for this',
        timestamp: new Date(Date.now() - 60000).toISOString()
      }
    ]);
    
    setRoomState({
      playing: false,
      progress: 0,
      participants: [
        { id: 'user1', username: 'demouser' },
        { id: 'user2', username: 'filmfan' },
        { id: 'user3', username: 'cinephile' }
      ]
    });
  }, []);

  // Mock socket connection
  useEffect(() => {
    if (!user || !roomId) return;
    
    // In a real app, we would connect to the socket server
    console.log(`Connecting to socket for room ${roomId}...`);
    
    // Since we don't have a real socket server, we'll just simulate it
    const timeout = setTimeout(() => {
      setIsConnected(true);
      console.log(`Connected to socket for room ${roomId}`);
    }, 1000);
    
    return () => {
      clearTimeout(timeout);
      setIsConnected(false);
      console.log(`Disconnected from socket for room ${roomId}`);
    };
  }, [roomId, user]);

  // Send a chat message
  const sendMessage = useCallback((text: string) => {
    if (!user || !isConnected) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      userId: user.id,
      username: user.username,
      text,
      timestamp: new Date().toISOString()
    };
    
    // In a real app, we would emit this to the socket
    // For now, we'll just add it to our local state
    setMessages(prev => [...prev, newMessage]);
  }, [user, isConnected]);

  // Play/pause the video
  const updatePlayback = useCallback((playing: boolean) => {
    if (!isConnected) return;
    
    // In a real app, we would emit this to the socket
    // For now, we'll just update our local state
    setRoomState(prev => ({
      ...prev,
      playing
    }));
  }, [isConnected]);

  // Update progress
  const updateProgress = useCallback((progress: number) => {
    if (!isConnected) return;
    
    // In a real app, we would emit this to the socket
    // For now, we'll just update our local state
    setRoomState(prev => ({
      ...prev,
      progress
    }));
  }, [isConnected]);

  return {
    isConnected,
    messages,
    roomState,
    sendMessage,
    updatePlayback,
    updateProgress
  };
};
