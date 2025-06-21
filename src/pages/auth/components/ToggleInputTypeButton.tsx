import { motion } from 'framer-motion';
interface ToggleInputTypeButtonProps {
    usePhone: boolean;
    toggleInputType: () => void;
    clearIdentifier: () => void;
}

const rotateVariants = {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
    transition: { duration: 0.5 }
};

export const ToggleInputTypeButton = ({ usePhone, toggleInputType, clearIdentifier }: ToggleInputTypeButtonProps) => {
    const handleClick = () => {
        clearIdentifier();
        toggleInputType();
    };
    return (
        <motion.button
            type="button"
            onClick={handleClick}
            className="mt-1 ml-1 text-sm text-gray-800 font-medium focus:outline-none hover:text-gray-900"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={rotateVariants}
            animate="animate"
            initial="initial"
        >
            Use {usePhone ? 'Email' : 'Phone'} instead
        </motion.button>
    );
};