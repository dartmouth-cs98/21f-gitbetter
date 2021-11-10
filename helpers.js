// var output;
// var dataResponse;
// // const util = require('util');
// // const exec = util.promisify(require('child_process').exec);

// // async function hi() {
// //   const { stdout, stderr } = await exec('pwd');
// //   console.log('stdout:', stdout);
// //   console.error('stderr:', stderr);
// // }


// function getCurrentDir() {
//     const { spawn } = require("child_process");

//     const pwd = spawn("pwd");
//     pwd.stdout.setEncoding('utf8');
//     pwd.stdout.on('data', (data) => {
//         //Here is the output
//         data=data.toString();  
//         dataResponse = data;
//     });
//     pwd.on('close', () => {
//         output = dataResponse;
//         return output; 
//     });
//     console.log(output)
//     return output; 
    
// }


var getDirStructure = async function getDirStructure() {
    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    const { stdout } = await exec('ls');
    console.log('stdout:', stdout);
    return stdout;
}
// find pwd 

module.exports.getDirStructure = getDirStructure;
