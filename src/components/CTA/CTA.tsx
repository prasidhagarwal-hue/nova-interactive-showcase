import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './CTA.module.css';

interface CTAProps {
  text?: string;
  onClick?: () => void;
}

export const CTA: React.FC<CTAProps> = ({ text = "EXPLORE NOVA", onClick }) => {
  return (
    <motion.button 
      className={styles.ctaButton}
      onClick={onClick}
      whileHover="hover"
      initial="initial"
    >
      <span className={styles.ctaText}>{text}</span>
      <motion.span 
        className={styles.iconWrapper}
        variants={{
          initial: { x: 0 },
          hover: { x: 4 }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <ArrowRight size={16} />
      </motion.span>
      <div className={styles.glow}></div>
    </motion.button>
  );
};
