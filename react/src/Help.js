import React, { Component } from 'react';
import Sidebar from './Sidebar.js'
import './Help.css';

class Help extends Component {
    render() {
        return(
            <div className="columns">
                <div className="sidebar">
                <Sidebar />
                </div>
                <div className="column container">
                    <h1 class="title">Help</h1>
                </div>
                        
            </div>
        );
    }
}

export default Help;