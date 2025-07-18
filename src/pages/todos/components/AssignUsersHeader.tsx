// AssignUsersHeader.tsx
import { Icons } from '@assets/icons';

interface AssignUsersHeaderProps {
    title: string;
    onClose: () => void;
}

export const AssignUsersHeader = ({ title, onClose }: AssignUsersHeaderProps) => (
    <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
            >
                <Icons.Cross size={20} />
            </button>
        </div>
    </div>
);