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
      // Validate parsedUser is an object and not empty
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
    if (!userData || typeof userData !== "object" || !userData.token) {
      console.error("Invalid user data provided for login.");
      return;
    }

    setIsAuthenticated(true);
    setUser(userData); // Set user data on login

    // Store additional user data in localStorage if needed
    localStorage.setItem('userr', JSON.stringify(userData)); // Optional: Store user data under 'userr'
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null); // Clear user data

    // Clear all user-related data from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('userr');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        setIsAuthenticated, // Pass setIsAuthenticated for external use
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   // Initialize state from localStorage
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     const storedAuth = localStorage.getItem('isAuthenticated');
//     return storedAuth && storedAuth !== "undefined" ? JSON.parse(storedAuth) : false;
//   });

//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser && storedUser !== "undefined") {
//       const parsedUser = JSON.parse(storedUser);
//       // Check if parsedUser is an object and not empty
//       if (parsedUser && typeof parsedUser === "object" && Object.keys(parsedUser).length > 0) {
//         return parsedUser;
//       }
//     }
//     return null; // Return null if storedUser is empty or invalid
//   });

//   // Update localStorage whenever isAuthenticated or user changes
//   useEffect(() => {
//     localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
//     localStorage.setItem('user', JSON.stringify(user));
//   }, [isAuthenticated, user]);

//   const login = (userData) => {
//     setIsAuthenticated(true);
//     setUser(userData); // Set user data on login
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     setUser(null); // Clear user data
//     localStorage.removeItem('isAuthenticated'); // Clear authentication state
//     localStorage.removeItem('user'); // Clear user data

//     localStorage.removeItem('userr');
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         user,
//         login,
//         logout,
//         setIsAuthenticated, // Pass setIsAuthenticated
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

