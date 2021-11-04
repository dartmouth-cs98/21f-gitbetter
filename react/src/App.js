import Navigation from './Navigation.js'
import './App.css';

function App() {
  return (
    <div id="app" className="wrapper">
      <Navigation />
      <div className="divider"></div>
      <router-view />
    </div>
  );
}

export default App;
