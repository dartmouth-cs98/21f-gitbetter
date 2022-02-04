
// this function is much better at parsing everything but how many commits ahead of main 
var getStatus = async function getStatus() {
    
    var branchName = ''
    var changedLocal = []
    var tracked = []

    const util = require('util');
    const exec = util.promisify(require('child_process').exec);
    //const fs = require('fs');

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
        let {stdout, stderr} = await exec('git status --porcelain');
        if (stdout) {
            stdout = stdout.split("\n")
            for (let line in stdout) {
                if (stdout[line][1] == 'M') {
                    if (stdout[line].split(' ').length > 2) {
                        changedLocal = changedLocal.concat(stdout[line].split(' ')[2])
                    }
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
        let {stdout, stderr} = await exec('git status --porcelain');
        if (stdout) {
            stdout = stdout.split("\n")
            for (let line in stdout) {
                if (stdout[line][0] == 'A') {
                    tracked = tracked.concat(stdout[line].split(' ')[1])
                }
                else if (stdout[line][0] == 'M') {
                    tracked = tracked.concat(stdout[line].split(' ')[2])
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

    console.log(changedLocal)
    
    return [branchName, changedLocal.length, tracked.length]
}

const _getStatus = getStatus;
export { _getStatus as getStatus };