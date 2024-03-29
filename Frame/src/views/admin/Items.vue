<template>
  <div class="position-relative">
    <div class="display-3 montserrat-medium text-center">Items</div>
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
      <router-link :to="{ name: 'AdminIndex' }">
        <CButton color="secondary">
          <CIcon :content="cilArrowLeft" />
        </CButton>
      </router-link>
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
    <CTable align="middle" responsive class="w-50 m-auto text-center">
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Name</CTableHeaderCell>
          <CTableHeaderCell>Operations</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="item in dbData.data" :key="item.id">
          <CTableDataCell>{{ item.itemName }} </CTableDataCell>
          <CTableDataCell>
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
              <CButton
                v-if="item.statusId == 1"
                @click="updateStatusOfItem(item)"
                color="success"
              >
                <CIcon :content="cilGlobeAlt" />
              </CButton>
              <CButton v-else @click="updateStatusOfItem(item)" color="warning">
                <CIcon :content="cilClock" />
              </CButton>
              <CButton @click="openUpdateItemModal(item)" color="info">
                <CIcon :content="cilSettings" />
              </CButton>
              <CButton color="danger">
                <CIcon :content="cilTrash" />
              </CButton>
            </CButtonGroup>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
    <div class="d-flex justify-content-center text-center pt-3">
      <pagination
        v-model="currentPage"
        :records="dbData.length"
        :per-page="perPageElementCount"
        @paginate="pageSelected"
        :options="{ chunk: 8 }"
      />
    </div>
  </div>
</template>
<script>
import ItemModal from '@/components/ItemModal.vue'
import {
  cilArrowLeft,
  cilInfo,
  cilTrash,
  cilSettings,
  cilGlobeAlt,
  cilClock,
} from '@coreui/icons'
import Pagination from 'v-pagination-3'
import CheckSuccessElement from '@/components/CheckSuccessElement.vue'
import RefreshButton from '@/components/RefreshButton.vue'
export default {
  name: 'Items',
  components: {
    Pagination,
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
    const perPageElementCount = 10
    const currentPage = 1
    return {
      dbData,
      cilArrowLeft,
      cilInfo,
      cilTrash,
      cilSettings,
      cilGlobeAlt,
      cilClock,
      isItemModalActive,
      passedItemData,
      actionName,
      isActionSuccess,
      isActionCompleted,
      errorData,

      perPageElementCount,
      currentPage,
    }
  },
  computed: {
    token() {
      return this.$store.state.auth.token
    },
  },
  methods: {
    getDbData: function (pageId) {
      fetch(
        `https://rassmin.com/api/Item/GetItems?sort=asc&pageSize=${this.perPageElementCount}&pageNumber=${pageId}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json;charset=UTF-8',
            Authorization: `Bearer ${this.token}`,
          },
        },
      )
        .then((response) => {
          console.log('response get')
          if (response.ok) {
            return response.json()
          }
          this.errorData.status = response.status
          throw new Error('Something went wrong')
        })
        .then((data) => {
          console.log(data)
          this.errorData.status = 200
          this.dbData = data
        })
        .catch(() => {
          this.setErrorValue(true, 'Can not load items')
        })
    },
    pageSelected: function (pageId) {
      this.getDbData(pageId)
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
        this.getDbData(1)
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
    updateStatusOfItem(item) {
      var statusid = item.statusId != 1 ? 1 : -1
      item = { ...item, statusId: statusid }
      this.updateItem(item)
    },
    closeItemModal: function () {
      this.isItemModalActive = false
    },
    createItem: function (model) {
      console.log(model)
      this.actionName = 'create'
      fetch('https://rassmin.com/api/Item/CreateItem', {
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
          this.isItemModalActive = false
          this.isActionCompleted = true
          data.success == true
            ? (this.isActionSuccess = true)
            : (this.isActionSuccess = false)
          this.getDbData(1)
          setTimeout(() => {
            this.isActionCompleted = false
          }, 2000)
        })
      console.log(this.token)
    },
    updateItem: function (model) {
      console.log(model)
      delete model.statusName
      delete model.createdDate
      model.prices = model.prices.map(
        // eslint-disable-next-line no-unused-vars
        ({ description, item_PriceId, name, ...keepAttributes }) =>
          keepAttributes,
      )
      this.actionName = 'update'
      fetch('https://rassmin.com/api/Item/UpdateItem', {
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
          this.isItemModalActive = false
          this.isActionCompleted = true
          data.success == true
            ? (this.isActionSuccess = true)
            : (this.isActionSuccess = false)
          this.getDbData(1)
          setTimeout(() => {
            this.isActionCompleted = false
          }, 2000)
        })
      console.log(this.token)
    },
  },
  beforeMount() {
    this.getDbData(1)
  },
}
</script>
