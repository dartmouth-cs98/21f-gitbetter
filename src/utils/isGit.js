export async function isGit(pwd) {

    // note for error handling, this does not yet consider the 
    // case where the pwd is invalid, may need to handle this case
    const fs = require("fs");
    let git = false;
    process.chdir(pwd);
    const path = './.git';

    if (fs.existsSync(path)) {
        git = true
    }

    return git
}
