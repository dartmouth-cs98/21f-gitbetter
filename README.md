# GitBetter
Ever felt clueless trying to find which `git` command is appropriate for your use case? Ever ran through a series of commands to see what would work, only to delete and reclone the entire repository?

GitBetter is a platform where users can hook up their project repository and test various git commands to see the effects that the commands would have on their project's status. Through GitBetter, you will be able to walk through various commands and visualize the effects the command has on your code. In doing so, we hope to alleviate your stress about possibly messing up your project's repository as there will be no permanent repercussions.

To see what the application looks like, check out the project preview section below. 

To download Gitbetter, visit our [project site](https://gitbetter.surge.sh).

## Architecture

This project was build using Vue 2 and an Electron framework. It uses Xterm.js to run the embedded terminal.

## Setup
This project was tested and developed using Node 14. If your code is failing to build or compile locally using a different version of node, we recommend using Node 14.

To run the project locally...

```
npm install
npm run dev
```

## Deployment
Deploying a production build

```
npm install
npm run lint
npm run build
npm run electron:build

```

The build of the app can be found in the .dmg file, or under applications after running the build.


## Using the CLI
GitBetter uses a command line interface. If it's your first time, use the set up instructions below. 

From within the GitBetter repository, run:
```
cp gitbetter-commands.sh ~/.gitbetter-commands.sh 
```  

```  
source ~/.gitbetter-commands.sh 
```  
First, run `gitstarted`, then use `gitbetter -h` or `gitbetter -i` for tips on how to use the tool, or information about the tool. For developers: If you make changes to the script, you'll need to rerun
`cp gitbetter-commands.sh ~/.gitbetter-commands.sh` and then `source ~/.gitbetter-commands.sh `.

*Note to Windows Users: The `source` command might not work in your Powershell or regular command prompt terminal. One workaround is to use Git Bash as your terminal. Instructions on how to install Git Bash can be found [here](https://www.makeuseof.com/install-git-git-bash-windows/)*

## Project Preview

### GitBetter
**Opening/ Closing GitBetter**

![](https://i.imgur.com/uyOougF.gif)


**Help Page**

![](https://i.imgur.com/YmMbpOC.gif)

**Tutorials**

![](https://i.imgur.com/yPuOxWJ.gif)

**Terminal & Visualizations**

![](https://i.imgur.com/4hB9zrI.gif)

**Ctrl-Z Functionality**

![](https://i.imgur.com/3RkoG5i.gif)

### GitLearning

**Guided Tutorials**

![](https://i.imgur.com/n0AxR9A.gif)

**About Git and Search Commands Pages**

![](https://i.imgur.com/J5ehgVo.gif)

**Test Yourself**

![](https://i.imgur.com/dGoP23R.gif)

## The Gitbetter Team
![Team Selfie](https://i.imgur.com/HZ7Heww.jpg)
- Kimberley Rangel Campos
- Hailey Fox
- Irene Lam
- Joanna Liu
- Elizabeth (Edie) Wilson
- Zoe Wortzman

## Acknowledgments
We would like to acknowledge Professor Tregubov and the teaching assistants of CS98 for the guidance and support they've provided us while building our app.
