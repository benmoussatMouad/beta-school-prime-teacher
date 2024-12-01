import { useProfile } from "api/teacher/profile";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAccessToken } from "utils";


// Create Auth Context
const AuthContext = createContext(undefined);

// AuthProvider component to provide authentication state and methods
export const AuthProvider = ({ children }) => {
  // Initialize state with user data from localStorage (if it exists)

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const token = getAccessToken();
  const { data, isLoading: dataLoading } = useProfile(token);


  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (!dataLoading) {
      setLoading(false);
    }
  }, [dataLoading]);

  useEffect(() => {
    if (data?.user) {
      setUser(data);
      setIsAuthenticated(true);
    }
  }, [data]);


  return (
    <AuthContext.Provider value={{ user, login, logout, setUser, isLoading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext in your components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
