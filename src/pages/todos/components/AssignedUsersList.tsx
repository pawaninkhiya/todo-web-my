// AssignedUsersList.tsx
import { Icons } from '@assets/icons';

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
    if (users.length === 0) return null;

    return (
        <div className="mb-4">
            <h4 className="text-xs font-medium text-gray-800 mb-2">Assigned Users</h4>
            <ul className="space-y-2 max-h-[140px] overflow-y-auto pr-1 scrollbar-hide">
                {users.map((user) => (
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
            </ul>
        </div>
    );
};