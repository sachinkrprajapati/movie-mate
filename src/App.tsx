
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./components/Layout/MainLayout";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import MoviesPage from "./pages/Movies/MoviesPage";
import MovieDetailPage from "./pages/Movies/MovieDetailPage";
import RoomsPage from "./pages/Rooms/RoomsPage";
import CreateRoomPage from "./pages/Rooms/CreateRoomPage";
import RoomPage from "./pages/Rooms/RoomPage";
import AdminMoviesPage from "./pages/Admin/AdminMoviesPage";

// Providers
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Index />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="movies" element={<MoviesPage />} />
              <Route path="movies/:id" element={<MovieDetailPage />} />
              <Route path="rooms" element={<RoomsPage />} />
              <Route path="rooms/create" element={<CreateRoomPage />} />
              <Route path="rooms/:id" element={<RoomPage />} />
              <Route path="admin/movies" element={<AdminMoviesPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
