import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { defaultConfig, FILTER_CONFIG, type FilterConfig } from "./components/filterConfig";
import { TodoCard } from "../../components/TodoCard";
import { EditPanel } from "@pages/todos/components/EditPanel";
import { useGetAllTodosQuery, useGetSingleTodoQuery } from "@services/apis/todos/hooks";
import type { Todo } from "@interfaces/todosTypes";
import AddNewTodo from "./components/AddNewTodo";
import { Icons } from "@assets/icons";
import { useReward } from 'react-rewards';
import { useAuth } from "@contexts/AuthProvider";
import { useDebounceValue } from "@hooks/useDebounceValue";
import { motion } from "framer-motion"
import { EditPanelSkeleton } from "@components/skeletons/EditPanelSkeleton";
import AssignUsers from "./components/AssignUsers";
import { useGetAssignedUsersQuery } from "@services/apis/teams/hooks";
const Todo = () => {
    const { search, socket } = useAuth();
    const debounceSearch = useDebounceValue(search, 500);
    const { reward: completeReward } = useReward('complete-reward', 'confetti', {
        angle: 90,
        position: 'absolute',
        lifetime: 300,
        decay: 0.9,
        spread: 90,
        startVelocity: 35,
        elementCount: 100,
        zIndex: 100,
    });

    const [isEditId, setIsEdit] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const location = useLocation();
    const { filter = 'today', teamId, teamName } = location.state || {};
    const { data, isLoading: isTodosLoading, refetch: refetchTodos } = useGetAllTodosQuery({
        filter: filter,
        teamId: teamId,
        search: debounceSearch || ""
    });
    const { data: assignedData, refetch: refetchAssignedUsers } = useGetAssignedUsersQuery(teamId);
    const [isAssignUsers, setIsAssignUsers] = useState<boolean>(false);

    const handleCloseEdit = () => {
        setIsEditing(false);
        setIsEdit(null);
    };


    useEffect(() => {
        if (!socket) return;
        if (socket.connected) {
            console.log(' Socket is already connected:', socket.id);
        } else {
            socket.once('connect', () => {
                console.log('🔌 Socket connected:', socket.id);
            });
        }
        const handleTodoRefresh = () => {
            refetchTodos();
        };

        socket.on('refresh_todos', handleTodoRefresh);

        return () => {
            socket.off('refresh_todos', handleTodoRefresh);
        };
    }, [socket, refetchTodos]);

    useEffect(() => {
        setIsEditing(false);
        setIsEdit(null);
    }, [teamId, filter]);

    const { data: editData, isLoading: isEditLoading, isError: isEditError, refetch } = useGetSingleTodoQuery(isEditId ?? "");

    const currentConfig: FilterConfig =
        (teamId
            ? FILTER_CONFIG.find((f) => f.key === "teamId")
            : FILTER_CONFIG.find((f) => f.key === filter)) ?? defaultConfig;

    const handleEditTodo = (id: string) => {
        if (isEditId === id && isEditing) {
            handleCloseEdit();
        } else {
            setIsEdit(id);
        }
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


    const hasNoData = !isTodosLoading &&
        !data?.FilterTodo?.length &&
        !data?.completedTodo?.length;

    return (
        <div className="flex flex-col lg:flex-row w-full h-full overflow-hidden ">
            <div
                className={`relative flex-1 h-full p-4 sm:p-6 lg:p-8 ${currentConfig.className}`}
                style={currentConfig.style}
            >
                {currentConfig.overlay && (
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0" />
                )}

                <div className={`relative z-10 h-full flex flex-col justify-center ${currentConfig.textColor}`}>
                    <div className="flex justify-between">
                        <motion.h2
                            className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-3"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                            key={debounceSearch || teamId || currentConfig.heading}
                        >
                            {debounceSearch && !teamId ? (
                                <>
                                    <Icons.Todo />
                                    All Todos
                                </>
                            ) : teamId ? (
                                <>
                                    <Icons.Users />
                                    {data?.FilterTodo?.[0]?.teamId?.name ||
                                        data?.completedTodo?.[0]?.teamId?.name ||
                                        teamName}
                                </>
                            ) : (
                                <>
                                    {currentConfig.icon}
                                    {currentConfig.heading}
                                </>
                            )}
                        </motion.h2>
                        {
                            teamId && (
                                <button
                                    onClick={() => { setIsAssignUsers(true), handleCloseEdit() }}
                                    className="ml-auto mb-4 px-4 py-2 bg-white text-gray-900  hover:bg-gray-50 rounded cursor-pointer flex items-center gap-2 shadow-sm transition-all"
                                >
                                    <Icons.Users size={18} />
                                    <span className="text-sm font-medium">Users ({assignedData?.data?.length || 0})</span>
                                </button>

                            )
                        }

                    </div>
                    <div id="complete-reward" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none" />

                    <div className="flex flex-col flex-1 overflow-hidden">
                        <div className="flex-1 overflow-y-auto scrollbar-hide pb-4">
                            {isTodosLoading ? (
                                <div className="flex justify-center items-center h-full">
                                    <Icons.Spinner className="animate-spin text-3xl" />
                                </div>
                            ) : hasNoData ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <Icons.Empty className="text-3xl md:text-4xl mb-4 opacity-60" />
                                    <h3 className="text-sm md:text-lg font-medium mb-2">No todos found</h3>
                                    <p className="text-xs md:text-sm opacity-75">
                                        {teamId ? "Create your first todo for this team" : "No todos match the current filter"}
                                    </p>
                                </div>
                            ) : (
                                <>
                                    {data?.FilterTodo?.map((todo: Todo) => {
                                        const assignees = todo?.assignedTo?.length > 0
                                            ? todo.assignedTo.map(user => {
                                                const fullName = user?.name || "";
                                                const parts = fullName.split("/").map(p => p.trim());

                                                // Pick either the first name (index 0) or the second name (index 1)
                                                const selectedName = parts[0]; // change to parts[1] if you prefer second name

                                                const nameWords = selectedName.split(" ");
                                                const initials = nameWords.length >= 2
                                                    ? (nameWords[0][0] + nameWords[nameWords.length - 1][0]).toUpperCase()
                                                    : (nameWords[0]?.[0]?.toUpperCase() || "--");

                                                return {
                                                    initials,
                                                    color: "bg-blue-500"
                                                };
                                            })
                                            : [{ initials: "--", color: "bg-gray-400" }];



                                        return (
                                            <TodoCard
                                                key={todo._id}
                                                todo={todo}
                                                assignees={assignees}
                                                handleCloseEdit={handleCloseEdit}
                                                onEdit={() => { handleEditTodo(todo._id) }}
                                                onComplete={completeReward}
                                            />
                                        );
                                    })}

                                    {data?.completedTodo?.map((todo: Todo) => {
                                        const assignees = todo?.assignedTo?.length > 0
                                            ? todo.assignedTo.map(user => {
                                                const fullName = user?.name || "";
                                                const parts = fullName.split("/").map(p => p.trim());
                                                const selectedName = parts[0]; 

                                                const nameWords = selectedName.split(" ");
                                                const initials = nameWords.length >= 2
                                                    ? (nameWords[0][0] + nameWords[nameWords.length - 1][0]).toUpperCase()
                                                    : (nameWords[0]?.[0]?.toUpperCase() || "--");

                                                return {
                                                    initials,
                                                    color: "bg-blue-500"
                                                };
                                            })
                                            : [{ initials: "--", color: "bg-gray-400" }];



                                        return (
                                            <TodoCard
                                                key={todo._id}
                                                todo={todo}
                                                assignees={assignees}
                                                handleCloseEdit={handleCloseEdit}
                                                onEdit={() => { handleEditTodo(todo._id) }}
                                                onComplete={completeReward}
                                            />
                                        );
                                    })}
                                </>
                            )}
                        </div>

                        {teamId && (
                            <div className="sticky bottom-0 pt-4">
                                <AddNewTodo teamId={teamId} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isEditing && (
                isEditLoading ? (
                    <EditPanelSkeleton />
                ) : (
                    <EditPanel
                        isOpen={isEditing}
                        setIsOpen={handleCloseEdit}
                        editData={editData}
                        refetch={refetch}
                        handleCloseEdit={handleCloseEdit}
                    />
                )
            )}

            <AssignUsers teamId={teamId ?? ""} isOpen={isAssignUsers} setIsOpen={setIsAssignUsers} refetch={refetchAssignedUsers} assignedData={assignedData} refetchTodos={refetchTodos} />

        </div>
    );
};

export default Todo;