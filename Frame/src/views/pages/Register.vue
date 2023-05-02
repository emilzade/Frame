<template>
  <div
    :style="{ 'background-image': 'url(' + registerBg + ')' }"
    class="bg-light min-vh-100 d-flex flex-row align-items-center"
  >
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :xl="6" :lg="8">
          <CCard class="p-4 register-card">
            <CCardBody class="p-4">
              <CForm>
                <h1>Register</h1>
                <p class="text-medium-emphasis">Create your account</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText class="border border-light">
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                    class="border border-light"
                    placeholder="Name"
                    autocomplete="name"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText class="border border-light">
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                    class="border border-light"
                    placeholder="Username"
                    autocomplete="username"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText class="border border-light">
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                    class="border border-light"
                    placeholder="Username"
                    autocomplete="username"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText class="border border-light">
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                    class="border border-light"
                    placeholder="Username"
                    autocomplete="username"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText class="border border-light">
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                    class="border border-light"
                    placeholder="Username"
                    autocomplete="username"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText class="border border-light">
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                    class="border border-light"
                    placeholder="Username"
                    autocomplete="username"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText class="border border-light"
                    >@</CInputGroupText
                  >
                  <CFormInput
                    class="border border-light"
                    placeholder="Email"
                    autocomplete="email"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText class="border border-light">
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    class="border border-light"
                    type="password"
                    placeholder="Password"
                    autocomplete="new-password"
                  />
                </CInputGroup>
                <CInputGroup class="mb-4">
                  <CInputGroupText class="border border-light">
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    class="border border-light"
                    type="password"
                    placeholder="Repeat password"
                    autocomplete="new-password"
                  />
                </CInputGroup>
                <div class="d-grid">
                  <CButton color="success">Create Account</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
<style>
.register-card {
  background-color: rgba(235, 235, 235, 0.64);
}
</style>
<script>
import registerBg from '@/assets/images/loginbg.jpg'
export default {
  name: 'Register',
  data() {
    const userData = {
      id: 0,
      name: '',
      surname: '',
      email: '',
      password: '',
      address: '',
      phone: '',
      profileImage: '',
      roleId: 0,
      roleName: '',
      active: 0,
      pageNumber: 0,
      pageSize: 0,
      sort: '',
    }
    return {
      registerBg,
      userData,
    }
  },
}
</script>
