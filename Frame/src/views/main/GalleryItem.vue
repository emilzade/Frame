<template>
  <div class="pt-5">
    <div class="pt-5">
      <ComponentLoader v-if="isGalleryItemDataLoading"></ComponentLoader>
      <CRow v-else class="pt-5 w-75 m-auto">
        <CCol class="col-md-4 col-12 user-select-none">
          <swiper
            :loop="true"
            :spaceBetween="10"
            :thumbs="{ swiper: thumbsSwiper }"
            :modules="modules"
            style="
              width: 100%;
              height: 400px;
              margin-left: auto;
              margin-right: auto;
            "
            class="galleryItemSwiper2"
          >
            <swiper-slide
              v-for="(image, index) in dbData.data[0].images"
              :key="index"
              ><img :src="image"
            /></swiper-slide>
          </swiper>
          <swiper
            @swiper="setThumbsSwiper"
            :loop="true"
            :spaceBetween="10"
            :slidesPerView="4"
            :freeMode="true"
            :watchSlidesProgress="true"
            :modules="modules"
            class="galleryItemSwiper"
            style="
              width: 100%;
              height: 20%;
              margin-left: auto;
              margin-right: auto;
            "
          >
            <swiper-slide
              v-for="(image, index) in dbData.data[0].images"
              :key="index"
              ><img :src="image"
            /></swiper-slide>
          </swiper>
        </CCol>
        <CCol class="col-md-8 col-12 py-3 px-5" v-if="dbData.data[0]">
          <h1 class="">
            {{ dbData.data[0].itemName }}
          </h1>
          <h3 class="">{{ dbData.data[0].description }}</h3>
          <CRow class="py-5 justify-content-end">
            <CCol class="col-sm-3 col-4 fs-4 pt-1 fs-5">Price </CCol>
            <CCol class="col-sm-9 col-8 fs-4 pb-1"
              >{{ selectedSize.price }} ₼
            </CCol>
            <CCol class="col-sm-3 col-12 fs-4 pt-1 fs-5">Size </CCol>
            <CCol class="col-sm-9 col-12 fs-4 pb-1">
              <div class="">
                <VueMultiselect
                  v-model="selectedSize"
                  :options="dbData.data[0].prices"
                  :limit="1"
                  :multiple="false"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :allow-empty="false"
                  :placeholder="'Select Size'"
                  :selectLabel="''"
                  :deselectLabel="''"
                  label="name"
                  track-by="price"
                  @select="selectSize"
                  class="w-100 vue-m-select"
                />
              </div>
            </CCol>
            <CCol class="col-sm-3 col-12 fs-4 pt-1 fs-5">Count</CCol>
            <CCol class="col-sm-9 col-12 fs-4 pb-1">
              <div class="w-100 d-flex border">
                <CButton
                  @click="minusCount"
                  class="m-0"
                  style="border-radius: 3px 0px 0px 3px; box-shadow: none"
                >
                  <CIcon :content="cilMinus" />
                </CButton>
                <CFormInput
                  style="border-radius: 0px; border: 0"
                  type="text"
                  :value="count"
                />
                <CButton
                  @click="plusCount"
                  class="m-0"
                  style="border-radius: 0px 3px 3px 0px; box-shadow: none"
                >
                  <CIcon :content="cilPlus" />
                </CButton>
              </div>
            </CCol>
            <CCol
              v-if="typeof token == 'string'"
              class="col-sm-9 col-12 d-flex align-items-center"
            >
              <div
                @click="addToBasket"
                class="bg-dark text-light w-100 my-2 py-2 px-3 text-center"
              >
                Add To Basket
              </div>
            </CCol>
            <CCol v-else class="col-sm-9 col-12 d-flex align-items-center">
              <router-link class="w-100" :to="{ name: 'Login' }">
                <div class="bg-dark text-light my-2 py-2 px-3 text-center">
                  Login to use basket
                </div>
              </router-link>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </div>
    <LastViewed />
  </div>
</template>
<style lang="scss">
$dark: #041721;
$darkgreen: #1b4645;
$green: #276967;
$yellow: #f9bd24;
$orange: #f68800;
.multiselect__option--highlight {
  background-color: rgb(234, 234, 234) !important;
  color: black;
}
.multiselect__option--selected.multiselect__option--highlight {
  background-color: rgb(186, 186, 186) !important;
}
.vue-m-select > * {
  border-radius: 0px !important;
  background-color: white;
}
.add-basket-btn {
  background-color: $dark;
  color: white;
  transition: 0.2s;
  cursor: pointer;
}
.add-basket-btn:hover {
  transform: scale(1.1);
}
.swiper-slide {
  text-align: center;
  font-size: 18px;

  background-size: cover;
  background-position: center;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.galleryItemSwiper2 {
  height: 80%;
}
.galleryItemSwiper {
  height: 20%;
  box-sizing: border-box;
  padding: 10px 0;
}
.galleryItemSwiper .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}
.galleryItemSwiper .swiper-slide-thumb-active {
  opacity: 1;
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
<script>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode, Thumbs } from 'swiper'
import VueMultiselect from 'vue-multiselect'
import { cilPlus, cilMinus } from '@coreui/icons'
import LastViewed from '../../components/LastViewed.vue'
import ComponentLoader from '@/components/ComponentLoader.vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'vue-multiselect/dist/vue-multiselect.css'

export default {
  components: {
    Swiper,
    SwiperSlide,
    VueMultiselect,
    LastViewed,
    ComponentLoader,
  },
  data() {
    const dbData = {
      success: false,
      date: '',
      pageNumber: null,
      pageCount: null,
      pageSize: null,
      length: 0,
      sort: null,
      data: [],
    }
    const isGalleryItemDataLoading = false
    const dbSize = {}
    const count = 1
    const thumbsSwiper = null
    const selectedSize = ref()
    return {
      dbData,
      dbSize,
      count,
      thumbsSwiper,
      modules: [FreeMode, Thumbs],
      cilPlus,
      cilMinus,
      selectedSize,
      isGalleryItemDataLoading,
    }
  },
  computed: {
    user() {
      return JSON.parse(this.$store.state.auth.userProfile)
    },
    token() {
      return this.$store.state.auth.token
    },
  },
  methods: {
    addToBasket: function () {
      var payload = {
        userId: this.user.id,
        item_PriceId: this.selectedSize.item_PriceId,
        count: this.count,
      }
      console.log(payload)
      fetch('https://rassmin.com/api/Cart/AddItemToCart', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
    },
    setThumbsSwiper: function (swiper) {
      this.thumbsSwiper = swiper
    },
    selectSize: function (size) {
      this.selectedSize = size
      console.log(size)
    },
    minusCount: function () {
      if (this.count > 1) {
        this.count--
      }
    },
    plusCount: function () {
      if (this.count < 5) {
        this.count++
      }
    },
    getDbData() {
      this.isGalleryItemDataLoading = true
      fetch(
        `https://rassmin.com/api/Item/GetItems?id=${this.$route.params.id}&sort=asc`,
      )
        .then(async (response) => await response.json())
        .then(async (data) => {
          this.dbData = data
          console.log(this.dbData)
          this.selectedSize = this.dbData.data[0].prices[0]
          this.isGalleryItemDataLoading = false
        })
    },
  },
  beforeMount() {
    this.getDbData()
    //this.createNewModel()
  },
}
</script>
