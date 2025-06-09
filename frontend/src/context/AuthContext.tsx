// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define la interfaz para el usuario autenticado (ajusta según los datos que tu backend devuelve al login)
interface User {
    id_usuario: number;
    nombre_usuario: string;
    rol: string; // 'Administrador' | 'Especialista' | 'Paciente'
    primer_nombre: string;
    email: string;
    // Agrega cualquier otra propiedad del usuario que necesites de tu base de datos
}

// Define la interfaz para el contexto de autenticación
interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    login: (token: string, userData: User) => void;
    logout: () => void;
}

// Crea el contexto con un valor por defecto (undefined es común para TypeScript)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define las props para el AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

// Componente AuthProvider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Efecto para cargar el estado de autenticación desde localStorage al inicio
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            try {
                const userData: User = JSON.parse(storedUser);
                setIsAuthenticated(true);
                setUser(userData);
                setToken(storedToken);
            } catch (e) {
                console.error("Error al parsear los datos de usuario de localStorage:", e);
                // Si hay un error, limpia el almacenamiento y el estado
                logout();
            }
        } else {
            setIsAuthenticated(false);
            setUser(null);
            setToken(null);
        }
    }, []);

    // Función para iniciar sesión
    const login = (newToken: string, userData: User) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
        setToken(newToken);
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};