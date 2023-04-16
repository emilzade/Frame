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
            <CCol class="col-sm-3 col-4 fs-4 pt-1">Price </CCol>
            <CCol class="col-sm-9 col-8 fs-4 pb-1"
              >{{ selectedSize.price }} ₼
            </CCol>
            <CCol class="col-sm-3 col-4 fs-4 pt-1">Size </CCol>
            <CCol class="col-sm-9 col-8 fs-4 pb-1">
              <div>
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
                  @select="this.selectedSize = size"
                  class="w-50"
                />
              </div>
            </CCol>
            <CCol class="col-sm-3 col-4 fs-4 pt-1">Quantity</CCol>
            <CCol class="col-sm-9 col-8 fs-4 pb-1"
              ><div class="d-flex py-2 gap-1">
                <CFormInput
                  class="w-50 border border-secondary"
                  :value="quantity"
                />
                <div class="d-flex w-25">
                  <div @click="minusQuantity" class="btn btn-light w-50">
                    <CIcon :content="cilMinus" />
                  </div>
                  <div @click="plusQuantity" class="btn btn-light w-50">
                    <CIcon :content="cilPlus" />
                  </div>
                </div></div
            ></CCol>
            <CCol class="col-12 d-flex align-items-center">
              <div
                @click="addToBasket"
                class="btn btn-dark my-2 py-2 px-3 text-center"
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
    const dbData = {}
    const dbSize = {
      success: false,
      date: '',
      pageNumber: null,
      pageSize: null,
      length: 0,
      sort: null,
      data: [],
    }
    const quantity = 1
    const thumbsSwiper = null
    const selectedSize = ref()
    return {
      dbData,
      dbSize,
      quantity,
      thumbsSwiper,
      modules: [FreeMode, Thumbs],
      cilPlus,
      cilMinus,
      selectedSize,
    }
  },
  methods: {
    addToBasket: function () {
      var payload = {
        userId: 1,
        itemId: this.dbData.data[0].id,
        sizeId: this.selectedSize.sizeId,
        quantity: this.quantity,
      }
      console.log(payload)
    },
    setThumbsSwiper: function (swiper) {
      this.thumbsSwiper = swiper
    },
    selectSize: function (size) {
      console.log(size)
    },
    minusQuantity: function () {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    plusQuantity: function () {
      if (this.quantity < 5) {
        this.quantity++
      }
    },
  },
  beforeMount() {
    this.dbData = {
      success: true,
      date: '2023-04-16T11:12:48.876Z',
      pageNumber: 0,
      pageSize: 0,
      length: 0,
      sort: 'string',
      error: {
        code: 0,
        message: 'string',
      },
      data: [
        {
          id: 1,
          itemName: 'string',
          description: 'string',
          tags: ['string'],
          images: ['string'],
          prices: [
            {
              id: 1,
              itemId: 2,
              sizeId: 5,
              name: 'pricename',
              description: 'pricedesc',
              sizes: {
                id: 5,
                name: 'sizename',
                description: 'sicedesc',
                enabled: true,
              },
              price: 5,
              status: 0,
            },
            {
              id: 1,
              itemId: 2,
              sizeId: 6,
              name: 'pricename',
              description: 'pricedesc',
              sizes: {
                id: 6,
                name: 'sizename',
                description: 'sicedesc',
                enabled: true,
              },
              price: 10,
              status: 0,
            },
          ],
          status: {
            id: 0,
            name: 'string',
          },
        },
      ],
    }
    this.selectedSize = this.dbData.data[0].prices[0]
    // await fetch(
    //   `http://upgradesolutions-001-site3.dtempurl.com/api/Item?id=${this.$route.params.id}&sort=asc`,
    // )
    //   .then(async (response) => await response.json())
    //   .then(async (data) => {
    //     this.dbData = data
    //     console.log(this.dbData)
    //     this.selectedSize = this.dbData.data[0].prices[0]
    //   })
    //this.createNewModel()
  },
}
</script>
