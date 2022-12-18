<template>
  <div class="pt-5">
    <div
      class="text-center pt-5 pb-5 gallery-header display-2 position-relative"
    >
      <p>Gallery</p>
      <Transition>
        <div
          style="left: 25%; right: 25%"
          class="display-2 w-100 m-auto position-absolute w-sm-50 w-75 bottom-0"
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
            v-for="data in dbData"
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
              ><p>{{ data.name }}</p></router-link
            >
            <p>{{ data.price }} ₼</p>
          </div>
        </CRow>
      </CCol>
    </CRow>
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
export default {
  components: { LastViewed },
  data() {
    const isCategoriesExpanded = ref(false)
    const dbData = [
      {
        id: 1,
        name: 'Yenə o bağ olaydı1',
        price: 11,
      },
      {
        id: 2,
        name: 'Yenə o bağ olaydı2',
        price: 24,
      },
      {
        id: 3,
        name: 'Yenə o bağ olaydı3',
        price: 37,
      },
      {
        id: 4,
        name: 'Yenə o bağ olaydı4',
        price: 41,
      },
      {
        id: 5,
        name: 'Yenə o bağ olaydı5',
        price: 54,
      },
      {
        id: 6,
        name: 'Yenə o bağ olaydı6',
        price: 64,
      },
      {
        id: 7,
        name: 'Yenə o bağ olaydı7',
        price: 74,
      },
      {
        id: 8,
        name: 'Yenə o bağ olaydı8',
        price: 84,
      },
      {
        id: 9,
        name: 'Yenə o bağ olaydı9',
        price: 94,
      },
      {
        id: 10,
        name: 'Yenə o bağ olaydı10',
        price: 104,
      },
    ]
    const favouriteItems = JSON.parse(localStorage.getItem('FavouriteItems'))
    return {
      img,
      cilHeart,
      cilMenu,
      isCategoriesExpanded,
      dbData,
      favouriteItems,
    }
  },
  methods: {
    addToFavourites: function (event, id) {
      if (this.favouriteItems == null) {
        this.favouriteItems = []
      }
      if (this.favouriteItems.some((element) => element.id == id)) {
        this.dbData.filter((x) => x.id == id)[0].isFav = false
        this.favouriteItems.splice(
          this.favouriteItems.findIndex((el) => el.id == id),
          1,
        )
        localStorage.setItem(
          'FavouriteItems',
          JSON.stringify(this.favouriteItems),
        )
      } else {
        this.dbData.filter((x) => x.id == id)[0].isFav = true
        this.favouriteItems.push(this.dbData.filter((x) => x.id == id)[0])
        localStorage.setItem(
          'FavouriteItems',
          JSON.stringify(this.favouriteItems),
        )
      }
    },
    createNewModelArray: function () {
      this.dbData = this.dbData.map((obj) => ({
        ...obj,
        isFav: false,
      }))
    },
  },
  beforeMount() {
    this.createNewModelArray()
  },
  mounted() {
    let tempFavItems = []
    if (this.favouriteItems == null) {
      this.favouriteItems = []
    }
    for (let i = 0; i < this.favouriteItems.length; i++) {
      tempFavItems.push(
        this.dbData.find((element) => element.id == this.favouriteItems[i].id),
      )
      tempFavItems[i].isFav = true
    }
    console.log(this.favouriteItems)
    console.log(this.dbData)
    console.log(tempFavItems)
  },
}
</script>
