
import { Navigation } from './components/Navigation/Navigation';
import { ProductStage } from './components/ProductStage/ProductStage';

function App() {
  return (
    <>
      <div className="atmospheric-bg"></div>
      <Navigation />
      <main>
        <ProductStage />
      </main>
    </>
  );
}

export default App;
