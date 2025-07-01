import type { ApiResponse, GetAllTicketsParams } from "@interfaces/ticketsTypes";
import { api } from "@services/apiClient";
import { TICKET_ENDPOINTS } from "@services/basePaths";

export const getAllTickets = async (employeeId: string, params: GetAllTicketsParams): Promise<ApiResponse> => {
    const payload: Record<string, any> = {};
    if (params.name) payload.name = params.name;
    if (params.ticketType) payload.ticketType = params.ticketType;
    if (params.priority) payload.priority = params.priority;
    if (params.status) payload.status = params.status;
    if (params.page) payload.page = params.page;
    if (params.limit) payload.limit = params.limit;

    const response = await api.post(TICKET_ENDPOINTS.GET_ALL_TICKETS_BY_EMPLOYEE(employeeId), payload);
    return response.data;
};
export const getAllCustomers = async (): Promise<any> => {
    const response = await api.get(TICKET_ENDPOINTS.GET_CUSTOMERS);
    return response.data;
};


export const getTicketById = async (ticketId: string): Promise<any> => {
    const response = await api.get(TICKET_ENDPOINTS.GET_SINGLE_TICKET(ticketId));
    return response.data;
};
