async function replicate() {

    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    let pwd = process.cwd()
    let {stdout, stderr} = await exec('cp -r ' + pwd + ' ' + pwd + '.gb');
    
    try {
        if (stdout) {
            console.log('directory has been copied')
            console.log(stdout)
        }
        console.log(stderr)
    }
    catch(error) {
        console.log(error)
    }
}

const _replicate = replicate;
export { _replicate as replicate };