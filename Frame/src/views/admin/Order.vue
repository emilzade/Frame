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
      <CTable striped hover responsive align="middle">
        <CTableHead>
          <CTableRow class="text-center">
            <CTableHeaderCell>Order Id</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Single Price</CTableHeaderCell>
            <CTableHeaderCell>Quantity</CTableHeaderCell>
            <CTableHeaderCell>Total Price</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
            <CTableHeaderCell>Operations</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow
            v-for="data in dbData.data"
            :key="data.id"
            class="text-center"
          >
            <CTableDataCell>{{ data.orderId }}</CTableDataCell>
            <CTableDataCell>{{ data.itemName }}</CTableDataCell>
            <CTableDataCell>{{ data.singleItemPrice }}</CTableDataCell>
            <CTableDataCell>{{ data.quantity }}</CTableDataCell>
            <CTableDataCell>{{ data.totalPrice }}</CTableDataCell>
            <CTableDataCell>
              <CBadge :color="getStatusBgColor(data.statusId)">
                {{ data.statusName }}
              </CBadge>
            </CTableDataCell>
            <CTableDataCell
              ><CButton color="success">a</CButton></CTableDataCell
            >
          </CTableRow>
        </CTableBody>
      </CTable>

      <div class="d-flex justify-content-center text-center pt-3">
        <pagination
          v-model="currentPage"
          :records="dbData.data.length"
          :per-page="perPageElementCount"
          @paginate="pageSelected"
          :options="{ chunk: 8 }"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { cilArrowLeft } from '@coreui/icons'
import Pagination from 'v-pagination-3'
export default {
  name: 'Order',
  components: { Pagination },
  data() {
    const dbData = {
      data: [],
      date: '',
      succes: false,
    }

    const perPageElementCount = 10
    const currentPage = 1
    return {
      dbData,
      cilArrowLeft,
      perPageElementCount,
      currentPage,
    }
  },
  computed: {
    token() {
      return this.$store.state.auth.token
    },
  },
  methods: {
    getDbData(pageId) {
      fetch(
        `https://rassmin.com/api/OrderItem/GetOrderItems?OrderId=${this.$route.params.id}&pageSize=${this.perPageElementCount}&pageNumber=${pageId}`,
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
    pageSelected: function (pageId) {
      this.getDbData(pageId)
    },
    getStatusBgColor: function (statusId) {
      switch (statusId) {
        case '-1':
          return 'danger'
        case '0':
          return 'primary'
        case '1':
          return 'success'
        case '2':
          return 'success'
        case '3':
          return 'success'
        case '4':
          return 'success'
        default:
          return 'secondary'
      }
    },
  },
  beforeMount() {
    this.getDbData(1)
    console.log(this.$route.params.id)
  },
}
</script>
