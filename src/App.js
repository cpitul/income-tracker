import React, { useContext, useEffect } from 'react';
import './App.css';
import StorageContext from './context/StorageContext';

import Income from './components/Income';
import AddEntry from './components/AddEntry';
import Header from './components/Header';

const App = () => {
  const { dark } = useContext(StorageContext);

  const darkStyles = {
    background: '#000',
    color: '#fff',
  };

  useEffect(() => {
    const html = document.querySelector('html');
    dark ? (html.className = 'bg-dark') : (html.className = null);
  }, [dark]);

  return (
    <div style={dark ? darkStyles : null} className='App'>
      <Header />
      <AddEntry />
      <Income />
    </div>
  );
};

export default App;
