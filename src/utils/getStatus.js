export async function getStatus(pwd) {

    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    var branchName = ''
    var commits = 0
    var changedLocal = 0
   // var isGit = True
    const filesAdded = []
    const filesModified = []
    const filesDeleted = []
    const filesUntracked = []

    process.chdir(pwd)
    
    try {
        let {stdout, stderr} = await exec('git status --porcelain');
        if (stdout) {
            console.log(stdout)
            stdout = stdout.split("\n")
            for (let line in stdout) {
                const [operation, file] = stdout[line].trim().split(' ');
                switch (operation) {
                    case 'A':
                        filesAdded.push(file);
                        break;
                    case 'M':
                        filesModified.push(file);
                        break;
                    case 'D':
                        filesDeleted.push(file);
                        break;
                    case '??':
                        filesUntracked.push(file);
                        break;
                    case '':
                        // Skip Empty Line
                        break;
                    default:
                        console.error('Unknown operation in status ' + stdout[line]);
                }
            }

            changedLocal = stdout.length - filesAdded.length - filesModified.length - filesDeleted.length - filesUntracked.length - 1
        }

        else if (stderr) {
            console.log(stderr)
        }

    } catch (err){
        console.warn(`Throwing ${err} in getStatus`)
        throw err
    }

    try {
        let {stdout, stderr} = await exec('git branch');
        if (stdout) {
            stdout = stdout.split("\n")
            for (let line in stdout) {
                if (stdout[line][0] == '*') {
                    branchName = stdout[line].split(' ')[1]
                }
            }
        }

        else if (stderr) {
            console.log(stderr)
        }
    } catch (err){
        console.warn(`Throwing ${err} in getStatus`)
        throw err
    }




    try {
        let {stdout, stderr} = await exec('git status');
        if (stdout) {
            let words = stdout.split("\n")[1].split(" ")
            for (let i=1; i<words.length; i++) {
                if (!isNaN(words[i])){
                    commits = words[i]
                }
            }
        }

        else if (stderr) {
            console.log(stderr)
        }

    } catch (err){
        console.warn(`Throwing ${err} in getStatus`)
        throw err
    }
    
    const files = { isGit, filesAdded, filesModified, filesDeleted, filesUntracked };
    return [branchName, commits, changedLocal, filesAdded.length + filesModified.length, files]
}

getStatus('/Users/zoewortzman/Documents')