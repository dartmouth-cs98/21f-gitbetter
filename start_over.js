
var start_over =  async function start_over() {

    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    try {
        process.chdir("..")
        console.log('directory has successfully been changed in start_over to move into general folder')
    } catch {
        console.error("error while changing directory")
    }
    console.log('New directory: ' + process.cwd());

    let pwd;
    pwd = process.cwd();
    let new_directory = pwd + '/GitBetterTestRepository.gb';

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


    // try {
    //     process.chdir('./GitBetterTestRepository')
    //     console.log('directory was successfully changed back to GitBetterTestRepository folder')
    // } catch(error) {
    //     console.error('error while changing directory back to GitBetterTestRepository')
    // }


}

const _start_over = start_over;
export { _start_over as start_over };

// need to navigate back to home page