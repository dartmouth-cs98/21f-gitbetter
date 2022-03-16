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

![Open-Close](https://user-images.githubusercontent.com/52434838/158287851-fff3d022-e891-4b0a-a061-0e3bfe5a45f9.gif)

**Help Page**

![Help-Page](https://user-images.githubusercontent.com/52434838/158287836-ab0d0703-1bb9-477e-ae35-5048b32a87a4.gif)

**Tutorials**

![Tutorials](https://user-images.githubusercontent.com/52434838/158287814-761ae993-a3c3-4acb-baa8-f328ee31c721.gif)

**Terminal & Visualizations**

![Terminal-Visualizations](https://user-images.githubusercontent.com/52434838/158287797-f1754bf9-83c7-4b8b-bc4c-8d2a71954946.gif)

**Ctrl-Z Functionality**

![Back-Forth](https://user-images.githubusercontent.com/52434838/158287781-32189f57-8aa7-4d23-bb9c-cf1e68e62b7a.gif)

### GitLearning

**Guided Tutorials**

![GitLearning-Tutorials](https://user-images.githubusercontent.com/52434838/158287763-b11888d1-73e6-410f-b6c5-7760db0e9cd1.gif)

**About Git and Search Commands Pages**

![](https://i.imgur.com/J5ehgVo.gif)

**Test Yourself**

![Quiz](https://user-images.githubusercontent.com/52434838/158287728-decb3cb2-5e4a-4ad7-bc78-73b732d45738.gif)

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
