import type {
    Step,
    TodoResponse,
    TodoSummaryCounts,
} from "@interfaces/todosTypes";
import { api } from "@services/apiClient";
import { TODOS_ENDPOINTS } from "@services/basePaths";

// 1. Get all todos
interface GetTodosParams {
    filter?: string;
    teamId?: string;
    teamFilter?: string;
    search?: string,
}

export const getAllTodos = async (params: GetTodosParams): Promise<TodoResponse> => {
    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => 
            value !== undefined && value !== "" && value !== null
        )
    );

    const response = await api.get(TODOS_ENDPOINTS.GET_ALL_TODOS, { params: filteredParams });
    return response.data;
};

// 2. Create a todo
export const createTodo = async (payload: any): Promise<any> => {
    const response = await api.post(TODOS_ENDPOINTS.CREATE_TODO, payload);
    return response.data;
};

// 3. Get a single todo
export const getSingleTodo = async (id: string): Promise<any> => {
    const response = await api.get(TODOS_ENDPOINTS.GET_SINGLE_TODO(id));
    return response.data;
};

// 4. Update a todo
export const updateTodo = async (id: string, payload: FormData): Promise<any> => {
    const response = await api.put(TODOS_ENDPOINTS.UPDATE_TODO(id), payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};


// 5. Add step to todo
export const addStepToTodo = async (payload: any): Promise<any> => {
    const response = await api.post(TODOS_ENDPOINTS.ADD_STEP_TO_TODO, payload);
    return response.data;
};

// 6. Update a step in a todo
export const updateStepToTodo = async (todoId: string, stepId: string, payload: Partial<Step>): Promise<any> => {
    const response = await api.put(TODOS_ENDPOINTS.UPDATE_STEP_TO_TODO(todoId, stepId), payload);
    return response.data;
};

// 7. Add todo by steps
export const addTodoBySteps = async (payload: any): Promise<any> => {
    const response = await api.post(TODOS_ENDPOINTS.ADD_TODO_BY_STEPS, payload);
    return response.data;
};

// 8. Get todo count by assignee
export const getTodoCountsByAssignee = async (): Promise<TodoSummaryCounts> => {
    const response = await api.get(TODOS_ENDPOINTS.GET_TODO_COUNTS_BY_ASSIGNEE);
    return response.data;
};

// 9. Delete a step from a todo
export const deleteStepFromTodo = async ({ todoId, stepId }: { todoId: string; stepId: string; }): Promise<any> => {
    const payload = { todoId, stepId };
    const response = await api.delete(TODOS_ENDPOINTS.DELETE_STEP_FROM_TODO, {
        data: payload,
    });
    return response.data;
};


// 10. Delete a todo
export const deleteTodo = async (id: string): Promise<any> => {
    const response = await api.delete(TODOS_ENDPOINTS.DELETE_TODO(id));
    return response.data;
};
