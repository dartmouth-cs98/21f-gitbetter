import React, { Component } from 'react';
import VizWindow from './Visualization'
import Terminal from './Terminal'
// import Sidebar from './Sidebar'
import Navigation from './Navigation';
import Button from '@mui/material/Button';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import './Home.css';

class Home extends Component {
    closeVisualization() {
        document.getElementById("visualizations").style.display = "none";
        document.getElementById("opening-icon").style.display = "block";
        document.getElementById("terminal-wrapper").style.width = "100%";
    };
    
    openVisualization() {
        document.getElementById("visualizations").style.display = "block";
        document.getElementById("terminal-wrapper").style.width = "50%";
        document.getElementById("opening-icon").style.display = "none";
    }
    render() {
        return (
            <>
            <Navigation />
            <div className="columns">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <div className="sidebar">
                    Sidebar
                    {/* <Sidebar /> */}
                </div>
            <div className="top-wrapper column">
                <div id="terminal-wrapper" className="terminal-wrapper">
                    <div className="headline-component">
                        <div className="terminal-header-title">Terminal</div>
                        <div className="visButtons">
                            <Button 
                                variant="contained" 
                                id="opening-icon"
                                className="button" 
                                color="secondary"
                                onClick={ this.openVisualization }
                            >
                                <FaRegEye />
                            </Button>
                        </div>
                    </div>
                    <Terminal />
                </div>
                <div id="visualizations" className="visualizations-wrapper">
                    <div className="headline-component">
                        <div className="visualization-header-title">Visualizations</div>
                        <div className="visButtons">
                            <Button 
                                variant="contained" 
                                id="closing-icon"
                                className="button" 
                                color="secondary"
                                onClick={ this.closeVisualization }
                            >
                                <FaRegEyeSlash />
                            </Button>
                        </div>
                    </div>
                    <VizWindow /> 
                </div>
            </div>   
        </div>
        </>
        );
    }
}

export default Home;