async function replicate(pwd) {
    // Importing Utilities module 
    console.log(`Import at ${pwd}`);
    const util = require('util');
    // Using util.promisify to return a Promise<{ stdout, stderr }> object
    // this promisifies the child process 
    const exec = util.promisify(require('child_process').exec);
    console.log("currently in directory " + pwd)
    let new_dir = pwd + '.gb'

    try {
        // Change the directory so that we are only copying the tester folder
        process.chdir(new_dir)
    } catch (err) {
        console.error("error while changing directory into GitBetterTestRepository in replicate");
    }

    // Current woring directory should now be the test repository 
    pwd = process.cwd()
    // Copying the repository

    let {stdout, stderr} = await exec('cp -r ' + pwd + ' ' + new_dir);
    
    // Checking to make sure directory was copied correctly 
    try {
        if (stdout) {
            console.log('directory has been copied')
            console.log(stdout)
        }
        console.log(stderr)
    }
    catch(error) {
        console.log("unable to copy directory")
        console.log(error)
    }
}

// Defining module so that it can be exported 
export { replicate };