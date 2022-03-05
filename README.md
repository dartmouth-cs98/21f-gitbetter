# Git Better
Ever felt clueless trying to find which `git` command is appropriate for your use case? Ever ran through a series of commands to see what would work, only to delete and reclone the entire repository?

GitBetter is a platform where users can hook up their project repository and test various git commands to see the effects that the commands would have on their project's status. Through GitBetter, you will be able to walk through various commands and visualize the effects the command has on your code. In doing so, we hope to alleviate your stress about possibly messing up your project's repository as there will be no permanent repercussions.

To see what the application looks like, check out the project preview section below. 

To download Gitbetter, visit our [project site, linked here](https://gitbetter.surge.sh).

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
### Home page
<p align="center">
  <img width="600" alt="Screen Shot 2022-02-23 at 5 18 44 PM" src="https://user-images.githubusercontent.com/59631032/156617650-9f33d178-7778-4efb-ad9f-058419898c4f.png">
</p>

### Gitbetter Interface
<p align="center">
  <img width="600" alt="Screen Shot 2022-03-03 at 12 24 38 PM" src="https://user-images.githubusercontent.com/59631032/156618317-7e9f8d28-320f-427d-a39f-838c2f16760e.png">
</p>

### Command Help Page
<p align="center">
  <img width="600" alt="Screen Shot 2022-03-03 at 12 25 29 PM" src="https://user-images.githubusercontent.com/59631032/156618465-3b841bb7-41b8-400e-9766-48979bf770c0.png">
</p>

### Workflow Tutorials Interface
<p align="center">
  <img width="600" alt="Screen Shot 2022-03-03 at 12 26 03 PM" src="https://user-images.githubusercontent.com/59631032/156618557-aed6ad0d-aef1-40a5-8444-0f459756cbd9.png">
</p>

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
