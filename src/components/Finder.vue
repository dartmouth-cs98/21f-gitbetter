<template>
 
    <div class=finder>
        <Finder :tree="tree" />
        <div class=DoneButton>
            <DoneButton />
        </div>
    </div>

</template>

<script>
import DoneButton from './DoneButton.vue'
import { Finder } from "@jledentu/vue-finder";

export default {
    components: {
        DoneButton,
        Finder,
    },
    data() {
      return {
        tree: {



          id: "root",
          children: [
            {
              id: "fruits",
              label: "Fruits",
              children: [
                {
                  id: "apple",
                  label: "Apple",
                  selectable: false,
                },
                {
                  id: "banana",
                  label: "Banana",
                },
                {
                  id: "grape",
                  label: "Grape",
                  selected: true,
                },
                {
                  id: "lemon",
                  label: "Lemon",
                  selectable: false,
                },
                {
                  id: "orange",
                  label: "Orange",
                  selected: true,
                },
              ],
            },
            {
              id: "vegetables",
              label: "Vegetables",
              children: [
                {
                  id: "bean",
                  label: "Beans",
                },
                {
                  id: "carrot",
                  label: "Carrot",
                  selected: true,
                },
                {
                  id: "eggplant",
                  label: "Eggplant",
                  selectable: false,
                },
                {
                  id: "parsnip",
                  label: "Parsnip",
                },
                {
                  id: "tomato",
                  label: "Tomato",
                  selectable: false,
                },
              ],
            },
          ],
        },
      };
    },
  };

</script>




<style src="@jledentu/vue-finder/dist/vue-finder.css" />

