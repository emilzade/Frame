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
        class="mb-2 mb-lg-0 p-0 align-items-center px-5 gap-4 d-flex"
        style="margin: 0px !important"
      >
        <MDBNavbarItem active>
          <router-link
            class="text-decoration-none navbar-item"
            :to="{
              name: 'Gallery',
            }"
          >
            <span class="p-2 rounded">Gallery</span>
          </router-link>
        </MDBNavbarItem>
        <MDBNavbarItem>
          <router-link
            class="text-decoration-none navbar-item"
            :to="{
              name: 'Collections',
            }"
          >
            <span>Collections</span>
          </router-link>
        </MDBNavbarItem>
        <MDBNavbarItem>
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
              <img :src="searchIcon" class="w-100" />
            </div>
          </div>
        </MDBNavbarItem>
        <MDBNavbarItem>
          <router-link
            class="text-decoration-none navbar-item"
            :to="{
              name: 'Favourites',
            }"
          >
            <CIcon :content="cilHeart" />
          </router-link>
        </MDBNavbarItem>
        <MDBNavbarItem>
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
        <MDBNavbarItem v-if="isAuthenticated == true || getToken != null">
          <CDropdown
            color="secondary"
            class="shadow-none p-0 w-100"
            direction="left"
          >
            <CDropdownToggle class="p-0"
              ><CIcon :content="cilUser"
            /></CDropdownToggle>
            <CDropdownMenu style="width: 300px" class="transition-0 mx-0 mt-4">
              <TriangleBorderTop :right="5"></TriangleBorderTop>
              <CDropdownItem>{{
                JSON.parse(getUserProfile).email
              }}</CDropdownItem>
              <CDropdownItem disabled>Profile</CDropdownItem>
              <CDropdownItem
                v-if="JSON.parse(getUserProfile).roleName == 'admin'"
                ><router-link :to="{ name: 'Admin' }"
                  >Admin Panel</router-link
                ></CDropdownItem
              >
              <CDropdownItem disabled>Events</CDropdownItem>
              <CDropdownItem class="cursor-pointer" @click="logOut"
                >Log out</CDropdownItem
              >
            </CDropdownMenu>
          </CDropdown>
        </MDBNavbarItem>
        <MDBNavbarItem v-else>
          <div class="position-relative user-select-none">
            <CIcon
              class="cursor-pointer"
              @click="isMiniSignActive = !isMiniSignActive"
              :content="cilUser"
            />
            <div
              v-if="isMiniSignActive"
              class="overlay-full"
              @click="isMiniSignActive = !isMiniSignActive"
            ></div>
            <Transition name="fade">
              <MiniUserSign v-if="isMiniSignActive"></MiniUserSign>
            </Transition>
          </div>
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
import TriangleBorderTop from './TriangleBorderTop.vue'
import MiniUserSign from './MiniUserSign.vue'
import { mapActions, mapGetters } from 'vuex'
import searchIcon from '@/assets/images/icons/search.png'
//import router from '@/router'
//import ref from 'vue'
import {
  cilHeart,
  cilBasket,
  cilUser,
  cilSearch,
  cilAddressBook,
} from '@coreui/icons'
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
    TriangleBorderTop,
  },

  data() {
    const isBasketHasItem = false
    const limitPosition = 200
    const isScrolled = false
    const lastPosition = 0

    const isNavbarCollapse = false
    const isDropdownActive = false

    const isMiniSignActive = false

    const searchText = ''
    // const navbarItemStyle = {
    //   bgColor: '',
    //   textColor: '',
    // }
    return {
      //navbarItemStyle,
      searchIcon,
      searchText,
      logo,

      cilHeart,
      cilBasket,
      cilUser,
      cilAddressBook,
      cilSearch,

      isBasketHasItem,
      limitPosition,
      isScrolled,
      lastPosition,
      isNavbarCollapse,
      isDropdownActive,

      isMiniSignActive,
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
  },
  beforeMount() {
    this.$store.commit('setTotalQuantityInBasket')
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
