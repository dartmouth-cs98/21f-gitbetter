import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Home from './Home';
import Help from './Help';
import './Navigation.css';

class Navigation extends Component {
  render() {
      return(
        <nav className="nav level has-shadow">
          <NavLink to="/" element={<Home />} exact>
              Home
          </NavLink>

          <div className="level-item has-text-centered">
              <div className="nav-title">
                  Git Better
              </div>
          </div>
          
          <NavLink to="/help" element={<Help />}>
              Help
          </NavLink>
      </nav>
    );
  }
}

export default Navigation;
