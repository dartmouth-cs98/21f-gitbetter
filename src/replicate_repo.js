var replicate_repo = async function replicate_repo(pwd, version = 0) {

    const util = require('util');
    const exec = util.promisify(require('child_process').exec);
    const fs = require('fs');
    
    // discard the version number if one exists
    const [base, gb, gbVersion] = pwd.split('.').slice(-3);

    // path to new directory, in same parent directory but has .gb extension
    const new_dir = gb === 'gb'
        ? `${base}.gb${version ? '.' + version : ''}`
        : `${pwd}.gb${version ? '.' + version : ''}`;

    console.log("replicate repo", base, gb, gbVersion, pwd, new_dir);
    // check if file already exists
    if (fs.existsSync(new_dir)){
        // this could be a bug if they have updated stuff in the file, maybe should remove
        // this other .gb file and copy it again? or add a copy before .gb?
        console.log(".gb directory already exists")
        return new_dir;
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
    process.chdir(new_dir);
    return new_dir;
}

const _replicate_repo = replicate_repo;
export { _replicate_repo as replicate_repo };
