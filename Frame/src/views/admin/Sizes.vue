<template>
  <div>
    <div class="display-3 dune-rise text-center">Sizes</div>
    <SizeModal
      :isVisible="isSizeModalActive"
      :data="passedSizeData"
      @create="submitCreateSize"
      @closeModal="closeCreateModal"
    ></SizeModal>
    <div class="d-flex justify-content-between px-5">
      <CButton color="secondary">
        <CIcon :content="cilArrowLeft" />
      </CButton>
      <CButton @click="createSize" color="success">Create</CButton>
    </div>
    <div>
      <CFormInput class="w-75 m-auto" placeholder="Search Here" type="search" />
    </div>
    <CRow class="w-50 m-auto pt-4">
      <CCol
        class="border rounded col-12 py-3 my-1 d-flex justify-content-between align-items-center"
        v-for="size in dbData.data"
        :key="size.id"
      >
        <div>{{ size.name }}</div>
        <CButtonGroup role="group" aria-label="Button Group">
          <router-link
            :to="{
              name: 'Size',
              params: {
                id: size.id,
              },
            }"
          >
            <CButton color="secondary">
              <CIcon :content="cilInfo" />
            </CButton>
          </router-link>
          <CButton @click="updateSize(size)" color="info">
            <CIcon :content="cilSettings" />
          </CButton>
          <CButton color="danger">
            <CIcon :content="cilTrash" />
          </CButton>
        </CButtonGroup>
        <!-- <EditButtonGroup :elementType="'Size'" :elementId="size.id" /> -->
      </CCol>
    </CRow>
  </div>
</template>
<script>
//import EditButtonGroup from '@/components/EditButtonGroup.vue'
import SizeModal from '@/components/SizeModal.vue'
import { cilArrowLeft, cilInfo, cilTrash, cilSettings } from '@coreui/icons'
export default {
  name: 'Sizes',
  components: {
    //EditButtonGroup,
    SizeModal,
  },
  data() {
    const dbData = {
      success: false,
      date: '',
      length: 1,
      data: [],
    }
    const isSizeModalActive = false
    const passedSizeData = ''
    return {
      dbData,
      cilArrowLeft,
      cilInfo,
      cilTrash,
      cilSettings,
      isSizeModalActive,
      passedSizeData,
    }
  },
  computed: {
    token() {
      return this.$store.state.auth.token
    },
  },
  methods: {
    getDbData: function () {
      fetch(`https://rassmin.com/api/Size/GetSizes`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          this.dbData = data
        })
    },
    createSize: function () {
      this.isSizeModalActive = true
      this.passedSizeData = ''
    },
    updateSize: function (size) {
      console.log(size)
      this.isSizeModalActive = true
      this.passedSizeData = size
    },
    closeCreateModal: function () {
      this.isSizeModalActive = false
    },
    submitCreateSize: function (model) {
      fetch('https://rassmin.com/api/Size/CreateSize', {
        method: 'Post',
        body: model,
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
          Authorization: `Token ${this.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
      console.log(this.token)
    },
  },
  beforeMount() {
    this.getDbData()
  },
}
</script>
