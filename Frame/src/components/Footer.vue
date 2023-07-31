<template>
  <div class="container text-center">
    <CRow class="w-100 justify-content-center">
      <CCol
        class="col-md-4 col-6 d-flex flex-column gap-2 justify-content-center p-2"
      >
        <div>Popular</div>
        <div>On Sale</div>
        <div>Newly Added</div>
      </CCol>
      <CCol
        class="col-md-4 col-6 d-flex flex-column gap-2 justify-content-center p-2"
      >
        <div><b>Categories</b></div>
        <div>Abstract</div>
        <div>Abstract</div>
        <div>Abstract</div>
        <div>Abstract</div>
        <div>Abstract</div>
        <div>Abstract</div>
      </CCol>
      <CCol
        class="col-md-4 col-6 d-flex flex-column gap-2 justify-content-center p-2"
      >
        <router-link
          :to="{
            name: 'About',
          }"
          >About
        </router-link>
        <router-link
          :to="{
            name: 'Contact',
          }"
          >Contact
        </router-link>
        <router-link
          :to="{
            name: 'TermsAndConditions',
          }"
          >Terms and Conditions
        </router-link>
        <router-link
          :to="{
            name: 'Career',
          }"
          >Careers
        </router-link>
        <router-link
          :to="{
            name: 'Partnership',
          }"
          >Partnership
        </router-link>
        <router-link
          :to="{
            name: 'Faq',
          }"
          >FAQ
        </router-link>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import img from '../assets/images/carousel-1.jpg'
export default {
  name: 'Footer',
  data() {
    return { img }
  },
}
</script>
