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
                comm: "git branch -d branchName"
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
            {
                inst: "If you want to get rid of changes that you have made before pulling that you want to discard instead of committing or adding.", 
                comm: "git checkout ."
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
                inst: "Now, you can either make a pull request from your branch or merge your local branch with the updated remote version of the project.", 
                comm: "git push or git pull"
            },
        ],
    },
    "rebase": {
        title: "Rebase",
        summary: "Rebasing allows you to combine a previous commit, or many previous commits to a new commit. In this way, all of the changes you have made during multiple commits can be combined together into one commit. Additionally, rebasing allows you to update your current branch with changes that have been made to the master branch. For instance, if you are working on a branch, and someone else pushes a lot of code that would help you with your task, then you could do a rebase so that those updates to the code are integrated into your branch where you have written new code. Below are some of the most common situations in which a rebase is necessary, along with the correct command to achieve them.",
        steps: [
            {
                inst: "Rebasing commits against a branch: This allows you to rebase all of the commits that are on another branch with your current branch", 
                comm: "git rebase --interactive "
            },  
            {
                inst: "Rebasing commits against a point in time", 
                comm: "git rebase --interactive HEAD~7"
            },  
            {
                inst: "Resume a rebase that was paused due to an error or in order to update a commit", 
                comm: "git rebase --continue"
            },  
            {
                inst: "Remove a commit that is causing a merge failure. This is one of the ways to resolve merge conflicts after running a rebase.", 
                comm: "git rebase skip"
            },  
            {
                inst: "Stop a rebase. This is one of the ways to resolve merge conflicts after running a rebase.", 
                comm: "git rebase --abort"
            },  
            {
                inst: "Removing a commit from your rebase: When you run a rebase command, Git launches a default text editor where you can see the commits that will be rebased. To remove one of those commits, simply delete the line that has 'pick' in front of the ID for the commit you don't want to include.", 
                comm: "pick commitID: Your commit message --> this is the line you would delete"
            },
            {
                inst: "Rewording the commit message for one of your commits that you are rebasing", 
                comm: "reword commitID Your new message for this commit"
            },
            {
                inst: "Editing a commit before including it in the rebase. This allows you to remove any errors that may have been made in a previous commit.", 
                comm: "edit commitID"
            },
            {
                inst: "Combining a commit into the previous commit in the rebase. With this command you are able to update the commit message for the combined commits to describe the changes made in both.", 
                comm: "squash commitID"
            },
            {
                inst: "Combining a commit into the previous commit in the rebase when you want to keep the original commit message.", 
                comm: "fixup commitID"
            },
            {
                inst: "Running a shell command against a commit", 
                comm: "exec [shell command]"
            },
        ],
    },
    "moving-commits": {
        title: "Moving changes from a commit ",
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
                inst: "Now, you can either make a pull request from your branch or merge your local branch with the updated remote version of the project.", 
                comm: "git push or git pull"
            },
        ],
    }

}