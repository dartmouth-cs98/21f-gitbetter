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
        echo "the directory we want to copy over to $CPDIR"
        echo "the directory we are referring to $CURRENT_DIR"
        cp -af /$CURRENT_DIR/. /$CPDIR/
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
