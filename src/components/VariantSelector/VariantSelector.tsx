import React from 'react';
import { motion } from 'framer-motion';
import styles from './VariantSelector.module.css';

export type VariantType = 'X1' | 'X1 PRO' | 'X1 ULTRA';

interface VariantSelectorProps {
  selected: VariantType;
  onSelect: (variant: VariantType) => void;
}

const variants: VariantType[] = ['X1', 'X1 PRO', 'X1 ULTRA'];

export const VariantSelector: React.FC<VariantSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className={styles.selectorContainer}>
      <div className={styles.selectorBg} role="tablist" aria-label="Product Variants">
        {variants.map((variant) => (
          <button
            key={variant}
            role="tab"
            aria-selected={selected === variant}
            tabIndex={selected === variant ? 0 : -1}
            className={`${styles.variantBtn} ${selected === variant ? styles.active : ''}`}
            onClick={() => onSelect(variant)}
          >
            {selected === variant && (
              <motion.div
                layoutId="activeVariantIndicator"
                className={styles.activeIndicator}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className={styles.variantLabel}>{variant}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
