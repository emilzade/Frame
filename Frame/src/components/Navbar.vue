<template>
  <MDBNavbar
    expand="lg"
    style="z-index: 100; box-shadow: 0 0 0 0"
    class="navbar-container d-flex"
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
        class="mb-2 mb-lg-0 p-3 align-items-center px-5 gap-3"
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
        <MDBNavbarItem>
          <router-link
            class="text-decoration-none navbar-item"
            :to="{
              name: 'Gallery',
            }"
          >
            <CIcon :content="cilSearch" />
          </router-link>
        </MDBNavbarItem>
        <MDBNavbarItem
          v-if="isAuthenticated == 'true' || getLoginApiStatus == 'success'"
        >
          <CDropdown
            color="secondary"
            class="shadow-none p-0"
            direction="center"
          >
            <CDropdownToggle class="p-0"
              ><CIcon :content="cilUser"
            /></CDropdownToggle>
            <CDropdownMenu class="transition-0 m-0">
              <CDropdownItem disabled>Profile</CDropdownItem>
              <CDropdownItem v-if="role == 'admin'"
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
        <template v-else>
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
                name: 'Login',
              }"
            >
              Register
            </router-link>
          </MDBNavbarItem>
        </template>
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
import logo from '../assets/images/logo.png'
import { mapActions, mapGetters } from 'vuex'
//import router from '@/router'
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
    const limitPosition = 200
    const isScrolled = false
    const lastPosition = 0

    const isNavbarCollapse = false
    const isDropdownActive = false

    // const navbarItemStyle = {
    //   bgColor: '',
    //   textColor: '',
    // }
    return {
      //navbarItemStyle,
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
  computed: {
    isAuthenticated: function () {
      return this.$store.state.auth.isAuthenticated
    },
    ...mapGetters('auth', {
      getLoginApiStatus: 'getLoginApiStatus',
    }),
  },
  methods: {
    ...mapActions('auth', {
      actionLogOut: 'userLogout',
    }),
    logOut: async function () {
      await this.actionLogOut()
      location.reload()
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
    //window.addEventListener('scroll', this.handleScroll)
    console.log(this.$store.state.elementCountInBasket)
  },
  beforeUnmount() {
    //window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
