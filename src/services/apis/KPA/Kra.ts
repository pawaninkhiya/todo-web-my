import { api } from "@services/apiClient";
import { KRA_ENDPOINTS } from "@services/basePaths";

export const getAllKRA = async (): Promise<any> => {
    const response = await api.get(KRA_ENDPOINTS.GET_ALL_KRA);
    return response.data;
};

export const createKRA = async (payload: any): Promise<any> => {
    const response = await api.post(KRA_ENDPOINTS.CREATE_KRA, payload);
    return response.data;
};

export const updateKRA = async (id: string, payload: any): Promise<any> => {
    const response = await api.put(KRA_ENDPOINTS.UPDATE_KRA(id), payload);
    return response.data;
};

export const deleteKRA = async (id: string): Promise<any> => {
    const response = await api.delete(KRA_ENDPOINTS.DELETE_KRA(id));
    return response.data;
};

export const getKRAById = async (id: string): Promise<any> => {
    const response = await api.get(KRA_ENDPOINTS.GET_KRA_BY_ID(id));
    return response.data;
}