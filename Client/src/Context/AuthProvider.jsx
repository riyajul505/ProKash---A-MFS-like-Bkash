import { createContext, useEffect, useState } from 'react';


export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const passing = {
        loading,
        user,
        setUser,
        setLoading
    };
    return (
        <AuthContext.Provider value={passing}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;