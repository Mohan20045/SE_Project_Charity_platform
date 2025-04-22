import { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await api.get('/donors/profile');
          setUser(response.data.data);
        } catch (error) {
          console.error('Error fetching user:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('isAdmin');
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5001/api/donors/login', {
        email,
        password
      });

      if (response.data.status === 'success') {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        setUser(response.data.data);
        return { success: true };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const response = await api.post('/admin/login', {
        email,
        password
      });

      const { token, data } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('name', data.admin.name);
      setUser({ ...data.admin, isAdmin: true, role: 'admin' });
      return { success: true };
    } catch (error) {
      console.error('Admin login error:', error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || 'An error occurred during admin login'
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/donors/register', userData);
      const { data } = response.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.name);
      setUser(data);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'An error occurred during registration';
      return {
        success: false,
        message: errorMessage
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('name');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        adminLogin,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
