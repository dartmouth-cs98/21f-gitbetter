import React, { Component } from 'react';
import VizWindow from './VizWindow.vue'
import Terminal from './Terminal.vue'
import Sidebar from './Sidebar.vue'
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
            <div class="columns">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <div class="column is-fullheight is-one-fifth sidebar">
                <Sidebar />
            </div>
            <div class="top-wrapper column">
                <div class="terminal-wrapper">
                    <div class="headline-component">
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
                <div id="visualizations" class="visualizations-wrapper">
                    <div class="headline-component">
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