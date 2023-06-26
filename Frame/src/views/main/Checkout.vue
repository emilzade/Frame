<template>
  <div class="pt-5">
    <div v-if="basketItems.data.length == 0" class="pt-5">
      <div
        style="height: 80vh"
        class="d-flex flex-column justify-content-center align-items-center montserrat-medium"
      >
        <h1 class="display-1">It looks empty here...</h1>
        <div class="montserrat-thin">
          Go to <router-link :to="{ name: 'Gallery' }">Gallery</router-link> or
          <router-link :to="{ name: 'Collections' }">Collections</router-link>
          to explore more!
        </div>
      </div>
    </div>
    <CRow v-else class="pt-5 w-100" style="margin: 0px !important">
      <CCol class="col-md-6 col-12 border-end pt-5">
        <div
          v-for="(item, index) in basketItems.data"
          :key="item.id"
          class="border p-2 mx-5 my-2 d-flex justify-content-between align-items-center"
        >
          <div>{{ index + 1 }}.</div>
          <img style="width: 100px" src="../../assets/images/carousel-1.jpg" />
          <div>{{ item.itemName }}</div>
          <div class="border d-flex align-items-center gap-2">
            <div @click="minusQuantity(item)" class="p-2">
              <CIcon :content="cilMinus" />
            </div>
            <div class="user-select-none">{{ item.count }}</div>
            <div @click="plusQuantity(item)" class="p-2">
              <CIcon :content="cilPlus" />
            </div>
          </div>
          <div>{{ item.price * item.count }} ₼</div>
          <div class="btn btn-light">
            <CIcon :content="cilX" />
          </div>
        </div>
        <div class="d-flex justify-content-end mx-5 p-2 my-2">
          <div class="d-flex fs-4 gap-2">
            <span>TOTAL:</span
            ><span
              >{{
                basketItems.data.reduce((a, b) => {
                  return a.count * a.price + b.count * b.price
                })
              }}
              ₼</span
            >
          </div>
        </div>
      </CCol>
      <CCol class="col-md-6 col-12 border-start pt-5">
        <div class="col-12 p-2 form-group-custom d-flex justify-content-around">
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
              @click="selectPaymentType(paymentType)"
            />
            {{ paymentType.name }}</label
          >
        </div>
        <CheckoutCard
          style="min-height: 750px"
          v-if="selectedPaymentTypeId == 1"
          @submitPayment="submitPayment"
        ></CheckoutCard>

        <CForm v-if="selectedPaymentTypeId == 2" style="min-height: 750px">
          <CRow class="px-5 montserrat-thin">
            <div class="col-sm-6 col-12 p-2 form-group-custom mt-2">
              <CFormInput
                v-model="paymentInformation.firstName"
                class="input-custom border border-secondary rounded"
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
            <div class="col-sm-6 col-12 p-2 form-group-custom mt-2">
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
            <div class="col-12 p-2 form-group-custom mt-2">
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
            <div class="col-12 p-2 form-group-custom mt-2">
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
            <div class="col-sm-6 col-12 p-2 form-group-custom mt-2">
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
            <div class="col-sm-6 col-12 p-2 form-group-custom mt-2">
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
            <div class="col-12 p-2 form-group-custom mt-2">
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
            <div class="col-12 p-2 form-group-custom mt-2">
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
            <div class="accept-agreemen mt-2t">
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
                class="bg-black text-light p-2 w-100 montserrat-regular"
                value="Buy"
              />
            </div>
            <div v-else class="col-12 p-2 form-group-custom">
              <input
                type="button"
                class="bg-black text-light p-2 w-100 montserrat-regular"
                value="Buy"
                disabled
              />
            </div>
          </CRow>
        </CForm>
      </CCol>
    </CRow>
  </div>
</template>
<style>
.input-custom {
  height: 50px;
}
</style>
<script>
//import { ref } from 'vue'
import { cilPlus, cilMinus, cilX } from '@coreui/icons'
import CheckoutCard from '@/components/CheckoutCard.vue'
import { mapGetters } from 'vuex'
export default {
  components: { CheckoutCard },
  data() {
    const basketItems = {
      data: [],
      date: '',
      success: '',
    }
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
    const selectedPaymentTypeId = 1
    return {
      cilPlus,
      cilMinus,
      cilX,
      basketItems,
      sum: 0,
      isAccepted: false,
      paymentInformation,
      paymentTypes,
      selectedPaymentTypeId,
    }
  },
  computed: {
    ...mapGetters('auth', {
      getToken: 'getToken',
      getUserProfile: 'getUserProfile',
    }),
    token() {
      return this.$store.state.auth.token
    },
  },
  methods: {
    selectPaymentType: function (data) {
      this.selectedPaymentTypeId = data.id
      console.log(this.selectedPaymentTypeId)
    },
    minusQuantity: function (item) {
      if (item.count > 0) {
        item.count--
      }
    },
    plusQuantity: function (item) {
      if (item.count < 25) {
        item.count++
      }
    },
    removeElement: function (id) {
      this.sum -=
        this.basketItems.filter((x) => x.id == id)[0].price *
        this.basketItems.filter((x) => x.id == id)[0].quantity

      this.basketItems.splice(
        this.basketItems.indexOf(this.basketItems.filter((x) => x.id == id)[0]),
        1,
      )

      this.$store.commit(
        'setTotalQuantityInBasket',
        this.basketItems.data.length,
      )
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
    submitPayment: function () {
      console.log(this.basketItems)
      var model = {
        userId: JSON.parse(this.getUserProfile).id,
        paymentTypeId: 1,
        ordererFullName:
          JSON.parse(this.getUserProfile).name +
          ' ' +
          JSON.parse(this.getUserProfile).surname,
        ordererAddress: JSON.parse(this.getUserProfile).address,
        ordererEmail: JSON.parse(this.getUserProfile).email,
        ordererPhone: JSON.parse(this.getUserProfile).phone,
        orderItems: this.basketItems.data.map((item) => ({
          item_PriceId: item.item_PriceId,
          quantity: item.count,
        })),
      }
      console.log(model)
      fetch(`https://rassmin.com/api/Order/CreateOrder`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(model),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
    },
  },
  beforeMount() {
    fetch('https://rassmin.com/api/Cart/GetCartItems', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        this.basketItems = data
      })

    fetch(`https://rassmin.com/api/Order/GetOrders`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })

    fetch(`https://rassmin.com/api/OrderItem/GetOrderItems`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
  },
}
</script>
