async function parse_status() {

    // returns the name of the branch, how many commits need to be pushed, 
    // number of files that have unsaved or untracked files, and number of files 
    // that are saved and need to be commited 
    let branchName = ''
    let commits = 0;
    let changedLocal = []
    let tracked = []

    const fs = require('fs')

    fs.readFile('./gitstatus.txt', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        lines = data.split('\n');

        for (let i =0; i<lines.length; i++){
            if (lines[i]) {
                words = lines[i].split(' ');

                // parsing branch name
                // updating branchName variable
                if (words[0] == "On") {
                    branchName = words[2]
                }

                // parsing number of commits ahead of branch
                // updating commits variable
                else if (words[0] == "Your") {
                    for (k=0; k<words.length; k++){
                        if (!isNaN(words[k])){
                            commits = words[k]
                        }
                    }
                }

                // parsing number of tracked changes
                // adding to tracked list
                else if (words[3] == "committed:") {
                    for (j=2; j<data.length; j++) {
                        if (lines[i+j]) {
                            line = lines[i+j].trim()
                        
                            if (line[0] != 'm') {
                                break
                            }
                            tracked = tracked.concat([lines[i+j].split(':')[1].trim()])
                        }
                        else {
                            break
                        }
                    }
                }

                // parsing new untracked filse
                // adding to changedLocal list
                else if (words[0] == "Untracked") {
                    for (j=2; j<data.length; j++) {
                        
                        if (lines[i+j]) {
                            line = lines[i+j].trim().split(' ')
                            changedLocal = changedLocal.concat(line[0])
                            
                            if (lines.length != 1) {
                                break
                            }
                        }
                        else {
                            break
                        }
                    }
                }  
            
                // parsing unsaved changes to file
                // adding to changedLocal list
                else if (words[4] == "commit:") {
                    for (j=3; j<data.length; j++) {
                        if (lines[i+j]) {
                            line = lines[i+j].split(' ')
                            changedLocal = changedLocal.concat([lines[i+j].split(':')[1].trim()])
                        }
                        else {
                            break
                        }
                    }
                }
            }
        }
        // console.log(branchName)
        // console.log(commits)
        // console.log(changedLocal)
        // console.log(tracked)
    });

    // returned as promise
    return branchName, commits, changedLocal, tracked
}

parse_status()

// const _parse_status = parse_status;
// export { _parse_status as parse_status};

// could maybe use this function to sort text by color? Was super buggy 
// but maybe same idea with a bette function would work 
function getColor(str) {
    var hash = 0;
    for (var x = 0; x < str.length; x++) {
        hash = str.charCodeAt(x) + ((hash << 5) - hash);
    }
    var color = '#';
    for (var y = 0; y < 3; y++) {
        var value = (hash >> (y * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color
}
