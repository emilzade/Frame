<template>
  <div>
    <Navbar></Navbar>
    <div class="d-flex flex-column min-vh-100 bg-light">
      <router-view />
    </div>
  </div>
</template>
<script>
import Navbar from '../components/AdminNavbar.vue'
export default {
  name: 'DefaultLayout',
  components: {
    Navbar,
  },
}
</script>
