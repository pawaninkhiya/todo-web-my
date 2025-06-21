import {  useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { defaultConfig, FILTER_CONFIG, type FilterConfig } from "./components/filterConfig";
import { TodoCard } from "../../components/TodoCard";
import { EditPanel } from "@pages/todos/components/EditPanel";
import { useGetAllTodosQuery, useGetSingleTodoQuery } from "@services/apis/todos/hooks";
import type { AssignedUser, Todo } from "@interfaces/todosTypes";
import AddNewTodo from "./components/AddNewTodo";
import { Icons } from "@assets/icons";
import { useAuth } from "@contexts/AuthProvider";

const Todo = () => {
    const { user } = useAuth();
    const [isEditId, setIsEdit] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const location = useLocation();
    const { filter, teamId, teamName } = location.state || {};
    const { data, isLoading: isTodosLoading } = useGetAllTodosQuery({
        filter: filter,
        teamId: teamId
    });

    const handleCloseEdit = () => {
        setIsEditing(false);
        setIsEdit(null);
    };

    useEffect(() => {
        setIsEditing(false);
        setIsEdit(null);
    }, [teamId, filter]);

    const { data: editData, isLoading: isEditLoading, isError: isEditError, refetch } = useGetSingleTodoQuery(isEditId ?? "");
    const canEdit =
        isEditing &&
        editData &&
        (
            user?.role === "admin" ||
            editData?.assignedTo?.some((assign: AssignedUser) => assign.id === user?._id)
        );


    const currentConfig: FilterConfig =
        (teamId
            ? FILTER_CONFIG.find((f) => f.key === "teamId")
            : FILTER_CONFIG.find((f) => f.key === filter)) ?? defaultConfig;

    const handleEditTodo = (id: string) => {
        setIsEdit(id);
    };

    useEffect(() => {
        if (!isEditId) return;

        if (!isEditLoading && editData) {
            setIsEditing(true);
        }

        if (!isEditLoading && isEditError) {
            toast.error("Failed to load todo");
            setIsEditing(false);
            setIsEdit(null);
        }
    }, [isEditLoading, editData, isEditError, isEditId]);

    return (
        <div className="flex flex-col lg:flex-row w-full h-full overflow-hidden">
            <div
                className={`relative flex-1 h-full p-4 sm:p-6 lg:p-8 ${currentConfig.className}`}
                style={currentConfig.style}
            >
                {currentConfig.overlay && (
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0" />
                )}

                <div className={`relative z-10 h-full flex flex-col ${currentConfig.textColor}`}>
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                        {teamId ? (
                            data?.FilterTodo?.[0]?.teamId?.name ||
                            data?.completedTodo?.[0]?.teamId?.name ||
                            teamName
                        ) : (
                            <>
                                {currentConfig.icon}
                                {currentConfig.heading}
                            </>
                        )}
                    </h2>

                    <div className="flex flex-col flex-1 overflow-hidden">
                        <div className="flex-1 overflow-y-auto scrollbar-hide   pb-4">
                            {isTodosLoading ? (
                                <div className="flex justify-center items-center h-full">
                                    <Icons.Spinner className="animate-spin text-3xl" />
                                </div>
                            ) : (
                                <>
                                    {data?.FilterTodo?.map((todo: Todo) => {
                                        const creator = todo?.createdBy?.userName
                                            ? {
                                                initials: todo.createdBy.userName
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")
                                                    .slice(0, 2)
                                                    .toUpperCase(),
                                                color: "bg-green-500",
                                            }
                                            : { initials: "--", color: "bg-gray-400" };

                                        return (
                                            <TodoCard
                                                key={todo._id}
                                                todo={todo}
                                                assignee={creator}
                                                handleCloseEdit={handleCloseEdit}
                                                isEditing={isEditing}
                                                onEdit={() => {
                                                    if (isEditing) {
                                                        handleCloseEdit();
                                                    } else {
                                                        handleEditTodo(todo._id);
                                                    }
                                                }}
                                            />
                                        );
                                    })}

                                    {data?.completedTodo?.map((todo: Todo) => {
                                        const creator = todo?.createdBy?.userName
                                            ? {
                                                initials: todo.createdBy.userName
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")
                                                    .slice(0, 2)
                                                    .toUpperCase(),
                                                color: "bg-green-500"
                                            }
                                            : { initials: "--", color: "bg-gray-400" };

                                        return (
                                            <TodoCard
                                                key={todo._id}
                                                todo={todo}
                                                assignee={creator}
                                                handleCloseEdit={handleCloseEdit}
                                                isEditing={isEditing}
                                                onEdit={() => {
                                                    if (isEditing) {
                                                        handleCloseEdit();
                                                    } else {
                                                        handleEditTodo(todo._id);
                                                    }
                                                }}
                                            />
                                        );
                                    })}
                                </>
                            )}
                        </div>

                        {teamId && (
                            <div className="sticky bottom-0">
                                <AddNewTodo teamId={teamId} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {canEdit && (
                <EditPanel
                    isOpen={isEditing}
                    setIsOpen={handleCloseEdit}
                    editData={editData}
                    refetch={refetch}
                    handleCloseEdit={handleCloseEdit}
                />
            )}

        </div>
    );
};

export default Todo;