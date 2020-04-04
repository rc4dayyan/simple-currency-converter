import React from 'react';
import './App.css';
import CurrencyConverter from './components/CurrencyConverter';
import GeneralContextProvider from './contexts/GeneralContext';

function App() {
  return (
    <div className="App">
      <GeneralContextProvider>
        <CurrencyConverter />
      </GeneralContextProvider>
    </div>
  );
}

export default App;
