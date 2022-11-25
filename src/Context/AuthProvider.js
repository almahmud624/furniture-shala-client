import React, { createContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../Firebase/firebase.init";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  // create use
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update use profile
  const updateUserProfile = (userName) => {
    return updateProfile(auth.currentUser, userName);
  };

  // user login

  const userLogIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // user sign out
  const userSignOut = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  const authStore = {
    user,
    createUser,
    updateUserProfile,
    userLogIn,
    userSignOut,
  };
  return (
    <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
