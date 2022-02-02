// #51fada green??
//#a3fa43 red??

async function parse_status() {
    let branchName;
    let commits;
    let changedLocal;
    let tracked;

    const fs = require('fs')

    fs.readFile('./gitstatus.txt', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        lines = data.split('\n');
        for (let i =0; i<lines.length; i++){
            words = lines[i].split(' ');
            if (words[0] == "On") {
                branchName = words[2]
            }

            else if (words[0] == "Your") {
                for (j=0; j<lines[i].length; j++){
                    if (!isNaN(words[j])){
                        commits = words[j]
                    }
                    else {
                        commits = 0
                    }
                }
            }

            else if (words[3] == "committed:") {
                tracked = []
                for (j=2; j<data.length; j++) {
                    line = lines[i+j].trim()
                    
                    if (line[0] != 'm') {
                        break
                    }
                    
                    console.log(lines[i+j])
                    line = lines[i+j].trim()
                    tracked = tracked.concat([lines[i+j].split(':')[1].trim()])

                }
                console.log(tracked)
            }
        }

        });
}

parse_status()

// const _parse_status = parse_status;
// export { _parse_status as parse_status};

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
