import React, { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { loginUser, authUserProfile, logoutUser } from "@services/apis/auth/auth";
import type { LoginResponse, UserData } from "@interfaces/authTypes";
import type { Socket } from "socket.io-client";

interface AuthContextType {
    user: UserData | undefined;
    isLoading: boolean;
    loginUser: {
        login: (data: any) => Promise<any>;
        isLoading: boolean;
        error: Error | null;
    };
    logout: () => Promise<void>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    socket: Socket | null,
    setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
    fcmToken: string | null,
    setFcmToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [fcmToken, setFcmToken] = useState<string | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [search, setSearch] = useState<string>("");
    const [user, setUser] = useState<null | UserData>(null);
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");

    const { data: userProfileData, error, isLoading: isUserLoading, refetch, isSuccess } = useQuery<LoginResponse>({
        queryKey: ['authUserProfile'],
        queryFn: async () => {
            if (!userId) throw new Error('User ID not found in localStorage');
            return await authUserProfile(userId);
        },
        enabled: !!userId,
        retry: false,
        staleTime: 0
    });

    useEffect(() => {
        if (error && (error as any)?.response?.status === 404) {
            localStorage.removeItem('userId');
        }
        else if (isSuccess) {
            setUser(userProfileData.data);
        }
    }, [error, isSuccess]);

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (response) => {
            if (response.data.token && response.data._id) {
                localStorage.setItem("userId", response.data._id);
                setUser(response.data);
                navigate("/", { state: { filter: "today" } });
            } else {
                throw new Error(response?.message || "Login failed!");
            }
        },
        onError: (err) => {
            console.error("Login error:", err);
        },
    });
    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            localStorage.removeItem("userId");
            refetch(),
                setUser(null);
            navigate("/login");
        },
        onError: (error) => {
            console.error("Logout error:", error);
        }
    });


    const contextValue = useMemo<AuthContextType>(() => ({
        user: user || undefined,
        isLoading: isUserLoading,
        loginUser: {
            login: loginMutation.mutateAsync,
            isLoading: loginMutation.isPending,
            error: loginMutation.error ?? null,
        },
        logout: () => logoutMutation.mutateAsync(),
        search,
        setSearch,
        socket,
        setSocket,
        fcmToken,
        setFcmToken
    }), [
        user,
        isUserLoading,
        loginMutation.mutateAsync,
        loginMutation.isPending,
        loginMutation.error,
        logoutMutation.mutateAsync,
        search,
        setSearch,
        socket,
        setSocket,
        fcmToken,
        setFcmToken
    ]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
