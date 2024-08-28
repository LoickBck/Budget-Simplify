
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Ajout de l'état de chargement

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/check-auth', {
                    method: 'GET',
                    credentials: 'include', // Inclure les cookies
                });

                if (response.ok) {
                    const data = await response.json();
                    setIsAuthenticated(data.authenticated);
                    setUser(data.user);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch (error) {
                console.error("Erreur lors de la vérification de l'authentification:", error);
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false); // Fin du chargement après la vérification
            }
        };

        checkAuth();
    }, []);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        setLoading(false); // Fin du chargement après le login
    };

    const logout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
