import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({ token: null, user: null });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('access-token'));
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    if (token) {
      setAuth({ token });
      navigate('/dashboard');
    } else if (!isAuthPage) {
      navigate('/login');
    }
  }, [location.pathname]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`http://localhost:4040/api/user/access-token`, {
        email,
        password,
      });

      const tokenData = response.data?.user?.accessToken;
      localStorage.setItem('access-token', JSON.stringify(tokenData));
      setAuth({ token: tokenData });
      navigate('/dashboard');
    } catch (err) {
      console.error('Login Error:', err.response);
      alert(err.response?.data || 'Login failed');
    }
  };

  const signup = async (name, email, password, confirmPassword) => {
    try {
      if (!name || !email || !password || !confirmPassword) {
        return alert('Please fill all the fields');
      }

      if (password !== confirmPassword) {
        return alert('Passwords do not match');
      }

      const response = await axios.post(`http://localhost:4040/api/user`, {
        name,
        email,
        password,
        confirmPassword,
      });

      alert(`User ${response.data?.user?.email} registered successfully`);
      navigate('/login');
    } catch (err) {
      console.error('Signup Error:', err.response);
      alert(err.response?.data || 'Signup failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('access-token');
    setAuth({ token: null });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ auth, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
