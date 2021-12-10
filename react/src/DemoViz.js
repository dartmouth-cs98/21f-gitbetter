import React, { Component } from 'react';

class DemoViz extends Component {
    imgPath = () => {
        const {command} = this.props;
        if (command == "git branch") {
            return require("./assets/demo/branch-dark.png");
        } else if (command === "git diff") {
            return require("./assets/demo/diff-dark.png");
        } else if (command === "git status") {
            return require("./assets/demo/status-dark.png");
        } else if (command === "git log") {
            return require("./assets/demo/log-dark.png");
        } else if (command === "git fetch") {
            return require("./assets/demo/fetch-dark.png");
        } else if (command === "git push") {
            return require("./assets/demo/push-remote-dark.png");
        } else if (command === "git branch -u origin/master") {
            return require("./assets/demo/origin-master-dark.png");
        } else if (command === "gitbetter visualize") {
            return require("./assets/demo/visualize-remote-dark.png");
        } else if (command.startsWith("git checkout -b")) {
            return require("./assets/demo/checkout-remote-dark.png");
        } else if (command.startsWith("git commit")) {
            return require("./assets/demo/commit-remote-dark.png");
        } else if (command.startsWith("git pull")) {
            return require("./assets/demo/pull-dark.png");
        } else if (command.startsWith("git revert")) {
            return require("./assets/demo/revert-remote-dark.png");
        } else {
            return;
        }
    }

    render() {
        return(
            <div>
                {!this.imgPath() && <p>Window for git visualizations!</p> }
                <img src={this.imgPath()} />
            </div>
        );
    }
}

export default DemoViz;