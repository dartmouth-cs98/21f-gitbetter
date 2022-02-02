const noop = '';

function checkoutB(command) {

    return command;
}

const reversals = {
    checkout: {
        default: (_, gitState) => `git checkout ${gitState.branch}`,
        options: {
            '-b': checkoutB,

        },
    },
};

export default function(command, gitState) {
    if (!command.startsWith('git')) return noop;
    const [, operation, options] = command.split(' ', 2);

    const reverseOperation = reversals[operation];
    if (!reverseOperation) return noop;
    if (!options) return reverseOperation.default(command, gitState);


    return ;
}
