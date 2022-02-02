///#fd4a71 green color
// #626ad2 red color 

// #51fada green
//#a3fa43 red
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

        // else if (words[0] == "Untracked"){
        //     j = i + 2
        //     changedLocal = lines[i+2].trim()
        //     while (j < i+4) {
        //         console.log(lines[j])
        //         changedLocal.concat(lines[j].trim())
        //         j += 1
        //     }
    
        //     console.log(changedLocal)
        // }

        else if (getColor(words[0]) == '#a3fa43') {
            console.log(words)
            tracked.concat(words[i])
            console.log(tracked)
        }

        else {
            console.log(getColor(words[0]))
        }


        // else if (words[3] == "committed:"){
        //     j = i + 2
        //     tracked = lines[11].split(':')[1].trim()
            
    

        //     console.log(tracked)
        // }

    //     else if (font)
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
