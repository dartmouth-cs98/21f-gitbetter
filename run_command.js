//const electron = require('electron');
const child_process = require('child_process');
const dialog = require('@electron/remote');
var output;

var run_script = function run_script(command, args, callback) {

   // this is one way to change working directory if we want to have change it by command 
   
    // try {
    //     process.chdir('../21f-gitbetter.gb');
    //     console.log('New directory: ' + process.cwd());
    // }
    // catch (err) {
    //     console.log(err)
    // }

    var child = child_process.spawn(command, args, {
        encoding: 'utf8',
        shell: true
    });

    child.on('error', (error) => {
        dialog.showMessageBox({
            title: 'Title',
            type: 'warning',
            message: 'Error occured.\r\n' + error
        });
    });
    var dataResponse;
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data) => {
        //Here is the output
        data=data.toString();  
        dataResponse = data;     
    });
    var mainWindow;
    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (data) => {
        // Return some data to the renderer process with the mainprocess-response ID
        mainWindow.webContents.send('mainprocess-response', data);  
        dataResponse = data; 
    });

    child.on('close', (code) => {
        
        if (code !== 0) {
            dataResponse = "Command not found"
        }
        
        console.log('Done!', code, dataResponse);
        output = dataResponse
        
    });
    if (typeof callback === 'function')
        callback();

    console.log(output)
    return output; 
}

module.exports.run_script = run_script;