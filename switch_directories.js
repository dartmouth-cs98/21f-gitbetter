var switch_cwd =  function switch_cwd() {

    console.log('Starting directory: ' + process.cwd());
    try {
        process.chdir('../21f-gitbetter.gb');
        console.log('New directory: ' + process.cwd());
    }
    catch (err) {
    console.log('chdir: ' + err);   
    }
    
    const { exec } = require('child_process');

    let pwd;
    const child = exec('pwd', ((error, stdout, stderr)=> {
        if (error) {
            console.log(`error: ${error.message}`)
            return
        }
    
        if (stderr) {
            console.log(`error: ${error.message}`)
            return
        }
        
        console.log(`stdout ${stdout}`);
        pwd = stdout;
    }));
    
    setTimeout(() => {
        console.log("Working dir outer", pwd.replace("\n",""));
        child.on('exit', function() {
            process.exit();
        });
    }, 1000);   
}

module.exports.switch_cwd = switch_cwd;
