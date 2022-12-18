<template>
  <div class="w-75 m-auto pt-5">
    <div class="text-center py-5">
      <h1 class="text-dark roboto-bold">Partnership</h1>
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
    <div class="text-center py-4">
      <h2 class="text-dark roboto-bold">Our Partners Is Lucky</h2>
      <p class="text-secondary roboto-regular">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt,
        magnam? Nulla ea cum eligendi ipsa debitis quis excepturi quidem
        delectus pariatur fuga deserunt in illo, earum aut temporibus sit
        exercitationem laboriosam dolorum iste saepe recusandae qui ut quos
        fugit. Iusto nam commodi sint maiores ut voluptate possimus eum, nihil
        similique?Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Deleniti, suscipit nemo eaque amet dolorum quas cumque tempora magni
        harum rem provident quibusdam nesciunt modi nam qui quod blanditiis
        culpa, cupiditate est sit eius asperiores, ab veniam. Veritatis
        laudantium quasi quibusdam facilis, sapiente quia dolorum eligendi
        voluptatibus modi delectus tempora fuga.
      </p>
    </div>
    <div class="text-center py-4">
      <h2 class="text-dark roboto-bold">Partnership Conditions</h2>
      <p class="text-secondary roboto-regular">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt,
        magnam? Nulla ea cum eligendi ipsa debitis quis excepturi quidem
        delectus pariatur fuga deserunt in illo, earum aut temporibus sit
        exercitationem laboriosam dolorum iste saepe recusandae qui ut quos
        fugit. Iusto nam commodi sint maiores ut voluptate possimus eum, nihil
        similique?Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Deleniti, suscipit nemo eaque amet dolorum quas cumque tempora magni
        harum rem provident quibusdam nesciunt modi nam qui quod blanditiis
        culpa, cupiditate est sit eius asperiores, ab veniam. Veritatis
        laudantium quasi quibusdam facilis, sapiente quia dolorum eligendi
        voluptatibus modi delectus tempora fuga.
      </p>
    </div>
    <CForm class="border border-secondary my-5 rounded p-5">
      <CRow>
        <CCol class="col-sm-6 col-12">
          <div class="form-group-custom p-2">
            <CFormInput
              v-model="requestInformation.fullName"
              class="input-custom bg-light border border-secondary rounded"
              type="text"
              name="fullname"
              autocomplete="off"
              id="fullname"
            />
            <CFormLabel for="fullname" class="bg-light">Full Name </CFormLabel>
          </div>
          <div class="form-group-custom p-2">
            <CFormInput
              v-model="requestInformation.email"
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
              v-model="requestInformation.phone"
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
              v-model="selectedPartnershipArea"
              :options="partnershipAreas"
              :limit="1"
              :multiple="false"
              :close-on-select="true"
              :clear-on-select="false"
              :preserve-search="true"
              label="name"
              :placeholder="'Select Partnership Area'"
              track-by="name"
              @select="addPartnershipArea"
              @remove="selectedPartnershipArea = null"
              class="border border-secondary rounded"
            />
          </div>
        </CCol>
        <CCol class="col-sm-6 col-12 p-2 form-group-custom">
          <textarea
            v-model="requestInformation.message"
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
          <div @click="sendRequest" class="btn btn-dark w-100 my-2">
            SEND REQUEST
          </div>
          <p class="text-secondary">
            *Lorem ipsum dolor sit amet consectetur
            <a target="_blank" href="mailto:careers@rassmin.com"
              >careers@rassmin.com</a
            >
          </p>
        </CCol>
      </CRow>
    </CForm>
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
export default {
  components: {
    VueMultiselect,
  },
  data() {
    const requestInformation = {
      fullName: null,
      email: null,
      phone: null,
      partnershipAreaId: null,
      message: null,
    }
    const partnershipAreas = [
      {
        id: 1,
        name: 'Area1',
      },
      {
        id: 2,
        name: 'Area2',
      },
      {
        id: 3,
        name: 'Area3',
      },
      {
        id: 4,
        name: 'Area4',
      },
      {
        id: 5,
        name: 'Area5',
      },
    ]
    const selectedPartnershipArea = ref()
    return {
      requestInformation,
      partnershipAreas,
      selectedPartnershipArea,
    }
  },
  methods: {
    sendRequest: function () {
      console.log(this.requestInformation)
    },
    addPartnershipArea: function (size) {
      this.requestInformation.partnershipAreaId = size.id
      console.log(size)
    },
  },
}
</script>
