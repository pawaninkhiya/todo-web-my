import { motion } from 'framer-motion';

interface AuthHeaderProps {
    title: string;
    subtitle: string;
}

export const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => (
    <motion.div
        className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-6 text-center"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
    >
        <motion.h1
            className="text-2xl font-bold text-white"
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
        >
            {title}
        </motion.h1>
        <motion.p
            className="text-gray-300 mt-2 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            {subtitle}
        </motion.p>
    </motion.div>
);