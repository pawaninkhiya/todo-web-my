import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createKRA, deleteKRA, getAllKRA, getKRAById, updateKRA } from "./Kra";

export const useGetAllKRAQuery = (filters: { search: string; assignedUserId: string }) => {
    return useQuery({
        queryKey: ["KRAs", filters],
        queryFn: () => getAllKRA(filters),
    });
};
export const useCreateKRAMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["createKRA"],
        mutationFn: createKRA,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["KRAs"] });
        },
    });
};

export const useUpdateKRAMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["updateKRA"],
        mutationFn: ({ id, payload }: { id: string; payload: any }) => updateKRA(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["KRAs"] });
        },
    });
};
export const useDeleteKRAMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["deleteKRA"],
        mutationFn: deleteKRA,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["KRAs"] });
        },
    });
};

export const useGetKRAByIdQuery = (id: string) => {
    return useQuery({
        queryKey: ["KRA", id],
        queryFn: () => getKRAById(id),
        enabled: !!id, // Only run if id is provided
        staleTime: 0
    });
};