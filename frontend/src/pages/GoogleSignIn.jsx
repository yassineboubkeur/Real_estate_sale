// src/components/GoogleSignIn.js
import React, { useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";

const GoogleSignIn = () => {
  const [user, setUser] = useState(null); // State to track the user

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // User is signed in
      } else {
        setUser(null); // User is signed out
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user details in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );

      setUser(user); // Update user state
      console.log("Signed in user:", user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      console.log("User signed out");

      // Clear user data from localStorage
      localStorage.removeItem("user");
      setUser(null); // Update user state
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
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

