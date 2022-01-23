<template>
<div>
    <div v-for="direc in branches" :key="direc" >
        - {{ direc }}
    </div>
    <div id="invisible" display="none" />
</div>
</template>

<script>
const pty = require("node-pty");

export default {
    name: 'Branches',
    components: { },
    data () {
        return {
            branches: ['firstName', 'somewhat_long_name_that_hopefully_exceeds_window_len', 'branch3'],
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
            this.branches = data.split('\n');
        });
        ptyProcess.write('git branch\n');
    },



    provide() {
        return { };
    },
    methods: {
        closeNavigation() {
        },
    }
}
</script>
