export default function classification(gitCommand, {
    branch, filesAdded, filesModified, filesRemoved, filesUntracked,
}) {
    if (!gitCommand.startsWith('git ')) return '';
    const [, operation, parameters] = gitCommand.split(' ', 2);
    switch(operation) {
        case 'checkout':
            return parameters.startsWith('-b') ? 'git branch -d' : 'git checkout';
        case 'add': {
            // TODO: Include check for when the file has already been added, in which case it should be NOOP
            const file = parameters; // process parameters: ie file name, --all
            if (['--all', '-A'].includes(file)) return `git rm ${filesUntracked}`
            filesAdded, filesModified, filesRemoved;
            return 'git rm';
        }
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