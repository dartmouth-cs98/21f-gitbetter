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
    }
}