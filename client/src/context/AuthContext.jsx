// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from "react";
import { login as apiLogin } from "../api/interviewAPI";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (username, password) => {
    try {
      const data = await apiLogin(username, password);
      setToken(data.token);
      setUser({ username }); // Store basic user info
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
