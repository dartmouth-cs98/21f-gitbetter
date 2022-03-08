const fs = require('fs-extra');

// Regex not supported (e.g. git add file*)
export default function classification(gitCommand, gitStatus) {
    if (!gitCommand.startsWith('git ')) return '';
    const [, operation, ...restParameters] = gitCommand.split(' ');
    const parameters = gitCommand.split(' ').slice(2).join(' ');
    const {
        branch, filesRemoved, filesUntracked, output, workingDirectory, //filesAdded, filesModified, 
    } = gitStatus;
    switch(operation) {
        case 'checkout': {
            // git checkout [-b] <branchname>
            if (restParameters.length === 0) return '';
            const newBranch = restParameters[restParameters.length-1];
            if (newBranch === '-') return `git checkout ${branch}`;
            if (newBranch.startsWith('-')) return '';
            return parameters.startsWith('-b') ? `git checkout ${branch} && git branch -D ${newBranch}` : `git checkout ${branch}`;
        }
        case 'add': 
            // git add file [<pathspec>...] [--all|-A]
            // No change to filesAdded, filesModified that have already been added before
            if (parameters.includes('--all') || parameters.includes('-A')) return 'git reset';
            return parameters.split(' ')
                .filter(file => filesUntracked.includes(file) || filesRemoved.includes(file))
                .reduce((cumulative, current) => cumulative + ' ' + current, 'git reset');
        case 'commit':
            return 'git reset --soft HEAD~1';
        case 'switch':
            return `git switch ${branch}`;
        case 'tag': {
            // git tag [-d|-f] tag_name [commit]
            const hasFlag = restParameters.some(param => param.startsWith('-') && param.length === 2);
            const commitPosition = hasFlag ? 2 : 1;
            if (restParameters.length < commitPosition) return '';
            if (output.startsWith('error: tag') || output.startsWith('fatal: tag')) return ''; // Tag not found

             // Parse `Deleted/Updated tag '$TAG' (was $COMMIT)`
            const backupCommit = output.startsWith('Deleted tag') || output.startsWith('Updated tag')
                ? output.trim().split(' ').slice(-1)[0].replace(')', '') : '';

            const commit = backupCommit || restParameters[commitPosition];
            if (commit && commit.length < 4) return ''; // if commit is less than 5 chars, git does not recongize it

            const tag = restParameters[commitPosition - 1];
            const invertDeleteFlag = restParameters.includes('-d') || (restParameters.includes('-f') && !!output.trim())
                ? '-f' : '-d';
            return `git tag ${[invertDeleteFlag, tag, commit].filter(op => op).join(' ')}`;
        }
        case 'mv': {
            // git mv file <pathspec>
            const moveArgs = restParameters.filter(param => !param.startsWith('-'));
            if (moveArgs.length != 2) return ''; // NOOP
            const destinationDirectory = moveArgs[1];
            let isDestinationDirectory = false;
            try {
                isDestinationDirectory = fs.statSync(destinationDirectory).isDirectory();
            } catch (err) {
                isDestinationDirectory = false;
            }

            let mvFormat;
            if (isDestinationDirectory) {
                // git move into folder
                const sourceDirectory = moveArgs[0].split('/').slice(0, -1).join('/');
                const file = moveArgs[0].split('/').slice(-1);
                mvFormat = [`${destinationDirectory}/${file}`, sourceDirectory];
            } else mvFormat = moveArgs.reverse(); // git rename file
            mvFormat = mvFormat.map(param => param.startsWith('/') ? param : `${workingDirectory}/${param}`);
            return `git mv ${mvFormat.join(' ')}`;
        }
        case 'rm':
            // git rm [-r|-q] --cached <file> 
            if (parameters.includes('--cached')) return parameters.split(' ')
                .filter(flag => !flag.startsWith('-'))
                .filter(file => !filesRemoved.includes(file) && !filesUntracked.includes(file) )
                .reduce((cumulative, current) => cumulative + ' ' + current, 'git add');
            else return gitCommand;
        // NOOP commands - return as is
        case 'bisect':
        case 'diff':
        case 'log':
        case 'show':
        case 'status':
        case 'branch':
            return gitCommand;

        // Unsupported - do not want to break remote server
        case 'pull':
        case 'fetch':
        case 'push':
        case 'merge':
        case 'rebase':
        case 'reset':
        default:
            return `echo "Cannot revert ${gitCommand}"`
    }
}