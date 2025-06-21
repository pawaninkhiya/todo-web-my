import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface AuthCardProps {
  children: ReactNode;
}

export const AuthCard = ({ children }: AuthCardProps) => (
  <motion.div 
    className="bg-white rounded-tl-[50px] rounded-br-[50px] md:rounded-tl-[70px] md:rounded-br-[70px] shadow overflow-hidden"
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ 
      type: "spring",
      stiffness: 70,
      damping: 10
    }}
  >
    {children}
  </motion.div>
);