import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthService } from "../services/API"; // Correct import path

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = AuthService.verifyToken(token);
      if (decodedUser) {
        setUser(decodedUser);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const { user, token } = await AuthService.login(email, password);
      localStorage.setItem("token", token);
      setUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      const { user, token } = await AuthService.signup(userData);
      localStorage.setItem("token", token);
      setUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
