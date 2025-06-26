import type { GetAllTicketsParams } from "@interfaces/ticketsTypes";
import { useQuery } from "@tanstack/react-query";
import { getAllCustomers, getAllTickets, getTicketById } from "./tickets";

export const useGetAllTicketsQuery = (employeeId: string, params: GetAllTicketsParams) => {
    return useQuery({
        queryKey: ["Tickets", employeeId, params],
        queryFn: () => getAllTickets(employeeId, params),
        enabled: !!employeeId,
    });
};
export const useGetAllCustomersQuery = () => {
    return useQuery({
        queryKey: ["getAllCustomersForTickets"],
        queryFn: () => getAllCustomers()
    });
};

export const useGetTicketByIdQuery = (ticketId: string) => {
    return useQuery({
        queryKey: ["ticket", ticketId],
        queryFn: () => getTicketById(ticketId),
        enabled: !!ticketId,
    });
};