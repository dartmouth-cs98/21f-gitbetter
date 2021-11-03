//const electron = require('electron');
const child_process = require('child_process');
const dialog = require('@electron/remote');

export default function run_script(command, args, callback) {
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
        console.log(dataResponse);     
    });
    var mainWindow;
    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (data) => {
        // Return some data to the renderer process with the mainprocess-response ID
        mainWindow.webContents.send('mainprocess-response', data);
        //Here is the output from the command
        console.log(data);  
        dataResponse = data; 
        console.log(dataResponse); 
    });

    child.on('close', (code) => {
        //Here you can get the exit code of the script  
        // switch (code) {
        //     case 0:

        //         electron.showMessageBox({
        //             title: 'Title',
        //             type: 'info',
        //             message: 'End process.\r\n'
        //         });
        //         break;
        // }
        console.log('Done!', code, dataResponse);
        return dataResponse; 
    });
    if (typeof callback === 'function')
        callback();
}