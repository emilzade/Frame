<template>
  <div style="background-color: white" class="pt-5">
    <div
      class="text-center pt-5 pb-5 gallery-header display-2 position-relative"
    >
      <p>Gallery</p>
      <CFormInput
        class="w-75 m-auto"
        placeholder="Enter name, tag or anything..."
      />
    </div>
    <CRow class="pt-2 container m-auto align-items-start position-relative">
      <CCol v-if="isGalleryDataLoading">
        <ComponentLoader></ComponentLoader>
      </CCol>

      <CCol v-else class="col-12 p-5">
        <CRow class="">
          <div
            v-for="data in dbData.data"
            :key="data.id"
            class="col-md-3 col-sm-4 col-6 p-2 d-flex flex-column align-items-center rounded single-gallery-item"
          >
            <router-link
              :to="{
                name: 'GalleryItem',
                params: {
                  id: data.id,
                },
              }"
              ><img style="border: 3px solid black" class="w-100" :src="img" />
            </router-link>
            <div
              v-if="data.isFav"
              @click="addToFavourites(data.id)"
              class="Heart-Animation heart-animation-active"
            ></div>
            <div
              v-else
              @click="addToFavourites(data.id)"
              class="Heart-Animation animate"
            ></div>
            <router-link
              :to="{
                name: 'GalleryItem',
                params: {
                  id: data.id,
                },
              }"
              ><p class="text-secondary">
                <em>{{ data.itemName }}</em>
              </p></router-link
            >
            <p>{{ data.prices[0].price }} ₼</p>
          </div>
        </CRow>
      </CCol>
    </CRow>
    <div
      class="d-flex flex-column justify-content-center align-items-center w-50 m-auto gap-2 text-center pt-3"
    >
      <pagination
        v-model="page"
        :records="dbData.length"
        :per-page="pageSize"
        @paginate="pageSelected"
        :options="{
          chunk: 6,
        }"
      />
      <!-- <pagination
        v-model="page"
        :records="pageCount * perPage"
        :per-page="10"
        @paginate="pageSelected"
        :options="{
          chunk: 6,
          texts: { count: `showing page ${1} out of ${pageCount}` },
        }"
      /> -->
    </div>
    <LastViewed />
  </div>
</template>
<style>
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-leave-to {
  transform: translateY(100%);
}
</style>
<script>
import { ref } from 'vue'
import { mapGetters } from 'vuex'
import img from '../../assets/images/carousel-2.jpg'
import { cilHeart, cilMenu } from '@coreui/icons'
import LastViewed from '../../components/LastViewed.vue'
import Pagination from 'v-pagination-3'
import ComponentLoader from '@/components/ComponentLoader.vue'
export default {
  components: { LastViewed, Pagination, ComponentLoader },

  data() {
    const isCategoriesExpanded = ref(false)
    const isGalleryDataLoading = false
    const dbData = {
      success: true,
      date: '',
      pageNumber: 0,
      pageSize: 0,
      length: 0,
      sort: '',
      error: {
        code: 0,
        message: '',
      },
      data: [],
    }
    const page = 1
    const totalElementCount = 0
    const pageSize = 4
    return {
      img,
      cilHeart,
      cilMenu,
      isCategoriesExpanded,
      dbData,
      page,
      totalElementCount,
      pageSize,
      isGalleryDataLoading,
      //pageCount: 10,
    }
  },
  computed: {
    ...mapGetters('auth', {
      getToken: 'getToken',
      getUserProfile: 'getUserProfile',
    }),
    searchInputData() {
      return this.$store.state.searchInputData
    },
    dynamicSearchQuery() {
      return (pageId) =>
        `https://rassmin.com/api/Item/GetItems?pageNumber=${pageId}&pageSize=${this.pageSize}&sort=asc`
    },
  },
  methods: {
    addToFavourites: function () {},
    pageSelected: function (pageId) {
      this.getDbData(pageId)
    },
    getDbData: function (pageId) {
      this.isGalleryDataLoading = true
      console.log(this.dynamicSearchQuery(pageId))
      fetch(this.dynamicSearchQuery(pageId))
        .then((response) => response.json())
        .then((data) => {
          this.dbData = data
          this.isGalleryDataLoading = false
          console.log(this.dbData)
        })
    },
  },
  beforeMount() {
    this.getDbData(1)
  },
  mounted() {
    console.log(this.$store.state.searchInputData)
    // console.log(this.dbData)
    // console.log(tempFavItems)
  },
}
</script>
