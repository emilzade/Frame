<template>
  <div>
    <div class="display-3 dune-rise text-center">Items</div>
    <ItemModal
      :isVisible="isItemModalActive"
      :data="passedItemData"
      @create="createItem"
      @update="updateItem"
      @closeModal="closeItemModal"
    ></ItemModal>
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
      <CButton @click="openCreateItemModal" color="success">Create</CButton>
    </div>
    <div>
      <CFormInput class="w-75 m-auto" placeholder="Search Here" type="search" />
    </div>
    <CRow class="w-50 m-auto pt-4">
      <CCol
        class="border rounded col-12 py-3 my-1 d-flex justify-content-between align-items-center"
        v-for="item in dbData.data"
        :key="item.id"
      >
        <div>{{ item.itemName }}</div>
        <CButtonGroup role="group" aria-label="Button Group">
          <router-link
            :to="{
              name: 'Item',
              params: {
                id: item.id,
              },
            }"
          >
            <CButton color="secondary">
              <CIcon :content="cilInfo" />
            </CButton>
          </router-link>
          <CButton @click="openUpdateItemModal(item)" color="info">
            <CIcon :content="cilSettings" />
          </CButton>
          <CButton color="danger">
            <CIcon :content="cilTrash" />
          </CButton>
        </CButtonGroup>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import ItemModal from '@/components/ItemModal.vue'
import { cilArrowLeft, cilInfo, cilTrash, cilSettings } from '@coreui/icons'
import CheckSuccessElement from '@/components/CheckSuccessElement.vue'

export default {
  name: 'Items',
  components: {
    ItemModal,
    CheckSuccessElement,
  },
  data() {
    const dbData = {
      success: false,
      date: '',
      length: 1,
      sort: '',
      data: [],
    }
    const isItemModalActive = false
    const passedItemData = ''
    const actionName = ''
    const isActionSuccess = false
    const isActionCompleted = false
    return {
      dbData,
      cilArrowLeft,
      cilInfo,
      cilTrash,
      cilSettings,
      isItemModalActive,
      passedItemData,
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
      fetch(`https://rassmin.com/api/Item/GetItems?sort=asc`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => (this.dbData = data))
    },
    openCreateItemModal: function () {
      this.isItemModalActive = true
      this.passedItemData = ''
    },
    openUpdateItemModal: function (item) {
      console.log(item)
      this.isItemModalActive = true
      this.passedItemData = item
    },
    closeItemModal: function () {
      this.isItemModalActive = false
    },
    createItem: function (model) {
      console.log(model)
    },
    updateItem: function (model) {
      console.log(model)
    },
  },
  beforeMount() {
    this.getDbData()
  },
}
</script>
