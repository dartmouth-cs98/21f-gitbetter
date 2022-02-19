const fs = require('fs-extra');

// Regex not supported (e.g. git add file*)
export default function classification(gitCommand, gitStatus) {
    if (!gitCommand.startsWith('git ')) return '';
    const [, operation, ...restParameters] = gitCommand.split(' ');
    const parameters = gitCommand.split(' ').slice(2).join(' ');
    const {
        branch, filesRemoved, filesUntracked, workingDirectory,
    } = gitStatus;
    switch(operation) {
        case 'checkout':
            return parameters.startsWith('-b') ? 'git branch -d' : 'git checkout';
        case 'add': 
            // No change to filesAdded, filesModified that have already been added before
            if (parameters.includes('--all') || parameters.includes('-A')) return 'git reset';
            return parameters.split(' ')
                .filter(file => filesUntracked.includes(file) || filesRemoved.includes(file))
                .reduce((cumulative, current) => cumulative + ' ' + current, 'git reset');
        case 'rm':
            return '';
        case 'commit':
            return 'git reset --soft HEAD~1';
        case 'merge':
            return '';
        case 'rebase':
            return '';
        case 'reset':
            return '';
        case 'switch':
            return `git switch ${branch}`;
        case 'tag':
            return 'git tag -d';
        case 'mv': {
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
        case 'bisect':
        case 'diff':
        case 'log':
        case 'show':
        case 'status':
            return gitCommand;

        // Unsupported - do not want to break remote server
        case 'pull':
        case 'fetch':
        case 'push':
        default:
            return ''; 
    }
}