<template>
  <div class="w-75 m-auto pt-5">
    <div class="text-center py-5">
      <h1 class="text-dark roboto-regular">Contact Us</h1>
      <p class="text-secondary roboto-regular">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto
        praesentium, impedit saepe perspiciatis culpa, eos aut, voluptate ut
        possimus id quos quasi provident vero. Optio blanditiis nesciunt saepe
        sequi eum quisquam assumenda laudantium tempora alias neque dignissimos,
        sed illo et reiciendis magnam iusto, facilis repudiandae ullam ipsum
        placeat pariatur unde.
      </p>
    </div>
    <hr width="20%" style="margin: auto" />
    <CRow class="py-5">
      <CCol
        class="col-sm-6 col-12 p-4 border rounded d-flex justify-content-center align-items-center"
        >map here</CCol
      >
      <CCol class="col-sm-4 col-12 p-4">
        <div class="d-flex align-items-center justify-content-end py-3">
          <div
            class="d-flex flex-column justify-content-end align-items-center"
          >
            <div>PHONE</div>
            <div>+994 50 9920010</div>
          </div>
          <CIcon width="40px" :content="cilPhone" />
        </div>
        <div class="d-flex align-items-center justify-content-end py-3">
          <div
            class="d-flex flex-column justify-content-end align-items-center"
          >
            <div>EMAIL</div>
            <div>amrahli@rassmin.com</div>
          </div>
          <CIcon width="40px" :content="cilPhone" />
        </div>
        <div class="d-flex align-items-center justify-content-end py-3">
          <div
            class="d-flex flex-column justify-content-end align-items-center"
          >
            <div>LOCATION</div>
            <div>+994 50 9920010</div>
          </div>
          <CIcon width="40px" :content="cilLocationPin" />
        </div>
      </CCol>
    </CRow>
    <div class="py-4">
      <h2 class="text-secondary roboto-thin text-center">Message Us</h2>
      <CForm class="border border-secondary my-5 rounded p-5">
        <CRow>
          <CCol class="col-sm-6 col-12">
            <div class="form-group-custom p-2">
              <CFormInput
                v-model="messageInformation.fullName"
                class="input-custom bg-light border border-secondary rounded"
                type="text"
                name="fullname"
                autocomplete="off"
                id="fullname"
              />
              <CFormLabel for="fullname" class="bg-light"
                >Full Name
              </CFormLabel>
            </div>
            <div class="form-group-custom p-2">
              <CFormInput
                v-model="messageInformation.email"
                class="input-custom bg-light border border-secondary rounded"
                type="text"
                name="email"
                autocomplete="off"
                id="email"
              />
              <CFormLabel for="email" class="bg-light">Email</CFormLabel>
            </div>
            <div class="form-group-custom p-2">
              <CFormInput
                v-model="messageInformation.phone"
                class="input-custom bg-light border border-secondary rounded"
                type="number"
                name="phone"
                autocomplete="off"
                id="phone"
              />
              <CFormLabel for="phone" class="bg-light">Phone</CFormLabel>
            </div>
            <div class="form-group-custom p-2">
              <VueMultiselect
                v-model="selectedIssue"
                :options="issues"
                :limit="1"
                :multiple="false"
                :close-on-select="true"
                :clear-on-select="false"
                :preserve-search="true"
                label="name"
                :placeholder="'Select Partnership Area'"
                track-by="name"
                @select="addIssue"
                @remove="selectedIssue = null"
                class="border border-secondary rounded"
              />
            </div>
          </CCol>
          <CCol class="col-sm-6 col-12 p-2 form-group-custom">
            <textarea
              v-model="messageInformation.message"
              class="input-custom bg-light border border-secondary rounded form-control"
              type="text"
              name="message"
              autocomplete="off"
              id="message"
              rows="6"
            ></textarea>
            <CFormLabel for="message" class="bg-light form-label"
              >Your Message
            </CFormLabel>
            <div @click="sendMessage" class="btn btn-dark w-100 my-2">
              SEND MESSAGE
            </div>
          </CCol>
        </CRow>
      </CForm>
    </div>
  </div>
</template>
<style lang="scss">
.form-group-custom {
  position: relative;
  .form-label {
    position: absolute;
    top: 15px;
    left: 30px;
    transition: 0.3s;
    color: gray;
  }
  .form-control:focus {
    outline: 1px solid black;
    box-shadow: none;
  }
  .form-control:focus + .form-label {
    position: absolute;
    top: -5px;
    left: 30px;
    color: black;
  }
}
</style>
<script>
import { ref } from 'vue'
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'
import { cilPhone, cilLocationPin, cilAt } from '@coreui/icons'
export default {
  components: {
    VueMultiselect,
  },
  data() {
    const messageInformation = {
      fullName: null,
      email: null,
      phone: null,
      issueId: null,
      message: null,
    }
    const issues = [
      {
        id: 1,
        name: 'Issue1',
      },
      {
        id: 2,
        name: 'Issue2',
      },
      {
        id: 3,
        name: 'Issue3',
      },
      {
        id: 4,
        name: 'Issue4',
      },
      {
        id: 5,
        name: 'Issue5',
      },
    ]
    const selectedIssue = ref()
    return {
      cilPhone,
      cilLocationPin,
      cilAt,
      messageInformation,
      issues,
      selectedIssue,
    }
  },
  methods: {
    sendMessage: function () {
      console.log(this.messageInformation)
    },
    addIssue: function (issue) {
      this.messageInformation.issueId = issue.id
      console.log(issue)
    },
  },
}
</script>
