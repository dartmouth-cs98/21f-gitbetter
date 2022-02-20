export const ACTIONS = {
    NOOP: 'NOOP', // git status, log, branch
    NORMAL: 'NORMAL', // git add, commit, push, checkout, stash
    ADVISORY: 'ADVISORY', // git rm, (read from note)
    DESTRUCTIVE: 'DESTRUCTIVE', // git branch -D, 
};

export default function classification(gitCommand) {
    if (!gitCommand.startsWith('git ')) return { action: ACTIONS.NOOP };
    const [, operation, parameters] = gitCommand.split(' ', 2);
    switch(operation) {
        case 'checkout':
            return { action: parameters?.startsWith('-b') ? ACTIONS.NORMAL : ACTIONS.NOOP };
        case 'add':
            // TODO: Include check for when the file has already been added, in which case it should be NOOP
            return {action: ACTIONS.NORMAL};
        case 'mv':
            return {action: ACTIONS.NORMAL};
        case 'rm':
            return {action: ACTIONS.DESTRUCTIVE};
        case 'bisect':
            return {action: ACTIONS.NOOP};
        case 'diff':
            return {action: ACTIONS.NOOP};
        case 'log':
            return {action: ACTIONS.NOOP};
        case 'show':
            return {action: ACTIONS.NOOP};
        case 'status':
            return {action: ACTIONS.NOOP};
        case 'commit':
            return {action: ACTIONS.NORMAL};
        case 'merge':
            return {action: ACTIONS.ADVISORY};
        case 'rebase':
            return {action: ACTIONS.ADVISORY};
        case 'reset':
            return {action: ACTIONS.ADVISORY};
        case 'switch':
            return {action: ACTIONS.NORMAL};
        case 'tag':
            return {action: ACTIONS.NORMAL};
        case 'pull':
            return {action: ACTIONS.ADVISORY};
        case 'fetch':
            return {action: ACTIONS.ADVISORY};
        case 'push':
            return {action: ACTIONS.DESTRUCTIVE};
        default:
            return {action: ACTIONS.ADVISORY};
    }
}
