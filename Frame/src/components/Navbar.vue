<template>
  <MDBNavbar
    expand="lg"
    style="z-index: 100; box-shadow: 0 0 0 0"
    class="navbar-container d-flex p-0"
    :class="{
      'navbar-container-hidden': isScrolled,
      'navbar-container-visible': !isScrolled,
      'navbar-container-bg-dark': lastPosition > 200,
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
        class="mb-2 mb-lg-0 p-0 align-items-center px-5 gap-1 d-flex"
        style="margin: 0px !important"
      >
        <MDBNavbarItem active class="gallery-nav-text p-3">
          <router-link
            class="text-decoration-none navbar-item"
            :to="{
              name: 'Gallery',
            }"
          >
            <span
              @mouseover="isGalleryHoverMenuActive = true"
              class="p-2 rounded"
              >Gallery</span
            >
          </router-link>
          <GalleryHoverMenu
            :right="$store.state.isSearchActive ? 655 : 455"
          ></GalleryHoverMenu>
        </MDBNavbarItem>
        <MDBNavbarItem class="p-3">
          <router-link
            class="text-decoration-none navbar-item"
            :to="{
              name: 'Collections',
            }"
          >
            <span>Collections</span>
          </router-link>
        </MDBNavbarItem>
        <MDBNavbarItem class="p-3">
          <div class="d-flex justify-content-between align-items-center">
            <input
              style="height: 30px"
              class="border d-block search-input"
              v-model="searchText"
              @keyup="searchByInput"
              :class="{
                'search-active': $store.state.isSearchActive,
                'search-disable': !$store.state.isSearchActive,
              }"
            />
            <div
              style="width: 30px; height: 30px"
              @click="search"
              :class="{
                'bg-light invert-100': $store.state.isSearchActive,
                'bg-light': !!$store.state.isSearchActive,
              }"
              class="d-flex justify-content-center align-items-center p-2"
            >
              <img :src="searchIcon" style="width: 1rem" />
            </div>
          </div>
        </MDBNavbarItem>
        <MDBNavbarItem class="p-3">
          <router-link
            class="text-decoration-none navbar-item"
            :to="{
              name: 'Favourites',
            }"
          >
            <img
              class="d-none d-lg-block"
              style="width: 1rem"
              :src="favoritesIcon"
            />
            <p class="d-lg-none">Favorites</p>
          </router-link>
        </MDBNavbarItem>
        <MDBNavbarItem class="p-3 checkout-nav-icon">
          <router-link
            class="text-decoration-none navbar-item"
            :to="{
              name: 'Checkout',
            }"
          >
            <p class="d-lg-none">Checkout</p>
          </router-link>
          <div class="nav-item position-relative d-none d-lg-block">
            <img :src="shopIcon" style="width: 1rem" />
            <div
              class="bg-danger text-light px-1 rounded-circle"
              style="
                font-size: 12px;
                transform: translate(10px, 10px);
                position: absolute;
                top: 0;
              "
            >
              {{ $store.state.elementCountInBasket }}
            </div>
          </div>
          <MiniCheckout
            :basketData="basketData"
            :right="95"
            :isAuthenticated="
              isAuthenticated || getToken != null ? true : false
            "
          ></MiniCheckout>
        </MDBNavbarItem>
        <MDBNavbarItem class="user-nav-icon p-3">
          <router-link
            class="text-decoration-none navbar-item d-lg-none"
            :to="{
              name:
                isAuthenticated || getToken != null ? 'UserAccount' : 'Login',
            }"
          >
            <p v-if="isAuthenticated || getToken != null">Profile</p>
            <p v-else>Login</p>
          </router-link>
          <div class="position-relative user-select-none d-none d-lg-block">
            <img :src="profileIcon" style="width: 1.2rem" />
          </div>
          <MiniUserSign
            :userData="getUserProfile"
            :isAuthenticated="
              isAuthenticated || getToken != null ? true : false
            "
            @logout="logOut"
          ></MiniUserSign>
        </MDBNavbarItem>
        <!-- <template v-else>
          <MDBNavbarItem>
            <router-link
              class="text-decoration-none navbar-item"
              :to="{
                name: 'Login',
              }"
            >
              Login
            </router-link>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <router-link
              class="text-decoration-none navbar-item"
              :to="{
                name: 'Register',
              }"
            >
              Register
            </router-link>
          </MDBNavbarItem>
        </template> -->
      </MDBNavbarNav>
      <!-- Search form -->
    </MDBCollapse>
  </MDBNavbar>
