function replicate() {

const { exec } = require('child_process');

// this returns the users current working directory so that correct repo can be 
// replicated and new repo can be created in same folder
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

// first parameter after flag is directory to be copied
// second is name of directory and location it will be copied in,
// for now I have made copied direcotry have exension .gb 

setTimeout(() => {
    pwd = pwd.replace("\n","");
    let new_directory = pwd + '.gb';
    console.log("New dir is", new_directory);
    exec('cp -r ' + pwd + ' ' + new_directory, (error, stdout, stderr)=> {
    if (error) {
        console.log(`error: ${error.message}`)
        return
    }

    if (stderr) {
        console.log(`error: ${error.message}`)
        return
    }

    console.log(`stdout ${stdout}`);
    console.log("directory has been copied");
});
}, 1500);

}

replicate()