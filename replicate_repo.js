import { chdir } from 'process';

var replicate_repo = async function replicate_repo(pwd) {

    const util = require('util');
    const exec = util.promisify(require('child_process').exec);
    
    console.log("currently in directory " + pwd)
        // Change the directory so that we are only copying the tester folder
    
    try {
        const new_dir = pwd + ".gb"
        let {stdout, stderr} = await exec('cp -r ' + pwd + ' ' + new_dir);
        if (stdout) {
            console.log('directory has been copied')
        }
        else if (stderr) {
            console.log(stderr)
        }
    } catch (err){
        throw err
    
    }
}

const _replicate_repo = replicate_repo;
export { _replicate_repo as replicate_repo };