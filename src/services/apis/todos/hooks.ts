import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAllTodos,
    createTodo,
    getSingleTodo,
    updateTodo,
    addStepToTodo,
    updateStepToTodo,
    addTodoBySteps,
    getTodoCountsByAssignee,
    deleteStepFromTodo,
    deleteTodo,
    getTodosUsers,
    getAllJobProfiles,
} from "./todos";
import type { Step } from "@interfaces/todosTypes";

export interface GetTodosParams {
    filter?: string;
    teamId?: string;
    teamFilter?: string;
    search?: string;
}

//  Get All Todos
export const useGetAllTodosQuery = (params: GetTodosParams) => {
    return useQuery({
        queryKey: ["todos", params],
        queryFn: () => getAllTodos(params),
    });
};

//  Create Todo
export const useCreateTodoMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["createTodo"],
        mutationFn: createTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            queryClient.invalidateQueries({ queryKey: ["todoCounts"] });
        },
    });
};

//  Get Single Todo
export const useGetSingleTodoQuery = (id: string) => {
    return useQuery({
        queryKey: ["todo", id],
        queryFn: () => getSingleTodo(id),
        enabled: !!id,
        staleTime: 0
    });
};

//  Update Todo
export const useUpdateTodoMutation = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["updateTodo", id],
        mutationFn: (formData: FormData) => {
            if (!id) throw new Error("Missing todo ID");
            return updateTodo(id, formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            queryClient.invalidateQueries({ queryKey: ["todoCounts"] });
        },
    });
};

//  Add Step to Todo
export const useAddStepToTodoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['addStepToTodo'],
        mutationFn: addStepToTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });

        },
    });
};

//  Update Step in Todo
export const useUpdateStepToTodoMutation = () => {
    return useMutation({
        mutationKey: ["updateStepToTodo"],
        mutationFn: ({ todoId, stepId, payload }: { todoId: string; stepId: string; payload: Partial<Step> }) =>
            updateStepToTodo(todoId, stepId, payload)
    });
};

// Add Todo by Steps
export const useAddTodoByStepsMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["addTodoBySteps"],
        mutationFn: addTodoBySteps,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });
};

//  Get Todo Counts by Assignee
export const useGetTodoCountsQuery = () => {
    return useQuery({
        queryKey: ["todoCounts"],
        queryFn: getTodoCountsByAssignee,
    });
};

//  Delete Step from Todo
export const useDeleteStepFromTodoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["deleteStepFromTodo"],
        mutationFn: ({ todoId, stepId }: {
            todoId: string;
            stepId: string;
        }) => deleteStepFromTodo({ todoId, stepId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });
};

// Delete Todo
export const useDeleteTodoMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["deleteTodo"],
        mutationFn: (id: string) => deleteTodo(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            queryClient.invalidateQueries({ queryKey: ["todoCounts"] });
        },
    });
};

// Get Users for Todos
export const useGetTodosUsersQuery = (filters: { name?: string; jobProfileId?: string[] }) => {
    return useQuery({
        queryKey: ["todosUsers", filters],
        queryFn: () => getTodosUsers(filters)
    });
};

// Get All Job Profiles
export const useGetAllJobProfilesQuery = () => {
    return useQuery({
        queryKey: ["jobProfiles"],
        queryFn: getAllJobProfiles
    });
}