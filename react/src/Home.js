import React, { Component } from 'react';
import VizWindow from './Visualization'
import Terminal from './Terminal'
import Sidebar from './Sidebar'
import './Home.css';

class Home extends Component {
    openVisualization = () => {
        document.getElementById("visualizations").style.display = "block";
        document.getElementById("opening-icon").style.display = "none";
    }
    closeVisualization = () => {
        document.getElementById("visualizations").style.display = "none";
        document.getElementById("opening-icon").style.display = "block";
    }
    render() {
        return (
            <div className="columns">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <div className="sidebar">
                    <Sidebar />
                </div>
            <div className="top-wrapper column">
                <div className="terminal-wrapper">
                    <div className="headline-component">
                    Terminal
                    {/* <md-button 
                        id="opening-icon" 
                        class="md-icon-button md-raised closing-icon"
                        @click.native="openVisualization()"
                    >
                        <md-icon class="fa fa-plus"></md-icon>
                    </md-button> */}
                    </div>
                    <Terminal />
                </div>
                <div id="visualizations" className="visualizations-wrapper">
                    <div className="headline-component">
                    <div>Visualizations</div>
                    {/* <md-button 
                        id="closing-icon" 
                        class="md-icon-button md-raised closing-icon"
                        @click.native="closeVisualization()"
                    >
                        <md-icon>close</md-icon>
                    </md-button> */}
                    </div>
                    <VizWindow /> 
                </div>
            </div>   
        </div>
        );
    }
}

export default Home;