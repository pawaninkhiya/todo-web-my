import { motion } from 'framer-motion';
import type { ReactNode, ChangeEventHandler } from 'react';

interface AuthInputFieldProps {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    placeholder: string;
    icon: ReactNode;
    variants?: any;
}

export const AuthInputField = ({ label, name, type, value, onChange, placeholder, icon, variants }: AuthInputFieldProps) => (
    <motion.div variants={variants}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <div className="relative">
            <motion.input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
                whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 0 0 2px rgba(31, 41, 55, 0.5)"
                }}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                {icon}
            </div>
        </div>
    </motion.div>
);