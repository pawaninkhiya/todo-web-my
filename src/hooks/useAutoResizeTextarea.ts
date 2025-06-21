import { useEffect, useRef, useCallback } from "react";

export const useAutoResizeTextarea = (value: string) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const resizeTextarea = useCallback(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, []);

    useEffect(() => {
        resizeTextarea();
    }, [value, resizeTextarea]);

    return { textareaRef, resizeTextarea };
};
