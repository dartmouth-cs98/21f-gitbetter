export function isGit(pwd) {
    // note for error handling, this does not yet consider the 
    // case where the pwd is invalid, may need to handle this case
    // process.chdir(pwd);
    return require("fs").existsSync(pwd + '/.git');
}
