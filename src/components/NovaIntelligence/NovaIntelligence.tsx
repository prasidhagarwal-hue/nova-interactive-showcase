import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './NovaIntelligence.module.css';

interface NovaIntelligenceProps {
  theme?: 'dark' | 'light';
}

type WorkloadPreset = {
  label: string;
  text: string;
};

const PRESETS: WorkloadPreset[] = [
  { label: 'AI / ML TRAINING', text: 'I want to train computer vision models using large datasets.' },
  { label: 'VIDEO EDITING', text: 'I edit 4K videos and work with motion graphics.' },
  { label: '3D RENDERING', text: 'I work with Blender, 3D rendering and animation.' },
  { label: 'SOFTWARE DEVELOPMENT', text: 'I want to build a website with React and TypeScript.' },
  { label: 'LLM / GENAI', text: 'I want to fine-tune large language models.' },
  { label: 'DATA SCIENCE', text: 'I do Python development and data analysis.' },
];

type AnalysisMetrics = {
  gpuDemand: number;
  memoryDemand: number;
  neuralCompute: number;
  thermalLoad: number;
};

type RecommendedConfig = {
  model: string;
  specs: string[];
  explanation: string;
};

export const NovaIntelligence: React.FC<NovaIntelligenceProps> = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [metrics, setMetrics] = useState<AnalysisMetrics | null>(null);
  const [recommendation, setRecommendation] = useState<RecommendedConfig | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const analyzeWorkload = (text: string) => {
    if (!text.trim()) return;
    
    setMetrics(null);
    setRecommendation(null);
    setIsAnalyzing(true);

    const lowerText = text.toLowerCase();
    
    // Deterministic scoring engine
    let gpu = 20;
    let mem = 30;
    let neural = 10;
    let thermal = 25;

    // Keywords mapping
    if (lowerText.includes('train') || lowerText.includes('computer vision') || lowerText.includes('machine learning') || lowerText.includes('ml')) {
      gpu = Math.max(gpu, 85);
      mem = Math.max(mem, 90);
      neural = Math.max(neural, 95);
      thermal = Math.max(thermal, 80);
    }
    
    if (lowerText.includes('llm') || lowerText.includes('genai') || lowerText.includes('fine-tune') || lowerText.includes('language model')) {
      gpu = Math.max(gpu, 95);
      mem = Math.max(mem, 100);
      neural = Math.max(neural, 100);
      thermal = Math.max(thermal, 90);
    }

    if (lowerText.includes('4k') || lowerText.includes('video') || lowerText.includes('motion graphics') || lowerText.includes('edit')) {
      gpu = Math.max(gpu, 85);
      mem = Math.max(mem, 80);
      neural = Math.max(neural, 40);
      thermal = Math.max(thermal, 75);
    }

    if (lowerText.includes('3d') || lowerText.includes('blender') || lowerText.includes('render') || lowerText.includes('animation')) {
      gpu = Math.max(gpu, 90);
      mem = Math.max(mem, 75);
      neural = Math.max(neural, 30);
      thermal = Math.max(thermal, 95);
    }

    if (lowerText.includes('data analysis') || lowerText.includes('data science') || lowerText.includes('python')) {
      gpu = Math.max(gpu, 40);
      mem = Math.max(mem, 65);
      neural = Math.max(neural, 30);
      thermal = Math.max(thermal, 45);
    }

    if (lowerText.includes('website') || lowerText.includes('react') || lowerText.includes('typescript') || lowerText.includes('development')) {
      gpu = Math.max(gpu, 15);
      mem = Math.max(mem, 40);
      neural = Math.max(neural, 10);
      thermal = Math.max(thermal, 20);
    }

    // Recommendation Logic
    let model = 'NOVA X1';
    let specs = ['16 GB UNIFIED MEMORY', '20 TOPS NEURAL ENGINE', 'HOLOGRAPHIC DISPLAY'];
    let explanation = 'Your workload consists of standard productivity and development tasks. NOVA X1 delivers the perfect balance of efficiency and power for daily creation.';

    if (neural > 85 || gpu > 85 || mem > 85) {
      model = 'NOVA X1 ULTRA';
      specs = ['64 GB UNIFIED MEMORY', '60 TOPS NEURAL ENGINE', 'EXTREME THERMAL CORE'];
      explanation = 'Your workload demands maximum computational power. NOVA X1 ULTRA provides extreme neural compute and memory capacity for the most intensive local simulations and AI models.';
    } else if (gpu > 50 || mem > 50 || thermal > 50) {
      model = 'NOVA X1 PRO';
      specs = ['32 GB UNIFIED MEMORY', '40 TOPS NEURAL ENGINE', 'PRO DISPLAY'];
      explanation = 'Your workload combines complex processing and high-resolution media. NOVA X1 PRO provides the appropriate balance of neural compute, memory capacity, and sustained performance.';
    }

    // Simulate API call delay
    setTimeout(() => {
      setMetrics({ gpuDemand: gpu, memoryDemand: mem, neuralCompute: neural, thermalLoad: thermal });
      setRecommendation({ model, specs, explanation });
      setIsAnalyzing(false);
    }, 1500);
  };

  const handlePresetClick = (text: string) => {
    setInputText(text);
  };

  const handleSubmit = () => {
    analyzeWorkload(inputText);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>NOVA INTELLIGENCE</h2>
          <p className={styles.subtitle}>Tell NOVA what you build.</p>
          <p className={styles.supporting}>
            Describe your workload and NOVA will analyze the computational demands to recommend the configuration built for it.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.inputArea}>
            <div className={styles.presets}>
              {PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  className={styles.presetButton}
                  onClick={() => handlePresetClick(preset.text)}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className={`${styles.inputWrapper} ${isFocused ? styles.focused : ''}`}>
              <textarea
                className={styles.textarea}
                placeholder="e.g. I want to train computer vision models and edit 4K videos..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                rows={4}
              />
              <button 
                className={styles.analyzeButton} 
                onClick={handleSubmit}
                disabled={isAnalyzing || !inputText.trim()}
              >
                {isAnalyzing ? 'ANALYZING...' : 'ANALYZE WORKLOAD'}
              </button>
            </div>
          </div>

          <div className={styles.resultsArea}>
            <AnimatePresence mode="wait">
              {isAnalyzing && (
                <motion.div 
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={styles.analyzingState}
                >
                  <div className={styles.scanner}></div>
                  <h3>ANALYZING WORKLOAD</h3>
                  <p>Extracting computational requirements...</p>
                </motion.div>
              )}

              {metrics && recommendation && !isAnalyzing && (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className={styles.resultsPanel}
                >
                  <div className={styles.metricsGrid}>
                    <h4 className={styles.panelTitle}>WORKLOAD ANALYSIS</h4>
                    <MetricBar label="GPU DEMAND" value={metrics.gpuDemand} />
                    <MetricBar label="MEMORY DEMAND" value={metrics.memoryDemand} />
                    <MetricBar label="NEURAL COMPUTE" value={metrics.neuralCompute} />
                    <MetricBar label="THERMAL LOAD" value={metrics.thermalLoad} />
                  </div>

                  <div className={styles.recommendationCard}>
                    <h4 className={styles.panelTitle}>RECOMMENDED CONFIGURATION</h4>
                    <h3 className={styles.recommendedModel}>{recommendation.model}</h3>
                    <div className={styles.specsList}>
                      {recommendation.specs.map(spec => (
                        <div key={spec} className={styles.specItem}>{spec}</div>
                      ))}
                    </div>
                    <p className={styles.explanation}>{recommendation.explanation}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const MetricBar = ({ label, value }: { label: string, value: number }) => {
  return (
    <div className={styles.metricItem}>
      <div className={styles.metricHeader}>
        <span className={styles.metricLabel}>{label}</span>
        <span className={styles.metricValue}>{value}%</span>
      </div>
      <div className={styles.barBackground}>
        <motion.div 
          className={styles.barFill}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
