import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "./firebase.config";
import axios from "axios";
export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // console.log(user);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update user
  const UserProfile = (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  // login user
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout user
  const logout = () => {
    setUser(null);
    return signOut(auth);
  };

  // google and github
  const google = new GoogleAuthProvider();

  // google login
  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, google);
  };



  const values = {
    user,
    loading,
    createUser,
    UserProfile,
    login,
    logout,
    setLoading,
    googleLogIn,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
