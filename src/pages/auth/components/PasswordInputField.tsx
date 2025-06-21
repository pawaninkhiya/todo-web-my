import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface PasswordInputFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    variants?: any;
}

export const PasswordInputField = ({ label, name, value, onChange, placeholder, variants }: PasswordInputFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <motion.div variants={variants}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="relative">
                <motion.input
                    type={showPassword ? 'text' : 'password'}
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
                <motion.button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={showPassword ? "visible" : "hidden"}
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </motion.span>
                    </AnimatePresence>
                </motion.button>
            </div>
        </motion.div>
    );
};