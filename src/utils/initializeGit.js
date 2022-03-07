export async function initializeGit(pwd) {

    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    process.chdir(pwd + '.gb')

    try {
        let {stdout, stderr} = await exec('git init');
        console.log("here")
        if (stdout) {
            console.log(stdout)
        }

        else if (stderr) {
            console.log(stderr)
        }

    } catch (err){
        console.warn(`Throwing ${err} in initalizeGit`)
        throw err
    }

    process.chdir(pwd)
    
    // try {
    //     let {stdout, stderr} = await exec('git add .gitignore');
    //     if (stdout) {
    //         console.log(stdout)
    
    //     }

    //     else if (stderr) {
    //         console.log(stderr)
    //     }

    // } catch (err){
    //     console.warn(`Throwing ${err} in getStatus`)
    //     throw err
    // }
}
