
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import CreateRoomForm from '@/components/Room/CreateRoomForm';

const CreateRoomPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        asChild
        className="mb-6 -ml-2 gap-2"
      >
        <Link to="/rooms">
          <ArrowLeft className="h-4 w-4" />
          Back to Rooms
        </Link>
      </Button>
      
      <div className="max-w-3xl mx-auto">
        <CreateRoomForm />
      </div>
    </div>
  );
};

export default CreateRoomPage;
