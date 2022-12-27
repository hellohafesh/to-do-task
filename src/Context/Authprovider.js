import React, { createContext } from 'react';
import app from '../Firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';




export const AuthContext = createContext();
const auth = getAuth(app);

const Authprovider = ({ children }) => {
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }







    const authInfo = {
        createUser,

    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}

        </AuthContext.Provider>
    );
};

export default Authprovider;