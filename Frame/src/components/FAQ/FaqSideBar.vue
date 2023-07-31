<template>
  <div class="">
    <router-link
      v-for="data in sidebarData"
      :key="data.id"
      class="nav-link p-2"
      :to="{ name: data.routeName }"
      active-class="faq-sidebar-active"
      exact
    >
      {{ data.title }}
    </router-link>
  </div>
</template>
<style>
.faq-sidebar-active {
  background-color: black;
  color: white;
}
</style>
<script>
export default {
  name: 'FaqSideBar',
  data() {
    const sidebarData = [
      {
        id: 1,
        title: 'Selection',
        routeName: 'FaqSelection',
      },
      {
        id: 2,
        title: 'Shipping',
        routeName: 'FaqShipping',
      },
      {
        id: 3,
        title: 'Collections',
        routeName: 'FaqCollections',
      },
      {
        id: 4,
        title: 'Campaigns',
        routeName: 'FaqCampaigns',
      },
    ]
    return {
      sidebarData,
    }
  },
}
</script>
