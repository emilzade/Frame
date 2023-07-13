<template>
  <div>
    <div
      class="mx-4 display-5 montserrat-regular mt-5"
      style="padding: 0 !important"
    >
      User Orders
    </div>
    <CRow class="p-2">
      <CCol v-if="isLoading">
        <ComponentLoader></ComponentLoader>
      </CCol>
      <CCol v-else>
        <CAccordion>
          <CAccordionItem
            v-for="(order, index) in dbData.data"
            :key="order.id"
            :item-key="index"
          >
            <CAccordionHeader @click="getOrderItems(order.id)">
              {{ order.orderNumber }}
            </CAccordionHeader>
            <CAccordionBody>
              <ComponentLoader v-if="isOrderItemLoading"></ComponentLoader>
              <CTable v-else responsive hover align="middle">
                <CTableHead>
                  <CTableHeaderCell
                    class="text-center"
                    v-for="(item, index) in thData"
                    :key="index"
                    role="button"
                    scope="col"
                    @click="sort(item.sortBy)"
                    >{{ item.title }}</CTableHeaderCell
                  >
                </CTableHead>
                <CTableBody>
                  <CTableRow
                    class="text-center"
                    v-for="(orderItem, index) in orderItems.data"
                    :key="index"
                  >
                    <CTableDataCell class="px-0">
                      <img
                        style="width: 80px"
                        src="../../assets/images/carousel-1.jpg"
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      {{ orderItem.itemName }}
                    </CTableDataCell>
                    <CTableDataCell>
                      {{ orderItem.statusName }}
                    </CTableDataCell>
                    <CTableDataCell>
                      {{ orderItem.singleItemPrice }}
                    </CTableDataCell>
                    <CTableDataCell>
                      {{ orderItem.quantity }}
                    </CTableDataCell>
                    <CTableDataCell>
                      {{ orderItem.totalPrice }}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import ComponentLoader from '@/components/ComponentLoader.vue'
import { cilInfo, cilCheck, cilX } from '@coreui/icons'
export default {
  name: 'UserOrders',
  components: { ComponentLoader },
  data() {
    const dbData = {
      success: true,
      date: '2023-06-26T09:59:30.2793659+02:00',
      length: 0,
      sort: 'asc',
      data: [],
    }
    const thData = [
      { id: 0, title: ' ', sortBy: null },
      { id: 1, title: 'Item Name', sortBy: 'itemName' },
      { id: 2, title: 'Status', sortBy: 'status' },
      { id: 3, title: 'Price', sortBy: 'price' },
      { id: 4, title: 'Quantity', sortBy: 'quantity' },
      { id: 4, title: 'Total Price', sortBy: 'quantity' },
    ]
    const orderItems = {
      success: true,
      date: '2023-06-26T09:59:30.2793659+02:00',
      data: [],
    }
    const isLoading = false
    const isOrderItemLoading = false
    return {
      dbData,
      thData,
      orderItems,
      isLoading,
      isOrderItemLoading,
      cilInfo,
      cilX,
      cilCheck,
    }
  },
  computed: {
    token() {
      return this.$store.state.auth.token
    },
  },
  methods: {
    getDbData() {
      this.isLoading = true
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
          this.isLoading = false
        })
    },
    getOrderItems(id) {
      console.log(id)
      this.isOrderItemLoading = true
      fetch(`https://rassmin.com/api/OrderItem/GetOrderItems?OrderId=${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          this.orderItems = data
          this.isOrderItemLoading = false
        })
    },
  },
  beforeMount() {
    this.getDbData()
  },
}
</script>
