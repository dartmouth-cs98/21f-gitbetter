#!/bin/bash

# TODO: Figure out why CPDIR is getting created inside both directories

# Makes sure that the current directory is a git directory,
# Makes a copied version of the directory (with the .gb extension)
# Starts a file to hold the commands executed on the .gb directory 
function gitstarted() {
		CURRENT_DIR=$(pwd)
        CPDIR="$CURRENT_DIR.gb"
        # Initializes git repo if it doesn't exist
        git init > /dev/null
        mkdir -p "$CPDIR"
        # Makes the GitBetter header for the history file
        d="$(date)"
        echo -ne "# This is the GitBetter command history of your project.\n# This file is used to track changes for future execution in your project, or to be undone if you make a mistake.\n" > "$CPDIR/hist.gb.txt"
        echo -e "# Created at $d.\n\n" >> "$CPDIR/hist.gb.txt"
        # Adds the gitbetter hist to .gitignore
        echo -e "\nhist.gb.txt\n" > "$CPDIR/.gitignore"
        cp -af $CURRENT_DIR $CPDIR
        if [ $? -ne 0 ]
        then
            echo "Failed to copy directory. Exiting..."
        else
            # TODO: Can't figure out why it's creating a CPDIR inside, need to fix this in a better way
            rm -rf "$CPDIR/CPDIR"
            echo "You're good to go. Let's git started!"
            echo "To learn how to use the tool, try gitbetter -h ( or --help for help ) gitbetter -i ( or --info for info about the tool )."
        fi
}

