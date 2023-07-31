<template>
  <router-link
    v-for="data in sidebarData"
    :key="data.id"
    class="nav-item nav-link p-2"
    :to="{ name: data.routeName }"
    active-class="user-sidebar-active"
    exact
  >
    {{ data.title }}
  </router-link>
</template>
<style>
.user-sidebar-active {
  background-color: black;
  color: white;
}
</style>
<script>
export default {
  name: 'UserSideBar',
  data() {
    const sidebarData = [
      {
        id: 1,
        title: 'Account',
        routeName: 'UserAccount',
      },
      {
        id: 2,
        title: 'Orders',
        routeName: 'UserOrders',
      },
    ]
    return {
      sidebarData,
    }
  },
}
</script>
