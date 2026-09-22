import React from 'react';
import { motion } from 'framer-motion';
import styles from './ComparisonSection.module.css';

export const ComparisonSection: React.FC = () => {
  return (
    <section className={styles.comparisonSection} id="explore">
      <div className={styles.header}>
        <h2 className={styles.title}>COMPARE MODELS</h2>
        <p className={styles.subtitle}>Find the perfect NOVA for your workflow.</p>
      </div>

      <div className={styles.grid}>
        {/* X1 Column */}
        <motion.div 
          className={styles.column}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className={styles.modelName}>NOVA X1</h3>
          <p className={styles.modelDesc}>The workstation that thinks with you.</p>
          <div className={styles.spec}>
            <span className={styles.specLabel}>AI Engine</span>
            <span className={styles.specValue}>20 TOPS</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Display</span>
            <span className={styles.specValue}>Standard High-Density</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Thermal Core</span>
            <span className={styles.specValue}>Standard Architecture</span>
          </div>
          <button className={styles.ctaButton}>Select X1</button>
        </motion.div>

        {/* X1 PRO Column */}
        <motion.div 
          className={`${styles.column} ${styles.featured}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.badge}>Most Popular</div>
          <h3 className={styles.modelName}>NOVA X1 PRO</h3>
          <p className={styles.modelDesc}>Built for people who build what comes next.</p>
          <div className={styles.spec}>
            <span className={styles.specLabel}>AI Engine</span>
            <span className={styles.specValue}>40 TOPS</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Display</span>
            <span className={styles.specValue}>Ultra-High-Density</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Thermal Core</span>
            <span className={styles.specValue}>Precision Architecture</span>
          </div>
          <button className={`${styles.ctaButton} ${styles.ctaFeatured}`}>Select X1 PRO</button>
        </motion.div>

        {/* X1 ULTRA Column */}
        <motion.div 
          className={styles.column}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className={styles.modelName}>NOVA X1 ULTRA</h3>
          <p className={styles.modelDesc}>Maximum local intelligence.</p>
          <div className={styles.spec}>
            <span className={styles.specLabel}>AI Engine</span>
            <span className={styles.specValue}>60 TOPS</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Display</span>
            <span className={styles.specValue}>Extreme-Density</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Thermal Core</span>
            <span className={styles.specValue}>Advanced Architecture</span>
          </div>
          <button className={styles.ctaButton}>Select X1 ULTRA</button>
        </motion.div>
      </div>
    </section>
  );
};
