import { motion } from 'framer-motion';
import Select from 'react-select';
import { Icons } from "@assets/icons";
import { customSelectStyles } from '@utils/customSelectStyles';
import { useEffect, useState } from 'react';

interface User {
    id: string;
    name: string;
}

interface SelectOption {
    value: string;
    label: string;
}

interface AssignKPIToModalProps {
    isOpen: boolean;
    onClose: () => void;
    userOptions: SelectOption[];
    initialSelectedUsers: User[];
    onAssign: (users: User[]) => void;
    isLoading: boolean;
    singleSelect?: boolean;
}

const AssignKPIToModal = ({
    isOpen,
    onClose,
    userOptions,
    initialSelectedUsers,
    onAssign,
    isLoading,
    singleSelect = true
}: AssignKPIToModalProps) => {
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);

    // Convert between User and SelectOption types
    const toSelectOption = (user: User): SelectOption => ({
        value: user.id,
        label: user.name,
    });

    const toUser = (option: SelectOption): User => ({
        id: option.value,
        name: option.label,
    });

    // Initialize selected option when modal opens or initialSelectedUsers changes
    useEffect(() => {
        if (isOpen && initialSelectedUsers.length > 0) {
            setSelectedOption(toSelectOption(initialSelectedUsers[0]));
        } else {
            setSelectedOption(null);
        }
    }, [isOpen, initialSelectedUsers]);

    const handleSave = () => {
        if (selectedOption) {
            onAssign([toUser(selectedOption)]);
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="w-full max-w-md bg-white rounded shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                            {singleSelect ? 'Assign To User' : 'Assign To Users'}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                            aria-label="Close modal"
                        >
                            <Icons.Cross size={20} />
                        </button>
                    </div>

                    <Select
                        options={userOptions}
                        value={selectedOption}
                        onChange={(option: any) => setSelectedOption(option)}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="Select a user..."
                        noOptionsMessage={() => "No users found"}
                        isLoading={isLoading}
                        styles={customSelectStyles}
                        isClearable
                        menuPosition="fixed"
                    />

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={isLoading || !selectedOption}
                            className={`px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded hover:bg-purple-700 ${isLoading || !selectedOption ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AssignKPIToModal;