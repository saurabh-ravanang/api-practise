import { createContext, useState } from "react";


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"))

    const login = (accessToken) => {
        setToken(accessToken)
        localStorage.setItem("token", accessToken);
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };
    return (
        <AuthContext.Provider value={{
            token,
            login,
            logout,
            isAuthenticated: !!token,
        }}>
            {children}
        </AuthContext.Provider>
    )
}