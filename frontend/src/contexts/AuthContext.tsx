import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { validateForm } from '../utils/validation';

interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  isPremium: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  fieldErrors: Record<string, string[]>;
  clearErrors: () => void;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface ApiError {
  message: string;
  errors?: { field: string; message: string }[];
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const clearErrors = () => {
    setError(null);
    setFieldErrors({});
  };

  const handleApiError = (err: unknown) => {
    if (err instanceof Error) {
      try {
        const apiError = JSON.parse(err.message) as ApiError;
        if (apiError.errors) {
          const errors: Record<string, string[]> = {};
          apiError.errors.forEach(({ field, message }) => {
            if (!errors[field]) {
              errors[field] = [];
            }
            errors[field].push(message);
          });
          setFieldErrors(errors);
        } else {
          setError(apiError.message || 'An error occurred');
        }
      } catch {
        setError(err.message);
      }
    } else {
      setError('An unexpected error occurred');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      clearErrors();
      
      // Validate fields
      const validationErrors = validateForm({ email, password });
      if (Object.keys(validationErrors).length > 0) {
        setFieldErrors(validationErrors);
        throw new Error('Validation failed');
      }

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.text();
        try {
          const parsedError = JSON.parse(errorData);
          throw new Error(JSON.stringify(parsedError));
        } catch {
          throw new Error(errorData || 'Failed to login');
        }
      }

      const responseText = await response.text();
      if (!responseText) {
        throw new Error('Empty response from server');
      }

      const data = JSON.parse(responseText);
      if (!data || !data.token || !data.user) {
        throw new Error('Invalid response format');
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (err) {
      handleApiError(err);
      throw err;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      clearErrors();

      // Convert RegisterData to Record<string, string> for validation
      const validationData: Record<string, string> = {
        email: data.email,
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword,
        firstName: data.firstName,
        lastName: data.lastName,
      };

      // Validate all fields
      const validationErrors = validateForm(validationData);
      if (Object.keys(validationErrors).length > 0) {
        setFieldErrors(validationErrors);
        throw new Error('Validation failed');
      }

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.text();
        try {
          const parsedError = JSON.parse(errorData);
          throw new Error(JSON.stringify(parsedError));
        } catch {
          throw new Error(errorData || 'Failed to register');
        }
      }

      const responseText = await response.text();
      if (!responseText) {
        throw new Error('Empty response from server');
      }

      const result = JSON.parse(responseText);
      if (!result || !result.token || !result.user) {
        throw new Error('Invalid response format');
      }

      setToken(result.token);
      setUser(result.user);
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
    } catch (err) {
      handleApiError(err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isLoading,
        error,
        fieldErrors,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
