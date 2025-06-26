export interface GetAllTicketsParams {
    name?: string;
    tab?: string;
    ticketType?: string;
    assignedTo?: string;
    assignedBy?: string;
    page?: number;
    limit?: number;
    status?: string;
}

export interface Ticket {
    _id: string;
    ticketNumber: string;
    isSeen: boolean;
    loggedInEmployee?: string;
    raisedBy: {
        _id: string;
        name: string;
        profilePicture: string;
    };
    raisedByJobProfile: string;
    priority: string;
    description: string;
    assignedTo: {
        _id: string;
        name: string;
        profilePicture: string;
    };
    assignedToJobProfile: string;
    files: string[];
    lastActionComment: string;
    lastActionCommentBy: string;
    status: string;
    ticketType: string;
    partCode?: string;
    partName?: string;
    department?: string;
    quantity?: number;
    comments: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Count {
    raisedCount: number;
    receivedCount: number;
    taggedCount: number;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    count: Count;
    result: Ticket[];
}