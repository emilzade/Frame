<template>
  <div class="container pt-5 pb-5">
    <div class="text-center py-5">
      <h1 class="text-dark montserrat-bold w-50 m-auto">FAQ</h1>
      <p class="text-secondary montserrat-regular">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>
    <CRow class="container pt-3 pb-5">
      <CCol class="col-md-4 col-12">
        <FaqSideBar></FaqSideBar>
      </CCol>
      <CCol class="col-md-8 col-12">
        <RouterView v-slot="{ Component }">
          <transition name="slide-fade" mode="out-in">
            <component :key="$route.path" :is="Component" />
          </transition>
        </RouterView>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import FaqSideBar from '@/components/FAQ/FaqSideBar.vue'
export default {
  name: 'Faq',
  components: { FaqSideBar },
}
</script>
