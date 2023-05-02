<template>
  <div class="pt-5">
    <div v-if="galleryItems.length == 0" class="pt-5">
      <div
        style="height: 80vh"
        class="d-flex flex-column justify-content-center align-items-center munich"
      >
        <h1 class="display-1">It looks empty here...</h1>
        <div class="roboto-thin">
          Go to <router-link :to="{ name: 'Gallery' }">Gallery</router-link> or
          <router-link :to="{ name: 'Collections' }">Collections</router-link>
          to explore more!
        </div>
      </div>
    </div>
    <CRow v-else class="pt-5">
      <CCol class="col-md-6 col-12 border-end pt-5">
        <div
          v-for="item in galleryItems"
          :key="item.id"
          class="border p-2 mx-5 my-2 d-flex justify-content-between align-items-center"
        >
          <img style="width: 100px" src="../../assets/images/carousel-1.jpg" />
          <p>{{ item.name }}</p>
          <div class="border d-flex align-items-center gap-2">
            <div @click="minusQuantity(item.id)" class="btn btn-light">
              <CIcon :content="cilMinus" />
            </div>
            <div class="user-select-none">{{ item.quantity }}</div>
            <div @click="plusQuantity(item.id)" class="btn btn-light">
              <CIcon :content="cilPlus" />
            </div>
          </div>
          <div>{{ (item.price * item.quantity).toFixed(2) }} ₼</div>
          <div @click="removeElement(item.id)" class="btn btn-light">
            <CIcon :content="cilX" />
          </div>
        </div>
        <div class="d-flex justify-content-end mx-5 p-2 my-2">
          <div class="d-flex fs-4 gap-2">
            <span>TOTAL:</span><span>{{ sum.toFixed(2) }} ₼</span>
          </div>
        </div>
      </CCol>
      <CCol class="col-md-6 col-12 border-start pt-5">
        <CForm>
          <CRow class="px-5 roboto-thin">
            <div
              class="col-12 p-2 form-group-custom d-flex justify-content-around"
            >
              <p class="w-50">Payment type</p>
              <label
                v-for="paymentType in paymentTypes"
                :key="paymentType.id"
                class="w-100 text-center"
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
            <div class="col-sm-6 col-12 p-2 form-group-custom">
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
            <div class="col-sm-6 col-12 p-2 form-group-custom">
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
            <div class="col-sm-6 col-12 p-2 form-group-custom">
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
            <div class="col-sm-6 col-12 p-2 form-group-custom">
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
                <p>
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
      </CCol>
    </CRow>
  </div>
</template>
<script>
import { ref } from 'vue'
import { cilPlus, cilMinus, cilX } from '@coreui/icons'
export default {
  data() {
    const galleryItems = ref([])
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
    return {
      cilPlus,
      cilMinus,
      cilX,
      galleryItems,
      sum: 0,
      isAccepted: false,
      paymentInformation,
      paymentTypes,
    }
  },
  methods: {
    setCheckoutElements: function () {
      this.galleryItems = JSON.parse(localStorage.getItem('GalleryItems'))
    },
    minusQuantity: function (id) {
      if (this.galleryItems.filter((x) => x.id == id)[0].quantity > 1) {
        this.galleryItems.filter((x) => x.id == id)[0].quantity--
        localStorage.setItem('GalleryItems', JSON.stringify(this.galleryItems))
        this.sum -= this.galleryItems.filter((x) => x.id == id)[0].price
      } else {
        this.galleryItems.splice(
          this.galleryItems.indexOf(
            this.galleryItems.filter((x) => x.id == id)[0],
          ),
          1,
        )
        localStorage.setItem('GalleryItems', JSON.stringify(this.galleryItems))
      }
      this.$store.commit('setTotalQuantityInBasket')
    },
    plusQuantity: function (id) {
      if (this.galleryItems.filter((x) => x.id == id)[0].quantity < 25) {
        this.galleryItems.filter((x) => x.id == id)[0].quantity++
        localStorage.setItem('GalleryItems', JSON.stringify(this.galleryItems))
        this.sum += this.galleryItems.filter((x) => x.id == id)[0].price
        this.$store.commit('setTotalQuantityInBasket')
      }
    },
    removeElement: function (id) {
      this.sum -=
        this.galleryItems.filter((x) => x.id == id)[0].price *
        this.galleryItems.filter((x) => x.id == id)[0].quantity

      this.galleryItems.splice(
        this.galleryItems.indexOf(
          this.galleryItems.filter((x) => x.id == id)[0],
        ),
        1,
      )

      localStorage.setItem('GalleryItems', JSON.stringify(this.galleryItems))
      this.$store.commit('setTotalQuantityInBasket')
    },
    calculateTotalAmount: function () {
      if (localStorage.getItem('GalleryItems') != null) {
        for (let i = 0; i < this.galleryItems.length; i++) {
          this.sum += this.galleryItems[i].price * this.galleryItems[i].quantity
        }
      }
    },
    checkPaymentFieldsFilled: function () {
      if (
        this.paymentInformation.firstName &&
        this.paymentInformation.lastName &&
        this.paymentInformation.deliveryAddress &&
        this.paymentInformation.zipCode &&
        this.paymentInformation.country &&
        this.paymentInformation.city &&
        this.paymentInformation.emailAddress &&
        this.paymentInformation.phoneNumber
      ) {
        return true
      } else {
        return false
      }
    },
    buy: function () {
      console.log(this.paymentInformation)
    },
  },
  beforeMount() {
    // this.setCheckoutElements()
    // this.calculateTotalAmount()
    // if (localStorage.getItem('GalleryItems') == null) {
    //   this.galleryItems = []
    // }
  },
}
</script>
