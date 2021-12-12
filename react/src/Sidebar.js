import React, { Component } from 'react';
// import File from './File';
// import Directory from './Directory';
import './Sidebar.css';

// const fs = require('fs-extra');
// const path = require('path');

class Sidebar extends Component {
    state = {
        dir: process.cwd(),
        files: [],
        directories: [],
        file: "",
    }
    // created = () => {
    //     this.filesOnly(this.dir);
    //     this.dirsOnly(this.dir);
    // };
    // dirRoot = () => {
    //     return path.basename(process.cwd()).toUpperCase().replace('.GB', '');
    // };
    // pathToString = () => {
    //     return process.cwd().toString();
    // };
    // filesOnly = (root) => {
    //     let fileNames = fs.readdirSync(root, {withFileTypes: true})
    //     .filter(item => !item.isDirectory())
    //     .map(item => item.name)
    //     this.files = fileNames;
    // };
    // dirsOnly = (root) => {
    //     let dirNames = fs.readdirSync(root, {withFileTypes: true})
    //     .filter(item => item.isDirectory())
    //     .map(item => item.name)
    //     this.directories = dirNames;
    // };
    
    render() {
        // const { files, directories } = this.state;
        return(
            <div className="sidebar">
                <div> 
                    {/* <b>{this.dirRoot()}</b> */}
                </div>
                {/* { files.map((file, id) => (
                    <File filename={file} key={id} />
                ))}
                { directories.map((direc, id) => (
                    <Directory key={id} dirname={direc} pathname={this.pathToString()} />
                ))} */}
            </div>
        );
    }
}

export default Sidebar;