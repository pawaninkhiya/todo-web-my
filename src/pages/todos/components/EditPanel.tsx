import { Icons } from "@assets/icons";
import type { Todo, TodoStatus } from "@interfaces/todosTypes";
import { motion } from "framer-motion";
import { useState, useCallback, memo, useEffect, useRef } from "react";
import { formatDate } from "@utils/formatDate";
import { toast } from "react-hot-toast";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "@services/apis/todos/hooks";
import StatusTabs from "./StatusTabs";
import OtherDetail from "./OtherDetail";
import { useDebounce } from "@hooks/useDebounce";
import { FileUpload } from "./FileUplaod";
import AddStep from "./AddStep";
import AssignTo from "./AssignTo";
import completeSoun from "@assets/complete.mp3";
import { useAutoResizeTextarea } from "@hooks/useAutoResizeTextarea";
import { useAuth } from "@contexts/AuthProvider";
import DeleteAlertModal from "@components/DeleteAlertModal";
interface EditPanelProps {
    isOpen: boolean;
    setIsOpen?: () => void;
    editData: Todo;
    refetch: () => void;
    handleCloseEdit: () => void;
}

export const EditPanel = memo(({ isOpen, setIsOpen, editData: initialEditData, refetch, handleCloseEdit }: EditPanelProps) => {


    const { user } = useAuth();
    const todoId = initialEditData?._id;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [title, setTitle] = useState(initialEditData?.title);
    const [isImportant, setIsImportant] = useState(initialEditData?.isImportant);
    const [status, setStatus] = useState<TodoStatus>(initialEditData?.status);

    const { mutateAsync: updateTodoAsync, data } = useUpdateTodoMutation(todoId);
    const { mutateAsync: deleteTodoAsync } = useDeleteTodoMutation();
    const prevTitleRef = useRef(initialEditData?.title ?? "");
    const { textareaRef } = useAutoResizeTextarea(title);


    // Initialize state with initial data
    useEffect(() => {
        setTitle(initialEditData?.title);
        setIsImportant(initialEditData?.isImportant);
        setStatus(initialEditData?.status);
        prevTitleRef.current = initialEditData?.title;
    }, [initialEditData]);

    // Sound
    useEffect(() => {
        if (data?.todo && data.todo.status === "completed") {
            try {
                const audio = new Audio(completeSoun);
                audio.play();
            } catch (err) {
                console.error("Audio playback failed:", err);
            }
            handleCloseEdit();
        }
        else if (data?.todo && data.todo.isImportant === true && data.todo.isImportant === false) {
            handleCloseEdit();
        }

    }, [data])

    const { debounced: debouncedTitleUpdate } = useDebounce(
        async (newTitle: string) => {
            try {
                const formData = new FormData();
                formData.append("title", newTitle);
                await updateTodoAsync(formData);
                prevTitleRef.current = newTitle;
                refetch();
            } catch (error) {
                toast.error("Failed to update title");
                setTitle(prevTitleRef.current);
            }
        },
        2000
    );

    const updateField = useCallback(async (field: string, value: any) => {
        try {
            const formData = new FormData();
            formData.append(field, String(value));
            await updateTodoAsync(formData);
            refetch();
        } catch (error) {
            toast.error(`Failed to update ${field}`);
            if (field === 'isImportant') setIsImportant(prev => !prev);
            if (field === 'status') setStatus(prevTitleRef.current as TodoStatus);
        }
    }, [updateTodoAsync, refetch]);

    const handleTitleChange = useCallback((newTitle: string) => {
        setTitle(newTitle);
        if (isOpen && newTitle !== prevTitleRef.current) {
            debouncedTitleUpdate(newTitle);
        }
    }, [isOpen, debouncedTitleUpdate]);

    const handleClose = useCallback(() => setIsOpen?.(), [setIsOpen]);

    const toggleImportance = useCallback(async () => {
        const newValue = !isImportant;
        setIsImportant(newValue);
        await updateField('isImportant', newValue);
    }, [isImportant, updateField]);

    const handleStatusChange = useCallback(async (newStatus: TodoStatus) => {
        setStatus(newStatus);
        await updateField('status', newStatus);
    }, [updateField]);
    const handleDeleteTodo = useCallback(async () => {
        if (!todoId) return;
        setShowDeleteModal(true);
    }, [todoId]);

    const confirmDelete = useCallback(async () => {
        try {
            await deleteTodoAsync(todoId);
            handleClose();
            toast.success("Todo deleted successfully");
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }, [todoId, deleteTodoAsync, handleClose]);

    if (!isOpen) return null;


    return (
        <>
            <DeleteAlertModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                title="Delete Todo"
                description="Are you sure you want to delete this todo? This action cannot be undone."
            />
            <div className="w-full max-w-full xl:max-w-[450px] bg-[#F6F6F6] shadow-xl border-l border-gray-200 flex flex-col justify-between fixed top-0 right-0 h-full xl:static xl:h-auto xl:shadow-none z-50 transition-transform duration-300 ease-in-out">
                <div className="flex flex-col gap-2.5 p-4 overflow-y-auto scrollbar-hide">
                    <div className="flex justify-end">
                        <Icons.Cross
                            onClick={handleClose}
                            size={16}
                            className="text-gray-500 cursor-pointer hover:text-gray-800 transition-colors"
                            aria-label="Close panel"
                        />
                    </div>

                    <StatusTabs status={status} onChange={handleStatusChange} />
                    <div className="w-full shadow bg-white rounded p-3 flex flex-col">
                        <div className="flex items-start justify-between gap-4">
                            <motion.button
                                className={`border-2 cursor-pointer h-6 w-6 flex rounded-full items-center justify-center group transition-colors ${status === "completed"
                                    ? "bg-green-500 border-green-500"
                                    : status === "inProgress"
                                        ? "border-blue-500"
                                        : "border-gray-900"
                                    }`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Toggle completion"
                                onClick={() => handleStatusChange(
                                    status === "completed" ? "pending" :
                                        status === "pending" ? "inProgress" : "completed"
                                )}
                            >
                                {status === "completed" ? (
                                    <Icons.Check size={14} className="text-white" />
                                ) : status === "inProgress" ? (
                                    <Icons.Check size={14} className="text-blue-500" />
                                ) : (
                                    <Icons.Check
                                        size={16}
                                        className="text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                )}
                            </motion.button>

                            <textarea
                                value={title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                ref={textareaRef}
                                className={`flex-1 font-medium resize-none text-sm xl:text-base text-gray-800 bg-transparent focus:outline-none focus:ring-0 p-0 leading-snug ${status === "completed" ? "line-through text-gray-400" : ""
                                    }`}
                                aria-label="Task title"
                            />

                            <motion.button
                                className="w-6 h-6 cursor-pointer"
                                aria-label="Star task"
                                onClick={toggleImportance}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Icons.Star
                                    size={24}
                                    className={
                                        isImportant
                                            ? "text-yellow-500 fill-yellow-500"
                                            : "text-gray-300 hover:text-gray-400"
                                    }
                                />
                            </motion.button>
                        </div>
                        <AddStep
                            refetch={refetch}
                            initialEditData={initialEditData}
                        />
                    </div>
                    <OtherDetail initialEditData={initialEditData} refetch={refetch} />
                    <AssignTo todo={initialEditData} refetch={refetch} handleClose={handleClose} />
                    <FileUpload editData={initialEditData} refetch={refetch} />
                </div>

                <div className="border-t-2 border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-xs text-gray-500 pr-4 ">
                            Created by <span className="text-gray-700 font-semibold">{initialEditData?.createdBy?.userName}</span> at <span className="text-gray-500">{initialEditData?.createdAt && formatDate(initialEditData?.createdAt)}</span>
                        </div>
                        {user?.role === "admin" && (
                            <button
                                onClick={handleDeleteTodo}
                                className="cursor-pointer text-gray-500 hover:text-red-500 transition-colors"
                                aria-label="Delete task"
                            >
                                <Icons.Delete size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

        </>
    );
});