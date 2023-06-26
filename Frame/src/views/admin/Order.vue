<template>
  <div class="">
    <div class="text-center display-5 montserrat-regular py-3">
      Order - {{ this.$route.params.id }}
    </div>
    <div class="d-flex justify-content-between px-5">
      <router-link :to="{ name: 'Orders' }">
        <CButton color="secondary">
          <CIcon :content="cilArrowLeft" />
        </CButton>
      </router-link>
    </div>
    <div class="w-75 m-auto">
      <CTable striped hover responsive>
        <CTableHead>
          <CTableRow class="text-center"
            ><CTableHeaderCell>Order Id</CTableHeaderCell
            ><CTableHeaderCell>Single Price</CTableHeaderCell
            ><CTableHeaderCell>Quantity</CTableHeaderCell
            ><CTableHeaderCell>Total Price</CTableHeaderCell
            ><CTableHeaderCell>Status</CTableHeaderCell
            ><CTableHeaderCell>Operations</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow
            v-for="data in dbData.data"
            :key="data.id"
            class="text-center"
          >
            <CTableDataCell>{{ data.orderId }}</CTableDataCell>
            <CTableDataCell>{{ data.singleItemPrice }}</CTableDataCell>
            <CTableDataCell>{{ data.quantity }}</CTableDataCell>
            <CTableDataCell>{{ data.totalPrice }}</CTableDataCell>
            <CTableDataCell>{{ data.statusId }}</CTableDataCell>
            <CTableDataCell
              ><CButton color="success">a</CButton></CTableDataCell
            >
          </CTableRow>
        </CTableBody>
      </CTable>
    </div>
  </div>
</template>
<script>
import { cilArrowLeft } from '@coreui/icons'
export default {
  name: 'Order',
  data() {
    const dbData = {
      data: [],
      date: '',
      succes: false,
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
      fetch(
        `https://rassmin.com/api/OrderItem/GetOrderItems?OrderId=${this.$route.params.id}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${this.token}`,
          },
        },
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          this.dbData = data
        })
    },
  },
  beforeMount() {
    this.getDbData()
    console.log(this.$route.params.id)
  },
}
</script>
