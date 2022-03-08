export async function getStatus(pwd) {
        
    const fs = require("fs");
    const path = './.git';

    var branchName = 'main'
    var commits = 0
    var changedLocal = 0
    const filesAdded = []
    const filesModified = []
    const filesDeleted = []
    const filesUntracked = []
    const filesLocal = {
        filesAdded: [],
        filesModified: [],
        filesDeleted: [],
        filesRenamed: [],
        filesCopied: [],
        filesUntracked: []
    }
    const filesStaging = {
        filesAdded: [],
        filesModified: [],
        filesDeleted: [],
        filesRenamed: [],
        filesCopied: []
    }

    process.chdir(pwd + '.gb')
    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    if (!fs.existsSync(path)) {
        try {
            let {stdout, stderr} = await exec('ls | wc -l');
            if (stdout) {
                changedLocal = stdout
            }

            else if (stderr) {
                console.log(stderr)
            }

    } catch (err){
        console.warn(`Throwing ${err} in getStatus`)
        throw err
    }

        const filesChanged = {filesLocal, filesStaging}
        const files = { filesAdded, filesModified, filesDeleted, filesUntracked };
        return [branchName, commits, changedLocal, filesAdded.length + filesModified.length, files, filesChanged]
    }


    try {
        let {stdout, stderr} = await exec('git status --porcelain');
        if (stdout) {
            stdout = stdout.split("\n")
            for (let line in stdout) { 
                var [operation, file] = stdout[line].trim().split(' ');
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

                // Can probably combine with switch statement above eventually 
                const op1 = stdout[line].charAt(0) // in index (staging)
                const op2 = stdout[line].charAt(1) // on working tree (local)
                const fileNames = stdout[line].trim().split(' ')
                file = fileNames[fileNames.length - 1]
                switch(op1) {
                    case ' ':
                        break;
                    case '':
                        break;  
                    case '?':
                        break;   
                    case 'A':
                        filesStaging.filesAdded.push(file)
                        break;    
                    case 'M':
                        filesStaging.filesModified.push(file)
                        break;     
                    case 'D':
                        filesStaging.filesDeleted.push(file)
                        break;     
                    case 'R':
                        var renamedStaging = stdout[line].split('->')[0].trim().split(' ')
                        filesStaging.filesRenamed.push([renamedStaging[renamedStaging.length - 1], file])
                        break;
                    case 'C':
                        var copiedStaging = stdout[line].split('->')[0].trim().split(' ')
                        filesStaging.filesCopied.push([copiedStaging[copiedStaging.length - 1], file])
                        break;    
                    default: 
                        console.error('Unknown operation in status ' + stdout[line]);
                }
                switch(op2) {
                    case ' ':
                        break;
                    case '':
                        break;    
                    case '?':
                        filesLocal.filesUntracked.push(file)
                        break;    
                    case 'A':
                        filesLocal.filesAdded.push(file)
                        break;    
                    case 'M':
                        filesLocal.filesModified.push(file)
                        break;     
                    case 'D':
                        filesLocal.filesDeleted.push(file)
                        break;     
                    case 'R':
                        var renamedLocal = stdout[line].split('->')[0].trim().split(' ')
                        filesLocal.filesRenamed.push([renamedLocal[renamedLocal.length - 1], file])
                        break;
                    case 'C':
                        var copiedLocal = stdout[line].split('->')[0].trim().split(' ')
                        filesLocal.filesCopied.push([copiedLocal[copiedLocal.length - 1], file])
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
        let {stdout, stderr} = await exec('git status');
        if (stdout) {
            let firstLine = stdout.split("\n")[0].split(" ")
            branchName = firstLine.pop()
            
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
    
    // filesChanged used for git add/commit visualization
    // can probably combine files and filesChanged eventually
    const filesChanged = {filesLocal, filesStaging}
    const files = { filesAdded, filesModified, filesDeleted, filesUntracked };
    return [branchName, commits, changedLocal, filesAdded.length + filesModified.length, files, filesChanged]
}
