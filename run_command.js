//const electron = require('electron');
const child_process = require('child_process');
const dialog = require('@electron/remote');

var run_script = function run_script(command, args, callback) {
    
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
    var mainWindow;
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data) => {
        //Here is the output
        dataResponse=data.toString();     
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (data) => {
        mainWindow.webContents.send('mainprocess-response', data);
        dataResponse = data;
     });
    

    child.on('close', (code) => {
        // if the code does not execute return an error message

        console.log(dataResponse)
        if (dataResponse == undefined){
            dataResponse = ""
        }

        if (code == 128) {
            dataResponse = "Invalid Command"
        }

        else if (code == 127) {
            dataResponse = "Command not found"
        }

        else if (code == 1) {
            dataResponse = "Command not found"
        }

        // otherwise return output from user terminal
        console.log('Done!', code, dataResponse);

        if (typeof callback == 'function')
            callback(null, dataResponse);
    });
}

module.exports.run_script = run_script;