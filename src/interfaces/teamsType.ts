export interface Team {
    _id: string;
    name: string;
    todosCount: number;
}

export interface GetAllTeamsResponse {
    success: boolean;
    result: Team[];
}


export interface TeamResponse {
    success: boolean;
    message: string;
    data: {
        name: string;
        createdById: string;
        createdByName: string;
        _id: string;
        __v: number;
    };
}
