var replicate =  async function replicate() {

    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    let pwd = process.cwd()
                
    await exec('cp -r ' + pwd + ' ' + pwd + '.gb', (error, stdout, stderr)=> {
        if (error) {
            console.log(`error: ${error.message}`)
            return 
        }
        if (stderr) {
            console.log(`error: ${error.message}`)
            return 
        }
        console.log('directory has been copied')
        console.log(stdout)
    });

  //  return await Promise.resolve(false)
    //process.chdir('../21f-gitbetter.gb');
}

const _replicate = replicate;
export { _replicate as replicate };