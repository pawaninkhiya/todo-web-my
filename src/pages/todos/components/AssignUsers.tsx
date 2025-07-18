// AssignUsers.tsx
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { type OptionType } from '@components/CustomSelect';
import { useDebounceValue } from '@hooks/useDebounceValue';
import {
    useRemoveAssignedUserMutation,
    useUpdateAssignedUsersMutation,
} from '@services/apis/teams/hooks';
import { useGetAllJobProfilesQuery, useGetTodosUsersQuery } from '@services/apis/todos/hooks';
import { AssignUsersHeader } from './AssignUsersHeader';
import { AssignedUsersList } from './AssignedUsersList';
import { UserSearchFilters } from './UserSearchFilters';
import { UsersList } from './UsersList';
import { AssignUsersFooter } from './AssignUsersFooter';

interface User {
    _id: string;
    name: string;
    jobProfileId?: string;
}

interface AssignUsersProps {
    teamId: string;
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
    refetch?: () => void;
    assignedData?: {
        data: User[];
    },
    refetchTodos?: () => void;
}

const AssignUsers = ({ teamId, isOpen, setIsOpen, refetch, assignedData,refetchTodos }: AssignUsersProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedJobProfiles, setSelectedJobProfiles] = useState<string[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const debounceSearch = useDebounceValue(searchQuery, 300);

    const { data: jobProfiles } = useGetAllJobProfilesQuery();
    const { data: dropdownUsers, isPending } = useGetTodosUsersQuery({
        name: debounceSearch,
        jobProfileId: selectedJobProfiles.length > 0 ? selectedJobProfiles : undefined,
    });

    const { mutateAsync: assignUsers, isPending: isAssigning } = useUpdateAssignedUsersMutation();
    const { mutateAsync: removeUser, isPending: isRemoving } = useRemoveAssignedUserMutation();

    const userList: User[] = dropdownUsers?.result || [];
    const assignedUsers: User[] = assignedData?.data || [];

    const jobProfileOptions: OptionType[] = useMemo(() => {
        return (
            jobProfiles?.result?.map((profile: any) => ({
                label: profile.jobProfileName,
                value: profile._id,
            })) || []
        );
    }, [jobProfiles]);

    const handleUserToggle = (userId: string) => {
        setSelectedUsers((prev) =>
            prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
        );
    };

    const handleSelectAll = () => {
        if (selectedUsers.length === userList.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(userList.map((user) => user._id));
        }
    };

    const handleJobProfileChange = (options: OptionType[] | null) => {
        setSelectedJobProfiles(options ? options.map(opt => opt.value as string) : []);
    };

    const handleAssignedUsers = async () => {
        if (selectedUsers.length > 0) {
            try {
                await assignUsers({ id: teamId, assignedUsers: selectedUsers });
                setSelectedUsers([]);
                refetch?.();
                refetchTodos?.();
                setIsOpen?.(false);
            } catch (error) {
                console.error('Error updating assigned users:', error);
            }
        }
    };

    const handleRemoveUser = async (userId: string) => {
        try {
            await removeUser({ id: teamId, userId });
            refetch?.();
            refetchTodos?.();
        } catch (error) {
            console.error('Failed to remove user', error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="w-full max-w-2xl bg-white rounded shadow-xl min-h-[400px] max-h-[85vh] flex flex-col overflow-hidden"
                    >
                        <AssignUsersHeader
                            title="Assign To"
                            onClose={() => {setIsOpen?.(false)}}
                        />

                        <div className="p-6 pb-0">
                            <AssignedUsersList
                                users={assignedUsers}
                                onRemoveUser={handleRemoveUser}
                                isRemoving={isRemoving}
                            />

                            <UserSearchFilters
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                jobProfileOptions={jobProfileOptions}
                                selectedJobProfiles={selectedJobProfiles}
                                onJobProfileChange={handleJobProfileChange}
                                isPending={isPending}
                            />

                            <div className="mb-3 flex items-center">
                                <input
                                    type="checkbox"
                                    id="select-all"
                                    checked={userList.length > 0 && selectedUsers.length === userList.length}
                                    onChange={handleSelectAll}
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="select-all" className="ml-2 text-xs text-gray-700">
                                    Select All
                                </label>
                            </div>
                        </div>

                        <UsersList
                            users={userList}
                            selectedUsers={selectedUsers}
                            onUserToggle={handleUserToggle}
                            isPending={isPending}
                            searchQuery={searchQuery}
                        />

                        <AssignUsersFooter
                            selectedCount={selectedUsers.length}
                            onCancel={() => setIsOpen?.(false)}
                            onAssign={handleAssignedUsers}
                            isAssigning={isAssigning}
                            hasSelectedUsers={selectedUsers.length > 0}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AssignUsers;