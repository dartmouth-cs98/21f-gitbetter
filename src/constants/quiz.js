export const questions = {
    "1": {
       number: 1,
       title: "What is the command for cloning a repository?",
        options: [
           "git add", 'git commit', 'git clone', "git clone <url of repo you want to clone>"
        ],
        res: "git clone <url of repo you want to clone>"  
   },
   "2": {
    number: 2,
    title: "What is the command for creating a new branch which is named 'bestbranch'?",
     options: [
        "git commit 'branch'", "git checkout 'bestbranch'", 
        "git add 'bestbranch'", "git checkout -b 'bestbranch'"
     ],
     res: 'git add'       
   },
   "3": {
      number: 3,
      title: "What is the command for pulling new code from the main branch?",
       options: [
          "git pull", 'git commit newcode', 'git push', 'git status'
       ],
       res: 'git pull'       
  },
  "4": {
    number: 4,
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
    title: "Git push allows you to bring new code from the main branch to your branch",
     options: [
        "True", "False"
     ],
     res: "False"       
  },
  "15": {
    number: 15,
    title: "Use git checkout to clone a repository",
     options: [
        "True", "False"
     ],
     res: "False"       
  },
  "16": {
    number: 16,
    title: "Use git checkout to create a new branch",
     options: [
        "True", "False"
     ],
     res: "True"       
  },
  "17": {
    number: 17,
    title: "The main branch is your personal branch where you can work on the codes",
     options: [
        "True", "False"
     ],
     res: "False"       
  },
  "18": {
    number: 18,
    title: "A repository can only have one branch associated with it",
     options: [
        "True", "False"
     ],
     res: "False"       
  },
  "19": {
    number: 19,
    title: "One person may have many different branches at once",
     options: [
        "True", "False"
     ],
     res: "True"       
  },
  "20": {
    number: 20,
    title: "Any files that you git add will be included in the next commit that you make",
     options: [
        "True", "False"
     ],
     res: "True"       
  },
  "21": {
    number: 21,
    title: "When you make a commit, the code that is included in your commit will be added to the main branch",
     options: [
        "True", "False"
     ],
     res: "False"       
  },
  "22": {
    number: 22,
    title: "Where is the new code coming from when you run 'git pull'?",
     options: [
        "The branch you are currently on", "The main branch",
        "Your coworker's branch", "Another one of your branches", 
     ],
     res: "The main branch"       
  },
  "23": {
    number: 23,
    title: "Any files that you git add will be included in the next commit that you make",
     options: [
        "True", "False"
     ],
     res: "True"       
  },
  "24": {
    number: 24,
    title: "Who will be able to see your new code when you run 'git push'",
     options: [
        "Only people who are using my branch", "My boss", 
        "Everyone who cloned the repository and has a main branch", "Just me"
     ],
     res: "Everyone who cloned the repository and has a main branch"       
  },
  "25": {
    number: 25,
    title: "Not all repositories have a main branch",
     options: [
        "True", "False", 
     ],
     res: "False"       
  },
}