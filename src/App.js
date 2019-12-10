import React from 'react';
import logo from './logo.svg';
import './App.css';

import ContactApp from './components/contact/contact-main';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="app-title">
          Contact Demo
        </p>        
      </header>
      <ContactApp />
    </div>
  );
}

export default App;
