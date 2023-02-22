import React from 'react';
import { motion } from 'framer-motion';

const MotionDefault = ({ children, className = '' }) => {
  return (
    <motion.div
      className={className}
      initial={{ y: -25, opacity: 0.3 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ y: -25, opacity: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default MotionDefault;
