interface GitStatus {
    branch: string;
    filesAdded: string[],
    filesRemoved: string[],
}

export default function classification(gitCommand: string, gitStatus: GitStatus): String {
    if (!gitCommand.startsWith('git ')) return '';
    const [, operation, parameters] = gitCommand.split(' ', 2);
    switch(operation) {
        case 'checkout':
            return parameters.startsWith('-b') ? 'git branch -d' : 'git checkout';
        case 'add':
            // TODO: Include check for when the file has already been added, in which case it should be NOOP
            return 'git reset';
        case 'mv':
            return 'git mv';
        case 'rm':
            return '';
        case 'bisect':
            return 'git bisect';
        case 'diff':
            return 'git diff';
        case 'log':
            return 'git log';
        case 'show':
            return 'git show';
        case 'status':
            return 'git status';
        case 'commit':
            return 'git reset --soft HEAD~1';
        case 'merge':
            return '';
        case 'rebase':
            return '';
        case 'reset':
            return '';
        case 'switch':
            return 'git switch -';
        case 'tag':
            return 'git tag -d';
        case 'pull':
            return '';
        case 'fetch':
            return '';
        case 'push':
            return '';
        default:
            return ''; 
    }
}