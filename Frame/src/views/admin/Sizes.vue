<template>
  <div>
    <div class="display-3 dune-rise text-center">Sizes</div>
    <SizeModal
      :isVisible="isSizeModalActive"
      :data="passedSizeData"
      @create="createSize"
      @update="updateSize"
      @closeModal="closeSizeModal"
    ></SizeModal>
    <Transition name="fade">
      <CheckSuccessElement
        v-if="isActionCompleted"
        :itemName="'Size'"
        :actionName="actionName"
        :isSuccess="isActionSuccess"
      ></CheckSuccessElement>
    </Transition>
    <div class="d-flex justify-content-between px-5 py-4">
      <CButton color="secondary">
        <CIcon :content="cilArrowLeft" />
      </CButton>
      <CButton @click="openCreateSizeModal" color="success">Create</CButton>
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
          <CButton @click="openUpdateSizeModal(size)" color="info">
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
import CheckSuccessElement from '@/components/CheckSuccessElement.vue'
export default {
  name: 'Sizes',
  components: {
    //EditButtonGroup,
    SizeModal,
    CheckSuccessElement,
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
    const actionName = ''
    const isActionSuccess = false
    const isActionCompleted = false
    return {
      dbData,
      cilArrowLeft,
      cilInfo,
      cilTrash,
      cilSettings,
      isSizeModalActive,
      passedSizeData,
      actionName,
      isActionSuccess,
      isActionCompleted,
    }
  },
  computed: {
    token() {
      return this.$store.state.auth.token
    },
  },
  methods: {
    getDbData: function () {
      fetch(`https://rassmin.com/api/Size/GetSizes`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          this.dbData = data
        })
    },
    openCreateSizeModal: function () {
      this.isSizeModalActive = true
      this.passedSizeData = ''
    },
    openUpdateSizeModal: function (size) {
      console.log(size)
      this.isSizeModalActive = true
      this.passedSizeData = size
    },
    closeSizeModal: function () {
      this.isSizeModalActive = false
    },
    createSize: function (model) {
      console.log(model)
      this.actionName = 'create'
      fetch('https://rassmin.com/api/Size/CreateSize', {
        method: 'Post',
        body: JSON.stringify(model),
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          this.isSizeModalActive = false
          this.isActionCompleted = true
          data.success == true
            ? (this.isActionSuccess = true)
            : (this.isActionSuccess = false)
          setTimeout(() => {
            this.isActionCompleted = false
          }, 2000)
        })
      console.log(this.token)
    },
    updateSize: function (model) {
      console.log(model)
      this.actionName = 'update'
      fetch('https://rassmin.com/api/Size/UpdateSize', {
        method: 'PUT',
        body: JSON.stringify(model),
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          this.isSizeModalActive = false
          this.isActionCompleted = true
          data.success == true
            ? (this.isActionSuccess = true)
            : (this.isActionSuccess = false)
          setTimeout(() => {
            this.isActionCompleted = false
          }, 2000)
        })
      console.log(this.token)
    },
  },
  beforeMount() {
    this.getDbData()
  },
}
</script>
