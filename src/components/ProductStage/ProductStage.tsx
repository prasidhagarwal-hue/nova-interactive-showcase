import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductVisual } from '../ProductVisual/ProductVisual';
import { VariantSelector, type VariantType } from '../VariantSelector/VariantSelector';
import { ProductMetadata } from '../ProductMetadata/ProductMetadata';
import { CTA } from '../CTA/CTA';
import styles from './ProductStage.module.css';

// Variant specific data
const variantData = {
  'X1': {
    title: 'NOVA X1',
    description: 'Built for everyday creation and intelligent workflows.',
    specs: [
      { value: '20 TOPS', label: 'NEURAL ENGINE' },
      { value: 'Standard', label: 'DISPLAY' },
      { value: '16 GB', label: 'UNIFIED MEMORY' }
    ]
  },
  'X1 PRO': {
    title: 'NOVA X1 PRO',
    description: 'More power for demanding creative and development workloads.',
    specs: [
      { value: '40 TOPS', label: 'NEURAL ENGINE' },
      { value: 'Pro', label: 'DISPLAY' },
      { value: '32 GB', label: 'UNIFIED MEMORY' }
    ]
  },
  'X1 ULTRA': {
    title: 'NOVA X1 ULTRA',
    description: 'Maximum local intelligence for the most demanding workflows.',
    specs: [
      { value: '60 TOPS', label: 'NEURAL ENGINE' },
      { value: 'Ultra', label: 'DISPLAY' },
      { value: '64 GB', label: 'UNIFIED MEMORY' }
    ]
  }
};

export const ProductStage: React.FC = () => {
  const [variant, setVariant] = useState<VariantType>('X1');

  const currentData = variantData[variant];

  return (
    <div className={styles.stageContainer}>
      {/* Title & Description */}
      <div className={styles.headerArea}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={variant}
            initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(5px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={styles.titleWrapper}
          >
            <h1 className={styles.title}>{currentData.title.split(' ')[0]}</h1>
            <h2 className={styles.subtitle}>{currentData.title.split(' ').slice(1).join(' ')}</h2>
            <p className={styles.description}>"{currentData.description}"</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.mainArea}>
        {/* Left/Top Metadata */}
        <div className={styles.metadataAreaLeft}>
          <ProductMetadata specs={currentData.specs.slice(0, 2)} />
        </div>

        {/* Product Visual Center */}
        <div className={styles.visualArea}>
          <ProductVisual variant={variant} />
          
          <div className={styles.controlsArea}>
            <VariantSelector selected={variant} onSelect={setVariant} />
            <CTA />
          </div>
        </div>

        {/* Right/Bottom Metadata */}
        <div className={styles.metadataAreaRight}>
          <ProductMetadata specs={[currentData.specs[2]]} />
        </div>
      </div>
    </div>
  );
};
