<template>
  <div class="mini-user-sign-parent montserrat-light pt-4">
    <TriangleBorderTop :right="15"></TriangleBorderTop>
    <div v-if="isAuthenticated" class="shadow signed-card pt-3">
      <div class="p-2 text-center text-dark cursor-pointer hovered-gray">
        {{ JSON.parse(userData).email }}
      </div>
      <div class="p-2 text-center text-dark cursor-pointer hovered-gray">
        Profile
      </div>
      <div
        class="p-2 text-center cursor-pointer hovered-gray"
        v-if="JSON.parse(userData).roleName == 'admin'"
      >
        <router-link :to="{ name: 'Admin' }" class="text-dark"
          >Admin Panel</router-link
        >
      </div>
      <div
        class="p-2 text-center text-dark cursor-pointer hovered-gray"
        @click="logout"
      >
        Log out
      </div>
    </div>

    <div v-else class="sign-card" :class="{ ' is-flipped ': isSignInActive }">
      <div class="mini-user-sign sign-in">
        <div class="element-container shadow p-1">
          <div class="px-4 pt-4 form-group-custom">
            <CFormInput
              v-model="loginData.email"
              class="input-custom border rounded-0 w-100 border-secondary rounded"
              type="text"
              name="loginEmail"
              autocomplete="off"
              id="loginEmail"
            />
            <CFormLabel
              class="bg-light"
              :class="{
                'form-label-active': loginData.email,
                'form-label': !loginData.email,
              }"
              for="loginEmail"
              >Email
            </CFormLabel>
          </div>
          <div class="px-4 pt-4 form-group-custom">
            <CFormInput
              v-model="loginData.password"
              class="input-custom border rounded-0 w-100 border-secondary rounded"
              type="password"
              name="loginPassword"
              autocomplete="off"
              id="loginPassword"
            />
            <CFormLabel
              class="bg-light"
              :class="{
                'form-label-active': loginData.password,
                'form-label': !loginData.password,
              }"
              for="loginPassword"
              >Password
            </CFormLabel>
          </div>
          <p class="text-dark small text-end px-4">Forgot the password?</p>
          <div @click="login" class="bg-black text-light text-center mx-4 p-1">
            Login
          </div>
          <div
            @click="isSignInActive = !isSignInActive"
            class="text-dark small text-end px-4"
          >
            Sign up
          </div>
        </div>
      </div>
      <div class="mini-user-sign sign-up">
        <div class="element-container border shadow p-1">
          <div class="px-4 pt-4 form-group-custom">
            <CFormInput
              v-model="signUpData.email"
              class="input-custom border rounded-0 w-100 border-secondary rounded"
              type="text"
              name="email"
              autocomplete="off"
              id="email"
            />
            <CFormLabel
              class="bg-light"
              :class="{
                'form-label-active': signUpData.email,
                'form-label': !signUpData.email,
              }"
              for="email"
              >Email
            </CFormLabel>
          </div>
          <div class="px-4 pt-4 form-group-custom">
            <CFormInput
              v-model="signUpData.username"
              class="input-custom border rounded-0 w-100 border-secondary rounded"
              type="text"
              name="signUpUsername"
              autocomplete="off"
              id="signUpUsername"
            />
            <CFormLabel
              class="bg-light"
              :class="{
                'form-label-active': signUpData.username,
                'form-label': !signUpData.username,
              }"
              for="signUpUsername"
              >Username
            </CFormLabel>
          </div>
          <div class="px-4 pt-4 form-group-custom">
            <CFormInput
              v-model="signUpData.password"
              class="input-custom border rounded-0 w-100 border-secondary rounded"
              type="password"
              name="signUpPassword"
              autocomplete="off"
              id="signUpPassword"
            />
            <CFormLabel
              class="bg-light"
              :class="{
                'form-label-active': signUpData.password,
                'form-label': !signUpData.password,
              }"
              for="signUpPassword"
              >Password
            </CFormLabel>
          </div>
          <div class="px-4 pt-4 form-group-custom">
            <CFormInput
              v-model="signUpData.repeatPassword"
              class="input-custom border rounded-0 w-100 border-secondary rounded"
              type="password"
              name="repeatPassword"
              autocomplete="off"
              id="repeatPassword"
            />
            <CFormLabel
              class="bg-light"
              :class="{
                'form-label-active': signUpData.repeatPassword,
                'form-label': !signUpData.repeatPassword,
              }"
              for="repeatPassword"
              >Repeat Password
            </CFormLabel>
          </div>
          <div
            @click="signUp"
            class="bg-black text-light text-center mx-4 p-1 mt-4"
          >
            Sign Up
          </div>
          <div
            @click="isSignInActive = !isSignInActive"
            class="text-dark small text-end px-4"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.hovered-gray:hover {
  background-color: rgb(233, 233, 233);
}
.mini-user-sign-parent {
  transition: 0.4s;
  position: absolute;
  top: 100%;
  right: -20px;
  width: 300px;
  perspective: 1000px;
  visibility: hidden;
  opacity: 0;
  //border: 1px solid red !important;

  .sign-card {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform-origin: center right;
    transition: transform 0.8s ease-in-out;
    .mini-user-sign {
      transition: 1s;
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      .element-container {
        width: 300px;
        background-color: white;
        .form-group-custom {
          position: relative;
          .form-label {
            position: absolute;
            top: 30px;
            left: 50px;
            transition: 0.3s;
            background-color: white;
          }
          .form-control:focus {
            outline: 1px solid gray;
            box-shadow: none;
          }
          .form-label-active {
            position: absolute;
            top: 10px;
            left: 50px;
            color: gray;
          }
        }
      }
    }
    .sign-up {
      transform: rotateY(180deg);
    }
  }
  .signed-card {
    background-color: white;
  }
  .is-flipped {
    transform: translateX(-100%) rotateY(-180deg);
  }
}
</style>
<script>
import TriangleBorderTop from './TriangleBorderTop.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'MiniUserSign',
  props: ['isAuthenticated', 'userData'],
  components: { TriangleBorderTop },
  data() {
    const loginData = {
      email: '',
      password: '',
    }
    const signUpData = {
      email: '',
      username: '',
      password: '',
      repeatPassword: '',
    }
    const isSignInActive = false
    return {
      loginData,
      signUpData,

      isSignInActive,
    }
  },
  computed: {
    ...mapGetters('auth', {
      getLoginApiStatus: 'getLoginApiStatus',
    }),
  },
  methods: {
    ...mapActions('auth', {
      actionLoginApi: 'loginApi',
    }),
    async login() {
      await this.actionLoginApi(this.loginData)
      //console.log(this.getLoginApiStatus)

      if (this.getLoginApiStatus == 'success') {
        this.$router.push({ name: 'Index' })
      } else {
        console.log('failed')
      }

      location.reload()
    },
    logout: function () {
      this.$emit('logout')
    },
  },
}
</script>
