// AssignUsersFooter.tsx
interface AssignUsersFooterProps {
    selectedCount: number;
    onCancel: () => void;
    onAssign: () => void;
    isAssigning: boolean;
    hasSelectedUsers: boolean;
}

export const AssignUsersFooter = ({
    selectedCount,
    onCancel,
    onAssign,
    isAssigning,
    hasSelectedUsers,
}: AssignUsersFooterProps) => (
    <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
                {selectedCount} {selectedCount === 1 ? 'user' : 'users'} selected
            </span>
            <div className="flex gap-3">
                <button
                    onClick={onCancel}
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    onClick={onAssign}
                    disabled={isAssigning || !hasSelectedUsers}
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isAssigning ? "adding..." : "add"}
                </button>
            </div>
        </div>
    </div>
);