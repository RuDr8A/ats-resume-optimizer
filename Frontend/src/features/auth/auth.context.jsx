import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api"; 

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => { 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe();
                console.log("BACKEND SENT THIS:", data);
                setUser(data.user);
            } catch (err) { 
                console.log("No active session.", err);
            } finally {
                setLoading(false);
            }
        };

        getAndSetUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }} >
            {children}
        </AuthContext.Provider>
    );
};