<template>
<div class="branch-container" :key="this.commandCount">
    {{this.runCommand()}}
    <div v-for="direc in branches" :key="direc" >
        <button class="branch-button" v-on:click="switchBranch(direc)"> {{ direc }} </button>
    </div>
    
</div>
</template>

<script>
const pty = require("node-pty");

export default {
    name: 'BranchViz',
    props: {
        command: String,
        commandCount: Number
    },
    data () {
        return {
            branches: ['firstName', 'somewhat_long_name_that_hopefully_exceeds_window_len', 'branch3'],
            ptyProcess: pty.spawn('bash', [], {
                name: "xterm-color",
                cols: 80,
                rows: 100,
                cwd: process.CWD,
                env: process.env
            }),
            count: 0
        }
    },
    methods: {
        switchBranch(branch) {
            this.ptyProcess.write(`git checkout ${branch} \n`);
            this.ptyProcess.write('git branch --no-color\n');
        },
        runCommand() {
            if (this.commandCount > this.count && (
              this.command.startsWith('git branch') 
              || this.command.startsWith('git checkout') 
              || this.command.startsWith('git switch'))) {
                this.ptyProcess.write('git branch --no-color\n');
                this.count = this.commandCount
            }
        }
    },
    mounted() {
        this.ptyProcess.on("data", (data) => {
            if (data.startsWith('bash') || data.startsWith('git')) return;
            this.branches = data.replaceAll('[m', '')
                .split('\n').slice(0, -1)
                .map(branch => branch.trim())
                .map(branch => branch.includes('=') ? branch.split('=')[1].trim() : branch)
        });
        this.ptyProcess.write('git branch --no-color\n');
    }
}
</script>
<style lang="scss" scoped>
.branch-container {
    width: 100%;
    text-align: center;
}
.branch-button {
    background-color: #272323;
    border-radius: 10px;
    padding: 2px 10px;
    margin: 1px;
    color: white;
    border-color: #272323;
}
.branch-button:hover {
    cursor: pointer;
    background-color: #4CAF50;
}
</style>