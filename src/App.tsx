import React, { useEffect } from 'react';
import './App.scss';
import { world, initWorld } from './classes/WorldInstance';
import { initGui } from './classes/DatGuiInstance';
import Audio from './components/Audio/Audio';

function App() {
  useEffect(() => {
    if (!world) {
      const w = initWorld({ elementId: '#three' });
      if (w) {
        initGui(w);
      }
    }
  }, []);

  return (
    <div className="App">
      <main id="three" />
      <Audio />
    </div>
  );
}

export default App;
