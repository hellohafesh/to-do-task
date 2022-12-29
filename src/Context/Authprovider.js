import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';




export const AuthContext = createContext();
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();


const Authprovider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentuser => {
            // console.log('user objerve');
            setUser(currentuser);
            setLoading(false);
        });
        return () => unSubscribe();
    }, [])


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }



    const authInfo = {
        loading,
        setLoading,
        user,
        createUser,
        signIn,
        googleSignIn,
        logout

    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}

        </AuthContext.Provider>
    );
};

export default Authprovider;