
var start_over =  async function start_over() {

    const util = require('util');
    const exec = util.promisify(require('child_process').exec);
    const fs = require('fs');

    let pwd = process.cwd()
    let  new_dir = pwd + ".gb"

    if (!fs.existsSync(new_dir)){
        console.log(".gb directory already exists")
        return
    }
    try {
        process.chdir("..")
        console.log('directory has successfully been changed in start_over to move into general folder')
    } catch {
        console.error("error while changing directory")
    }


    let {stdout, stderr} = await exec('rm -r ' + new_dir);

    if (stdout) {
        console.log('directory has been removed')
        console.log(stdout)
    } else {
        console.log(stderr)
    }


    try {
        process.chdir("./GitBetterTestRepository")
        console.log('successfully switched into GitBetterTestRepository at the end of start_over')
    } catch {
        console.error("error switching into GitBetterTestRepository at the end of start_over")
    }

}

const _start_over = start_over;
export { _start_over as start_over };

// need to navigate back to home page