export async function saveChanges(pwd) {

    let srcDir = pwd + '.gb'
    let dstDir = pwd


    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    let {stdout, stderr} = await exec('rsync --delete --archive ' + srcDir + '/ ' + dstDir + '/')
    
    try {
        if (stdout) {
            console.log('changes have been saved')
            console.log(stdout)
        }
        console.log(stderr)
    }
    catch(error) {
        console.log("unable to save changes")
        console.log(error)
    }
}
