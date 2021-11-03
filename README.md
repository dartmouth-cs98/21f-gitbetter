# Git Better

![Team Selfie](https://i.imgur.com/HZ7Heww.jpg)

Ever felt clueless trying to find which `git` command is appropriate for your use case? Ever ran through a series of commands to see what would work, only to delete and reclone the entire repository?

GitBetter is a platform where users can hook up their project repository and test various git commands to see the effects that the commands would have on their project's status. Through GitBetter, you will be able to walk through various commands and visualize the effects the command has on your code. In doing so, we hope to alleviate your stress about possibly messing up your project's repository as there will be no permanent repercussions.

TODO: some sample screenshots or mockups

## Architecture

We will be creating our own terminal to run git better commands in which we will use Java Script to control the users terminal to run commands they type in our terminal and interpret their results. 


## Setup

TODO: how to get the project dev environment up and running, npm install etc

Tested with node v14. If your code is failing and you have a different version of node, we recommend trying v14.

Run

```
npm install
```

## Deployment

TODO: how to deploy the project
Deployment for hot reload

```
npm run electron:serve
```

Local development environment with electron

```
npm run electron:build
npm run electron:serve
```

Before deployment, run

```
npm run lint
npm run build
```

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

**Note to Windows Users: The `source` command might not work in your Powershell or regular command prompt terminal. One workaround is to use Git Bash as your terminal.


## Our Team

- Kimberley Rangel Campos
- Hailey Fox
- Irene Lam
- Joanna Liu
- Elizabeth (Edie) Wilson
- Zoe Wortzman

## Acknowledgments

We would like to acknowledge Professor Tregubov for his guidance on how to build our app.
