import { motion, AnimatePresence } from "framer-motion";
import {FiX, FiCheck } from "react-icons/fi";

interface DeleteAlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
}

const DeleteAlertModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Delete Confirmation",
    description = "Are you sure you want to delete this item? This action cannot be undone.",
    confirmText = "Delete",
    cancelText = "Cancel",
}: DeleteAlertModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ type: "spring", damping: 25 }}
                        className="w-full max-w-md rounded bg-white p-6 shadow-xl min-h-[180px]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                {/* <div className="rounded-full bg-red-100 p-2">
                                    <FiAlertTriangle className="text-red-600" size={24} />
                                </div> */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={onClose}
                                className="rounded-md border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                            >
                                {cancelText}
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className="rounded-md bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                <div className="flex items-center gap-2">
                                    <FiCheck size={16} />
                                    {confirmText}
                                </div>
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DeleteAlertModal;