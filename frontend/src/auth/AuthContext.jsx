import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth && storedAuth !== "undefined" ? JSON.parse(storedAuth) : false;
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== "undefined") {
      const parsedUser = JSON.parse(storedUser);
      // Check if parsedUser is an object and not empty
      if (parsedUser && typeof parsedUser === "object" && Object.keys(parsedUser).length > 0) {
        return parsedUser;
      }
    }
    return null; // Return null if storedUser is empty or invalid
  });

  // Update localStorage whenever isAuthenticated or user changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('user', JSON.stringify(user));
  }, [isAuthenticated, user]);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData); // Set user data on login
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null); // Clear user data
    localStorage.removeItem('isAuthenticated'); // Clear authentication state
    localStorage.removeItem('user'); // Clear user data

    localStorage.removeItem('userr');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        setIsAuthenticated, // Pass setIsAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

