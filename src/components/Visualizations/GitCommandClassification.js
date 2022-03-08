export const ACTIONS = {
    NOOP: 'NOOP', // git status, log, branch
    NORMAL: 'NORMAL', // git add, commit, push, checkout, stash
    ADVISORY: 'ADVISORY', // git rm, (read from note)
    DESTRUCTIVE: 'DESTRUCTIVE', // git branch -D, 
};

export default function parseGit(gitCommand) {
    const ACTIONS_WEIGHT = {
        [ACTIONS.NOOP]: 0,
        [ACTIONS.NORMAL]: 1,
        [ACTIONS.ADVISORY]: 2,
        [ACTIONS.DESTRUCTIVE]: 3,
    };

    return gitCommand.split(/&&|\n|\|\||;/).map(cmd => classification(cmd.trim())).reduce((cumm, curr) => (
        ACTIONS_WEIGHT[curr.action] < ACTIONS_WEIGHT[cumm.action] ? cumm : curr
    ), { action: ACTIONS.NOOP});
}

function classification(gitCommand) {
    if (!gitCommand.startsWith('git ')) return { action: ACTIONS.NOOP };
    const [, operation, ...parameters] = gitCommand.split(' ');
    switch(operation) {
        case 'checkout':
            return { action: ACTIONS.NORMAL };
        case 'branch':
            return {action: parameters.includes('-D') ? ACTIONS.ADVISORY : ACTIONS.NORMAL, note: 'WARNING: This will delete all changes on your new branch.'}
        case 'add':
            // TODO: Include check for when the file has already been added, in which case it should be NOOP
            return {action: ACTIONS.NORMAL};
        case 'mv':
            return {action: ACTIONS.NORMAL};
        case 'rm':
            if (parameters.includes('--cached')) return {action: ACTIONS.ADVISORY, note: 'WARNING: This file will no longer be tracked by git.'};
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
            if (!parameters) return {action: ACTIONS.DESTRUCTIVE};
            return {action: ACTIONS.ADVISORY, note: 'WARNING: Your changes will no longer be tracked by git.'};
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
