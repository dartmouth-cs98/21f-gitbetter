<template>
    <div className="options">
        <h2 class="subtitle">Recents...</h2>
        <div class="table-container">
            <table class="table is-striped" style="background-color:rgba(0,0,0,0);">
                <tbody>
                    <th> Command </th> <th> Description </th>
                    <tr v-for="com in recents.slice().reverse()" :key="com.id">
                        <td><code style="color:#363636">{{com.usage}}</code></td>
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
</style>