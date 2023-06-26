<template>
  <div class="pt-5">
    <h1
      class="text-center pt-5 pb-5 gallery-header display-2 position-relative"
    >
      Favourites
    </h1>
    <div
      v-if="favouriteItems.data.length == 0"
      class="text-center pt-5 pb-5 gallery-header"
    >
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
          >{{ data.itemName }}</router-link
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
              v-model="data.selectedSize"
              :options="data.prices"
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
            <div>{{ data.selectedSize.price }} ₼</div>
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
import { ref } from 'vue'
import img from '../../assets/images/carousel-2.jpg'
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'
import { cilBasket } from '@coreui/icons'
import { mapGetters } from 'vuex'
export default {
  components: { VueMultiselect },
  data() {
    const favouriteItems = {
      data: [],
      date: '',
      success: false,
    }
    const selectedSize = ref()
    return {
      favouriteItems,
      img,
      cilBasket,
      selectedSize,
    }
  },
  computed: {
    ...mapGetters('auth', {
      getToken: 'getToken',
    }),
  },
  methods: {
    addSize: function (size) {
      console.log(size)
    },
    addToBasket: function () {},
    removeFromFavourites: function () {},
  },
  beforeMount() {
    fetch(`https://rassmin.com/api/Favorite/GetFavorites`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${this.getToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
  },
}
</script>
