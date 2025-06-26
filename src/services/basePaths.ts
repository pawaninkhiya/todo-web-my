export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ------------------ Auth Endpoints ------------------

export const AUTH_ENDPOINTS = {
    LOGIN: "/v1/rawMaterialApp/todologin",
    LOGOUT: "/v1/rawMaterialApp/todologout",
    LOGGED_IN_USER: (id: string) => `/v1/rawMaterialApp/todoLoggedUserById/${id}`,
    USERS_LIST: `v1/ticketRaise/cacEmployeeSuggestions`
};


export const TODOS_ENDPOINTS = {
    CREATE_TODO: "/v3/hrms/todo/createtodos",
    GET_ALL_TODOS: "/v3/hrms/todo/todos",
    GET_SINGLE_TODO: (id: string) => `/v3/hrms/todo/todo/${id}`,
    UPDATE_TODO: (id: string) => `/v3/hrms/todo/todos/${id}`,
    ADD_STEP_TO_TODO: "/v3/hrms/todo/Addsteps",
    UPDATE_STEP_TO_TODO: (todoId: string, stepId: string) => `/v3/hrms/todo/todos/${todoId}/steps/${stepId}`,
    ADD_TODO_BY_STEPS: "/v3/hrms/todo/addtodoBysteps",
    GET_TODO_COUNTS_BY_ASSIGNEE: "/v3/hrms/todo/AllTodoCountAssigned", //
    DELETE_STEP_FROM_TODO: "/v3/hrms/todo/deleteSteps",
    DELETE_TODO: (id: string) => `/v3/hrms/todo/TodoDelete/${id}`,
};

export const TEAM_ENDPOINTS = {
    CREATE_TEAM: "/v3/hrms/team/create",
    GET_ALL_TEAMS: "/v3/hrms/team/getAll",
    UPDATE_TEAM: (id: string) => `/v3/hrms/team/update/${id}`,
    DELETE_TEAM: (id: string) => `/v3/hrms/team/delete/${id}`,
};
export const TICKET_ENDPOINTS = {
    RAISED_USER: "/v1/ticketRaise/cacEmployeeSuggestions",
    GET_ALL_TICKETS_BY_EMPLOYEE: (id: string) => `/v1/ticketRaise/getAllTickets/${id}`,
    GET_SINGLE_TICKET: (id: string) => `/v1/ticketRaise/getSingleTicket/${id}`,
    UPDATE_TICKET_STATUS: "/v1/ticketRaise/updateTicket",
    PART_DETAILS: "/v1/ticketRaise/partCodeSuggestions",
    GET_TICKET_LOGS: "/v1/ticketRaise/getTicketRaiseLogs",
    GET_CUSTOMERS: "/v1/customer/app",
    GET_COMMENTS: "/v1/ticketRaise/getCommentApp"
};


