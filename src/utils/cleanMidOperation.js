export default async function cleanMidOperation(index) {

    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    let pwd = process.cwd()
    let base_pwd = pwd.substring(0, pwd.indexOf('.gb'));

    try {
        for (let i = index;; i++) {
            let { stdout } = await exec('rm -r ' + base_pwd + '.gb.' + i);

            if (stdout) {
                console.log(`${base_pwd} directories have been removed\n`)
                console.log(stdout)
            } 
        } 
    } catch { console.log('Finished cleaning up following files'); }
}