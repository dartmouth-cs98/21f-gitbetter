export const questions = [
   {
       number: 1,
       'difficulty': "easy",
       'label': "command",
       title: "What is the command for cloning a repository?",
        options: [
           "git add", 'git commit', 'git clone', "git clone <url of repo you want to clone>"
        ],
        res: "git clone <url of repo you want to clone>"  
   },
    {
    number: 2,
    'difficulty': "easy",
    'label': "command",
    title: "What is the command for creating a new branch which is named 'bestbranch'?",
     options: [
        "git commit 'branch'", "git checkout 'bestbranch'", 
        "git add 'bestbranch'", "git checkout -b 'bestbranch'"
     ],
     res: "git checkout -b 'bestbranch'"      
   },
 {
      number: 3,
      'difficulty': "easy",
      'label': "command",
      title: "What is the command for pulling new code from the main branch?",
       options: [
          "git pull", 'git commit newcode', 'git push', 'git status'
       ],
       res: 'git pull'       
  },
{
    number: 4,
    'difficulty': "easy",
    'label': "command",
    title: "What is the command for making a commit with the commit message 'Updated sorting.py so it is more efficient'",
     options: [
        "git commit", "git commit 'Updated sorting.py so it is more efficient'", 
        "git commit -m 'Updated sorting.py so it is more efficient'", 
        "git commit -b 'Updated sorting.py so it is more efficient'"
     ],
     res: "git commit -m 'Updated sorting.py so it is more efficient'"       
  },
 {
    number: 5,
    'difficulty': "easy",
    'label': "command",
    title: "What is the command for pushing your commits to the main branch?",
     options: [
        "git push", "git push newcode", 
        "git push to main", 
        "git commit -b 'newcode to main'"
     ],
     res: "git push"       
  },
 {
    number: 6,
    'difficulty': "easy",
    'label': "command",
    title: "What is the command for adding the file 'sorting.py' to the group of files which will be included in your next commit?",
     options: [
        "git commit 'sorting.py'", "git add 'newcode", 
        "git push sorting.py", 
        "git add sorting.py"
     ],
     res: "git add sorting.py"       
  },
{
    number: 7,
    'difficulty': "easy",
    'label': "command",
    title: "Which of the following is not a real GitHub command?",
     options: [
        "git push", "git pull", 
        "git build", 
        "git clone"
     ],
     res: "git build"       
  },
{
    number: 8,
    'difficulty': "easy",
    'label': "command",
    title: "Which of the following is a real GitHub command?",
     options: [
        "git make", "git push", 
        "git find ", 
        "git delete"
     ],
     res: "git push"       
  },
 {
    number: 9,
    'difficulty': "easy",
    'label': "conceptual",
    title: "Which of the following should you use if you are ready to push to your changes to the GitHub repository to be reviewed?",
     options: [
        "git add", "git push", 
        "git pull ", 
        "git commit"
     ],
     res: "git push"       
  },
{
    number: 10,
    'difficulty': "easy",
    'label': "conceptual",
    title: "Which of the following commands would you want to use when someone else has just added their new code to the GitHub repository?",
     options: [
        "git clone", "git checkout -b main", 
        "git get", 
        "git pull"
     ],
     res: "git pull"       
  },
 {
    number: 11,
    'difficulty': "easy",
    'label': "conceptual",
    title: "Which of the following commands would not be useful if you are working with code that you just updated?",
     options: [
        "git checkout -b 'newbranch'", "git commit", 
        "git push", 
        "git add"
     ],
     res: "git checkout -b 'newbranch'"      
  },
  {
    number: 12,
    'difficulty': "medium",
    'label': "conceptual",
    title: "Which two commands have opposite functions?",
     options: [
        "git checkout/git clone", "git push/git add", 
        "git pull/git push", 
        "git commit/clone"
     ],
     res: "git pull/git push"       
  },
 {
    number: 13,
    'difficulty': "medium",
    'label': "command",
    title: "Which of the following gives the proper order of commands to run if you want to add your new file 'solver.py' to the GitHub repository?",
     options: [
        "1. git push 2. git add solver.py 3. git commit", "1. git push 2. git commit 3. git add solver.py", 
        "1. git add solver.py 2. git push 3. git commit", "1. git add solver.py 2. git commit 3. git push",
        "1. git commit 2. git add solver.py 3. git push", "1. git commit 2. git push 3. git add solver.py"
     ],
     res: "1. git add solver.py 2. git commit 3. git push"       
  },
   {
    number: 14,
    'difficulty': "medium",
    'label': "conceptual",
    title: "Git push allows you to bring new code that was merged into the GitHub repository into to your branch",
     options: [
        "True", "False"
     ],
     res: "False"       
  },
 {
    number: 15,
    'difficulty': "easy",
    'label': "conceptual",
    title: "Use git checkout to clone a repository",
     options: [
        "True", "False"
     ],
     res: "False"       
  },
  {
    number: 16,
    'difficulty': "easy",
    'label': "conceptual",
    title: "Use git checkout -b <name of branch> to create a new branch",
     options: [
        "True", "False"
     ],
     res: "True"       
  },
   {
    number: 17,
    'difficulty': "easy",
    'label': "conceptual",
    title: "The main branch is the branch you should be on when you want to make changes to the codebase.",
     options: [
        "True", "False"
     ],
     res: "False"       
  },
   {
    number: 18,
    'difficulty': "medium",
    'label': "conceptual",
    title: "A repository can only have one branch associated with it.",
     options: [
        "True", "False"
     ],
     res: "False"       
  },
  {
    number: 19,
    'difficulty': "hard",
    'label': "conceptual",
    title: "One person may have many different branches at once.",
     options: [
        "True", "False"
     ],
     res: "True"       
  },
{
    number: 20,
    'difficulty': "hard",
    'label': "conceptual",
    title: "Any files that you git add will be included in the next commit that you make.",
     options: [
        "True", "False"
     ],
     res: "True"       
  },
 {
    number: 21,
    'difficulty': "hard",
    'label': "conceptual",
    title: "When you make a commit, the code is pushed to the GitHub repository you are working with.",
     options: [
        "True", "False"
     ],
     res: "False"       
  },
{
    number: 22,
    'difficulty': "hard",
    'label': "conceptual",
    title: "Where is the new code coming from when you run 'git pull'?",
     options: [
        "The branch you are currently on", "Your commit logs",
        "The GitHub repository that you cloned and your branches are linked to", "Another one of your branches", 
     ],
     res: "The main branch"       
  },
{
    number: 23,
    'difficulty': "hard",
    'label': "conceptual",
    title: "If you do not git add a file that you created, it will not be included in your next commit.",
     options: [
        "True", "False"
     ],
     res: "True"       
  },
{
    number: 24,
    'difficulty': "hard",
    'label': "conceptual",
    title: "Who will be able to see your new code when you run 'git push'?",
     options: [
        "Only people who are using my branch", "My boss", 
        "Everyone who cloned the repository and has a main branch", "Just me"
     ],
     res: "Everyone who cloned the repository and has a main branch"       
  },
 {
    number: 25,
    'difficulty': "hard",
    'label': "conceptual",
    title: "Not all repositories have a main branch.",
     options: [
        "True", "False", 
     ],
     res: "False"       
  },
{
    number: 26,
    'difficulty': "easy",
    'label': "command",
    title: "What is the command to use when you want to check which branch you are on?",
     options: [
        "git clone", 'git checkout -b branch', 'git branch', "git status"
     ],
     res: "git branch"  
},
 {
    number: 28,
    'difficulty': "easy",
    'label': "command",
    title: "What is the command to use if you want to see a history of all commits you have made?",
     options: [
        "git log", 'git commit -history', 'git status', "git find commits"
     ],
     res: "git log"  
},
{
    number: 29,
    'difficulty': "hard",
    'label': "command",
    title: "Which of these is useful for looking at all of your commits?",
     options: [
        "git log", 'git commit -history', 'git status', "git find commits"
     ],
     res: "git log"  
},
{
    number: 30,
    'difficulty': "medium",
    'label': "command",
    title: "Git branch shows you the most recent branch that you made.",
     options: [
        "True", "False"
     ],
     res: "False"  
},
{
    number: 31,
    'difficulty': "medium",
    'label': "conceptual",
    title: "Git log allows you to see all of the branches that you have made.",
     options: [
        "True", "False"
     ],
     res: "False"  
},
 {
    number: 32,
    'difficulty': "hard",
    'label': "conceptual",
    title: "Git log and git checkout both involve branches specifically.",
     options: [
        "True", "False"
     ],
     res: "False"  
},
{
    number: 33,
    'difficulty': "hard",
    'label': "conceptual",
    title: "Git branch and git clone are two commands that are associated with commits,",
     options: [
        "True", "False"
     ],
     res: "False"  
},
{
    number: 34,
    'difficulty': "hard",
    'label': "conceptual",
    title: "If you run 'git checkout -b new_branch', then new_branch will be included in the output when you run 'git branch' next.",
     options: [
        "True", "False"
     ],
     res: "True"  
},
 {
    number: 35,
    'difficulty': "hard",
    'label': "conceptual",
    title: "If you run 'git checkout -b new_branch', new_branch will be not included in the output when you run 'git branch' next.",
     options: [
        "True", "False"
     ],
     res: "False"  
},
{
    number: 36,
    'difficulty': "hard",
    'label': "command",
    title: "Which of these commands does not involve branches, specifically?",
     options: [
        "git commit", "git branch", "git checkout -b new_branch", "git clone"
     ],
     res: "git commit"  
},
{
    number: 37,
    'difficulty': "medium",
    'label': "command",
    title: "If you run git commit -m 'my message' and then run git log, you will see this commit in the output of git log.",
     options: [
        "True", "False"
     ],
     res: "True"  
},
{
    number: 38,
    'difficulty': "medium",
    'label': "command",
    title: "If you run git commit -m 'my message' and then run git log, you will not see this commit in the output of git log.",
     options: [
        "True", "False"
     ],
     res: "False"  
},
{
    number: 39,
    'difficulty': "hard",
    'label': "conceptual",
    title: "Which of these commands is the least like the others?",
     options: [
        "git log", "git branch", "git commit"
     ],
     res: "git commit"  
},
{
    number: 40,
    'difficulty': "hard",
    'label': "conceptual",
    title: "Which of these commands is the least like the others?",
     options: [
        "git checkout -b new_branch", "git commit -m 'my commit'", "git push", "git clone"
     ],
     res: "git clone"  
},
{
    number: 41,
    'difficulty': "hard",
    'label': "conceptual",
    title: "Which of the following best explains what happens when you run git clone?",
     options: [
        "This command makes a new branch where the branch name is the name of the repository you ran git clone with.",
        "This command makes a copy of the branch that you are currently on puts it into the staging area.",
        "This command copies the GitHub repository you ran git clone with and makes a local copy on your device in the main branch.",
        "This command copies the GitHub repository you ran git clone with and makes a local copy on your device in a branch that has the same name as the repository."
     ],
     res: "This command copies the GitHub repository you ran git clone with and makes a local copy on your device in the main branch."
},
{
    number: 42,
    'difficulty': "hard",
    'label': "conceptual",
    title: "Which of the following BEST describes what version control is?",
     options: [
        "Version control allows you to update your code without losing your previous version.",
        "Version control allows you to save changes that you have made in a large codebase.",
        "Version control helps developers track and manage changes to a software project's code.",
        "Version control allows you to save multiple different versions of a file that you are working on."
     ],
     res: "Version control helps developers track and manage changes to a software project's code."
},
{
    number: 43,
    'difficulty': "hard",
    'label': "conceptual",
    title: "Which of the following is the MOST correct?",
     options: [
        "A pull request is something you make before you commit your changes.",
        "You should make a pull request before you clone a repository.",
        "You should make a pull request after you push your commits.",
        "A pull request is a different way to clone a repository."
     ],
     res: "You should make a pull request after you push your commits."
},
{
    number: 44,
    'difficulty': "hard",
    'label': "conceptual",
    title: "Which of these is not something you can look at on the GitHub website?",
     options: [
        "The project code",
        "Code you have not pushed yet",
        "The different branches that are being worked on",
        "The commits people have made"
     ],
     res: "Code you have not pushed yet"
},
{
    number: 45,
    'difficulty': "hard",
    'label': "conceptual",
    title: "What is the best description of what forking is?",
     options: [
        "This is something you do when you want to make a new branch.",
        "This is something you do when you want to revert to a previous version of the code",
        "This is something you do when you want to save changes that you have made to the code.",
        "This is something you can do if you want to edit some or all of a repository's source code on your account on a more permanent basis."
     ],
     res: "This is something you can do if you want to edit some or all of a repository's source code on your account on a more permanent basis."
},
{
    number: 46,
    'difficulty': "medium",
    'label': "conceptual",
    title: "Which of the following best explains what happens when you run git log?",
     options: [
        "When you run git log, you can see a list of all the commits made to the repository.",
        "When you run git log, you can see a list of all of the branches in the repository.",
        "When you run git log, you can see a list of all of the files that you have updated or added.",
        "When you run git log, you can see a list of all of the files that will be included in your next commit."
     ],
     res:  "When you run git log, you can see a list of all the commits made to the repository."
},
{
    number: 47,
    'difficulty': "medium",
    'label': "conceptual",
    title: "GitHub allows people to code collaboratively.",
     options: [
        "True", "False"
     ],
     res:  "True"
},
{
    number: 48,
    'difficulty': "medium",
    'label': "conceptual",
    title: "Which of the following best explains what happens when you run git branch?",
     options: [
        "When you run git branch, you can see a list of all the commits made to the repository.",
        "When you run git branch, you can see a list of all of the branches that you have made, including the main branch.",
        "When you run git branch, you can see a list of all of the files that you have updated or added.",
        "When you run git branch, you can see a list of all of the files that will be included in your next commit."
     ],
     res:  "When you run git branch, you can see a list of all of the branches that you have made, including the main branch."
},
{
    number: 49,
    'difficulty': "medium",
    'label': "conceptual",
    title: "Which of the following best explains what happens when you run git checkout -b new_branch?",
     options: [
        "This command allows you to switch from the current branch you are on to the branch new_branch.",
        "This command allows you to create a main branch.",
        "This command allows you to clone the branch 'new_branch'.",
        "This command allows you to create a new branch named new_branch."
     ],
     res:  "This command allows you to create a new branch named new_branch."
},
{
    number: 50,
    'difficulty': "medium",
    'label': "conceptual",
    title: "Which of the following BEST explains what happens when you run git pull?",
     options: [
        "This command allows you to pull code from a different branch into the branch you are currently working on.",
        "This command allows you to pull a commit from one branch into another branch.",
        "This command allows you to copy all of the content in one branch and move it to your current branch.",
        "This command allows you to pull all changes that have been pushed to the GitHub repository into the branch you are currently on."
     ],
     res:  "This command allows you to pull all changes that have been pushed to the GitHub repository into the branch you are currently on."
},
{
   number: 51,
   'difficulty': "hard",
   'label': "command",
   title: "Git checkout my_branch creates a new branch called my_branch",
    options: [
       "True",
       "False"
    ],
    res:  "False"
},
{
   number: 52,
   'difficulty': "hard",
   'label': "command",
   title: "Which of these commands do you not need to run if you have updated a file that was already in the codebase?",
    options: [
       "git commit",
       "git push",
       "git add"
    ],
    res:  "git add"
},
{
   number: 53,
   'difficulty': "hard",
   'label': "command",
   title: "When you push your code, your changes are merged into your main branch.",
    options: [
       "True",
       "False"
    ],
    res:  "False"
},
{
   number: 54,
   'difficulty': "hard",
   'label': "command",
   title: "Where does your code go when you run git push?",
    options: [
       "Directly into the main GitHub repository",
       "Into your main branch",
       "Into all of the branches you have made",
       "Into the GitHub repository where it will be reviewed"
    ],
    res:  "Into the GitHub repository where it will be reviewed"
},



]

