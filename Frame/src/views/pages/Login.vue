<template>
  <div
    :style="{ 'background-image': 'url(' + loginBg + ')' }"
    class="min-vh-100 d-flex flex-row align-items-center"
  >
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :xl="6" :lg="8">
          <CCardGroup>
            <CCard class="p-4 login-card">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText class="border border-light">
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      class="border border-light"
                      autocomplete="email"
                      placeholder="Email"
                      v-model="payload.email"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText class="border border-light">
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      class="border border-light"
                      v-model="payload.password"
                      type="password"
                      placeholder="Password"
                      autocomplete="password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" @click="login" class="px-4">
                        Login
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
<style>
.login-card {
  background-color: rgba(235, 235, 235, 0.64);
}
</style>
<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'
import loginBg from '@/assets/images/loginbg.jpg'
export default {
  name: 'Login',
  data() {
    const payload = {
      email: '',
      password: '',
    }
    return {
      payload,
      loginBg,
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
      console.log(this.payload)
      await this.actionLoginApi(this.payload)
      console.log(this.getLoginApiStatus)
      if (this.getLoginApiStatus == 'success') {
        router.push({ name: 'Index' })
      } else {
        console.log('failed')
      }
    },
  },
}
</script>
