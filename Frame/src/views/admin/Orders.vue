<template>
  <div>
    <div class="display-3 montserrat-medium text-center">Orders</div>
    <div class="d-flex justify-content-between px-5">
      <CButton color="secondary">
        <CIcon :content="cilArrowLeft" />
      </CButton>
      <CButton color="success">Create</CButton>
    </div>
    <CRow class="w-50 m-auto pt-4">
      <CCol
        class="border rounded col-12 py-3 my-1 d-flex justify-content-between"
        v-for="order in dbData"
        :key="order.id"
      >
        <div>{{ order.name }}</div>
        <EditButtonGroup />
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EditButtonGroup from '@/components/EditButtonGroup.vue'
import { cilArrowLeft } from '@coreui/icons'
export default {
  name: 'Orders',
  components: {
    EditButtonGroup,
  },
  data() {
    const dbData = []
    return {
      dbData,
      cilArrowLeft,
    }
  },
  methods: {
    getDbData() {
      this.dbData = [
        {
          id: 1,
          name: 'Order1',
          price: 10,
        },
        {
          id: 2,
          name: 'Order2',
          price: 20,
        },
        {
          id: 3,
          name: 'Order3',
          price: 30,
        },
        {
          id: 4,
          name: 'Order4',
          price: 40,
        },
      ]
    },
  },
  beforeMount() {
    this.getDbData()
  },
}
</script>
