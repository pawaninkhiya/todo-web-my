import { useCallback, useRef, useState, type ChangeEvent } from 'react';
import { Icons } from '@assets/icons';
import { ImagePreviewItem } from './ImagePreviewItem';
import { useUpdateTodoMutation } from '@services/apis/todos/hooks';
import { toast } from 'react-hot-toast';
import type { Todo } from '@interfaces/todosTypes';

interface FileUploadProps {
    editData: Todo;
    refetch: () => void;
}

export const FileUpload = ({ editData, refetch }: FileUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const { mutateAsync: updateTodoAsync } = useUpdateTodoMutation(editData._id);


    const currentFiles = editData.files || [];

    const handleImageUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        if (!file.type.match('image.*')) {
            toast.error('Please upload an image file');
            return;
        }

        if (currentFiles.length >= 3) {
            toast.error('Maximum 3 images allowed');
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("files", file);

            await updateTodoAsync(formData);
            refetch();
            toast.success('Image uploaded successfully');
        } catch (error) {
            toast.error("Failed to upload image");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }, [updateTodoAsync, refetch, currentFiles.length]);

    const removeImage = useCallback(async (index: number) => {
        try {
            const updatedFiles = [...currentFiles];
            updatedFiles.splice(index, 1);

            const formData = new FormData();
            updatedFiles.forEach(file => {
                formData.append("files", file);
            });

            await updateTodoAsync(formData);
            refetch();
            toast.success('Image removed successfully');
        } catch (error) {
            toast.error('Failed to remove image');
        }
    }, [currentFiles, updateTodoAsync, refetch]);

    const triggerFileInput = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    return (
        <div className="w-full shadow bg-white rounded p-3 flex flex-col gap-3 items-start">
            {currentFiles.length > 0 && (
                <div className="space-y-2 w-full">
                    {currentFiles.map((fileUrl, index) => (
                        <ImagePreviewItem 
                            key={`${fileUrl}-${index}`}
                            image={fileUrl}
                            onRemove={() => removeImage(index)}
                        />
                    ))}
                </div>
            )}

            {currentFiles.length < 3 && (
                <button
                    onClick={triggerFileInput}
                    disabled={isUploading}
                    className="rounded transition-colors mr-auto disabled:opacity-50"
                    aria-label="Add image"
                >
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-700">
                        <Icons.Attachment size={22} className="text-gray-500" />
                        <span>
                            {isUploading ? 'Uploading...' : 'Add Image'}
                        </span>
                    </div>
                </button>
            )}
            
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
                disabled={isUploading}
            />
        </div>
    );
};