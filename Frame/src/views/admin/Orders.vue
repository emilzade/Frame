<template>
  <div>
    <div class="text-center display-5 montserrat-regular py-3">Orders</div>
    <div class="d-flex justify-content-between px-5">
      <router-link :to="{ name: 'AdminIndex' }">
        <CButton color="secondary">
          <CIcon :content="cilArrowLeft" />
        </CButton>
      </router-link>
      <CButton color="success">Create</CButton>
    </div>
    <CRow class="w-50 m-auto pt-4">
      <CCol
        class="border rounded col-12 py-3 my-1 d-flex justify-content-between"
        v-for="order in dbData.data"
        :key="order.id"
      >
        <div>{{ order.orderNumber }}</div>
        <EditButtonGroup :elementType="'Order'" :elementId="order.id" />
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
    const dbData = {
      success: true,
      date: '2023-06-26T09:59:30.2793659+02:00',
      length: 0,
      sort: 'asc',
      data: [],
    }
    return {
      dbData,
      cilArrowLeft,
    }
  },
  computed: {
    token() {
      return this.$store.state.auth.token
    },
  },
  methods: {
    getDbData() {
      this.dbData = fetch(`https://rassmin.com/api/Order/GetOrders`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          this.dbData = data
        })
    },
  },
  beforeMount() {
    this.getDbData()
  },
}
</script>
