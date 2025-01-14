import React, { useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useAuth } from "../auth/AuthContext";

const GoogleSignIn = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth(); // Destructure setIsAuthenticated
  const [user, setUser] = useState(() => {
    // Initialize user state from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Check if parsedUser is an object and not empty
      if (parsedUser && typeof parsedUser === "object" && Object.keys(parsedUser).length > 0) {
        return parsedUser;
      }
    }
    return null; // Return null if storedUser is empty or invalid
  });

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const userData = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL || "",
        };

        // Save user details in localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData); // Update user state
        setIsAuthenticated(true); // Update authentication state
      } else {
        // User is signed out
        localStorage.removeItem("user"); // Clear user data from localStorage
        setUser(null); // Update user state
        setIsAuthenticated(false); // Update authentication state
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [setIsAuthenticated]);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // Save user details in localStorage
      const userData = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || "User",
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL || "",
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData); // Update user state
      setIsAuthenticated(true); // Update authentication state
      console.log("Signed in user:", userData);
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Failed to sign in with Google. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      localStorage.removeItem("user"); // Clear user data from localStorage
      setUser(null); // Update user state
      setIsAuthenticated(false); // Update authentication state
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Failed to sign out. Please try again.");
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <img
            src={user.photoURL}
            alt="Profile"
            style={{ width: "50px", borderRadius: "50%" }}
          />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign in with Google</button>
      )}
    </div>
  );
};

export default GoogleSignIn;

// // src/components/GoogleSignIn.js
// import React, { useState, useEffect } from "react";
// import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
// import { auth, provider } from "../firebase";

// const GoogleSignIn = () => {
//   const [user, setUser] = useState(() => {
//     // Initialize user state from localStorage
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   // Listen for authentication state changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       if (firebaseUser) {
//         // User is signed in
//         const userData = {
//           id: firebaseUser.uid,
//           name: firebaseUser.displayName || "User",
//           email: firebaseUser.email,
//           photoURL: firebaseUser.photoURL || "",
//         };

//         // Save user details in localStorage
//         localStorage.setItem("user", JSON.stringify(userData));
//         setUser(userData); // Update user state
//       } else {
//         // User is signed out
//         localStorage.removeItem("user"); // Clear user data from localStorage
//         setUser(null); // Update user state
//       }
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   const handleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const firebaseUser = result.user;

//       // Save user details in localStorage
//       const userData = {
//         id: firebaseUser.uid,
//         name: firebaseUser.displayName || "User",
//         email: firebaseUser.email,
//         photoURL: firebaseUser.photoURL || "",
//       };

//       localStorage.setItem("user", JSON.stringify(userData));
//       setUser(userData); // Update user state
//       console.log("Signed in user:", userData);
//     } catch (error) {
//       console.error("Error signing in:", error);
//       alert("Failed to sign in with Google. Please try again.");
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth); // Sign out the user
//       localStorage.removeItem("user"); // Clear user data from localStorage
//       setUser(null); // Update user state
//       console.log("User signed out");
//     } catch (error) {
//       console.error("Error signing out:", error);
//       alert("Failed to sign out. Please try again.");
//     }
//   };

//   return (
//     <div>
//       {user ? (
//         <div>
//           <p>Welcome, {user.name}!</p>
//           <img
//             src={user.photoURL}
//             alt="Profile"
//             style={{ width: "50px", borderRadius: "50%" }}
//           />
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <button onClick={handleSignIn}>Sign in with Google</button>
//       )}
//     </div>
//   );
// };

// export default GoogleSignIn;



// // src/components/GoogleSignIn.js
// import React, { useState, useEffect } from "react";
// import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
// import { auth, provider } from "../firebase";

// const GoogleSignIn = () => {
//   const [user, setUser] = useState(null); // State to track the user

//   // Listen for authentication state changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user); // User is signed in
//       } else {
//         setUser(null); // User is signed out
//       }
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   const handleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       // Save user details in localStorage
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           displayName: user.displayName,
//           email: user.email,
//           photoURL: user.photoURL,
//         })
//       );

//       setUser(user); // Update user state
//       console.log("Signed in user:", user);
//     } catch (error) {
//       console.error("Error signing in:", error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth); // Sign out the user
//       console.log("User signed out");

//       // Clear user data from localStorage
//       localStorage.removeItem("user");
//       setUser(null); // Update user state
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   return (
//     <div>
//       {user ? (
//         <div>
//           <p>Welcome, {user.displayName}!</p>
//           <img
//             src={user.photoURL}
//             alt="Profile"
//             style={{ width: "50px", borderRadius: "50%" }}
//           />
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <button onClick={handleSignIn}>Sign in with Google</button>
//       )}
//     </div>
//   );
// };

// export default GoogleSignIn;

