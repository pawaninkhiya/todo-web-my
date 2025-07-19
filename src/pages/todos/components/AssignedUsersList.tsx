// AssignedUsersList.tsx
import { Icons } from '@assets/icons';
import { useState, useMemo } from 'react';

interface User {
    _id: string;
    name: string;
}

interface AssignedUsersListProps {
    users: User[];
    onRemoveUser: (userId: string) => void;
    isRemoving: boolean;
}

export const AssignedUsersList = ({ users, onRemoveUser, isRemoving }: AssignedUsersListProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [users, searchQuery]);

    if (users.length === 0) return null;

    return (
        <div className="mb-4">
                <div className="relative mb-2">
                    <input
                        type="text"
                        placeholder="Search assign users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-[42px] rounded-md border border-gray-300 bg-[#F9FAFB] px-3 text-[12px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 pl-10"
                    />
                    <Icons.Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={14}
                    />
                </div>
            <ul className="space-y-2 max-h-[140px] overflow-y-auto pr-1 scrollbar-hide">
                {filteredUsers.map((user) => (
                    <li
                        key={user._id}
                        className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
                    >
                        <div className="flex items-center max-w-[60vw]">
                            <span className="h-6 w-6 rounded-full bg-gray-300 text-xs font-medium flex items-center justify-center mr-2">
                                {user.name.charAt(0)}
                            </span>
                            <span className="text-xs text-gray-700 truncate">{user.name}</span>
                        </div>
                        <button
                            className="text-red-500 hover:text-red-600 text-xs font-medium cursor-pointer"
                            onClick={() => onRemoveUser(user._id)}
                            disabled={isRemoving}
                        >
                            {isRemoving ? "..." : <Icons.Cross size={16} />}
                        </button>
                    </li>
                ))}
                {filteredUsers.length === 0 && (
                    <li className="text-xs text-gray-500 text-center">No users found</li>
                )}
            </ul>
        </div>
    );
};
