import { motion } from "framer-motion";
import { Icons } from "@assets/icons";
import { useState, useEffect } from "react";
import { useCreateTodoMutation } from "@services/apis/todos/hooks";

const AddNewTodo = ({ teamId }: { teamId: string }) => {
    const [newTodoText, setNewTodoText] = useState("");
    const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
    const { mutateAsync, isPending } = useCreateTodoMutation();

    useEffect(() => {
        if (inputRef) {
            inputRef.focus();
        }
    }, [inputRef]);

    const handleCreateTodo = async () => {
        if (!newTodoText.trim() || isPending) return;

        try {
            await mutateAsync({
                teamId,
                title: newTodoText.trim(),
            });
            setNewTodoText("");
            inputRef?.focus();
        } catch (error) {
            console.error("Failed to create todo:", error);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCreateTodo();
        }
    };

    return (
        <motion.div
            className="bg-white rounded shadow-sm p-3 flex items-start justify-between gap-3 hover:bg-gray-50 transition-colors cursor-pointer  border border-gray-200"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            layout
        >
            <div className="flex justify-between w-full gap-3 items-center">
                <div className="flex-1">
                    <input
                        ref={setInputRef}
                        type="text"
                        className="w-full py-2 px-3 border-none text-sm placeholder:text-sm outline-none focus:ring-0 bg-transparent placeholder-gray-400"
                        placeholder="Add a new todo..."
                        value={newTodoText}
                        onChange={(e) => setNewTodoText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isPending}
                    />
                </div>
                <button
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!newTodoText.trim() || isPending}
                    onClick={handleCreateTodo}
                    aria-label="Add todo"
                >
                    {isPending ? (
                        <Icons.Spinner className="animate-spin" fontSize={20} />
                    ) : (
                        <Icons.Plus fontSize={20} />
                    )}
                </button>
            </div>
        </motion.div>
    );
};

export default AddNewTodo;