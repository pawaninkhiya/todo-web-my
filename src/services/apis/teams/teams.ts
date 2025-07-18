// @services/teamServices.ts

import type { GetAllTeamsResponse, TeamResponse } from "@interfaces/teamsType";
import { api } from "@services/apiClient";
import { TEAM_ENDPOINTS } from "@services/basePaths";

export interface Team {
    _id: string;
    name: string;
}

export interface CreateTeamPayload {
    name: string;
}

// 1. Get all teams
export const getAllTeams = async (): Promise<GetAllTeamsResponse> => {
    const response = await api.get(TEAM_ENDPOINTS.GET_ALL_TEAMS);
    return response.data;
};

// 2. Create a team
export const createTeam = async (payload: CreateTeamPayload): Promise<TeamResponse> => {
    const response = await api.post(TEAM_ENDPOINTS.CREATE_TEAM, payload);
    return response.data;
};

// 3. Update a team
export const updateTeam = async (id: string, payload: Partial<CreateTeamPayload>): Promise<Team> => {
    const response = await api.put(TEAM_ENDPOINTS.UPDATE_TEAM(id), payload);
    return response.data;
};

// 4. Delete a team
export const deleteTeam = async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(TEAM_ENDPOINTS.DELETE_TEAM(id));
    return response.data;
};

export const updateAssignedUsers = async (id: string, assignedUsers: string[]): Promise<any> => {
    const response = await api.put(TEAM_ENDPOINTS.UPDATE_ASSIGNED_USERS(id), { assignedUsers });
    return response.data;
}

export const removeAssignedUser = async (id: string, userId: string): Promise<any> => {
    const response = await api.put(TEAM_ENDPOINTS.REMOVE_ASSIGNED_USER(id),{ userId });
    return response.data;
};

export const getAssignedUsers = async (id: string): Promise<any> => {
    const response = await api.get(TEAM_ENDPOINTS.ASSIGNED_USERS(id));
    return response.data;
};
