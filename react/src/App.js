import Navigation from './Navigation.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Help from './Help';
import './App.css';

function App() {
  return (
    <div id="app" className="wrapper">
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" component={Home} />
          <Route path="/help" component={Help} />
        </Routes>
      </Router>
      <div className="divider"></div>
      <router-view />
    </div>
  );
}

export default App;
