import React, { createContext, useEffect, useState } from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import app from '../Firebase/firebase.config';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged (auth, (user)=>{
            setUser(user);
            setLoading(false);
        });
        return ()=>{return unSubscribe()};
    },[])
    const passing = {
        loading,
        user
    };
    return (
        <AuthContext.Provider value={passing}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;