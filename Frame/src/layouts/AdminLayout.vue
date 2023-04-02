<template>
  <SideBar />
  <div class="content">
    <Navbar />
    <div style="min-height: 100vh" class="bg-light">
      <router-view />
    </div>
  </div>
</template>
<script>
import Navbar from '../components/AdminNavbar.vue'
import SideBar from '../components/AdminSideBar.vue'
export default {
  name: 'DefaultLayout',
  components: {
    Navbar,
    SideBar,
  },
}
</script>
