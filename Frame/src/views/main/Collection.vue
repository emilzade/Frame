<template>
  <div>
    <div class="pt-5 w-75 m-auto">
      <h1 class="dune-rise pt-5 display-4 text-center">Winter Collection</h1>
      <h3 class="dune-rise text-center">Collection - {{ $route.params.id }}</h3>
      <p class="text-secondary lh-lg py-5">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim molestiae
        veniam officia porro? Quo odio itaque quia autem excepturi deleniti, sit
        aspernatur quos accusamus, incidunt molestiae, cumque nostrum. Est,
        quaerat labore. Nostrum culpa perspiciatis unde dicta, rerum nobis
        excepturi repellendus.lorem30 Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Magnam, iste sequi laborum mollitia perspiciatis ipsam
        labore commodi ipsum nesciunt, ducimus illo facere accusamus qui
        eligendi dolorem odio saepe dignissimos ullam?
      </p>
    </div>
    <CRow class="w-75 m-auto">
      <CCol
        v-for="data in dbData"
        :key="data.id"
        class="col-md-3 col-sm-4 col-6 p-4"
      >
        <img
          ref="frameImg"
          class="w-100 border border-dark"
          src="../../assets/images/carousel-1.jpg"
        />
        <div class="d-flex justify-content-between">
          <p class="text-dark">{{ data.name }}</p>
          <div class="d-flex flex-column align-items-end">
            <p class="text-dark">{{ data.size }}</p>
            <p class="text-secondary">{{ data.price }} ₼</p>
          </div>
        </div>
      </CCol>
      <CCol
        class="col-12 pb-5 d-flex justify-content-end align-items-end flex-column"
      >
        <p class="text-dark fs-3">139.90M</p>
        <div @click="getParameterList" class="btn btn-dark btn-lg">Buy Now</div>
      </CCol>
    </CRow>
    <!--Settings Modal Start -->
    <Transition name="fade">
      <div class="modal-vue" v-if="isSettingsModalActive">
        <div class="settings-modal rounded p-3 bg-light overflow-auto">
          <div class="d-flex justify-content-end p-1">
            <CIcon
              :content="cilX"
              @click="closeSettingsModal"
              width="40"
              class="border rounded close-button-custom"
              role="button"
              height="30"
            />
          </div>
          <div class="p-2 bg-light border rounded">
            <CForm>
              <CRow class="px-3 roboto-thin">
                <div
                  class="col-12 p-2 form-group-custom d-flex justify-content-around"
                >
                  <label
                    v-for="paymentType in paymentTypes"
                    :key="paymentType.id"
                    class="w-100 text-center small"
                    role="button"
                    :for="paymentType.name"
                    ><input
                      class="form-check-input"
                      type="radio"
                      :id="paymentType.name"
                      v-model="paymentInformation.paymentTypeId"
                      name="paymentType"
                      :value="paymentType.id"
                      :checked="paymentType.default"
                    />
                    {{ paymentType.name }}</label
                  >
                </div>
                <div class="col-md-6 col-12 p-2 form-group-custom">
                  <CFormInput
                    v-model="paymentInformation.firstName"
                    class="input-custom bg-light border border-secondary rounded"
                    type="text"
                    name="firstName"
                    autocomplete="off"
                    id="firstName"
                  />
                  <CFormLabel
                    class="bg-light"
                    :class="{
                      'form-label-active': paymentInformation.firstName,
                      'form-label': !paymentInformation.firstName,
                    }"
                    for="firstName"
                    >First Name
                  </CFormLabel>
                </div>
                <div class="col-md-6 col-12 p-2 form-group-custom">
                  <CFormInput
                    v-model="paymentInformation.lastName"
                    class="input-custom bg-light border border-secondary rounded"
                    type="text"
                    name="lastName"
                    autocomplete="off"
                    id="lastName"
                  />
                  <CFormLabel
                    for="lastName"
                    class="bg-light"
                    :class="{
                      'form-label-active': paymentInformation.lastName,
                      'form-label': !paymentInformation.lastName,
                    }"
                    >Last Name
                  </CFormLabel>
                </div>
                <div class="col-12 p-2 form-group-custom">
                  <CFormInput
                    v-model="paymentInformation.deliveryAddress"
                    class="input-custom bg-light border border-secondary rounded"
                    type="text"
                    name="DeliveryAddress"
                    autocomplete="off"
                    id="DeliveryAddress"
                  />
                  <CFormLabel
                    for="DeliveryAddress"
                    class="bg-light"
                    :class="{
                      'form-label-active': paymentInformation.deliveryAddress,
                      'form-label': !paymentInformation.deliveryAddress,
                    }"
                    >Delivery Address
                  </CFormLabel>
                </div>
                <div class="col-12 p-2 form-group-custom">
                  <CFormInput
                    v-model="paymentInformation.zipCode"
                    class="input-custom bg-light border border-secondary rounded"
                    type="text"
                    name="ZipCode"
                    autocomplete="off"
                    id="ZipCode"
                  />
                  <CFormLabel
                    for="ZipCode"
                    class="bg-light"
                    :class="{
                      'form-label-active': paymentInformation.zipCode,
                      'form-label': !paymentInformation.zipCode,
                    }"
                    >Zip Code
                  </CFormLabel>
                </div>
                <div class="col-md-6 col-12 p-2 form-group-custom">
                  <CFormInput
                    v-model="paymentInformation.country"
                    class="input-custom bg-light border border-secondary rounded"
                    type="text"
                    name="Country"
                    autocomplete="off"
                    id="Country"
                  />
                  <CFormLabel
                    for="Country"
                    class="bg-light"
                    :class="{
                      'form-label-active': paymentInformation.country,
                      'form-label': !paymentInformation.country,
                    }"
                    >Country
                  </CFormLabel>
                </div>
                <div class="col-md-6 col-12 p-2 form-group-custom">
                  <CFormInput
                    v-model="paymentInformation.city"
                    class="input-custom bg-light border border-secondary rounded"
                    type="text"
                    name="City"
                    autocomplete="off"
                    id="City"
                  />
                  <CFormLabel
                    for="City"
                    class="bg-light"
                    :class="{
                      'form-label-active': paymentInformation.city,
                      'form-label': !paymentInformation.city,
                    }"
                    >City
                  </CFormLabel>
                </div>
                <div class="col-12 p-2 form-group-custom">
                  <CFormInput
                    v-model="paymentInformation.emailAddress"
                    class="input-custom bg-light border border-secondary rounded"
                    type="text"
                    name="email"
                    autocomplete="off"
                    id="email"
                  />
                  <CFormLabel
                    for="email"
                    class="bg-light"
                    :class="{
                      'form-label-active': paymentInformation.emailAddress,
                      'form-label': !paymentInformation.emailAddress,
                    }"
                    >Email Address</CFormLabel
                  >
                </div>
                <div class="col-12 p-2 form-group-custom">
                  <CFormInput
                    v-model="paymentInformation.phoneNumber"
                    class="input-custom bg-light border border-secondary rounded"
                    type="text"
                    name="phoneNumber"
                    autocomplete="off"
                    id="phoneNumber"
                  />
                  <CFormLabel
                    for="phoneNumber"
                    class="bg-light"
                    :class="{
                      'form-label-active': paymentInformation.phoneNumber,
                      'form-label': !paymentInformation.phoneNumber,
                    }"
                    >Phone Number</CFormLabel
                  >
                </div>
                <div class="accept-agreement">
                  <label class="custom-label">
                    <input
                      v-model="isAccepted"
                      class="custom-input"
                      type="checkbox"
                      name="checkbox"
                    />
                    <p class="small">
                      I approve the
                      <router-link :to="{ name: 'TermsAndConditions' }"
                        >The Terms and Conditions</router-link
                      >
                    </p>
                  </label>
                </div>
                <div
                  v-if="isAccepted && checkPaymentFieldsFilled()"
                  class="col-12 p-2 form-group-custom"
                >
                  <input
                    @click="buy"
                    type="button"
                    class="btn btn-dark w-100 roboto-regular"
                    value="Pay"
                  />
                </div>
                <div v-else class="col-12 p-2 form-group-custom">
                  <input
                    type="button"
                    class="btn btn-dark w-100 roboto-regular"
                    value="Pay"
                    disabled
                  />
                </div>
              </CRow>
            </CForm>
          </div>
        </div>
        <div
          class="overlay overlay-settings"
          @click="closeSettingsModal()"
        ></div>
      </div>
    </Transition>
    <!--Settings Modal End -->
    <LastViewed />
  </div>
