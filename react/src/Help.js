import React, { Component } from 'react';
import Sidebar from './Sidebar.js'
import './Help.css';

class Help extends Component {
    render() {
        return(
            <div class="main">
                <div class="columns">
                    <div class="column is-fullheight is-one-fifth sidebar">
                        <Sidebar />
                    </div>
                    <div class="column mr-4 top-container">
                        <div class="container">
                            <h1 class="title">Help</h1>
                        </div>      
                    </div>
                            
                </div>
            </div>
        );
    }
}

export default Help;