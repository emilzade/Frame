<template>
  <div class="pt-5">
    <div
      v-if="favouriteItems.length == 0"
      class="text-center pt-5 pb-5 gallery-header"
    >
      <h1 class="display-2">Favourites</h1>
      <p class="text-muted">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit,
        perspiciatis?
      </p>
    </div>
    <CRow v-else class="w-75 m-auto pt-5">
      <CCol
        class="col-3 text-center p-3"
        v-for="data in favouriteItems"
        :key="data.id"
      >
        <router-link
          :to="{
            name: 'GalleryItem',
            params: {
              id: data.id,
            },
          }"
          ><img class="w-100" :src="img" />
        </router-link>
        <router-link
          :to="{
            name: 'GalleryItem',
            params: {
              id: data.id,
            },
          }"
          >{{ data.name }}</router-link
        >
        <div
          @click="removeFromFavourites($event, data.id)"
          class="Heart-Animation heart-animation-active"
        ></div>
        <div
          class="d-flex justify-content-between align-items-center flex-column"
        >
          <div
            class="d-flex justify-content-between align-items-center w-100 px-3 py-1"
          >
            <VueMultiselect
              v-model="selectedSize"
              :options="data.sizes"
              :limit="1"
              :multiple="false"
              :close-on-select="true"
              :clear-on-select="false"
              :preserve-search="true"
              label="name"
              :placeholder="'Select Size'"
              track-by="name"
              @select="addSize"
              @remove="favouriteItems.selectedSize = null"
              class="w-75"
            />
            <div>{{ data.price }} ₼</div>
          </div>
          <CIcon
            @click="addToBasket(data.id)"
            :content="cilBasket"
            class="p-2 cursor-pointer"
            style="width: 40px; height: 40px"
          />
        </div>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import img from '../../assets/images/carousel-2.jpg'
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'
import { cilBasket } from '@coreui/icons'
export default {
  components: { VueMultiselect },
  data() {
    const favouriteItems = null
    const selectedSize = null
    return {
      favouriteItems,
      img,
      cilBasket,
      selectedSize,
    }
  },
  methods: {
    addSize: function (size) {
      this.favouriteItems.selectedSize = size
      console.log(size)
    },
    addToBasket: function (id) {
      let galleryItems = JSON.parse(localStorage.getItem('GalleryItems'))
      if (galleryItems == null) {
        galleryItems = []
      }
      if (galleryItems.some((x) => x.id == id)) {
        galleryItems.find((x) => x.id == id).quantity++
        localStorage.setItem('GalleryItems', JSON.stringify(galleryItems))
        console.log(galleryItems)
        console.log('quantity++', id)
      } else {
        galleryItems.push(this.favouriteItems.find((x) => x.id == id))
        localStorage.setItem('GalleryItems', JSON.stringify(galleryItems))
        console.log(galleryItems)
        console.log('push', id)
      }
      this.$store.commit('setTotalQuantityInBasket')
    },
    removeFromFavourites: function (event, id) {
      this.favouriteItems.splice(
        this.favouriteItems.indexOf(
          this.favouriteItems.find((x) => x.id == id),
        ),
        1,
      )
      localStorage.setItem(
        'FavouriteItems',
        JSON.stringify(this.favouriteItems),
      )
    },
  },
  beforeMount() {
    this.favouriteItems = JSON.parse(localStorage.getItem('FavouriteItems'))
    if (localStorage.getItem('FavouriteItems') == null) {
      this.favouriteItems = []
    }
    this.favouriteItems = this.favouriteItems.map((obj) => ({
      ...obj,
      quantity: 1,
      sizes: [
        {
          id: 1,
          name: '35x60',
        },
        {
          id: 2,
          name: '50x50',
        },
        {
          id: 3,
          name: '80x120',
        },
      ],
    }))

    console.log(this.favouriteItems)
  },
}
</script>
