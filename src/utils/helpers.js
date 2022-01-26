
var getDirStructure = async function getDirStructure() {
    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    const { stdout } = await exec('ls');
    console.log('stdout:', stdout);
    return stdout;
}


module.exports.getDirStructure = getDirStructure;
