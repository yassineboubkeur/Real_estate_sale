// src/auth/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase"; // Import Firebase auth instance
import { onAuthStateChanged, signOut } from "firebase/auth"; // Import Firebase auth functions

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Listen for Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        setIsAuthenticated(true);
        setUser({
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        // User is signed out
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Update localStorage whenever isAuthenticated or user changes
  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    localStorage.setItem("user", JSON.stringify(user));
  }, [isAuthenticated, user]);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData); // Set user data on login
  };

  const logout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("isAuthenticated"); // Clear authentication state
      localStorage.removeItem("user"); // Clear user data
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
// // AuthContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   // Initialize state from localStorage
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     const storedAuth = localStorage.getItem('isAuthenticated');
//     return storedAuth ? JSON.parse(storedAuth) : false;
//   });

//   // Update localStorage whenever isAuthenticated changes
//   useEffect(() => {
//     localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
//   }, [isAuthenticated]);

//   const login = () => {
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     localStorage.removeItem('isAuthenticated'); // Clear authentication state
//     localStorage.removeItem('user'); // Clear user data (if stored)
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


