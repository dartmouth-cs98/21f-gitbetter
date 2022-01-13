<template>
    <div class=DoneButton>
        <DoneButton />
    </div>

</template>

<script>
import DoneButton from './DoneButton.vue'


export default {
    name: 'Finder',
    components: {
        DoneButton,
    },
    methods: {
        finder() {
            //dialog.showOpenDialogue();
        }
    }
}

</script>


<style src="@jledentu/vue-finder/dist/vue-finder.css" />

