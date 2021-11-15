
var start_over =  async function start_over() {

    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    process.chdir('../21f-gitbetter');
    console.log('New directory: ' + process.cwd());

    let pwd;
    pwd = process.cwd();
    let new_directory = pwd + '.gb';

    let {stdout, stderr} = await exec('rm -r ' + new_directory);
    
    try {
        if (stdout) {
            console.log('directory has been removed')
            console.log(stdout)
        }
        console.log(stderr)
    }
    catch(error) {
        console.log(error)
    }
}

const _start_over = start_over;
export { _start_over as start_over };

// need to navigate back to home page