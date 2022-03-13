
var start_over =  async function start_over(pwd) {
    const util = require('util');
    const exec = util.promisify(require('child_process').exec);
    if (!pwd.length) {
        pwd = process.cwd();
        if (!pwd.includes('.gb')) throw new Error('Empty File Path - unable to assume directory');
    }
    const base_pwd = pwd.substring(0, pwd.indexOf('.gb'));

    try {
        process.chdir("..");
        console.log(`directory has changed in start_over to ${process.cwd()}`);
    } catch {
        console.error("error while changing directory");
    }

    try {
        const { stdout } = await exec('rm -r ' + base_pwd + '.gb*');

        if (stdout) {
            console.log(`${base_pwd} directories have been removed\n`, stdout);
        } 
    } catch (e) { console.log('Deleted all such GB Versions', e); }
}

const _start_over = start_over;
export { _start_over as start_over };

// need to navigate back to home page