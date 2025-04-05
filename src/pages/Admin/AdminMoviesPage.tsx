
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PlusCircle, Upload } from 'lucide-react';
import { useMovies } from '@/hooks/useMovies';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AdminMoviesPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { addMovie } = useMovies();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Redirect if not admin
  React.useEffect(() => {
    if (isAuthenticated && user && !user.isAdmin) {
      toast.error('You do not have permission to access this page');
      navigate('/');
    }
    
    if (!isAuthenticated) {
      toast.error('You must be logged in to access this page');
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!title || !videoUrl) {
      setError('Title and video URL are required');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await addMovie({
        title,
        posterUrl,
        videoUrl,
        description,
        duration,
        releaseYear
      });
      
      // Reset form
      setTitle('');
      setPosterUrl('');
      setVideoUrl('');
      setDescription('');
      setDuration('');
      setReleaseYear('');
      
      toast.success('Movie added successfully');
    } catch (err: any) {
      setError(err.message || 'Failed to add movie');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!isAuthenticated || (user && !user.isAdmin)) {
    return null; // Redirect handled in useEffect
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin: Add Movie</h1>
      
      <div className="max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Add New Movie</CardTitle>
            <CardDescription>
              Enter movie details to add it to the catalog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="title">Movie Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter movie title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="posterUrl">Poster URL</Label>
                <Input
                  id="posterUrl"
                  value={posterUrl}
                  onChange={(e) => setPosterUrl(e.target.value)}
                  placeholder="https://example.com/poster.jpg"
                />
                <p className="text-xs text-muted-foreground">URL to the movie poster image</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL *</Label>
                <Input
                  id="videoUrl"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://example.com/video.mp4"
                  required
                />
                <p className="text-xs text-muted-foreground">Direct link to the video file (MP4, WebM, etc.)</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Movie description"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="1h 30m"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="releaseYear">Release Year</Label>
                  <Input
                    id="releaseYear"
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(e.target.value)}
                    placeholder="2023"
                  />
                </div>
              </div>
              
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Adding...' : (
                  <>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Movie
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminMoviesPage;
