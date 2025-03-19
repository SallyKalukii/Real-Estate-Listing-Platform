import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if the user is already logged in
        const fetchUser = async () => {
            const response = await fetch('/api/user');
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            }
        };
        fetchUser();
    }, []);

    const login = () => {
        window.location.href = '/auth/google';
    };

    const logout = async () => {
        await fetch('/api/logout', { method: 'POST' });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};