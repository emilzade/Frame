<template>
  <div style="background-color: white !important" class="">
    <Transition name="slide">
      <PreLoader v-if="isPreLoaderActive" />
    </Transition>
    <Navbar></Navbar>
    <div class="d-flex flex-column w-100">
      <RouterView v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
          <component :key="$route.path" :is="Component" />
        </transition>
      </RouterView>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import PreLoader from '@/components/PreLoader2.vue'
export default {
  name: 'DefaultLayout',
  components: {
    Navbar,
    Footer,
    PreLoader,
  },
  data() {
    const isPreLoaderActive = false
    return {
      isPreLoaderActive,
    }
  },
  methods: {},
  mounted() {
    // this.isPreLoaderActive = true
    // setTimeout(() => {
    //   this.isPreLoaderActive = false
    // }, 100)
  },
}
</script>
<style>
@font-face {
  font-family: 'montserrat-thin';
  src: url(../styles/fonts/Montserrat-Thin.ttf);
}
@font-face {
  font-family: 'montserrat-light';
  src: url(../styles/fonts/Montserrat-Regular.ttf);
}
@font-face {
  font-family: 'montserrat-regular';
  src: url(../styles/fonts/Montserrat-Light.ttf);
}
@font-face {
  font-family: 'montserrat-medium';
  src: url(../styles/fonts/Montserrat-Medium.ttf);
}
@font-face {
  font-family: 'montserrat-bold';
  src: url(../styles/fonts/Montserrat-Bold.ttf);
}
</style>
