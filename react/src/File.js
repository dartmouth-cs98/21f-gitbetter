import React, { Component } from 'react';
import './File.css';

class File extends Component {
    render() {
        const { filename, padding } = this.props;
        return(
            <p className="file">
                {padding + '\t'}{filename}
            </p>
        );
    }
}

export default File;