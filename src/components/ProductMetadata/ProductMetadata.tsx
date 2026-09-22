import React from 'react';
import { TechnicalLabel } from '../TechnicalLabel/TechnicalLabel';
import styles from './ProductMetadata.module.css';

interface ProductMetadataProps {
  specs: {
    value: string;
    label: string;
  }[];
}

export const ProductMetadata: React.FC<ProductMetadataProps> = ({ specs }) => {
  return (
    <div className={styles.metadataContainer}>
      {specs.map((spec, index) => (
        <TechnicalLabel 
          key={spec.label} 
          value={spec.value} 
          label={spec.label} 
          delay={0.8 + index * 0.1}
        />
      ))}
    </div>
  );
};
