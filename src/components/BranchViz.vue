<template>
<div>
    <!-- <div v-for="direc in branches" :key="direc" >
        - {{ direc }}
    </div> -->
    <!-- {{this.branchData}} -->
    <button :click="this.onButtonClick">some ndsfdjsk</button>
    <vo-basic :key="this.branchData.name" :data="this.branchData" direction="l2r"></vo-basic>
    
</div>
</template>

<script>
import { VoBasic } from "vue-orgchart";
import "vue-orgchart/dist/style.min.css";

const pty = require("node-pty");
const ipc = require("electron").ipcRenderer

export default {
    name: 'BranchViz',
    components: {
        VoBasic,
    },
    data () {
        return {
            branches: ['firstName', 'somewhat_long_name_that_hopefully_exceeds_window_len', 'branch3'],
        }
    },
    methods: {
        createNode(name) {
            return { name }
        },
        onButtonClick() {
            console.log('force render')
            this.$set(this.branchData, 'children', this.branches.map(this.createNode))
        }
    },
    created () {
        this.branchData = {
            name: ' ',
            children: this.branches.map(branch => this.createNode(branch)),
        }
    },
    mounted() {
        var ptyProcess = pty.spawn('bash', [], {
            name: "xterm-color",
            cols: 80,
            rows: 100,
            cwd: process.CWD,
            env: process.env
        });

        ptyProcess.on("data", (data) => {
            if (data.startsWith('bash')) return;
            this.branches = data.replaceAll('[m', '')
                .split('\n').slice(0, -1)
                .map(branch => branch.trim())
                .map(branch => {
                    if (branch.includes('=')) return branch.split('=')[1].trim();
                    if (branch.startsWith('*')) return branch.substring(1);
                    return branch;
                })
            console.log("branch changed");
            this.$set(this.branchData, 'children', this.branches.map(this.createNode))
            this.$set(this.branchData, 'name', this.branches[0])
            window.irene = this.branchData;
            this.$nextTick(function () {
                console.log('branch diverged')
            })
        });
        ptyProcess.write('git branch --no-color\n');
        ipc.on("terminal.toTerm", function(event, data) {
            if (
                data.includes('git branch')
                || data.includes('git switch')
                || data.includes('git checkout')
            ) ptyProcess.write('git branch --no-color\n');
        })
    },

    provide() {
        return { };
    },
}
</script>
