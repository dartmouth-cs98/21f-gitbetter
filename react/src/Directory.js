import React, { Component } from 'react';
import File from './File'
import { FaFileAlt } from 'react-icons/fa';
import './Directory.css';

const fs = require('fs-extra');

class Directory extends Component {
    state = {
        name: this.pathname + '/' + this.dirname,
        files: [],
        directories: [],
        show: false,
        dirIcon: 'chevron-right',
        firstClick: true,
    };

    filesOnly(root) {
        let fileNames = fs.readdirSync(root, {withFileTypes: true})
        .filter(item => !item.isDirectory())
        .map(item => item.name)
        
        console.log("File names", fileNames)
        this.files = fileNames;
  
    };

    dirsOnly(root) {
        let dirNames = fs.readdirSync(root, {withFileTypes: true})
        .filter(item => item.isDirectory())
        .map(item => item.name)
        
        console.log("Dir names", dirNames)
        this.directories = dirNames;
    };

    toggleShow() {
        if(this.firstClick) {
            this.filesOnly(this.name);
            this.dirsOnly(this.name);
            this.firstClick = false;
        }
        this.show = !this.show;
        if(this.show) {
            this.dirIcon = 'chevron-down';
        } else {
            this.dirIcon = 'chevron-right';
        }
    };

    render() {
        const { padding } = this.props;
        const { name, files, directories } = this.state;
        return(
            <div className="directory" >
                <div onClick="toggleShow">
                    {this.getPadding} <FaFileAlt /> {this.dirname}
                </div>
                <div>
                    { files.map((file, id) => (
                        <File filename={file} key={id} padding={padding + '\t'} />
                    )) }
                    { directories.map((direc, id) => (
                        <Directory key={id} dirname={direc} pathname={name} padding={padding + '\t'} />
                    ))}
                </div>
            </div>
        );
    }
}

export default Directory;