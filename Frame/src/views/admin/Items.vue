<template>
  <div>
    <div class="display-3 dune-rise text-center">Items</div>
    <ItemModal
      :isVisible="isItemModalActive"
      :data="passedItemData"
      @create="createItem"
      @update="updateItem"
      @closeModal="closeItemModal"
      @sizeLoadFailed="setErrorValue('true', 'Can not load sizes')"
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

    <RefreshButton
      v-if="errorData.isActive"
      :text="errorData.messages"
      @refresh="refreshItems"
    ></RefreshButton>
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
import RefreshButton from '@/components/RefreshButton.vue'
export default {
  name: 'Items',
  components: {
    ItemModal,
    CheckSuccessElement,
    RefreshButton,
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
    const errorData = {
      messages: [],
      isActive: false,
      status: 0,
    }
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
      errorData,
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
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          this.errorData.status = response.status
          throw new Error('Something went wrong')
        })
        .then((data) => {
          this.errorData.status = 200
          this.dbData = data
        })
        .catch(() => {
          this.setErrorValue(true, 'Can not load items')
        })
    },
    setErrorValue: function (state, message) {
      this.errorData.isActive = state
      var isExist = this.errorData.messages.includes(message)
      if (!isExist) {
        this.errorData.messages.push(message)
      }
    },
    refreshItems: function () {
      if (this.errorData.status == 403) {
        this.$router.push({ name: 'Login' })
      } else {
        this.setErrorValue(false, '')
        this.getDbData()
      }
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
