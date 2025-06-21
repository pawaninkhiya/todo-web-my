import { motion } from 'framer-motion';
import { ImSpinner2 } from 'react-icons/im';

interface SubmitButtonProps {
    isLoading: boolean;
    label: string;
    loadingLabel: string;
}

export const SubmitButton = ({ isLoading, label, loadingLabel }: SubmitButtonProps) => (
    <motion.button
        type="submit"
        disabled={isLoading}
        className={`w-full cursor-pointer flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium transition ${isLoading ? 'bg-gray-600' : 'bg-gray-900 hover:bg-gray-800'
            }`}
        whileHover={!isLoading ? { scale: 1.02, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
        animate={!isLoading ? {
            scale: [1, 1.02, 1],
            transition: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1.5
            }
        } : {}}
    >
        {isLoading ? (
            <>
                <ImSpinner2 className="animate-spin h-5 w-5 mr-2" />
                {loadingLabel}
            </>
        ) : (
            label
        )}
    </motion.button>
);