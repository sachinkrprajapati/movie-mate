
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users } from 'lucide-react';

interface RoomCardProps {
  id: string;
  name: string;
  hostUsername: string;
  movieTitle: string;
  moviePosterUrl: string;
  participantCount: number;
}

const RoomCard = ({ 
  id, 
  name, 
  hostUsername, 
  movieTitle, 
  moviePosterUrl, 
  participantCount 
}: RoomCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 bg-muted">
        <img 
          src={moviePosterUrl || '/placeholder.svg'} 
          alt={movieTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
          <h3 className="text-white font-medium truncate">{movieTitle}</h3>
        </div>
      </div>
      
      <CardContent className="pt-4">
        <h4 className="font-semibold mb-2 truncate">{name}</h4>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs bg-primary/20 text-primary">
                {hostUsername.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground">{hostUsername}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{participantCount}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button asChild className="w-full">
          <Link to={`/rooms/${id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
