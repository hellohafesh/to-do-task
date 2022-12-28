import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';




export const AuthContext = createContext();
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();


const Authprovider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentuser => {
            // console.log('user objerve');
            setUser(currentuser);
        });
        return () => unSubscribe();
    }, [])


    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const logout = () => {
        return signOut(auth);
    }



    const authInfo = {
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