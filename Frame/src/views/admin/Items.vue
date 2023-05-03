<template>
  <div>
    <div class="display-3 dune-rise text-center">Items</div>
    <CreateItemModal
      :isVisible="isCreateItemModalActive"
      @create="submitCreateItem"
      @closeModal="closeCreateModal"
    ></CreateItemModal>

    <div class="d-flex justify-content-between px-5">
      <CButton color="secondary">
        <CIcon :content="cilArrowLeft" />
      </CButton>
      <CButton @click="createItem" color="success">Create</CButton>
    </div>
    <div>
      <CFormInput class="w-75 m-auto" placeholder="Search Here" type="search" />
    </div>
    <CRow class="w-50 m-auto pt-4">
      <CCol
        class="border rounded col-12 py-3 my-1 d-flex justify-content-between align-items-center"
        v-for="item in dbData.data"
        :key="item.id"
      >
        <div>{{ item.itemName }}</div>
        <EditButtonGroup :elementType="'Item'" :elementId="item.id" />
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EditButtonGroup from '@/components/EditButtonGroup.vue'
import CreateItemModal from '@/components/CreateItemModal.vue'
import { cilArrowLeft } from '@coreui/icons'
export default {
  name: 'Items',
  components: {
    EditButtonGroup,
    CreateItemModal,
  },
  data() {
    const dbData = {
      success: false,
      date: '',
      length: 1,
      sort: '',
      data: [],
    }
    const isCreateItemModalActive = false
    return {
      dbData,
      cilArrowLeft,
      isCreateItemModalActive,
    }
  },
  computed: {
    token() {
      return this.$store.state.auth.token
    },
  },
  methods: {
    getDbData: function () {
      fetch(`https://rassmin.com/api/Item/GetItems?sort=asc`)
        .then((response) => response.json())
        .then((data) => (this.dbData = data))
    },
    createItem: function () {
      this.isCreateItemModalActive = true
    },
    closeCreateModal: function () {
      this.isCreateItemModalActive = false
    },
    submitCreateItem: function (item) {
      fetch('https://rassmin.com/api/Item/CreateItem', {
        method: 'Post',
        body: item,
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
      console.log(item)
      console.log(this.token)
    },
  },
  beforeMount() {
    this.getDbData()
  },
}
</script>
