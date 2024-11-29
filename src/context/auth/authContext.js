import { useCheckToken } from "api/auth/checkToken";
import { useProfile } from "api/teacher/profile";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAccessToken } from "utils";


// Create Auth Context
const AuthContext = createContext(undefined);

// AuthProvider component to provide authentication state and methods
export const AuthProvider = ({ children }) => {
  // Initialize state with user data from localStorage (if it exists)

  const history = useHistory();
  const token = getAccessToken()
  const { data, isLoading } = useProfile(token)


  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    history.push("/dashboard");
  };

  const logout = () => {
    setUser(null);
    history.push("/");
  };


  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data])


  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
