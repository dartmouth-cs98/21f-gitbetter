export default function classification(gitCommand, gitStatus) {
    if (!gitCommand.startsWith('git ')) return '';
    const [, operation, ] = gitCommand.split(' ');
    const parameters = gitCommand.split(' ').slice(2).join(' ');
    const {
        branch, filesAdded, filesModified, filesRemoved, filesUntracked,
    } = gitStatus;
    console.log(branch, filesAdded, filesModified, filesRemoved, filesUntracked);
    switch(operation) {
        case 'checkout':
            return parameters.startsWith('-b') ? 'git branch -d' : 'git checkout';
        case 'add': 
            // Regex not supported (e.g. git add file*)
            // No change to filesAdded, filesModified that have already been added before
            if (parameters.includes('--all') || parameters.includes('A')) return 'git reset';
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
            filesAdded, filesModified;
            return `git switch ${branch}`;
        case 'tag':
            return 'git tag -d';
        case 'pull':
            return '';
        case 'fetch':
            return '';
        case 'push':
            return '';
        case 'mv':
        case 'bisect':
        case 'diff':
        case 'log':
        case 'show':
        case 'status':
            return gitCommand;
        default:
            return ''; 
    }
}