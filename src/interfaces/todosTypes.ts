export type AssignedUser = {
    id: string;
    name: string;
};

export type TeamInfo = {
    _id: string;
    name: string;
    createdByName: string;
};

export type Creator = {
    userId: string;
    userName: string;
};

export type TodoStatus = "pending" | "inProgress" | "completed" | string
export interface Todo {
    _id: string;
    title: string;
    description: string;
    todoCount: number;
    isImportant: boolean;
    status: TodoStatus;
    files: any[];
    assignedTo: AssignedUser[];
    teamId: TeamInfo;
    steps: Step[];
    createdBy: Creator;
    createdAt: string | null| undefined;
    dueDate: string  | null
    note:string
}


export interface Step {
    _id: string;
    title: string;
    isCompleted: boolean;
    createdBy: {
        userId: string;
        userName: string;
    };
}



export interface TodoResponse {
    FilterTodo: Todo[];
    completedTodo: Todo[];
}



export interface TodoSummaryCounts {
    pendingCount: number;
    completeCount: number;
    progressCount: number;
    todayCount: number;
    assignToMeCount: number;
    isImportantCount: number;
}
