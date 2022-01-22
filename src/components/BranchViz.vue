<template>
<div>
    <div v-for="direc in branches" :key="direc" >
        - {{ direc }}
    </div>
</div>
</template>

<script>
const ipc = require("electron").ipcRenderer

export default {
    name: 'Branches',
    components: { },
    data () {
        return {
            branches: ['firstName', 'somewhat_long_name_that_hopefully_exceeds_window_len', 'branch3'],
        }
    },

    mounted() {
        ipc.send("terminal.toTerm", "git branch\n")
        ipc.on("terminal.incData", function(event, data) {
            console.log('ginger', event, data);
            window.irene = data;
        })
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
