import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface AuthFormContainerProps {
    children: ReactNode;
}

export const AuthFormContainer = ({ children }: AuthFormContainerProps) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
            className="w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
        >
            {children}
        </motion.div>
    </div>
);