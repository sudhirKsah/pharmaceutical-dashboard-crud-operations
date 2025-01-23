import { apiFetch } from "../utils/api";
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(Boolean(token));
    }, []);

    const login = async (email, password) => {
        try{
            const response = await apiFetch('users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });
            // if(!response.ok){
            //     const errorData = await response.json();
            //     setLoginError(true);
            //     return { success: false, message: errorData.message || 'Invalid email or password' };
            // }
            // const data = await response.json();
            localStorage.setItem('token', response.token);
            setIsLoggedIn(true);
            setLoginError(false);
            return { success: true };
        }
        catch (error) {
            // console.error('Login error', error);
            setLoginError(true);
            // throw error;
            return { success: false, message: 'An unexpected error occurred. Please try again.' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value = {{ isLoggedIn, loginError, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}