async function replicate() {
    // Importing Utilities module 
    const util = require('util');
    // Using util.promisify to return a Promise<{ stdout, stderr }> object
    // this promisifies the child process 
    const exec = util.promisify(require('child_process').exec);

    try {
        let pwd = process.cwd()
        console.log("currently in directory " + pwd + " trying to move into GitBetterTestRepository in replicate")
        // Change the directory so that we are only copying the tester folder
        process.chdir('../GitBetterTestRepository')
        console.log("directory has successfully been changed from folder to GitBetterTestRepository folder in replicate");
    } catch (err) {
        console.error("error while changing directory into GitBetterTestRepository in replicate");
    }

    // Current woring directory should now be the test repository 
    let pwd = process.cwd()
    // Copying the repository

    let {stdout, stderr} = await exec('cp -r ' + pwd + ' ' + pwd + '.gb');
    
    // Checking to make sure directory was copied correctly 
    try {
        if (stdout) {
            console.log('directory has been copied')
            console.log(stdout)
        }
        console.log(stderr)
    }
    catch(error) {
        console.log("unable to copy GitBetterTestRepository")
        console.log(error)
    }

   
}

// Defining module so that it can be exported 
export default { replicate };