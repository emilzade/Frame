<template>
  <div class="pt-5">
    <div class="pt-5">
      <CRow class="pt-5 w-75 m-auto">
        <CCol class="col-md-4 col-12 user-select-none">
          <swiper
            :loop="true"
            :spaceBetween="10"
            :thumbs="{ swiper: thumbsSwiper }"
            :modules="modules"
            style="
              width: 100%;
              height: 300px;
              margin-left: auto;
              margin-right: auto;
            "
            class="galleryItemSwiper2"
          >
            <swiper-slide
              ><img
                src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide
            ><swiper-slide
              ><img
                src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide
            ><swiper-slide
              ><img
                src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide
            ><swiper-slide
              ><img
                src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide
            ><swiper-slide
              ><img
                src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide
            ><swiper-slide
              ><img
                src="https://swiperjs.com/demos/images/nature-6.jpg" /></swiper-slide
            ><swiper-slide
              ><img
                src="https://swiperjs.com/demos/images/nature-7.jpg" /></swiper-slide
            ><swiper-slide
              ><img
                src="https://swiperjs.com/demos/images/nature-8.jpg" /></swiper-slide
            ><swiper-slide
              ><img
                src="https://swiperjs.com/demos/images/nature-9.jpg" /></swiper-slide
            ><swiper-slide
              ><img src="https://swiperjs.com/demos/images/nature-10.jpg"
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
              ><img
                src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide
            ><swiper-slide
              ><img
                src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide
            ><swiper-slide
              ><img
                src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide
            ><swiper-slide
              ><img
                src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide
            ><swiper-slide
              ><img
                src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide
            ><swiper-slide
              ><img
                src="https://swiperjs.com/demos/images/nature-6.jpg" /></swiper-slide
            ><swiper-slide
              ><img
                src="https://swiperjs.com/demos/images/nature-7.jpg" /></swiper-slide
            ><swiper-slide
              ><img
                src="https://swiperjs.com/demos/images/nature-8.jpg" /></swiper-slide
            ><swiper-slide
              ><img
                src="https://swiperjs.com/demos/images/nature-9.jpg" /></swiper-slide
            ><swiper-slide
              ><img src="https://swiperjs.com/demos/images/nature-10.jpg"
            /></swiper-slide>
          </swiper>
        </CCol>
        <CCol class="col-md-8 col-12 py-3 px-5" v-if="dbData.data[0]">
          <h1 class="roboto-regular">
            {{ dbData.data[0].itemName }}
          </h1>
          <h3 class="roboto-thin">{{ dbData.data[0].description }}</h3>
          <CRow class="py-5">
            <CCol class="col-2 fs-4 roboto-thin">
              <p>Price</p>
              <p>Size</p>
              <p>Quantity</p>
            </CCol>
            <CCol class="col-10 fs-4 roboto-thin">
              <p v-if="selectedSize">{{ selectedSize.price }} ₼</p>
              <div>
                <VueMultiselect
                  v-model="selectedSize"
                  :options="currentItem.prices"
                  :limit="1"
                  :multiple="false"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :preserve-search="true"
                  label="sizeId"
                  :placeholder="'Select Size'"
                  track-by="sizeId"
                  @select="selectSize"
                  @remove="dbData.selectedSize = null"
                  class="w-75"
                />
              </div>
              <div class="d-flex py-2 gap-1">
                <CFormInput class="w-75 border-0" :value="dbData.quantity" />
                <div class="d-flex w-25">
                  <div @click="minusQuantity" class="btn btn-light w-50">
                    <CIcon :content="cilMinus" />
                  </div>
                  <div @click="plusQuantity" class="btn btn-light w-50">
                    <CIcon :content="cilPlus" />
                  </div>
                </div>
              </div>
              <div
                v-if="dbData.selectedSize"
                @click="addToBasket"
                class="btn btn-dark w-75 my-2 p-1 text-center"
              >
                Add To Basket
              </div>
              <div
                v-else
                @click="addToBasket"
                class="btn btn-dark disabled w-75 my-2 p-1 text-center"
              >
                Add To Basket
              </div>
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
  },
  data() {
    const dbData = {
      data: [],
      date: '',
      length: 1,
      pageNumber: null,
      pageSize: null,
      sort: 'asc',
      success: true,
    }
    const dbSize = {
      data: [],
      date: '',
      length: 1,
      pageNumber: null,
      pageSize: null,
      sort: null,
      success: true,
    }
    const currentItem = ref()
    const thumbsSwiper = null
    const selectedSize = ref()
    return {
      dbData,
      dbSize,
      currentItem,
      thumbsSwiper,
      modules: [FreeMode, Thumbs],
      cilPlus,
      cilMinus,
      selectedSize,
    }
  },
  methods: {
    addToBasket: function () {
      //let id = this.dbData.id
      let galleryItems = JSON.parse(localStorage.getItem('GalleryItems'))
      if (galleryItems == null) {
        galleryItems = []
      }
      if (galleryItems.some((x) => x.id == this.dbData.id)) {
        galleryItems.filter((x) => x.id == this.dbData.id)[0].quantity =
          this.dbData.quantity +
          galleryItems.filter((x) => x.id == this.dbData.id)[0].quantity
        localStorage.setItem('GalleryItems', JSON.stringify(galleryItems))
      } else {
        galleryItems.push(this.dbData)
        localStorage.setItem('GalleryItems', JSON.stringify(galleryItems))
      }
      console.log(this.dbData)
      this.$store.commit('setTotalQuantityInBasket')
    },
    setThumbsSwiper: function (swiper) {
      this.thumbsSwiper = swiper
    },
    selectSize: function (size) {
      this.selectedSize = size
      console.log(size)
    },
    minusQuantity: function () {
      if (this.dbData.quantity > 1) {
        this.dbData.quantity--
      }
    },
    plusQuantity: function () {
      if (this.dbData.quantity < 5) {
        this.dbData.quantity++
      }
    },
    createNewModel: function () {
      this.dbData = {
        ...this.dbData,
        selectedSize: null,
      }
    },
  },
  beforeMount() {
    fetch(
      `http://upgradesolutions-001-site3.dtempurl.com/api/Item?id=${this.$route.params.id}&sort=asc`,
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        this.dbData = data
        if (data.length > 0) {
          this.currentItem = data.data[0]
          this.selectedSize = data.data[0].prices[0]
        }
      })
    fetch(`http://upgradesolutions-001-site3.dtempurl.com/api/Size?id=1`)
      .then((response) => response.json())
      .then((data) => {
        this.dbSize = data
        console.log(data)
      })
    //this.createNewModel()
  },
}
</script>
