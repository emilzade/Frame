<template>
  <div>
    <div class="display-3 dune-rise text-center">Items</div>
    <div class="d-flex justify-content-between px-5">
      <CButton color="secondary">
        <CIcon :content="cilArrowLeft" />
      </CButton>
      <CButton color="success">Create</CButton>
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
import { cilArrowLeft } from '@coreui/icons'
export default {
  name: 'Items',
  components: {
    EditButtonGroup,
  },
  data() {
    const dbData = {
      success: false,
      date: '',
      length: 1,
      sort: '',
      data: [],
    }
    return {
      dbData,
      cilArrowLeft,
    }
  },
  methods: {
    getDbData: function () {
      fetch(`https://rassmin.com/api/Item/GetItems?sort=asc`)
        .then((response) => response.json())
        .then((data) => (this.dbData = data))
    },
  },
  beforeMount() {
    this.getDbData()
  },
}
</script>
