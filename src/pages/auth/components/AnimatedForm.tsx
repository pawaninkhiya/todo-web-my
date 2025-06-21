import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface AnimatedFormProps {
    children: ReactNode;
    onSubmit: (e: React.FormEvent) => void;
}

export const AnimatedForm = ({ children, onSubmit }: AnimatedFormProps) => (
    <motion.form
        onSubmit={onSubmit}
        className="p-8 space-y-5"
        initial="hidden"
        animate="visible"
        variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1,
                    when: "beforeChildren"
                }
            }
        }}
    >
        {children}
    </motion.form>
);