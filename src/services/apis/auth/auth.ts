import type { LoginResponse, UsersDropdownResponse } from "@interfaces/authTypes";
import { api } from "@services/apiClient";
import { AUTH_ENDPOINTS } from "@services/basePaths";
import { useQuery } from "@tanstack/react-query";
interface LoginPayloadRaw {
    identifier: string;
    password: string;
    fcmToken: string,
}

interface LoginPayload {
    email?: string;
    phone?: | number;
    password: string;
    fcmToken: string,
}

export const loginUser = async ({identifier,password,fcmToken}: LoginPayloadRaw): Promise<LoginResponse> => {
    const isEmail = identifier.includes("@");
    const payload: LoginPayload = {
        ...(isEmail
            ? { email: identifier }
            : { phone: Number(identifier.replace(/\D/g, "")) } 
        ),
        password,
        fcmToken
    };

    const response = await api.post(AUTH_ENDPOINTS.LOGIN, payload);
    return response.data;
};


export const logoutUser = async (): Promise<any> => {
    const response = await api.get(AUTH_ENDPOINTS.LOGOUT);
    return response.data;
};

export const authUserProfile = async (id: string): Promise<LoginResponse> => {
    const response = await api.get(AUTH_ENDPOINTS.LOGGED_IN_USER(id));
    return response.data;
};

const getUsersDropDown = async (): Promise<UsersDropdownResponse> => {
    const response = await api.get(AUTH_ENDPOINTS.USERS_LIST);
    return response.data;
};

export const useGetUsersDropDown = () => {
    return useQuery({
        queryKey: ['users-dropdown'],
        queryFn: () => getUsersDropDown()
    });
};