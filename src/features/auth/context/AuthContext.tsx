import { createContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { authService } from '../services/authService';

interface User {
  id: number;
  name: string;
  email: string;
  user_name: string;
  phone: string;
  role: {
    id: number;
    name: string;
  };
  country: {
    id: number;
    name: string;
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = Cookies.get('auth_token');
      if (savedToken) {
        setToken(savedToken);
        try {
          const profileData = await authService.getProfile();
          setUser(profileData);
        } catch (error) {
          console.error('Error loading profile:', error);
          Cookies.remove('auth_token');
          setToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    const { token: newToken } = response;
    
    Cookies.set('auth_token', newToken, { 
      expires: 7,
      secure: true,
      sameSite: 'strict'
    });
    setToken(newToken);
    
    const profileData = await authService.getProfile();
    setUser(profileData);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      Cookies.remove('auth_token');
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
