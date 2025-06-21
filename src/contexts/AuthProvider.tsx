import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { loginUser, authUserProfile } from "@services/apis/auth/auth";
import type { LoginResponse, UserData } from "@interfaces/authTypes";

interface AuthContextType {
    user: UserData | undefined;
    isLoading: boolean;
    loginUser: {
        login: (data: any) => Promise<any>;
        isLoading: boolean;
        error: Error | null;
    };
    // logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");

    const { data: userProfileData, error, isLoading: isUserLoading } = useQuery<LoginResponse>({
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
    }, [error]);

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (response) => {
            if (response.data.token && response.data._id) {
                localStorage.setItem("userId", response.data._id);
                navigate("/", { state: { filter: "today" } });
            } else {
                throw new Error(response?.message || "Login failed!");
            }
        },
        onError: (err) => {
            console.error("Login error:", err);
        },
    });


    const contextValue = useMemo<AuthContextType>(() => ({
        user: loginMutation?.data?.data || userProfileData?.data || undefined,
        isLoading: isUserLoading,
        loginUser: {
            login: loginMutation.mutateAsync,
            isLoading: loginMutation.isPending,
            error: loginMutation.error ?? null,
        }
    }), [
        userProfileData,
        isUserLoading,
        loginMutation.mutateAsync,
        loginMutation.isPending,
        loginMutation.error,
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
