export const mergeInterface = {
    title: "Fixing merge conflicts",
    steps: [
        {
            step: "At this point after a git pull you may get a message that looks like this: \n This is when the fun starts. How do you fix this? \n The cause for merge conflicts is that you edited the exact same line/s as someone else and git doesn't know how to automatically resolve that. This happens and is normal, don't worry. So to fix you just need to pick apart the conflict and merge it in — continue to the next section to see how this happens!",
            mark: "CONFLICT (content): Merge conflict in somefile \n Automatic merge failed; fix conflicts and then commit the result."
        },  
        {
            step: "If you were to do this by hand, git takes the pretty code you wrote and injects terrible \"conflict markers\" that look like this: \n where the line between <<<HEAD and ==== is the line/lines of code that are relevant in your file, and between ==== and >>>> cb1abc6 are from the remote repository (the repository that you see on github.com). The crazy characters refer to the commit id hash that the change comes from.", 
            mark: "<<<<<< HEAD \n var h = 'hello, world'; \n ====== \n var h = 'Hi!'; \n >>>>>> cb1abc6bd98cfc84317f8aa95a7662815417802d"
        },  
        {
            step: "What you want to do is get rid of all the crazy stuff and make sure the lines you have left are logical code, in this case you probably want to decide between the two versions. In some cases you need to be aware of what changed around, be sure to read the code for logic and syntax and check that it works locally after you fix it.", 
            mark: "git add thefixedfile"
        },
        {
            step: "Once you have your conflict file the way you want it — ie. fixed and without any more of the conflict markers... \nAll you have to do to continue is: git add thefixedfile which indicates to git that you have resolved the conflict. Then git commit with no options will complete the merge and automatically create a commit message.", 
            mark: "git commit"
        },
        {
            step: "Now, you can will be able to push your changes to your branch", 
            mark: "git push or git pull"
        },
    ],

}

