export const questions = {
    "1": {
       number: 1,
       difficulty: "easy",
       label: "command",
       title: "What is the command for cloning a repository?",
        options: [
           "git add", 'git commit', 'git clone', "git clone <url of repo you want to clone>"
        ],
        res: "git clone <url of repo you want to clone>"  
   },
   "2": {
    number: 2,
    difficulty: "easy",
    label: "command",
    title: "What is the command for creating a new branch which is named 'bestbranch'?",
     options: [
        "git commit 'branch'", "git checkout 'bestbranch'", 
        "git add 'bestbranch'", "git checkout -b 'bestbranch'"
     ],
     res: 'git add'       
   },
   "3": {
      number: 3,
      difficulty: "easy",
      label: "command",
      title: "What is the command for pulling new code from the main branch?",
       options: [
          "git pull", 'git commit newcode', 'git push', 'git status'
       ],
       res: 'git pull'       
  },
  "4": {
    number: 4,
    difficulty: "easy",
    label: "command",
    title: "What is the command for making a commit with the commit message 'Updated sorting.py so it is more efficient'",
     options: [
        "git commit", "git commit 'Updated sorting.py so it is more efficient'", 
        "git commit -m 'Updated sorting.py so it is more efficient'", 
        "git commit -b 'Updated sorting.py so it is more efficient'"
     ],
     res: "git commit -m 'Updated sorting.py so it is more efficient'"       
  },
  "5": {
    number: 5,
    difficulty: "easy",
    label: "command",
    title: "What is the command for pushing your commits to the main branch?",
     options: [
        "git push", "git push newcode", 
        "git push to main", 
        "git commit -b 'newcode to main'"
     ],
     res: "git push"       
  },
  "6": {
    number: 6,
    difficulty: "easy",
    label: "command",
    title: "What is the command for adding the file 'merging.py' to the group of files which will be included in your next commit?",
     options: [
        "git commit 'merging.py'", "git add 'newcode", 
        "git push merging.py", 
        "git add merging.py"
     ],
     res: "git add merging.py"       
  },
  "7": {
    number: 7,
    difficulty: "easy",
    label: "command",
    title: "Which of the following is not a real GitHub command?",
     options: [
        "git push", "git pull", 
        "git build ", 
        "git clone"
     ],
     res: "git build"       
  },
  "8": {
    number: 8,
    difficulty: "easy",
    label: "command",
    title: "Which of the following is a real GitHub command?",
     options: [
        "git make", "git push", 
        "git find ", 
        "git delete"
     ],
     res: "git push"       
  },
  "9": {
    number: 9,
    difficulty: "easy",
    label: "conceptual",
    title: "Which of the following should you use if you have made changes to your code that you are ready to add to the main branch?",
     options: [
        "git add", "git push", 
        "git pull ", 
        "git commit"
     ],
     res: "git push"       
  },
  "10": {
    number: 10,
    difficulty: "easy",
    label: "conceptual",
    title: "Which of the following commands is useful when someone else has just added their new code to the main branch?",
     options: [
        "git clone", "git checkout -b main", 
        "git get", 
        "git pull"
     ],
     res: "git pull"       
  },
  "11": {
    number: 11,
    difficulty: "easy",
    label: "conceptual",
    title: "Which of the following commands would not be useful if you are working with code that you just updated?",
     options: [
        "git checkout -b 'newbranch'", "git commit", 
        "git push", 
        "git add"
     ],
     res: "git pull"       
  },
  "12": {
    number: 12,
    difficulty: "medium",
    label: "conceptual",
    title: "Which two commands have opposite functions?",
     options: [
        "git checkout/git clone", "git push/git add", 
        "git pull/git push", 
        "git commit/clone"
     ],
     res: "git pull/git push"       
  },
  "13": {
    number: 13,
    difficulty: "medium",
    label: "command",
    title: "Which of the following gives the proper order of commands to run if you want to add a new file that you wrote 'solver.py' to the main branch?",
     options: [
        "1. git push 2. git add solver.py 3. git commit", "1. git push 2. git commit 3. git add solver.py", 
        "1. git add solver.py 2. git push 3. git commit", "1. git add solver.py 2. git commit 3. git push",
        "1. git commit 2. git add solver.py 3. git push", "1. git commit 2. git push 3. git add solver.py"
     ],
     res: "1. git add solver.py 2. git commit 3. git push"       
  },
  "14": {
    number: 14,
    difficulty: "medium",
    label: "conceptual",
    title: "Git push allows you to bring new code from the main branch to your branch",
     options: [
        "True", "False"
     ],
     res: "False"       
  },
  "15": {
    number: 15,
    difficulty: "easy",
    label: "conceptual",
    title: "Use git checkout to clone a repository",
     options: [
        "True", "False"
     ],
     res: "False"       
  },
  "16": {
    number: 16,
    difficulty: "easy",
    label: "conceptual",
    title: "Use git checkout to create a new branch",
     options: [
        "True", "False"
     ],
     res: "True"       
  },
  "17": {
    number: 17,
    difficulty: "easy",
    label: "conceptual",
    title: "The main branch is your personal branch where you can work on the code.",
     options: [
        "True", "False"
     ],
     res: "False"       
  },
  "18": {
    number: 18,
    difficulty: "medium",
    label: "conceptual",
    title: "A repository can only have one branch associated with it.",
     options: [
        "True", "False"
     ],
     res: "False"       
  },
  "19": {
    number: 19,
    difficulty: "hard",
    label: "conceptual",
    title: "One person may have many different branches at once.",
     options: [
        "True", "False"
     ],
     res: "True"       
  },
  "20": {
    number: 20,
    difficulty: "hard",
    label: "conceptual",
    title: "Any files that you git add will be included in the next commit that you make.",
     options: [
        "True", "False"
     ],
     res: "True"       
  },
  "21": {
    number: 21,
    difficulty: "hard",
    label: "conceptual",
    title: "When you make a commit, the code that is included in your commit will be added to the main branch.",
     options: [
        "True", "False"
     ],
     res: "False"       
  },
  "22": {
    number: 22,
    difficulty: "hard",
    label: "conceptual",
    title: "Where is the new code coming from when you run 'git pull'?",
     options: [
        "The branch you are currently on", "The main branch",
        "Your coworker's branch", "Another one of your branches", 
     ],
     res: "The main branch"       
  },
  "23": {
    number: 23,
    difficulty: "hard",
    label: "conceptual",
    title: "Any files that you git add will be included in the next commit that you make.",
     options: [
        "True", "False"
     ],
     res: "True"       
  },
  "24": {
    number: 24,
    difficulty: "hard",
    label: "conceptual",
    title: "Who will be able to see your new code when you run 'git push'?",
     options: [
        "Only people who are using my branch", "My boss", 
        "Everyone who cloned the repository and has a main branch", "Just me"
     ],
     res: "Everyone who cloned the repository and has a main branch"       
  },
  "25": {
    number: 25,
    difficulty: "hard",
    label: "conceptual",
    title: "Not all repositories have a main branch.",
     options: [
        "True", "False", 
     ],
     res: "False"       
  },
  "26": {
    number: 26,
    difficulty: "easy",
    label: "command",
    title: "What is the command to use when you want to check which branch you are on?",
     options: [
        "git clone", 'git checkout -b branch', 'git branch', "git status"
     ],
     res: "git branch"  
},
"28": {
    number: 28,
    difficulty: "easy",
    label: "command",
    title: "What is the command to use if you want to see a history of all commits you have made?",
     options: [
        "git log", 'git commit -history', 'git status', "git find commits"
     ],
     res: "git log"  
},
"29": {
    number: 29,
    difficulty: "hard",
    label: "command",
    title: "What is the command to use if you want to see a history of all commits you have made?",
     options: [
        "git log", 'git commit -history', 'git status', "git find commits"
     ],
     res: "git log"  
},
"30": {
    number: 30,
    difficulty: "medium",
    label: "command",
    title: "Git branch shows you the most recent branch that you made.",
     options: [
        "True", "False"
     ],
     res: "False"  
},
"31": {
    number: 31,
    difficulty: "medium",
    label: "conceptual",
    title: "Git log allows you to see all of the branches that you have made.",
     options: [
        "True", "False"
     ],
     res: "False"  
},
"32": {
    number: 32,
    difficulty: "hard",
    label: "conceptual",
    title: "Git log and git checkout both involve branches specifically.",
     options: [
        "True", "False"
     ],
     res: "False"  
},
"33": {
    number: 33,
    difficulty: "hard",
    label: "conceptual",
    title: "Git branch and git clone are two commands that are associated with commits,",
     options: [
        "True", "False"
     ],
     res: "False"  
},
"34": {
    number: 34,
    difficulty: "hard",
    label: "conceptual",
    title: "If you run 'git checkout -b new_branch', then new_branch will be included in the output from running 'git branch'.",
     options: [
        "True", "False"
     ],
     res: "True"  
},
"35": {
    number: 35,
    difficulty: "hard",
    label: "conceptual",
    title: "If you run 'git checkout -b new_branch', new_branch will be not included in the output from running 'git branch'.",
     options: [
        "True", "False"
     ],
     res: "False"  
},
"36": {
    number: 36,
    difficulty: "hard",
    label: "command",
    title: "Which of these commands does not involve branches, specifically?",
     options: [
        "git commit", "git branch", "git checkout -b new_branch", "git clone"
     ],
     res: "git commit"  
},
"37": {
    number: 37,
    difficulty: "medium",
    label: "command",
    title: "If you run git commit -m 'my message' and then run git log, you will see this commit in the output of git log.",
     options: [
        "True", "False"
     ],
     res: "True"  
},
"38": {
    number: 38,
    difficulty: "medium",
    label: "command",
    title: "If you run git commit -m 'my message' and then run git log, you will not see this commit in the output of git log.",
     options: [
        "True", "False"
     ],
     res: "False"  
},
"39": {
    number: 39,
    difficulty: "hard",
    label: "conceptual",
    title: "Which of these commands is the least like the others?",
     options: [
        "git log", "git branch", "git commit"
     ],
     res: "git commit"  
},
"40": {
    number: 40,
    difficulty: "hard",
    label: "conceptual",
    title: "Which of these commands is the least like the others?",
     options: [
        "git checkout -b new_branch", "git commit -m 'my commit'", "git push", "git clone"
     ],
     res: "git clone"  
},
"41": {
    number: 41,
    difficulty: "hard",
    label: "conceptual",
    title: "Which of the following best explains what happens when you run git clone?",
     options: [
        "This command makes a new branch where the branch name is the name of the repository you ran git clone with.",
        "This command makes a copy of the branch that you are currently on puts it into the staging area.",
        "This command copies the GitHub repository you ran git clone with and makes a local copy on your device in the main branch.",
        "This command copies the GitHub repository you ran git clone with and makes a local copy on your device in a branch that has the same name as the repository."
     ],
     res: "This command copies the GitHub repository you ran git clone with and makes a local copy on your device in the main branch."
},
"42": {
    number: 42,
    difficulty: "hard",
    label: "conceptual",
    title: "Which of the following best describes what version control is?",
     options: [
        "Version control allows you to keep track of different versions of a codebase.",
        "Version control allows you to save changes that you have made in a large codebase.",
        "Version control helps developers track and manage changes to a software project's code.",
        "Version control allows you to save multiple different versions of a file that you are working on."
     ],
     res: "Version control helps developers track and manage changes to a software project's code."
},
"43": {
    number: 43,
    difficulty: "hard",
    label: "conceptual",
    title: "Which of the following is correct?",
     options: [
        "A pull request is something you make before you commit your changes.",
        "You should make a pull request before you clone a repository.",
        "You should make a pull request after you push your commits.",
        "A pull request is a different way to clone a repository."
     ],
     res: "You should make a pull request after you push your commits."
},"44": {
    number: 44,
    difficulty: "medium",
    label: "conceptual",
    title: "Which of the following is incorrect?",
     options: [
        "A pull request is something you make before you commit your changes.",
        "You should make a pull request before you clone a repository.",
        "You should make a pull request after you push your commits.",
        "A pull request is a different way to clone a repository."
     ],
     res: "You should make a pull request after you push your commits."
},
}