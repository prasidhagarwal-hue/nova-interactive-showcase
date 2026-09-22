
import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation/Navigation';
import { ProductStage } from './components/ProductStage/ProductStage';
import { ScrollSequence } from './components/ScrollSequence/ScrollSequence';
import { AnimatedBackground } from './components/AnimatedBackground/AnimatedBackground';
import { ComparisonSection } from './components/ComparisonSection/ComparisonSection';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Apply theme class to body for global color changes
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <AnimatedBackground theme={theme} />
      <Navigation theme={theme} setTheme={setTheme} />
      <main>
        <ScrollSequence>
          {({ scrollYProgress }) => (
            <ProductStage scrollYProgress={scrollYProgress} theme={theme} />
          )}
        </ScrollSequence>
        <ComparisonSection />
      </main>
    </>
  );
}

export default App;