# Handles custom as well as git valued GitBetter commands
function gitbetter() {
		if [ "$1" = "-h" -o "$1" = "--help" ]; then
            echo "Wondering how to use GitBetter? GitBetter works just like Git, except none of the changes are permanent (unless you decide to keep them). Here's some git commands to try..."
            echo ""

            echo "GIT COMMANDS ( to be used with Git or GitBetter )"
            echo "------------------------------------------------------------------------"
            echo "work on the current change (see also: git help everyday)"
            echo "    add               Add file contents to the index"
            echo "    mv                Move or rename a file, a directory, or a symlink"
            echo "    restore           Restore working tree files"
            echo "    rm                Remove files from the working tree and from the index"
            echo "    sparse-checkout   Initialize and modify the sparse-checkout"
            echo ""

            echo "examine the history and state (see also: git help revisions)"
            echo "    bisect            Use binary search to find the commit that introduced a bug"
            echo "    diff              Show changes between commits, commit and working tree, etc"
            echo "    grep              Print lines matching a pattern"
            echo "    log               Show commit logs"
            echo "    show              Show various types of objects"
            echo "    status            Show the working tree status"
            echo ""
            
            echo "grow, mark and tweak your common history"
            echo "   branch            List, create, or delete branches"
            echo "   commit            Record changes to the repository"    
            echo "   merge             Join two or more development histories together"
            echo "   rebase            Reapply commits on top of another base tip"
            echo "   reset             Reset current HEAD to the specified state"
            echo "   switch            Switch branches"
            echo "   tag               Create, list, delete or verify a tag object signed with GPG"
            echo ""

            echo "collaborate (see also: git help workflows)"
            echo "   fetch             Download objects and refs from another repository"
            echo "   pull              Fetch from and integrate with another repository or a local branch"
            echo "   push              Update remote refs along with associated objects"
            echo ""

            echo "GITBETTER COMMANDS ( to be used with GitBetter only )"
            echo "-------------------------------------------------------------------------"
            echo "   visualize            Opens a visualization of working tree"
            echo "   startover            Undoes all commands in the GitBetter repository"
            echo "   undo <file(s)>       Undoes all changes in specified files"
            echo "   undo -last           Undoes the last GitBetter command in the GitBetter repository"
            echo "   update               Updates current git repository with the changes made in GitBetter repository"
            echo "   learn                Allows you to learn about different GitHub commands"
        elif [ "$1" = "-i" -o "$1" = "--info" ]; then
            echo "GitBetter is tool that allows you to test out git commands on a practice repository without making changes to your current branch."
            echo "Check out gitbetter -h for a list of git commands and their descriptions, or just Git Started!"
        elif [ "$1" = "visualize" ]; then
            echo "Opening visualization..."
            cd ..
            cd 21f-gitbetter
            npm install
            npm run electron:serve
        elif [ "$1" = "undo" ]; then
            if [ "$2" = "." ]; then
                echo "Resetting all changes..."
                CURRENT_DIR=$(pwd)
                CPDIR="$CURRENT_DIR.gb"
                mkdir -p "$CPDIR"
                cp -af $CURRENT_DIR/ $CPDIR/
                rm -rf "$CPDIR/CPDIR"
            elif [ "$2" = "-last" ]; then
                echo "Undoing the last change!"
            else 
                echo "Reading in the file name arguements, resetting them in the .gb directory"
            fi
        elif [ "$1" = "startover" ]; then
            # copy of gitstarted - deletes the current gitbetter repo and makes it again 
            CURRENT_DIR=$(pwd)
            CPDIR="$CURRENT_DIR.gb"
            rm -rf "$CPDIR"
            mkdir -p "$CPDIR"
            # Makes the GitBetter header for the history file
            d="$(date)"
            echo -ne "# This is the GitBetter command history of your project.\n# This file is used to track changes for future execution in your project, or to be undone if you make a mistake.\n" > "$CPDIR/hist.gb.txt"
            echo -e "# Created at $d.\n\n" >> "$CPDIR/hist.gb.txt"
            # Adds the gitbetter hist to .gitignore
            echo -e "\nhist.gb.txt\n" > "$CPDIR/.gitignore"
            cp -af /$CURRENT_DIR/. /$CPDIR/
            # TODO: Can't figure out why it's creating a CPDIR inside, need to fix this in a better way
            rm -rf "$CPDIR/CPDIR"
            echo "Okay, let's start over."
        elif [ "$1" = "update" ]; then
            echo "Copying GitBetter working tree into current directory..."
            CURRENT_DIR=$(pwd)
            CPDIR="$CURRENT_DIR.gb"
            mkdir -p "$CPDIR"
            cp -af $CPDIR/ $CURRENT_DIR/
            rm -rf "$CURRENT_DIR/CURRENT_DIR"
        elif [ "$1" = "learn" ]; then 
            if [ "$2" = "init" ]; then 
                echo "This command will initialize a local Git repository."
            elif [ "$2" = "clone" ]; then 
                echo "This command will create a local copy of a remote repository."
            elif [ "$2" = "status" ]; then  
                echo "This command will allow you to check the status of your branch to see what changes have been made that have not been added or committed. It will also allow you to see what files (if any) have been deleted."
            elif [ "$2" = "add" ]; then 
                echo "This command will allow you to add a file to the staging area so that it will be included in your next commit. If you run 'add -A' this will add all new and changed files to the staging area."
            elif [ "$2" = "commit" ]; then 
                echo "This command will allow you to commit your changes. Any committed changes will be pushed to github when you run 'git commit'. If you run 'git commit -m' then you can add a message along with your commit that will be visible when you push to github."
            elif [ "$2" = "rm" ]; then 
                echo "This command will allow you to remove a file or a folder from your local repository. When you push your changes to github, this deletion will be made to the Github repository. If you run 'git rm -r' this will remove it without asking if you are sure."
            elif [ "$2" = "branch" ]; then 
                echo "This command will allow you to see the list of branches that you have locally. It will also highlight the branch which you are currently on. If you run 'git branch -a' this will list all branches, both locally and remote. If you run 'git branch [branch name]', this will create a new branch named 'branch name'. If you run 'git branch -d [branch name]', this will delete the branch named 'branch name'."
            elif [ "$2" = "checkout" ]; then 
                echo "This command will allow you to switch to a new branch. If you run 'git checkout -b [branch name]' this will allow you to create a new branch with the name 'branch name'. If your run 'git checkout -b [branch name] origin/[branch name]', this will allow you to clone a remote branch that is on your Github repository and then switch to that branch locally. If you run 'git branch -m [old branch name] [new branch name]', you can rename a local branch. If you run 'git checkout -', you an switch to the branch last checked out. If you run 'git checkout -- [file-name.txt]', you can discard changes made to the file [file-name.txt]."
            elif [ "$2" = "stash" ]; then 
                echo "This command will allow you to stash changes in a dirty working directory. If you run 'git stash clear', this will remove all stashed entries. If you run 'git stash list', this will list the stack-order of stashed file changes. If you run 'git stash pop', this will write working from top of stash stack. If you run 'git stash drop', this will discard the changes from the top of the stash stack."
            elif [ "$2" = "push" ]; then 
                echo "This command will allow you to push changes (that have been committed) to the remote repository (remembered branch) which will be visible on Github. If you run 'git push -u origin [branch name]', this will push changes to remote repository (and remember the branch). If you run 'git push origin [branch name]', this will push a branch to your remote repository. If you run 'git push origin --delete [branch name]', this will delete a remote branch. If you run 'git push [alias] [branch]', this will transmit local branch commits to the remote repository branch."
            elif [ "$2" = "pull" ]; then 
                echo "This command will update the local repository to the newest commit, so other commits that have been pushed to the Github repository will now be visible on your local repository. If you run 'git pull origin [branch name]', this will pull the changes from the remote repository."
            elif [ "$2" = "remote" ]; then 
                echo "If you run 'git remote add origin ssh://git@github.com/[username]/[repository-name].git', this will add a remote repository to your next commit. If you run 'git remote set-url origin ssh://git@github.com/[username]/[repository-name].git', this will set a repository's origin branch to SSH. If you run 'git remote add [alias] [url]', this will add a git URL as an alias."
            elif [ "$2" = "log" ]; then 
                echo "This command will allow you to view the changes that have been made. This will show your commits that have not been pushed yet as well as commits made by branches on other user's local servers. If you run 'git log --summary', you can view a detailed list of the changes. If you run 'git log --oneline', you can view changes briefly. If you run 'git log branchB...branchA', this will show the commits on branchA that are not on branchB. If you run 'git log --follow [file]', this will show the commits that changed file, even across renames. If you run 'git log --state -M', this will show all commit logs with indication of any paths moved."
            elif [ "$2" = "diff" ]; then 
                echo "This command will allow you to see files that have been changed but have not been committed. If you run 'git diff [source branch] [target branch]', this will allow you to preview changes before merging. If you run 'git diff --staged', this will display the differences that are staged but not yet committed. If you run 'git diff branchB...branchA', this will show the differences between what is in branchA that is not in branchB."
            elif [ "$2" = "reset" ]; then 
                echo "This command will unstage a file while retaining the changes in working directory. If you run 'git reset --hard [commit]', this will clear the staging area and rewrite the working tree from specified commit."
            elif [ "$2" = "config" ]; then 
                echo "If you run 'git config --global user.name '[firstname lastname]'', this will set a name that is identifiable for credit when review version history. If you run 'git config --global user.email '[valid-email]'', this will set an email address that will be associated with each history marker. If you run 'git config --global color.ui auto', this will set an automatic command line coloring for Git for easy reviewing. If you run 'git config --global core.excludesfile [file]', this will do a system wide ignore pattern for all local repositories."
            elif [ "$2" = "show" ]; then   
                echo "This command will show any object in Git in human-readable format."
            elif [ "$2" = "mv" ]; then 
                echo "If you run 'git mv [existing-path] [new-path]', this will change an existing file path and stage the move."
            elif [ "$2" = "fetch" ]; then 
                echo "If you run 'git fetch [alias]', this will fetch all the branches from that git remote."
            elif [ "$2" = "rebase" ]; then 
                echo "If you run 'git rebase [branch]', this will apply any commits of current branch ahead of a specified one."
            elif [ "$2" = "tag" ]; then 
                echo "If you run 'git tag [commitID], this command will give tags to a specified commit. You can find the commit ID by running 'git log'."
            elif [ "$2" = "help" ]; then 
                echo "This command will allow you to get help from the Github help section. You can get help on different commands and other errors."
            elif [ "$2" = "cherry-pick" ]; then 
                echo "This command will allow you to apply the changes introduced by some existing commits."
            else 
                echo "The given command was not a valid git command. Please try again."
            fi 
        else
            INPUT="$*"
            CURRENT_DIR=$(pwd)
            CPDIR="$CURRENT_DIR.gb"
            # move the changes made in the current directory to the GitBetter directory and do the git operation
            rsync -av /$CURRENT_DIR/. /$CPDIR/
            # TODO: bug - can't figure out why it's creating a CPDIR inside, need to fix this in a better way
            rm -rf "$CPDIR/CPDIR"
            cd "$CPDIR/.git"
            echo "In $(pwd)"
            # Does the git command in the repositoy (currently a bug, need to access git path)
            git $INPUT
            echo "$COMMAND" >> "$CPDIR/hist.gb.txt"
            cd "$CURRENT_DIR"
        fi 
}
