
import { Navigation } from './components/Navigation/Navigation';
import { ProductStage } from './components/ProductStage/ProductStage';
import { ScrollSequence } from './components/ScrollSequence/ScrollSequence';

function App() {
  return (
    <>
      <div className="atmospheric-bg"></div>
      <Navigation />
      <main>
        <ScrollSequence>
          {({ scrollYProgress }) => (
            <ProductStage scrollYProgress={scrollYProgress} />
          )}
        </ScrollSequence>
      </main>
    </>
  );
}

export default App;
