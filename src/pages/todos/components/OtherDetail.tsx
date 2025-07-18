import { useState, useEffect, useCallback } from "react";
import { Icons } from "@assets/icons";
import type { Todo } from "@interfaces/todosTypes";
import { useUpdateTodoMutation } from "@services/apis/todos/hooks";
import { format } from "date-fns";
import { useDebounce } from "@hooks/useDebounce";
import { useAutoResizeTextarea } from "@hooks/useAutoResizeTextarea";


interface OtherDetailProps {
    initialEditData: Todo;
    refetch: () => void;
}

const OtherDetail = ({ initialEditData, refetch }: OtherDetailProps) => {
    const todoId = initialEditData?._id;
    const { mutateAsync: updateTodoAsync } = useUpdateTodoMutation(todoId);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dueDate, setDueDate] = useState<string>("");
    const [note, setNote] = useState<string>("");
    const today = format(new Date(), 'yyyy-MM-dd');
    const { textareaRef } = useAutoResizeTextarea(note);
    useEffect(() => {
        setDueDate(initialEditData?.dueDate || "");
        setNote(initialEditData?.note || "");
    }, [initialEditData]);


    const createFormData = useCallback((data: Partial<Todo>) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value.toString());
            }
        });
        return formData;
    }, []);

    const { debounced: debouncedNoteUpdate } = useDebounce(
        async (newNote: string) => {
            try {
                const formData = createFormData({ note: newNote });
                await updateTodoAsync(formData);
                refetch();
            } catch (error) {
                console.error("Failed to update note:", error);
                setNote(initialEditData.note || "");
            }
        },
        500
    );


    const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setDueDate(newDate);
        setShowDatePicker(false);

        try {
            const isoDate = newDate ? new Date(newDate).toISOString() : null;
            const formData = createFormData({ dueDate: isoDate });
            await updateTodoAsync(formData);
            refetch();
        } catch (error) {
            console.error("Failed to update due date:", error);
            setDueDate(initialEditData.dueDate || "");
        }
    };

    const handleRemoveDueDate = async () => {
        const previousDueDate = dueDate;
        setDueDate("");
        setShowDatePicker(false);

        try {
            const formData = createFormData({ dueDate: "" });
            await updateTodoAsync(formData);
            refetch();
        } catch (error) {
            console.error("Failed to remove due date:", error);
            setDueDate(previousDueDate);
        }
    };


    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newNote = e.target.value;
        setNote(newNote);
        debouncedNoteUpdate(newNote);
    };

    const displayDueDate = dueDate ? format(new Date(dueDate), 'yyyy-MM-dd') : "";

    return (
        <div className="space-y-3">
            <div className="relative">
                <button
                    className="w-full shadow bg-white rounded p-3 hover:bg-gray-50 transition-colors text-left"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    aria-label={dueDate ? "Change due date" : "Add due date"}
                >
                    <div className="flex items-center justify-between gap-2 text-xs text-gray-700">
                        <div className="flex items-center gap-2">
                            <Icons.Date fontSize={16} />
                            <span>{dueDate ? `Due Date - ${displayDueDate}` : "Add Due Date"}</span>
                        </div>
                        {dueDate && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveDueDate();
                                }}
                                className="text-red-500 hover:text-red-700"
                                aria-label="Remove due date"
                            >
                                <Icons.Cross fontSize={16} />
                            </button>
                        )}
                    </div>
                </button>

                {showDatePicker && !dueDate && (
                    <div className="absolute z-10 mt-2 bg-white p-2 rounded shadow-lg">
                        <input
                            type="date"
                            value={displayDueDate}
                            onChange={handleDateChange}
                            min={today}
                            className="border rounded p-2"
                            autoFocus
                            aria-label="Select due date"
                        />
                    </div>
                )}
            </div>

            <div className="w-full shadow bg-white rounded p-3 hover:bg-gray-50 transition-colors text-left">
                <div className="flex items-center justify-start gap-2 text-xs text-gray-700">
                    <textarea
                        ref={textareaRef}
                        value={note}
                        onChange={handleNoteChange}
                        className="flex-1 resize-none text-xs text-gray-700 bg-transparent focus:outline-none focus:ring-0 focus:border-none p-0 leading-snug"
                        aria-label="Task note"
                        placeholder="Add note"
                    />
                </div>
            </div>
        </div>
    );
};

export default OtherDetail;