import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTeam, deleteTeam, getAllTeams, getAssignedUsers, removeAssignedUser, updateAssignedUsers, updateTeam } from "./teams";

//  Get all teams
export const useGetAllTeamsQuery = () => {
    return useQuery({
        queryKey: ["teams"],
        queryFn: getAllTeams,
    });
};

//  Create team
export const useCreateTeamMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["createTeam"],
        mutationFn: createTeam,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teams"] });
        },
    });
};

// Update team
export const useUpdateTeamMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["updateTeam"],
        mutationFn: ({ id, formData }: { id: string; formData: any }) => updateTeam(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teams"] });
        },
    });
};

// Delete team
export const useDeleteTeamMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["deleteTeam"],
        mutationFn: deleteTeam,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            queryClient.invalidateQueries({ queryKey: ["teams"] });
            queryClient.invalidateQueries({ queryKey: ["todoCounts"] });
        },
    });
};

export const useUpdateAssignedUsersMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["updateAssignedUsers"],
        mutationFn: ({ id, assignedUsers }: { id: string; assignedUsers: string[] }) => updateAssignedUsers(id, assignedUsers),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teams"] });
        },
    });
}

export const useRemoveAssignedUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["removeAssignedUser"],
        mutationFn: ({ id, userId }: { id: string; userId: string }) => removeAssignedUser(id, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teams"] });
        },
    });
};

export const useGetAssignedUsersQuery = (id: string) => {
    return useQuery({
        queryKey: ["assignedUsers", id],
        queryFn: () => getAssignedUsers(id),
        enabled: !!id, // Only run this query if id is available
    });
};