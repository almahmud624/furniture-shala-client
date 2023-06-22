import React, { createContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../Firebase/firebase.init";
import { useQuery } from "@chakra-ui/react";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  // create use
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update use profile
  const updateUserProfile = (userName) => {
    return updateProfile(auth.currentUser, userName);
  };

  // user login

  const userLogIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google sign in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // user sign out
  const userSignOut = () => {
    setLoading(true);
    localStorage.removeItem("furniture-token");
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      axios
        .get(
          `https://furniture-shala-server.vercel.app/user/role/${currentUser?.email}`
        )
        .then((res) => setRole(res?.data?.role));
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const authStore = {
    user,
    createUser,
    updateUserProfile,
    userLogIn,
    userSignOut,
    loading,
    googleSignIn,
    role,
  };
  return (
    <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
