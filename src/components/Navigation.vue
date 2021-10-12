<template>
  <div>
    <nav class="navbar">
      <router-link 
        class="nav-link" 
        v-for="routes in links" 
        v-bind:key="routes.id"
        :to="`${routes.page}`"
      >
        {{routes.text}}
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      links: [
        {
          id: 0,
          text: 'Home',
          page:'/'
        },
        {
          id: 1,
          text: 'Profile',
          page:'/profile'
        },
     
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar { 
  background-color: rgb(234, 234, 234);
  display: flex;
  justify-content: space-around;

  .nav-link {
    color: rgb(10, 10, 10);
    font-weight: 500;
    font-size: 20px;
    justify-self: flex-start;
    transition: all 0.3s;

    &:hover {
      color: rgb(0, 49, 147);
    }
  }
  

  .social-icon {
    align-self: flex-end !important;
  }
}
</style>