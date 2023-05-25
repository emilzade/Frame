<template>
  <div
    class="border rounded p-3 d-flex flex-column align-items-center align-items-center"
  >
    <div
      v-for="(textData, index) in text"
      :key="index"
      class="border rounded p-3 text-center"
    >
      {{ textData }}
    </div>
    <div @click="refresh" class="btn btn-lg btn-primary m-auto">
      <CIcon height="20" width="20" :content="cilReload" />
    </div>
  </div>
</template>
<script>
import { cilReload } from '@coreui/icons'
export default {
  name: 'RefreshButton',
  props: ['text'],
  data() {
    return {
      cilReload,
    }
  },
  methods: {
    refresh: function () {
      this.$emit('refresh')
    },
  },
}
</script>
