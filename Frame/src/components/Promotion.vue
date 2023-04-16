<template>
  <div
    class="dune-rise d-flex flex-wrap justify-content-center align-items-center my-3 py-3 px-5 bg-dark text-light"
  >
    <div
      class="d-flex flex-column align-items-center justify-content-center text-center gap-2 w-75"
    >
      <div class="display-5">Sale 30%</div>
      <div class="">FOR NATURE PHOTOS</div>
    </div>
    <router-link
      :to="{
        name: 'Collection',
        params: {
          id: 1,
        },
      }"
    >
      <div
        class="px-4 text-light d-flex justify-content-center align-items-center gap-2"
      >
        <Button
          text="See More"
          color="noneToLight"
          alterText="See More"
        ></Button>
      </div>
    </router-link>
  </div>
</template>
<script>
import { cilMediaPlay } from '@coreui/icons'
import Button from './Button.vue'
export default {
  components: { Button },
  data() {
    return {
      cilMediaPlay,
    }
  },
}
</script>
