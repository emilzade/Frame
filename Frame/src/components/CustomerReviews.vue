<template>
  <div class="py-5">
    <CRow class="w-75 m-auto">
      <CCol
        v-for="item in dbData"
        :key="item.id"
        class="col-sm-4 col-12 text-center d-flex flex-column gap-2"
      >
        <div class="fw-bold">{{ item.name }}</div>
        <div>{{ item.comment }}</div>
        <div class="d-flex gap-2 justify-content-center">
          <CIcon
            v-for="item in item.stars.givenStars"
            :key="item"
            :content="cilStar"
            class="text-warning"
          />
          <CIcon
            v-for="item in item.stars.emptyStars"
            :key="item"
            :content="cilStar"
            class="text-dark"
          />
        </div>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import { cilStar } from '@coreui/icons'
export default {
  setup() {
    return {}
  },
  data() {
    const dbData = [
      {
        id: 1,
        name: 'Bruce Harmon',
        comment:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi reiciendis harum tempore quidem!',
        star: 3,
      },
      {
        id: 2,
        name: 'Betty Bryan',
        comment:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi reiciendis harum tempore quidem!',
        star: 1,
      },
      {
        id: 3,
        name: 'Francisco Stevenson',
        comment:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi reiciendis harum tempore quidem!',
        star: 4,
      },
    ]
    return {
      cilStar,
      dbData,
    }
  },
  methods: {
    createNewModelArray: function () {
      this.dbData = this.dbData.map((obj) => ({
        ...obj,
        stars: {
          givenStars: obj.star,
          emptyStars: 5 - obj.star,
        },
      }))
    },
  },
  beforeMount() {
    this.createNewModelArray()
  },
}
</script>
