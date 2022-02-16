export async function isGit(pwd) {

    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    var git = True
    process.chdir(pwd)

    try {
        let {stdout, stderr} = await exec('git status');
        if (stdout) {
            
        }

        else if (stderr) {
            console.log(stderr)
        }
    } catch (err){
        console.warn(`Throwing ${err} in getStatus`)
        throw err
    }

}
