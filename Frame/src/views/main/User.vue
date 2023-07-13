<template>
  <div class="pt-5">
    <div class="pt-5">
      <CRow class="w-75 m-auto pt-3">
        <CCol class="col-md-4 col-12 pt-5">
          <UserSideBar></UserSideBar>
        </CCol>
        <CCol class="col-md-8 col-12">
          <RouterView v-slot="{ Component }">
            <transition name="slide-fade" mode="out-in">
              <component :key="$route.path" :is="Component" />
            </transition>
          </RouterView>
        </CCol>
      </CRow>
      <LastViewed />
    </div>
  </div>
</template>
<script>
import UserSideBar from '@/components/UserProfile/UserSideBar.vue'
import LastViewed from '@/components/LastViewed.vue'
export default {
  name: 'User',
  components: { UserSideBar, LastViewed },
  data() {
    return {}
  },
  computed: {},
  methods: {},
  beforeMount() {},
}
</script>
