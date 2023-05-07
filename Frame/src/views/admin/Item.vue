<template>
  <div>
    <SizeModal
      :isVisible="isSizeModalActive"
      :data="dbData.data[0]"
      @update="updateSize"
      @closeModal="closeSizeModal"
    ></SizeModal>
    <div class="display-3 dune-rise text-center">
      Item {{ $route.params.id }}
    </div>
    <div class="d-flex justify-content-between px-5 py-4">
      <router-link :to="{ name: 'Items' }">
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
        <span class="text-secondary">Name:</span> {{ dbData.data[0].itemName }}
      </div>
      <div class="border p-3 fs-4">
        <span class="text-secondary">Description:</span>
        {{ dbData.data[0].description }}
      </div>
      <div class="border p-3 fs-4">
        <span class="text-secondary">Created Date:</span>
        {{ dbData.data[0].createdDate }}
      </div>
      <div class="border p-3 fs-4">
        <span class="text-secondary">Modified Date:</span>
        {{ dbData.data[0].modifiedDate }}
      </div>
      <div class="py-3 fs-4">
        <div class="border d-flex">
          <div class="w-50 text-secondary">Description</div>
          <div class="w-50 text-secondary">Price</div>
        </div>
        <div
          class="border d-flex"
          v-for="price in dbData.data[0].prices"
          :key="price.sizeId"
        >
          <div class="w-50 border">
            {{ price.name }} - {{ price.description }}
          </div>
          <div class="w-50 border">{{ price.price }}</div>
        </div>
      </div>
      <div class="border p-3 fs-4">
        <span class="text-secondary">Images:</span>
        <div class="border border-dark d-flex">
          <div v-for="(image, index) in dbData.images" :key="index">
            <img :src="image" />
          </div>
        </div>
      </div>
      <div class="border p-3 fs-4">
        <span class="text-secondary">Tags</span>
        <div v-for="(tag, index) in dbData.tags" :key="index">{{ tag }}</div>
      </div>
      <div class="border p-3 fs-4">
        <span class="text-secondary">Status Id:</span>
        {{ dbData.data[0].statusId }}
      </div>
      <div class="border p-3 fs-4">
        <span class="text-secondary">Status:</span>
        {{ dbData.data[0].statusName }}
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
      console.log(model)
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
    fetch(
      `https://rassmin.com/api/Item/GetItems?id=${this.$route.params.id}&sort=asc`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${this.token}`,
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        this.dbData = data
        console.log(data)
      })
  },
}
</script>