</template>
<style lang="scss">
.single-frame-container {
  perspective: 1000px;
  border: 1px solid black;
  .single-frame-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    .single-frame-front,
    .single-frame-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
    }
    .single-frame-back {
      transform: rotateY(180deg);
      background-color: red;
    }
  }
  &:hover {
    .single-frame-inner {
      transform: rotateY(180deg);
    }
  }
}
</style>
<script>
import { ref } from 'vue'
import LastViewed from '../../components/LastViewed.vue'
import { cilX } from '@coreui/icons'
export default {
  components: { LastViewed },
  data() {
    const dbData = [
      {
        id: 1,
        price: 12.8,
        name: 'SnowFlakes',
        imgSrc: '../../assets/images/carousel-1.jpg',
        size: '45x60cm',
      },
      {
        id: 2,
        price: 22.53,
        name: 'SnowFlakes',
        imgSrc: '../../assets/images/carousel-1.jpg',
        size: '45x60cm',
      },
      {
        id: 3,
        price: 34.51,
        name: 'SantaClaus',
        imgSrc: '../../assets/images/carousel-1.jpg',
        size: '45x60cm',
      },
      {
        id: 4,
        price: 46.98,
        name: 'The Road Not Taken',
        imgSrc: '../../assets/images/carousel-1.jpg',
        size: '45x60cm',
      },
      {
        id: 5,
        price: 53.09,
        name: 'Frozen Lake',
        imgSrc: '../../assets/images/carousel-1.jpg',
        size: '45x60cm',
      },
    ]
    const paymentInformation = {
      paymentTypeId: 1,
      firstName: null,
      lastName: null,
      deliveryAddress: null,
      zipCode: null,
      country: null,
      city: null,
      emailAddress: null,
      phoneNumber: null,
    }
    const paymentTypes = [
      {
        id: 1,
        name: 'Visa & Mastercard',
        type: 'radio',
        default: true,
      },
      {
        id: 2,
        name: 'Cash',
        type: 'radio',
        default: false,
      },
    ]
    const isSettingsModalActive = ref(false)
    return {
      cilX,
      dbData,
      isSettingsModalActive,
      paymentInformation,
      paymentTypes,
      isAccepted: false,
    }
  },
  methods: {
    getParameterList: function () {
      this.isSettingsModalActive = true
    },
    closeSettingsModal: function () {
      this.isSettingsModalActive = false
    },
  },
  mounted() {},
}
</script>
