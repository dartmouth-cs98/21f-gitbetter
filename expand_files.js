
async function expand(path) {
    
    const os = require('os');
    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    process.chdir(os.homedir() + path);

    let {stdout, stderr} = await exec('ls');

    try {
        if (stdout) {
            var children = (stdout).toString().split("\n");
            for(i in children) {
                console.log(children[i]);
            }
        }
        console.log(stderr)
    }
    catch(error) {
        console.log(error)
    }
}

expand('/Documents/cs98')
