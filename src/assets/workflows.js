export const workflows = {
    "new-branch": {
        title: "Make a new branch",
        steps: [
            {
                inst: "Make sure you have the most recent version of the project by updating your repository", 
                comm: "git pull"
            },
            {
                inst: "Create a new branch", 
                comm: "git checkout -b <branch name>"
            },  
            {
                inst: "You've made a new branch! Changes you make will now be on <branch name>. You can see which branch you're on using...", 
                comm: "git branch"
            },  
        ]
    },
    "commit": {
        title: "Commit changes",
        steps: [
            {
                inst: "See the changes you've made since your last commit with", 
                comm: "git status"
            },
            {
                inst: "Add all of the modified files to staging. This means that git knows which files to look at in your commit. You can add individual files by listing their names, or use a period to add all of them.", 
                comm: "git add <file 1> <file 2> or git add ."
            },  
            {
                inst: "Your changes are now ready to be committed. Make your commit with the following command. Having a commit message is good practice, so use -m to add a message to your commit.", 
                comm: "git commit -m 'your commit message'"
            },  
            {
                inst: "You've committed the changes to your branch! If you're ready to put those changes on github, use the following command to put your commit onto the remote version of your branch.", 
                comm: "git push"
            },  
        ]
    },
    "pull-request": {
        title: "Make a pull request",
        steps: [
            {
                inst: "Making a pull request is how you ask for permission to merge your changes with the version of the code that everyone uses, usually called the 'main' or 'master' branch. To do this, visit github.com/<your-repo-name>. If you've just pushed something to your branch, the option to make a pull request should be right under the name of the project on main. Click the green button to open your pull request. Using gitbetter, you can open a pull request from your terminal using the following command.", 
                comm: "gitbetter pr"
            },
        ],
    },
    "get-changes": {
        title: "Get latest project version",
        steps: [
            {
                inst: "To get the latest version of your project, the first step is to make sure you're on the base branch. This is usually named 'main', but is sometimes called other things like 'master' or 'development' depending on the project. Move to that branch with the following command.", 
                comm: "git checkout main or git checkout <base branch name>"
            },  
            {
                inst: "The next step is to pull the changes from the remote version onto your local project. This can be done by running", 
                comm: "git pull"
            },  
            {
                inst: "If there are changes from the remote version that conflict with ones in your local project, you'll have to resolve the conflicts before you can get the updated version. If you need help with this, see the tutorial on fixing merge conflicts. Otherwise, you're finished!", 
                comm: ""
            },
        ],
    },
    "merge-conflicts": {
        title: "Fix merge conflicts",
        steps: [
            {
                inst: "To figure out which files are affected by the merge conflict, check the status of your local git repository.", 
                comm: "git status"
            },  
            {
                inst: "The next step is to open you code editor and resolve the conflict. Between <<<<<<< HEAD and ======= are the changes currently on the remote repository, and beneath the equals signs to >>>>>>> your-branch-name are your changes. Decide which ones you want to keep, and delete the merge conflict symbols from the file.", 
                comm: ""
            },  
            {
                inst: "Stage the changes you've picked.", 
                comm: "git add ."
            },
            {
                inst: "Commit the changes to finish fixing the merge conflict.", 
                comm: "git commit -m 'Fixed the merge conflict!'"
            },
            {
                inst: "From the branch with merge conflicts, you can now merge the branch you had conflicts with by running...", 
                comm: "git merge <conflicting branch>"
            },
            {
                inst: "Now, you can either make a pull request from your branch or merge your local branch with the updated remote version of the project.", 
                comm: "git push or git pull"
            },
        ],
    },
    "rename-branch": {
        title: "Rename a remote branch",
        steps: [
            {
                inst: "To rename a branch that already exists in the remote repository, push the changes with extra arguments denoting the current name on remote, your current branch name, and the name you want to change it to.", 
                comm: "git push <current remote name> <local branch name>:<new branch name> "
            },  
        ],
    },
    "clone-project": {
        title: "Clone remote repository onto your computer",
        steps: [
            {
                inst: "To get a copy of a remote repository on your computer, use the git clone command. You can find the link by visiting the repository on the github website and clicking the green 'Clone or Download' button, then copying the link.", 
                comm: "git clone https://github.com/<repository owner>/<repository name>.git"
            }, 
            {
                inst: "Now, you can work in this github repository by changing your directory and opening a code editor!", 
                comm: "cd <repository name>"
            },  
        ],
    },
    "delete-remote-branch": {
        title: "Delete remote branch",
        steps: [
            {
                inst: "Deleting a branch from the remote repository is similar to renaming it, except instead of giving it a new name, we rename it to the space character, which Github reads as null, or nothing. The space between the remote name and the colon is the most important part of the syntax, so make sure you include it in your command!", 
                comm: "git push  <remote repo name> :<branch to delete> "
            }, 
        ],
    },
    "revert-main": {
        title: "Revert main to a previous commit",
        steps: [
            {
                inst: "If you accidentally merged a branch into main and want to go back to a previous version of the project, the first step is to go to Github and get the hash of your commit. You can do this by clicking on commits in the top right corner and then clicking the copy icon next to the 7 character hash of the commit you'd like to return to.", 
                comm: ""
            }, 
            {
                inst: "To reset your branch to that commit, use the the following command.", 
                comm: "git reset --hard <long version of commit hash>"
            }, 
            {
                inst: "To go back to that commit on the remote version of the repository, you have to force the push. This will delete any commit between the current remote version and the one you're resetting to, so use this command with caution.", 
                comm: "git push --force"
            }, 
        ],
    },
    "config": {
        title: "Set up your Github user profile for all local repositories",
        steps: [
            {
                inst: "To set the name you want attached to your commits and changes, set up your username.", 
                comm: "git config --global user.name '<your name>'"
            }, 
            {
                inst: "Next, add the email assosiated with your account to recieve notifications from Github about your projects.", 
                comm: "git config --global user.email '<email address>'"
            }, 
            {
                inst: "To enable the build in git command line colorization, such as green text for staged changes and red for unstaged and other errors, set the user interface color.", 
                comm: "git config --global color.ui auto"
            }, 
        ],
    },
    "init": {
        title: "Turn a local directory into a Github repository",
        steps: [
            {
                inst: "To turn a local directory into a Github repository, make sure you're in the base of the directory and run an initialization command.", 
                comm: "git init"
            }, 
        ],
    },
}