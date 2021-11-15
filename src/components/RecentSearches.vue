<template>
    <div className="options">
        <h2 class="subtitle">Recents...</h2>
        <div class="table-container">
            <table class="table is-striped" style="background-color:rgba(0,0,0,0);">
                <tbody>
                    <th style="color: white"> Command </th> 
                    <th style="color: white"> Description </th>
                    <tr v-for="com in recents.slice().reverse()" :key="com.id">
                        <td><code style="background-color:#272727;color:#FFFFFF">{{com.usage}}</code></td>
                        <td>{{com.command}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
// Credit for options and command descriptions goes to GitExplorer open source code 
// Source: https://github.com/summitech/gitexplorer
export default {
  name: "RecentSearches",
  props: {
      recents: Array,
  },
};
</script>
<style scoped> 
.table-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.table.is-striped tbody tr:not(.is-selected):nth-child(even) {
    background-color: rgba(0,0,0,0);
}
.options {
    margin-bottom: 2.25rem;
}
h2, th, tbody {
    color: white;
}

</style>