import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Home from './Home';
import Help from './Help';
import Welcome from './Welcome';
import Loading from './Loading';
import { start_over } from './StartOver';
import logo from './assets/logo.png';
import './Navigation.css';

class Navigation extends Component {
  render() {
      return(
        <nav className="nav">
          <NavLink 
            to="/help" 
            element={<Help />} 
            exact
          >
              Help
          </NavLink>

          <div className="nav-logo">
            <NavLink 
              to="/home" 
              element={<Home />} 
            >
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          
          <NavLink 
            to="/" 
            element={<Welcome />}
            onClick={start_over}
          >
              End
          </NavLink>
          {/* <Loading /> */}
      </nav>
    );
  }
}

export default Navigation;
