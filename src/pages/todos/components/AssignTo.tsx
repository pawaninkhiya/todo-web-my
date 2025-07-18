import {useState } from 'react';
import { useAuth } from "@contexts/AuthProvider";
import type { Todo } from "@interfaces/todosTypes";
import { useUpdateTodoMutation } from "@services/apis/todos/hooks"
import { AnimatePresence } from 'framer-motion';

import { Icons } from "@assets/icons";
import AssignToModal from '@components/AssignToModal';
import { useGetUsersDropDown } from '@services/apis/auth/auth';
import toast from 'react-hot-toast';

export interface UserDropdownItem {
    id: string;
    name: string;
    value: string;
    label: string;
}

interface AssignToProps {
    todo: Todo;
    refetch: () => void;
    handleClose: () => void;
}

interface User {
    id: string;
    name: string;
}

interface UserOption extends User {
    value: string;
    label: string;
}

const AssignTo = ({ todo, refetch, handleClose }: AssignToProps) => {
    const { data: dropdownUsers } = useGetUsersDropDown();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<UserOption[]>(
        todo?.assignedTo?.map(user => ({
            id: user.id,
            name: user.name,
            value: user.id,
            label: user.name
        })) || []
    );

    const todoId = todo?._id;
    const { mutate: updateTodo, isPending } = useUpdateTodoMutation(todoId);

    const userOptions: UserDropdownItem[] = [
        ...(todo?.teamsAssignedUsers?.map(user => ({
            id: user._id,
            name: user.name,
            value: user._id,
            label: user.name
        })) || []),
        ...(user && !dropdownUsers?.result?.some(u => u._id === user._id) ? [{
            id: user._id,
            name: user.name || 'You',
            value: user._id,
            label: user.name || 'You'
        }] : [])
    ];

    const handleAssign = (assignedUsers: User[]) => {
        const formData = new FormData();
        formData.append('assignedTo', JSON.stringify(assignedUsers));
        updateTodo(formData, {
            onSuccess: () => {
                refetch();
                setIsOpen(false);
            }
        });
    };
    return (
        <>
            <button
                className="w-full shadow bg-white rounded p-4 hover:bg-gray-50 transition-colors text-left"
                onClick={() => {
                    if (todo.teamsAssignedUsers.length <= 0) {
                        toast.error("No team members available to assign.");
                        handleClose();

                    } else {
                        setIsOpen(true);
                    }
                }}


            >
                <div className="flex items-center justify-start gap-2 text-xs text-gray-700">
                    <Icons.UserPlus fontSize={16} />
                    <span>Assign To</span>
                    {selectedUsers.length > 0 && (
                        <span className="ml-2 text-xs text-gray-500">
                            ({selectedUsers.length} assigned)
                        </span>
                    )}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <AssignToModal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        userOptions={userOptions}
                        selectedUsers={selectedUsers}
                        setSelectedUsers={setSelectedUsers}
                        onAssign={handleAssign}
                        isLoading={isPending}
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default AssignTo;