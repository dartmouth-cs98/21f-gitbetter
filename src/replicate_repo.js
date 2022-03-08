var replicate_repo = async function replicate_repo(pwd) {

    const util = require('util');
    const exec = util.promisify(require('child_process').exec);
    const fs = require('fs');
    
    // path to new directory, in same parent directory but has .gb extension
    const new_dir = pwd + ".gb"

    // check if file already exists
    if (fs.existsSync(new_dir)){
        // this could be a bug if they have updated stuff in the file, maybe should remove
        // this other .gb file and copy it again? or add a copy before .gb?
        console.log(".gb directory already exists")
        return
    }

    // copy contents of repo into .gb repo
    try {
        let {stdout, stderr} = await exec('cp -r ' + pwd + ' ' + new_dir);
        if (stdout) {
            console.log('directory has been copied')
        }
        else if (stderr) {
            console.log(stderr)
        }
    } catch (err){
        console.warn(`Throwing ${err} in replicate_repo`)
        throw err
    }

    process.chdir(pwd)
}

const _replicate_repo = replicate_repo;
export { _replicate_repo as replicate_repo };