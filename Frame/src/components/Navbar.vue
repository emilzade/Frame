<template>
  <MDBNavbar
    expand="lg"
    style="z-index: 100; box-shadow: 0 0 0 0"
    class="navbar-container d-flex"
    :class="{
      'navbar-container-hidden': isScrolled,
      'navbar-container-visible': !isScrolled,
    }"
    container
  >
    <MDBNavbarBrand href="#" class="">
      <router-link
        :to="{
          name: 'Index',
        }"
        ><div class="logo-div">
          <img class="w-100" :src="logo" />
        </div>
      </router-link>
    </MDBNavbarBrand>
    <MDBNavbarToggler
      class=""
      @click="isNavbarCollapse = !isNavbarCollapse"
      target="#navbarSupportedContent"
    ></MDBNavbarToggler>
    <MDBCollapse
      class="d-flex justify-content-end align-items-center"
      v-model="isNavbarCollapse"
      id="navbarSupportedContent"
    >
      <MDBNavbarNav
        class="mb-2 mb-lg-0 p-3 align-items-center px-5 gap-2"
        style="margin: 0px !important"
      >
        <MDBNavbarItem to="#" active>
          <router-link
            class="text-decoration-none navbar-item"
            :to="{
              name: 'Gallery',
            }"
          >
            <span>Gallery</span>
          </router-link>
        </MDBNavbarItem>
        <MDBNavbarItem href="#">
          <router-link
            class="text-decoration-none navbar-item"
            :to="{
              name: 'Collections',
            }"
          >
            <span>Collections</span>
          </router-link>
        </MDBNavbarItem>
        <MDBNavbarItem href="#">
          <router-link
            class="text-decoration-none navbar-item"
            :to="{
              name: 'Favourites',
            }"
          >
            <CIcon :content="cilHeart" />
          </router-link>
        </MDBNavbarItem>
        <MDBNavbarItem href="#">
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
        </MDBNavbarItem>
        <MDBNavbarItem href="#">
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
        </MDBNavbarItem>
      </MDBNavbarNav>
      <!-- Search form -->
    </MDBCollapse>
  </MDBNavbar>
  <!-- <div
    class="w-100 align-items-center justify-content-between px-5 navbar-container border border-dark"
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
  </div> -->
</template>
<style lang="scss">
$dark: #181d31;
$darkgreen: #1b4645;
$green: #678983;
$yellow: #f0e9d2;
$orange: #e6ddc4;

.navbar-container {
  display: flex;
  width: 100%;
  z-index: 100;
  //background-color: rgba(0, 0, 0, 0.084);
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
  color: $yellow;
  transition: 0.2s;
}
.navbar-item {
  z-index: 1;
  position: relative;
  color: $green;
  transition: 0.2s;
  font-size: 1.1rem;
}
.navbar-item::before {
  background: $darkgreen;
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
  color: $darkgreen;
}
.logo-div {
  width: 100px;
}
@media screen and (max-width: 1000px) {
  .navbar-container {
    background-color: white;
    position: static;
  }
}
@media screen and (min-width: 1000px) {
  .navbar-container {
    position: fixed;
    left: 0;
    right: 0;
    //background-color: rgba(0, 0, 0, 0.084);
    transition: 0.5s;
    background-color: transparent;
  }
}
</style>
<script>
import logo from '../assets/images/logo.png'
//import ref from 'vue'
import { cilHeart, cilBasket, cilUser, cilSearch } from '@coreui/icons'
import 'mdb-vue-ui-kit/css/mdb.min.css'
import {
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
} from 'mdb-vue-ui-kit'
export default {
  name: 'Navbar',
  components: {
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse,
  },
  data() {
    const role = localStorage.getItem('role')
    const isBasketHasItem = false
    const limitPosition = 100
    const isScrolled = false
    const lastPosition = 0

    const isNavbarCollapse = false
    const isDropdownActive = false
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
      isNavbarCollapse,
      isDropdownActive,
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
