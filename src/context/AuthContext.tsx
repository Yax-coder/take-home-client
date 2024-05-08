import React, { createContext, useCallback, useEffect, useState, ReactNode } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext<any>({});

export interface User {
    name?: string;
    email: string;
    password?: string;
    _id?: string;
    token?: string;
}

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [registerInfo, setRegisterInfo] = useState<User>({
        name: "",
        email: "",
        password: "",
    })
    const [loginInfo, setLoginInfo] = useState<User>({
        email: "",
        password: "",
    })

    useEffect(() => {
        const user = localStorage.getItem('user');
        setUser(JSON.parse(user!))
    }, []);

    const [registerError, setRegisterError] = useState<any>(null)
    const [loginError, setLoginError] = useState<any>(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState<boolean>(false);
    const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);

    const registerUser = useCallback(async (e: any) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null)
        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo))
        setIsRegisterLoading(false);
        if (response.error) {
            return setRegisterError(response)
        }
        localStorage.setItem('user', JSON.stringify(response))
        setUser(response);
    }, [registerInfo]);

    const updateRegisterInfo = useCallback((info: User) => {
        setRegisterInfo(info)
    }, [])
    const updateLoginInfo = useCallback((info: User) => {
        setLoginInfo(info)
    }, [])
    const loginUser = useCallback(async (e: any) => {
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null)
        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo))
        setIsLoginLoading(false);
        if (response.error) {
            return setLoginError(response)
        }
        localStorage.setItem('user', JSON.stringify(response))
        setUser(response);
    }, [loginInfo])

    const logoutUser = () => {
        localStorage.removeItem('user');
        setUser(null)
    }

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading, logoutUser, loginUser, isLoginLoading, loginError, updateLoginInfo, loginInfo }}>
            {children}
        </AuthContext.Provider>
    );
}
