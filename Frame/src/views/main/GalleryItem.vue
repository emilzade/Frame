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
          <h1 class="">
            {{ dbData.data[0].itemName }}
          </h1>
          <h3 class="">{{ dbData.data[0].description }}</h3>
          <CRow class="py-5">
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
                  label="name"
                  track-by="price"
                  @select="selectSize"
                  class="w-100"
                />
              </div>
            </CCol>
            <CCol class="col-sm-3 col-12 fs-4 pt-1 fs-5">Count</CCol>
            <CCol class="col-sm-9 col-12 fs-4 pb-1"
              ><div class="d-flex py-2 gap-1">
                <CFormInput class="w-50 border" :value="count" />
                <div class="d-flex w-50">
                  <div @click="minusCount" class="btn btn-light border w-50">
                    <CIcon :content="cilMinus" />
                  </div>
                  <div @click="plusCount" class="btn btn-light border w-50">
                    <CIcon :content="cilPlus" />
                  </div>
                </div></div
            ></CCol>
            <CCol
              v-if="typeof token == 'string'"
              class="col-12 d-flex align-items-center"
            >
              <div
                @click="addToBasket"
                class="btn btn-dark my-2 py-2 px-3 text-center"
              >
                Add To Basket
              </div>
            </CCol>
            <CCol v-else class="col-12 d-flex align-items-center">
              <div class="btn btn-dark my-2 py-2 px-3 text-center">
                Login to use basket
              </div>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </div>
    <FromCollection />
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
import FromCollection from '@/components/FromCollection.vue'
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
    FromCollection,
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
  },
  beforeMount() {
    fetch(
      `https://rassmin.com/api/Item/GetItems?id=${this.$route.params.id}&sort=asc`,
    )
      .then(async (response) => await response.json())
      .then(async (data) => {
        this.dbData = data
        console.log(this.dbData)
        this.selectedSize = this.dbData.data[0].prices[0]
      })
    //this.createNewModel()
  },
}
</script>
