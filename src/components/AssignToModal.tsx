import { motion } from 'framer-motion';
import Select from 'react-select';
import { Icons } from "@assets/icons";
import { customSelectStyles } from '@utils/customSelectStyles';

interface AssignToModalProps {
    isOpen: boolean;
    onClose: () => void;
    userOptions: any[];
    selectedUsers: any[];
    setSelectedUsers: (users: any[]) => void;
    onAssign: (users: any[]) => void;
    isLoading: boolean;
}

const AssignToModal = ({
    onClose,
    userOptions,
    selectedUsers,
    setSelectedUsers,
    onAssign,
    isLoading
}: AssignToModalProps) => {
    const handleSelectChange = (selectedOptions: readonly any[]) => {
        const newSelected = selectedOptions.map(option => ({
            ...option,
            id: option.value,
            name: option.label
        }));
        setSelectedUsers(newSelected);
    };

    const handleAssign = () => {
        const assignedUsers = selectedUsers.map(user => ({
            id: user.id,
            name: user.name
        }));
        onAssign(assignedUsers);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/40"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="w-full max-w-md bg-white rounded shadow-xl  min-h-[300px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-900">Assign To</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <Icons.Cross size={20} />
                        </button>
                    </div>

                    <div className="mt-2">
                        <Select
                            isMulti
                            options={userOptions}
                            value={selectedUsers}
                            onChange={handleSelectChange}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder="Select team members..."
                            noOptionsMessage={() => "No users found"}
                            isLoading={isLoading}
                            styles={customSelectStyles}
                        />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleAssign}
                            disabled={isLoading}
                            className="px-4 py-2 text-xs cursor-pointer font-medium text-white bg-green-700 rounded hover:bg-green-900 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AssignToModal;