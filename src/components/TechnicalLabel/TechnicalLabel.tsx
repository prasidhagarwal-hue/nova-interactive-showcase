import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TechnicalLabel.module.css';

interface TechnicalLabelProps {
  value: string;
  label: string;
  delay?: number;
}

export const TechnicalLabel: React.FC<TechnicalLabelProps> = ({ value, label, delay = 0 }) => {
  return (
    <div className={styles.container}>
      <div className={styles.valueWrapper}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={value}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: delay * 0.2 }}
            className={styles.value}
          >
            {value}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};
