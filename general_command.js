
export function general_command(line) {

    const { exec } = require('child_process');


    let output;
    const child = exec(line, ((error, stdout, stderr)=> {
        if (error) {
            console.log(`error: ${error.message}`)
            return
        }

        if (stderr) {
            console.log(`error: ${error.message}`)
            return
        }
        console.log(`stdout ${stdout}`);
        output = stdout;

    }));    

    return output;
}

export default general_command(line);