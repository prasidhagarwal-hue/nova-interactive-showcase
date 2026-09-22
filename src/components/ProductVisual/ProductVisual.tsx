import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProductVisual.module.css';

interface ProductVisualProps {
  variant: 'X1' | 'X1 PRO' | 'X1 ULTRA';
}

const variantStyles = {
  'X1': {
    filter: 'brightness(1) contrast(1) saturate(1) hue-rotate(0deg)',
    lightColor: 'rgba(255, 255, 255, 0.15)',
    scale: 1,
  },
  'X1 PRO': {
    filter: 'brightness(0.85) contrast(1.15) saturate(1.1) hue-rotate(5deg)',
    lightColor: 'rgba(58, 134, 255, 0.3)',
    scale: 1.02,
  },
  'X1 ULTRA': {
    filter: 'brightness(0.75) contrast(1.25) saturate(1.3) hue-rotate(-10deg)',
    lightColor: 'rgba(138, 43, 226, 0.4)',
    scale: 1.04,
  }
};

export const ProductVisual: React.FC<ProductVisualProps> = ({ variant }) => {
  const currentStyle = variantStyles[variant];

  return (
    <div className={styles.visualContainer}>
      <AnimatePresence mode="wait">
        <motion.div
          key={variant}
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: currentStyle.scale, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={styles.imageWrapper}
        >
          <img 
            src="/nova_product.jpg" 
            alt={`NOVA ${variant}`} 
            className={styles.productImage}
            style={{ filter: currentStyle.filter }}
            draggable="false"
          />
        </motion.div>
      </AnimatePresence>
      <motion.div 
        className={styles.ambientLight}
        animate={{ backgroundColor: currentStyle.lightColor, scale: currentStyle.scale }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
    </div>
  );
};
