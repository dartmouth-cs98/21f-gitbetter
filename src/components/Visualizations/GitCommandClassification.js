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
        case '--help':
        case 'help':
            return { action: ACTIONS.NOOP };
        case 'checkout':
            return { action: ACTIONS.NORMAL };
        case 'branch':
            return {action: parameters.includes('-D') ? ACTIONS.ADVISORY : ACTIONS.NORMAL, note: 'WARNING: This will delete all changes on your new branch.'}
        case 'add':
            if (parameters.includes('--all') || parameters.includes('-A')) return {action: ACTIONS.DESTRUCTIVE};
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
            return {action: ACTIONS.DESTRUCTIVE};
        case 'rebase':
            return {action: ACTIONS.DESTRUCTIVE};
        case 'reset':
            if (!parameters.length) return {action: ACTIONS.DESTRUCTIVE};
            return {action: ACTIONS.ADVISORY, note: 'WARNING: Your changes will no longer be tracked by git.'};
        case 'switch':
            return {action: ACTIONS.NORMAL};
        case 'tag':
            return {action: ACTIONS.NORMAL};
        case 'pull':
        case 'fetch':
        case 'push':
            return {action: ACTIONS.DESTRUCTIVE};
        default:
            return {action: ACTIONS.DESTRUCTIVE};
    }
}
