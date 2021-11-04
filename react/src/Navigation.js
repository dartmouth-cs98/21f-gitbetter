import React, { Component } from 'react';
import './Navigation.css';

function App() {
  return (
    <div id="app" className="wrapper">
     
      <div className="divider"></div>
      <router-view />
    </div>
  );
}

export default App;
