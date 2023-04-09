<template>
  <div class="">
    <Navbar></Navbar>
    <div class="d-flex flex-column bg-light w-100">
      <router-view />
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
export default {
  name: 'DefaultLayout',
  components: {
    Navbar,
    Footer,
  },
}
</script>
<style>
@font-face {
  font-family: 'munich';
  src: url(../styles/fonts/MunichRegular-Y8x4.ttf);
}
@font-face {
  font-family: 'dune-rise';
  src: url(../styles/fonts/Dune_Rise.otf);
}
@font-face {
  font-family: 'roboto-thin';
  src: url(../styles/fonts/Roboto-Thin.ttf);
}
@font-face {
  font-family: 'roboto-regular';
  src: url(../styles/fonts/Roboto-Regular.ttf);
}
@font-face {
  font-family: 'roboto-bold';
  src: url(../styles/fonts/Roboto-Bold.ttf);
}
</style>
