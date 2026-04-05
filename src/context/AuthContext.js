import React, { createContext, useState, useEffect, useContext } from "react";
import {
  getCurrentUser,
  saveCurrentUser,
  clearCurrentUser,
  getUsers,
  saveUsers,
} from "../utils/storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setCurrentUser(user);
        }
      } catch (error) {
        console.error("Failed to load session", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSession();
  }, []);

  const login = async (email, password) => {
    try {
      const users = await getUsers();
      const user = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password,
      );

      if (!user) {
        throw new Error("Invalid credentials");
      }

      await saveCurrentUser(user);
      setCurrentUser(user);
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const users = await getUsers();
      const userExists = users.some(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );

      if (userExists) {
        throw new Error("Email already registered");
      }

      const newUser = {
        id: `u${Date.now()}`,
        name,
        email,
        password,
      };

      const updatedUsers = [...users, newUser];
      await saveUsers(updatedUsers);
      await saveCurrentUser(newUser);
      setCurrentUser(newUser);
    } catch (error) {
      console.error("Registration error", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await clearCurrentUser();
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
