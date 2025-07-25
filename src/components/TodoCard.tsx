import { Icons } from "@assets/icons";
import { useUpdateTodoMutation } from "@services/apis/todos/hooks";
import { motion } from "framer-motion";
import { useCallback } from "react";
import completeSoun from "@assets/complete.mp3";
import { useAuth } from "@contexts/AuthProvider";
import type { Todo } from "@interfaces/todosTypes";
import toast from "react-hot-toast";

interface TodoCardProps {
    todo: Todo;
    assignees: {
        initials: string;
        color: string;
    }[];
    onEdit?: () => void;
    handleCloseEdit: () => void;
    onComplete?: (id: string) => void;
}

export const TodoCard = ({ todo, assignees, onEdit, handleCloseEdit, onComplete }: TodoCardProps) => {
    const { mutateAsync: updateTodo } = useUpdateTodoMutation(todo._id);
    const { user } = useAuth();

    const updateField = useCallback(
        async (field: string, value: any) => {
            const formData = new FormData();
            formData.append(field, value.toString());

            try {
                const data = await updateTodo(formData);
                if (data?.todo && field === "status" && value === "completed") {
                    const audio = new Audio(completeSoun);
                    audio.play();
                    onComplete?.(todo._id);
                    handleCloseEdit();
                }
                else {
                    handleCloseEdit();
                }
            } catch (error) {
                console.error("Failed to update todo:", error);
            }
        },
        [updateTodo, handleCloseEdit]
    );

    const handleToggleComplete = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            const isAssigned = todo.assignedTo.some(assign => assign.id === user?._id);
            const isAdmin = user?.role === "admin";

            if (!(isAssigned || isAdmin)) {
                toast.error("Only assigned users or admin can mark as important");
                return;
            }

            const newStatus = todo.status === "completed" ? "pending" : "completed";
            updateField("status", newStatus);
        },
        [todo, user, updateField]
    );

    const handleToggleImportance = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            const isAssigned = todo.assignedTo.some(assign => assign.id === user?._id);
            const isAdmin = user?.role === "admin";

            if (!(isAssigned || isAdmin)) {
                toast.error("Only assigned users or admin can mark as important");
                return;
            }

            updateField("isImportant", !todo.isImportant);
        },
        [todo, user, updateField]
    );

    const isCompleted = todo.status === "completed";
    const statusColor = {
        pending: "border-gray-900 hover:border-gray-900",
        inProgress: "border-blue-500 hover:border-blue-600",
        completed: "bg-green-500 border-green-500",
    }[todo.status] || "border-gray-300 hover:border-gray-400";

    const cardColor = {
        pending: "bg-white",
        inProgress: "bg-blue-50",
        completed: "bg-green-50",
    }[todo.status] || "bg-white";

    return (
        <motion.div
            className={`${cardColor} rounded shadow-md my-3 p-4 flex items-start justify-between gap-4 hover:bg-opacity-80 transition-colors cursor-pointer ${isCompleted ? "opacity-70" : ""}`}
            whileHover={{ y: -2 }}
            layout
            onClick={() => onEdit?.()}
        >
            <div className="flex flex-col gap-1 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                    <motion.div
                        className={`border-2 rounded-full h-6 w-6 min-w-6 flex items-center justify-center group transition-colors ${statusColor}`}
                        onClick={(e) => handleToggleComplete(e)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {isCompleted ? (
                            <Icons.Check size={14} className="text-white" />
                        ) : (
                            <Icons.Check
                                size={16}
                                className={`opacity-0 group-hover:opacity-100 transition-opacity ${todo.status === "pending" ? "text-gray-900" : "text-blue-500"
                                    }`}
                            />
                        )}
                    </motion.div>
                    <span className={`font-[400] line-clamp-1 uppercase text-gray-800 text-[12px] xl:text-sm ${isCompleted ? "line-through" : ""}`}>
                        {`${todo.todoCount} : ${todo.title}`}
                    </span>
                </div>
                <span className="text-[10px] sm:text-xs text-gray-500 pl-7">
                    {todo?.teamId?.name}
                </span>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="flex -space-x-2">
                    {assignees?.slice(0, 2)?.map((assignee, index) => (
                        <motion.span
                            key={index}
                            className={`${assignee.color} text-[10px] md:text-xs h-8 w-8 flex items-center justify-center rounded-full font-medium uppercase text-white border-2 border-white`}
                            whileHover={{ scale: 1.05 }}
                            style={{ zIndex: 2 - index }}
                        >
                            {assignee.initials}
                        </motion.span>
                    ))}
                    {assignees?.length > 2 && (
                        <motion.span
                            className="bg-gray-400 text-[10px] md:text-xs h-8 w-8 flex items-center justify-center rounded-full font-medium uppercase text-white border-2 border-white"
                            whileHover={{ scale: 1.05 }}
                            style={{ zIndex: 0 }}
                        >
                            +{assignees.length - 2}
                        </motion.span>
                    )}
                </div>
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={(e) => handleToggleImportance(e)}
                >
                    <Icons.Star
                        size={24}
                        className={todo.isImportant ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                    />
                </motion.div>
            </div>
        </motion.div >
    );
};