<template>
  <div class="">
    <div
      class="mx-4 display-5 montserrat-regular mt-5"
      style="padding: 0 !important"
    >
      Account Info
    </div>
    <CRow>
      <CCol class="col-md-6 col-12">
        <div class="px-4 pt-4 form-group-custom">
          <CFormInput
            v-model="userData.fullName"
            class="input-custom border rounded-0 w-100 border-secondary rounded"
            type="text"
            name="userFullName"
            autocomplete="off"
            id="userFullName"
          />
          <CFormLabel
            class="bg-light"
            :class="{
              'form-label-active': userData.fullName,
              'form-label': !userData.fullName,
            }"
            for="userFullName"
            >Fullname
          </CFormLabel>
        </div>
      </CCol>
      <CCol class="col-md-6 col-12">
        <div class="px-4 pt-4 form-group-custom">
          <CFormInput
            v-model="userData.gender"
            class="input-custom border rounded-0 w-100 border-secondary rounded"
            type="text"
            name="userGender"
            autocomplete="off"
            id="userGender"
          />
          <CFormLabel
            class="bg-light"
            :class="{
              'form-label-active': userData.gender,
              'form-label': !userData.gender,
            }"
            for="userGender"
            >Gender
          </CFormLabel>
        </div>
      </CCol>
      <CCol class="col-md-6 col-12">
        <div class="px-4 pt-4 form-group-custom">
          <CFormInput
            v-model="userData.email"
            class="input-custom border rounded-0 w-100 border-secondary rounded"
            type="text"
            name="userEmail"
            autocomplete="off"
            id="userEmail"
          />
          <CFormLabel
            class="bg-light"
            :class="{
              'form-label-active': userData.email,
              'form-label': !userData.email,
            }"
            for="userEmail"
            >Email
          </CFormLabel>
        </div>
      </CCol>
      <CCol class="col-md-6 col-12">
        <div class="px-4 pt-4 form-group-custom">
          <CFormInput
            v-model="userData.userName"
            class="input-custom border rounded-0 w-100 border-secondary rounded"
            type="text"
            name="userUserName"
            autocomplete="off"
            id="userUserName"
          />
          <CFormLabel
            class="bg-light"
            :class="{
              'form-label-active': userData.userName,
              'form-label': !userData.userName,
            }"
            for="userUserName"
            >Username
          </CFormLabel>
        </div>
      </CCol>
      <CCol class="col-md-6 col-12">
        <div class="px-4 pt-4 form-group-custom">
          <CFormInput
            v-model="userData.phone"
            class="input-custom border rounded-0 w-100 border-secondary rounded"
            type="text"
            name="userPhone"
            autocomplete="off"
            id="userPhone"
          />
          <CFormLabel
            class="bg-light"
            :class="{
              'form-label-active': userData.phone,
              'form-label': !userData.phone,
            }"
            for="userPhone"
            >Phone
          </CFormLabel>
        </div>
      </CCol>
      <CCol class="col-md-6 col-12 d-flex align-items-center px-4 mt-4">
        <div class="ps-3">Change Password</div>
      </CCol>
      <CCol class="col-11 bg-black text-light text-center p-2 mt-4 mx-4">
        Save
      </CCol>
    </CRow>
  </div>
</template>
<style>
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
</style>
<script>
export default {
  name: 'UserAccount',
  data() {
    const userData = {
      fullName: '',
      email: '',
      phone: '',
      userName: '',
      gender: '',
    }
    return {
      userData,
    }
  },
}
</script>
