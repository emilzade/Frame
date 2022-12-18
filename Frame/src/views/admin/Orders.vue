<template>
  <div>
    <div class="display-3 dune-rise text-center">Orders</div>
    <CRow class="w-50 m-auto">
      <CCol
        class="border border-dark col-12 py-3"
        v-for="order in dbData"
        :key="order.id"
      >
        <div>{{ order.name }}</div>
      </CCol>
    </CRow>
  </div>
</template>
<script>
export default {
  data() {
    const dbData = []
    return {
      dbData,
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
