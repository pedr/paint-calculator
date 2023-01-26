import React from 'react';
import PaintCalculator from './PaintCalculator/PaintCalculator';
import { LanguageProvider } from './languageContext';
import './App.css'

function App() {

  return (
    <LanguageProvider>
      <PaintCalculator />
    </LanguageProvider>
  );
}

export default App;
