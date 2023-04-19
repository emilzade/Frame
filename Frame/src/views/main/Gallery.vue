<template>
  <div class="pt-5">
    <div
      class="text-center pt-5 pb-5 gallery-header display-2 position-relative"
    >
      <p>Gallery</p>
      <Transition>
        <div
          style="left: 25%; right: 25%"
          class="display-2 m-auto position-absolute w-50 bottom-0"
        >
          <CFormInput placeholder="Search here..." />
        </div>
      </Transition>
    </div>
    <CRow class="pt-2 w-100 mx-0 align-items-start position-relative">
      <CCol class="col-md-2 col-12 pt-5 position-sticky top-0">
        <!--for phone or tablet-->
        <div class="d-md-none position-relative">
          <CIcon
            @click="isCategoriesExpanded = !isCategoriesExpanded"
            :content="cilMenu"
            style="width: 60px; height: 60px"
            class="border rounded fs-3 display-1 category-menu-icon"
          />
          <div
            class="text-center text-light"
            :class="{
              'category-menu-sm-passive': !isCategoriesExpanded,
              'category-menu-sm-active': isCategoriesExpanded,
            }"
          >
            <div class="pt-5">
              <p class="gallery-filter-element">Popular</p>
              <p class="gallery-filter-element">On Sale</p>
              <p class="gallery-filter-element">Newly Added</p>
            </div>
            <div>
              <p class="gallery-filter-element"><b>Categories</b></p>
              <p class="gallery-filter-element">Abstract</p>
              <p class="gallery-filter-element">Abstract</p>
              <p class="gallery-filter-element">Abstract</p>
              <p class="gallery-filter-element">Abstract</p>
              <p class="gallery-filter-element">Abstract</p>
              <p class="gallery-filter-element">Abstract</p>
              <p class="gallery-filter-element">Abstract</p>
            </div>
          </div>
        </div>
        <!--for pc-->
        <div class="d-none d-md-block text-center">
          <div class="pt-5">
            <p class="gallery-filter-element">Popular</p>
            <p class="gallery-filter-element">On Sale</p>
            <p class="gallery-filter-element">Newly Added</p>
          </div>
          <div>
            <p class="gallery-filter-element"><b>Categories</b></p>
            <p class="gallery-filter-element">Abstract</p>
            <p class="gallery-filter-element">Abstract</p>
            <p class="gallery-filter-element">Abstract</p>
            <p class="gallery-filter-element">Abstract</p>
            <p class="gallery-filter-element">Abstract</p>
            <p class="gallery-filter-element">Abstract</p>
            <p class="gallery-filter-element">Abstract</p>
          </div>
        </div>
        <div
          class="d-md-none overlay overlay-gallery-menu"
          v-if="isCategoriesExpanded"
          @click="isCategoriesExpanded = !isCategoriesExpanded"
        ></div>
      </CCol>
      <CCol class="col-md-10 col-12 p-5">
        <CRow>
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
              ><img class="w-100 rounded" :src="img" />
            </router-link>
            <div
              v-if="data.isFav"
              @click="addToFavourites($event, data.id)"
              class="Heart-Animation heart-animation-active"
            ></div>
            <div
              v-else
              @click="addToFavourites($event, data.id)"
              class="Heart-Animation animate"
            ></div>
            <router-link
              :to="{
                name: 'GalleryItem',
                params: {
                  id: data.id,
                },
              }"
              ><p>{{ data.itemName }}</p></router-link
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
<style lang="scss">
.single-gallery-item {
  transition: 0.4s;
  &:hover {
    background-color: #dadada;
  }
}
</style>
<script>
import { ref } from 'vue'
import img from '../../assets/images/carousel-2.jpg'
import { cilHeart, cilMenu } from '@coreui/icons'
import LastViewed from '../../components/LastViewed.vue'
import Pagination from 'v-pagination-3'

export default {
  components: { LastViewed, Pagination },
  data() {
    const isCategoriesExpanded = ref(false)
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

    const favouriteItems = JSON.parse(localStorage.getItem('FavouriteItems'))

    const page = 1
    const totalElementCount = 0
    const pageSize = 4
    return {
      img,
      cilHeart,
      cilMenu,
      isCategoriesExpanded,
      dbData,
      favouriteItems,
      page,
      totalElementCount,
      pageSize,
      //pageCount: 10,
    }
  },
  methods: {
    addToFavourites: function (event, id) {
      if (this.favouriteItems == null) {
        this.favouriteItems = []
      }
      if (this.favouriteItems.some((element) => element.id == id)) {
        this.dbData.data.filter((x) => x.id == id)[0].isFav = false
        this.favouriteItems.splice(
          this.favouriteItems.findIndex((el) => el.id == id),
          1,
        )
        localStorage.setItem(
          'FavouriteItems',
          JSON.stringify(this.favouriteItems),
        )
      } else {
        this.dbData.data.filter((x) => x.id == id)[0].isFav = true
        this.favouriteItems.push(this.dbData.data.filter((x) => x.id == id)[0])
        localStorage.setItem(
          'FavouriteItems',
          JSON.stringify(this.favouriteItems),
        )
      }
    },
    pageSelected: function (pageId) {
      this.page = pageId
      fetch(
        `https://rassmin.com/api/Item?pageNumber=${pageId}&pageSize=${this.pageSize}&sort=asc`,
      )
        .then((response) => response.json())
        .then((data) => {
          this.dbData = data
          this.dbData.data = data.data.map((obj) => ({
            ...obj,
            isFav: false,
          }))
          let tempFavItems = []
          if (this.favouriteItems == null) {
            this.favouriteItems = []
          }
          console.log(this.favouriteItems)
          console.log(this.dbData)
          for (let i = 0; i < this.favouriteItems.length; i++) {
            tempFavItems.push(this.dbData.data[0])
            tempFavItems[i].isFav = true
          }
        })
    },
  },
  beforeMount() {
    fetch(
      `https://rassmin.com/api/Item?pageNumber=1&pageSize=${this.pageSize}&sort=asc`,
    )
      .then((response) => response.json())
      .then((data) => {
        this.dbData = data
        this.dbData.data = data.data.map((obj) => ({
          ...obj,
          isFav: false,
        }))
        let tempFavItems = []
        if (this.favouriteItems == null) {
          this.favouriteItems = []
        }
        console.log(this.favouriteItems)
        console.log(this.dbData)
        for (let i = 0; i < this.favouriteItems.length; i++) {
          tempFavItems.push(this.dbData.data[0])
          tempFavItems[i].isFav = true
        }
      })
  },
  mounted() {
    // console.log(this.favouriteItems)
    // console.log(this.dbData)
    // console.log(tempFavItems)
  },
}
</script>
