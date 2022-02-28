export const mergeInterface = {
    title: "Fixing merge conflicts",
    steps: [
        {
            step: "You appear to have run into a merge conflict (look below). The cause for merge conflicts is that you edited the exact same line(s) as someone else and git doesn't know how to automatically resolve that. This happens and it's normal, don't worry. Continue to see how to fix the merge conflict.",
            mark: ["CONFLICT (content): Merge conflict in somefile", "Automatic merge failed; fix conflicts and then commit the result."]
        },  
        {
            step: "GitHub takes the pretty code you wrote and injects terrible \"conflict markers\" (example below) \n where the line between <<<HEAD and ==== are the line(s) of code that are relevant in your file, and between ==== and >>>> cb1abc6 are from the remote repository (the repository that you see on github.com). The crazy characters refer to the commit id hash that the change comes from.", 
            mark: ["<<<<<< HEAD", "var h = 'hello, world';", "======", "var h = 'Hi!';", ">>>>>> cb1abc6bd98cfc84317f8aa95a7662815417802d"]
        },  
        {
            step: "What you want to do is get rid of all the crazy stuff and make sure the lines you have left are logical code, in this case you probably want to decide between the two versions. In some cases you need to be aware of what changed around, be sure to read the code for logic and syntax and check that it works locally after you fix it.", 
            mark: []
        },
        {
            step: "Once you have your conflict file the way you want it — ie. fixed and without any more of the conflict markers. \nAll you have to do to continue is run the commands in the box below, which indicates to git that you have resolved the conflict.", 
            mark: []
        },
        {
            step: "Then run git commit with no options to complete the merge and automatically create a commit message. Now, you will be able to push your changes to your branch", 
            mark: ["git commit"]
        },
    ],

}

