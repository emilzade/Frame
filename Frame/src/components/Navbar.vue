<template>
  <div
    class="w-100 align-items-center justify-content-between px-5 navbar-container"
    :class="{
      'navbar-container-hidden': isScrolled,
      'navbar-container-visible': !isScrolled,
    }"
  >
    <router-link
      :to="{
        name: 'Index',
      }"
    >
      <div class="logo-div">
        <img class="w-100" :src="logo" />
      </div>
    </router-link>
    <div class="w-25 d-flex justify-content-between navbar-items-container">
      <router-link
        class="text-decoration-none navbar-item"
        :to="{
          name: 'Gallery',
        }"
      >
        <span>Gallery</span>
      </router-link>
      <router-link
        class="text-decoration-none navbar-item"
        :to="{
          name: 'Collections',
        }"
      >
        <span>Collections</span>
      </router-link>
      <router-link
        class="text-decoration-none navbar-item"
        :to="{
          name: 'Gallery',
        }"
      >
        <CIcon
          @click="this.$store.commit('changeSearchActiveState')"
          :content="cilSearch"
        />
      </router-link>
      <router-link
        class="text-decoration-none navbar-item"
        :to="{
          name: 'Favourites',
        }"
      >
        <CIcon :content="cilHeart" />
      </router-link>
      <router-link
        class="text-decoration-none navbar-item"
        :to="{
          name: 'Checkout',
        }"
      >
        <div v-if="$store.state.elementCountInBasket == 0">
          <CIcon :content="cilBasket" />
        </div>
        <div v-else>
          <CIcon class="text-success" :content="cilBasket" />
        </div>
      </router-link>
      <router-link
        v-if="role == 'admin'"
        class="text-decoration-none navbar-item"
        :to="{
          name: 'AdminIndex',
        }"
      >
        <CIcon :content="cilUser" />
      </router-link>
    </div>
  </div>
</template>
<style lang="scss">
$dark: #041721;
$darkgreen: #1b4645;
$green: #276967;
$yellow: #f9bd24;
$orange: #f68800;

.navbar-container {
  background-color: $green;
  display: flex;
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  z-index: 100;
  transition: 0.5s;
}
.navbar-container-hidden {
  top: -100%;
}
.navbar-container-visible {
  display: flex;
  top: 0;
}
.navbar-search-item {
  z-index: 1;
  color: black;
  font-family: munich;
  transition: 0.2s;
}
.navbar-item {
  padding: 5px;
  z-index: 1;
  position: relative;
  color: black;
  font-family: munich;
  transition: 0.2s;
  font-size: 1.1rem;
}
.navbar-item::before {
  background: $yellow;
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.1px;
  width: 0%;
  margin: auto;
  transform-origin: right;
  transition: 0.2s;
  z-index: -1;
}
.navbar-item:hover::before {
  width: 100%;
  transform-origin: left;
}
.navbar-item:hover {
  color: $yellow;
}
.logo-div {
  width: 100px;
}
</style>
<script>
import logo from '../assets/images/logo.png'
import { cilHeart, cilBasket, cilUser, cilSearch } from '@coreui/icons'
export default {
  name: 'Navbar',
  components: {},
  data() {
    const role = localStorage.getItem('role')
    const isBasketHasItem = false
    const limitPosition = 100
    const isScrolled = false
    const lastPosition = 0
    return {
      logo,
      cilHeart,
      cilBasket,
      cilUser,
      cilSearch,
      role,
      isBasketHasItem,
      limitPosition,
      isScrolled,
      lastPosition,
    }
  },
  watch: {
    $route() {
      this.$store.commit('changeSearchActiveState')
    },
  },
  methods: {
    handleScroll() {
      if (
        this.lastPosition < window.scrollY &&
        this.limitPosition < window.scrollY
      ) {
        this.isScrolled = true
        // move up!
      }

      if (this.lastPosition > window.scrollY) {
        this.isScrolled = false
        // move down
      }

      this.lastPosition = window.scrollY
      // this.scrolled = window.scrollY > 250;
    },
    searchClicked: function () {
      this.$router.push({ name: 'Gallery' })
    },
  },
  beforeMount() {
    this.$store.commit('setTotalQuantityInBasket')
    window.addEventListener('scroll', this.handleScroll)
    //console.log(this.$store.state.elementCountInBasket)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
