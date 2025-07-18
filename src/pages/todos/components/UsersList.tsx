// UsersList.tsx
import { Icons } from '@assets/icons';

interface User {
    _id: string;
    name: string;
}

interface UsersListProps {
    users: User[];
    selectedUsers: string[];
    onUserToggle: (userId: string) => void;
    isPending: boolean;
    searchQuery: string;
}

export const UsersList = ({ users, selectedUsers, onUserToggle, isPending, searchQuery }: UsersListProps) => {
    if (isPending) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                <Icons.Users size={24} className="mb-2" />
                <p>{searchQuery ? 'No matching users found' : 'No users available'}</p>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto px-6 py-1 border-t border-gray-200 scrollbar-hide">
            <ul className="divide-y divide-gray-200">
                {users.map((user) => (
                    <li
                        key={user._id}
                        className="py-3 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
                        onClick={() => onUserToggle(user._id)}
                    >
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id={`user-${user._id}`}
                                checked={selectedUsers.includes(user._id)}
                                onChange={() => onUserToggle(user._id)}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                onClick={(e) => e.stopPropagation()}
                            />
                            <label
                                htmlFor={`user-${user._id}`}
                                className="ml-3 text-xs text-gray-700 flex-1 flex items-center"
                            >
                                <span className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center mr-2 text-xs font-medium text-gray-600">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                                {user.name}
                            </label>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};