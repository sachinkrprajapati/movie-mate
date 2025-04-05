import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create a mock function to simulate API calls during development
const mockApiCall = <T,>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

// Mock user data
const MOCK_USER: User = {
  id: '1',
  username: 'demouser',
  email: 'demo@example.com',
  isAdmin: false
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simulate checking token in localStorage
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          // In a real app, validate token with your backend
          // For now, just use our mock user
          setUser(MOCK_USER);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('auth_token');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await mockApiCall(null, 800);
      
      // Basic validation (in real app, this would be done on the server)
      if (email !== 'demo@example.com' || password !== 'password') {
        throw new Error('Invalid credentials');
      }
      
      // Store token
      localStorage.setItem('auth_token', 'mock_jwt_token');
      
      // Set user
      setUser(MOCK_USER);
      
      toast.success('Logged in successfully');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await mockApiCall(null, 1000);
      
      // Store token (in a real app, this would come from the server)
      localStorage.setItem('auth_token', 'mock_jwt_token');
      
      // Set user with the new username but keep other mock data
      const newUser = { ...MOCK_USER, username, email };
      setUser(newUser);
      
      toast.success('Registered successfully');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Simulate API call
      await mockApiCall(null, 300);
      
      // Remove token
      localStorage.removeItem('auth_token');
      
      // Clear user
      setUser(null);
      
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Logout failed');
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
