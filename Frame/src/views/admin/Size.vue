<template>
  <div>
    <SizeModal
      :isVisible="isSizeModalActive"
      :data="dbData.data[0]"
      @update="updateSize"
      @closeModal="closeSizeModal"
    ></SizeModal>
    <div class="display-3 montserrat-medium text-center">
      Size {{ $route.params.id }}
    </div>
    <div class="d-flex justify-content-between px-5 py-4">
      <router-link :to="{ name: 'Sizes' }">
        <CButton color="secondary">
          <CIcon :content="cilArrowLeft" />
        </CButton>
      </router-link>
      <CButton @click="openUpdateSizeModal" color="success">Update</CButton>
    </div>
    <div v-if="dbData.data.length > 0" class="w-75 m-auto text-center">
      <div class="border p-3 fs-4">
        <span class="text-secondary">Id:</span> {{ dbData.data[0].id }}
      </div>
      <div class="border p-3 fs-4">
        <span class="text-secondary">Name:</span> {{ dbData.data[0].name }}
      </div>
      <div class="border p-3 fs-4">
        <span class="text-secondary">Description:</span>
        {{ dbData.data[0].description }}
      </div>
    </div>
  </div>
</template>
<script>
import { cilArrowLeft } from '@coreui/icons'
import SizeModal from '@/components/SizeModal.vue'
export default {
  name: 'Size',
  components: { SizeModal },
  data() {
    const dbData = {
      success: true,
      date: '2023-05-06T09:44:18.5311522+02:00',
      length: 1,
      data: [],
    }
    const isSizeModalActive = false
    return {
      dbData,
      cilArrowLeft,
      isSizeModalActive,
    }
  },
  computed: {
    token() {
      return this.$store.state.auth.token
    },
  },
  methods: {
    openUpdateSizeModal: function () {
      this.isSizeModalActive = true
    },
    closeSizeModal: function () {
      this.isSizeModalActive = false
    },
    updateSize: function (model) {
      this.actionName = 'update'
      fetch('https://rassmin.com/api/Size/UpdateSize', {
        method: 'Post',
        body: JSON.stringify(model),
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          this.isSizeModalActive = false
          this.isActionCompleted = true
          data.success == true
            ? (this.isActionSuccess = true)
            : (this.isActionSuccess = false)
          setTimeout(() => {
            this.isActionCompleted = false
          }, 2000)
        })
      console.log(this.token)
    },
  },
  beforeMount() {
    fetch(`https://rassmin.com/api/Size/GetSizes?id=${this.$route.params.id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => (this.dbData = data))
  },
}
</script>
