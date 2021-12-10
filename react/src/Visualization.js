import React, { Component } from 'react';
import DemoViz from './DemoViz';
import './Visualization.css';

class Visualization extends Component {
    state = {
        command: '',
    };

    render() {
        const {command} = this.state;
        return(
            <div className="vis-box">
                <div className="subtitle"> 
                    {command}
                    <DemoViz command={command}/>
                </div>
            </div>
        );
    }
}

export default Visualization;