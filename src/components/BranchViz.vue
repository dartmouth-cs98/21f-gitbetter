<template>
<div>
    <div v-for="direc in branches" :key="direc" >
        <button v-on:click="switchBranch(direc)"> {{ direc }} </button>
    </div>
    <!-- <vo-basic :key="this.branchData.name" :data="this.branchData" direction="l2r"></vo-basic> -->
    
</div>
</template>

<script>
// import { VoBasic } from "vue-orgchart";
// import "vue-orgchart/dist/style.min.css";

const pty = require("node-pty");
const ipc = require("electron").ipcRenderer

export default {
    name: 'BranchViz',
    components: {
        // VoBasic,
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
            })
        }
    },
    methods: {
        switchBranch(branch) {
            this.ptyProcess.write(`git checkout ${branch}\n`);
        }
    },
    mounted() {
        this.ptyProcess.on("data", (data) => {
            if (data.startsWith('bash') || data.startsWith('git')) return;
            this.branches = data.replaceAll('[m', '')
                .split('\n').slice(0, -1)
                .map(branch => branch.trim())
                .map(branch => {
                    if (branch.includes('=')) return branch.split('=')[1].trim();
                    // if (branch.startsWith('*')) return branch.substring(1);
                    return branch;
                })
            console.log("branch changed");
        });
        this.ptyProcess.write('git branch --no-color\n');
        ipc.on("terminal.toTerm", function(event, data) {
             console.log("world changes");
            if (
                data.includes('git branch')
                || data.includes('git switch')
                || data.includes('git checkout')
            ) this.ptyProcess.write('git branch --no-color\n');
        })
    },

    provide() {
        return { };
    },
}
</script>