</template>
<style lang="scss">
$dark: #181d31;
$darkgreen: #1b4645;
$green: #678983;
$yellow: #f0e9d2;
$orange: #e6ddc4;

.search-input {
  &:focus {
    outline: none;
    border: 1px solid black;
  }
}

.search-active {
  width: 200px;
  border: 1px solid black;
  visibility: visible;
  padding: 2px;
  transition: all 0.4s ease-in-out;
}
.search-disable {
  width: 0px;
  visibility: hidden;
  transition: all 0.4s ease-in-out;
}
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
.navbar-container-bg-dark {
  background-color: rgba(0, 0, 0, 0.4) !important;
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
  font-family: montserrat-light;
  z-index: 1;
  position: relative;
  transition: 0.2s;
  font-size: 1.1rem;
  color: $green;
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
.gallery-nav-text:hover .gallery-hover-menu {
  visibility: visible;
  opacity: 1;
}
.checkout-nav-icon:hover .mini-checkout-parent {
  visibility: visible;
  opacity: 1;
}
.user-nav-icon:hover .mini-user-sign-parent {
  visibility: visible;
  opacity: 1;
}
@media screen and (max-width: 1024px) {
  .navbar-container {
    background-color: #f8f9fa;
    position: static;
  }
}
@media screen and (min-width: 1024px) {
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
import logo from '@/assets/images/logos/logo_horizontal_negative.png'
import MiniUserSign from './MiniUserSign.vue'
import MiniCheckout from '@/components/MiniCheckout.vue'
import GalleryHoverMenu from './GalleryHoverMenu.vue'
import { mapActions, mapGetters } from 'vuex'
import favoritesIcon from '@/assets/icons/favorites.svg'
import searchIcon from '@/assets/icons/search.svg'
import shopIcon from '@/assets/icons/shop.svg'
import profileIcon from '@/assets/icons/contact.svg'
//import router from '@/router'
//import ref from 'vue'
import { cilBasket, cilUser, cilAddressBook } from '@coreui/icons'
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
    MiniUserSign,
    MiniCheckout,
    GalleryHoverMenu,
  },

  data() {
    const basketData = {
      data: [],
      date: '',
      success: '',
    }
    const limitPosition = 200
    const isScrolled = false
    const lastPosition = 0

    const isNavbarCollapse = false
    const isDropdownActive = false

    const isGalleryHoverMenuActive = false

    const searchText = ''
    // const navbarItemStyle = {
    //   bgColor: '',
    //   textColor: '',
    // }
    return {
      //navbarItemStyle,
      basketData,
      searchIcon,
      favoritesIcon,
      shopIcon,
      profileIcon,
      searchText,
      logo,

      cilBasket,
      cilUser,
      cilAddressBook,

      limitPosition,
      isScrolled,
      lastPosition,
      isNavbarCollapse,
      isDropdownActive,
      isGalleryHoverMenuActive,
    }
  },
  computed: {
    isAuthenticated: function () {
      return this.$store.state.auth.isAuthenticated
    },
    ...mapGetters('auth', {
      getToken: 'getToken',
      getUserProfile: 'getUserProfile',
    }),
    userProfile: function () {
      return this.getUserProfile
    },
  },
  methods: {
    ...mapActions('auth', {
      actionLogOut: 'userLogout',
    }),
    logOut: async function () {
      await this.actionLogOut()
      location.reload()
    },
    search: function () {
      this.$store.commit('setChangeBarState')
      if (!this.$store.state.isSearchActive && this.searchText.length > 0) {
        this.$router.push({ name: 'Gallery' })
      }
    },
    searchByInput: function () {
      this.$store.commit('setSearchInputData', this.searchText)
    },
    // componentToHex: function (c) {
    //   var hex = c.toString(16)
    //   return hex.length == 1 ? '0' + hex : hex
    // },

    // rgbToHex: function (r, g, b) {
    //   return (
    //     '#' +
    //     this.componentToHex(r) +
    //     this.componentToHex(g) +
    //     this.componentToHex(b)
    //   )
    // },

    // invert: function (rgb) {
    //   rgb = [].slice
    //     .call(arguments)
    //     .join(',')
    //     .replace(/rgb\(|\)|rgba\(|\)|\s/gi, '')
    //     .split(',')
    //   for (var i = 0; i < rgb.length; i++) rgb[i] = (i === 3 ? 1 : 255) - rgb[i]
    //   return this.rgbToHex(rgb[0], rgb[1], rgb[2])
    // },
    // setAverageBgColorFromSwiper(bgColor) {
    //   this.navbarItemStyle.bgColor = this.invert(bgColor)
    //   this.navbarItemStyle.textColor = bgColor
    //   console.log(bgColor)
    //   console.log(this.invert(bgColor))
    // },
    // // roll: function () {
    // //   const bgColor = generateRandomColor()

    // //   const button = document.querySelector('button')

    // //   const textColor = getTextColor(bgColor)

    // //   document.body.style.backgroundColor = bgColor
    // //   button.style.backgroundColor = textColor
    // //   button.style.color = bgColor
    // //   document.body.style.color = textColor
    // // },
    // getAverageRGB: function (imgEl) {
    //   var blockSize = 5, // only visit every 5 pixels
    //     defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
    //     canvas = document.createElement('canvas'),
    //     context = canvas.getContext && canvas.getContext('2d'),
    //     data,
    //     width,
    //     height,
    //     i = -4,
    //     length,
    //     rgb = { r: 0, g: 0, b: 0 },
    //     count = 0

    //   if (!context) {
    //     return defaultRGB
    //   }

    //   height = canvas.height =
    //     imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height
    //   width = canvas.width =
    //     imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width

    //   context.drawImage(imgEl, 0, 0)

    //   try {
    //     data = context.getImageData(0, 0, width, height)
    //   } catch (e) {
    //     /* security error, img on diff domain */
    //     return defaultRGB
    //   }

    //   length = data.data.length

    //   while ((i += blockSize * 4) < length) {
    //     ++count
    //     rgb.r += data.data[i]
    //     rgb.g += data.data[i + 1]
    //     rgb.b += data.data[i + 2]
    //   }

    //   // ~~ used to floor values
    //   rgb.r = ~~(rgb.r / count)
    //   rgb.g = ~~(rgb.g / count)
    //   rgb.b = ~~(rgb.b / count)

    //   this.dynamicBgColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    // },
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
    getBasketData() {
      if (this.isAuthenticated == true || this.getToken != null) {
        this.$store.commit('setTotalQuantityInBasket')

        fetch('https://rassmin.com/api/Cart/GetCartItems', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json;charset=UTF-8',
            Authorization: `Bearer ${this.getToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            //console.log(data)
            this.$store.commit('setTotalQuantityInBasket', data.data.length)
            this.basketData = data
          })
      }
    },
  },
  beforeMount() {
    this.getBasketData()
    //console.log(this.getUserProfile)
    //window.addEventListener('scroll', this.handleScroll)
    //console.log(this.$store.state.elementCountInBasket)
    // if (this.isAuthenticated == true) {
    //   location.reload()
    // }
  },
  beforeUnmount() {
    //window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
