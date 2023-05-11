<template>
  <CModal alignment="center" :visible="isVisible" @close="closeModal">
    <CModalHeader>
      <CModalTitle
        ><span v-if="this.data != ''">Update</span
        ><span v-else>Create New</span> Item</CModalTitle
      >
    </CModalHeader>
    <CModalBody>
      <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon1">N</CInputGroupText>
        <CFormInput
          v-model="passedData.itemName"
          placeholder="Item Name"
          aria-label="ItemName"
          aria-describedby="basic-addon1"
        />
      </CInputGroup>
      <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon2">D</CInputGroupText>
        <CFormInput
          v-model="passedData.description"
          placeholder="Description"
          aria-label="Description"
          aria-describedby="basic-addon2"
        />
      </CInputGroup>
      <CInputGroup class="mb-3">
        <VueMultiselect
          v-model="selectedSize"
          :options="dbSizes.data"
          :limit="1"
          :multiple="true"
          :allow-empty="false"
          deselect-label="Please select at leat 1 element"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          :placeholder="'Select Size'"
          label="name"
          track-by="id"
          @select="selectSize"
          @remove="removeSize"
          class="border border-secondary rounded"
        />
      </CInputGroup>
      <CInputGroup
        class="mb-3"
        v-for="(item, index) in sizePriceArr"
        :key="index"
      >
        <CInputGroupText id="basic-addon1"
          >{{ index + 1 }}: {{ item.name }} -
          {{ item.description }}</CInputGroupText
        >
        <CFormInput
          v-model.number="passedData.prices[index].price"
          type="number"
          placeholder="Price"
          aria-label="Price"
          aria-describedby="basic-addon1"
        ></CFormInput>
      </CInputGroup>
      <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon4">#</CInputGroupText>
        <CFormInput
          v-model="tag"
          placeholder="Tags"
          aria-label="Tags"
          aria-describedby="basic-addon4"
        />
        <CFormInput @click="addTag" type="button" value="Add" />
      </CInputGroup>
      <div class="mb-3">
        <CBadge
          class="me-2"
          v-for="(item, index) in passedData.tags"
          :key="item"
          color="dark"
          @click="removeTag(index)"
          >{{ item }}</CBadge
        >
      </div>
      <div class="mb-3">
        <CFormInput
          type="file"
          accept="image/jpeg/*"
          @change="uploadImage"
          multiple
          class="mb-3"
        />
        <div class="d-flex align-items-center gap-3 py-2">
          <div
            v-for="(image, index) in passedData.images"
            :key="image"
            @click="removeImage(index)"
            class="w-25 border border-dark"
          >
            <img class="w-100" :src="image" />
          </div>
        </div>
      </div>
    </CModalBody>
    <div v-for="(item, index) in sizePriceArr" :key="index">
      {{ item }} {{ index }}
    </div>
    <div @click="salam">salam</div>
    <CModalFooter>
      <CButton color="secondary" @click="closeModal"> Close </CButton>
      <CButton @click="saveChanges" color="primary">Save changes</CButton>
    </CModalFooter>
  </CModal>
</template>
<script>
import { ref } from 'vue'
import { CInputGroup } from '@coreui/vue'
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'
export default {
  props: ['isVisible', 'data'],
  components: { CInputGroup, VueMultiselect },
  data() {
    const model = {
      itemName: '',
      description: '',
      tags: [],
      images: [],
      prices: [],
    }
    const dbSizes = {
      date: '',
      length: '',
      success: false,
      data: [],
    }
    const selectedSize = ref()
    const tag = ''
    return {
      model,
      statusId: -1,
      tag,
      dbSizes,
      selectedSize,
      createPrices: [],
    }
  },
  computed: {
    passedData() {
      return this.data != ''
        ? {
            ...this.data,
            // eslint-disable-next-line no-unused-vars
            prices: this.data.prices.map(({ name, description, ...rest }) => {
              return rest
            }),
          }
        : this.model
    },
    sizePriceArr() {
      return this.data != ''
        ? this.passedData.prices.map((x) => ({
            sizeId: x.sizeId,
            name: this.dbSizes.data.find((a) => a.id == x.sizeId).name,
            description: this.dbSizes.data.find((a) => a.id == x.sizeId)
              .description,
            price: 0,
          }))
        : this.createPrices
    },
    // passedSizePriceArray() {
    //   return this.data != ''
    //     ? this.passedData.prices.map((obj) => ({
    //         sizeId: obj.sizeId,
    //         name: this.dbSizes.data.find((x) => x.id == obj.sizeId).name,
    //         description: this.dbSizes.data.find((x) => x.id == obj.sizeId)
    //           .description,
    //         price: obj.price,
    //       }))
    //     : []
    // },
    token() {
      return this.$store.state.auth.token
    },
  },
  methods: {
    closeModal: function () {
      this.selectedSize = ref()
      this.$emit('closeModal')
    },
    saveChanges: function () {
      this.data != ''
        ? this.$emit('update', this.passedData)
        : this.$emit('create', this.passedData)
    },
    addTag: function () {
      this.passedData.tags.push(this.tag)
      this.tag = ''
      //console.log(this.model.tags)
    },
    removeTag: function (index) {
      this.passedData.tags.splice(index, 1)
    },
    salam: function () {
      console.log(this.sizePriceArr)
    },
    selectSize: function (size) {
      var sizePriceObj = {
        sizeId: size.id,
        name: size.name,
        description: size.description,
        price: 0,
      }

      var tempPriceObj = {
        sizeId: size.id,
        price: 0,
      }
      //var isExist = this.passedData.prices.some((x) => x.sizeId == size.id)

      if (this.data != '') {
        //eslint-disable-next-line vue/no-mutating-props
        this.data.prices.push(sizePriceObj)
      } else {
        this.sizePriceArr.push(sizePriceObj)
        this.passedData.prices.push(tempPriceObj)
      }

      console.log(this.sizePriceArr)
    },
    removeSize: function (size) {
      if (this.data != '') {
        //eslint-disable-next-line vue/no-mutating-props
        this.data.prices = this.data.prices.filter((x) => x.sizeId != size.id)
        this.passedData.prices = this.data.prices.filter(
          (x) => x.sizeId != size.id,
        )
      } else {
        this.model.prices = this.model.prices.filter((x) => x.sizeId != size.id)
        this.sizePriceArr = this.sizePriceArr.filter((x) => x.sizeId != size.id)
        this.createPrices = this.createPrices.filter((x) => x.sizeId != size.id)
      }
    },
    uploadImage: function (el) {
      for (let i = 0; i < el.target.files.length; i++) {
        let file = el.target.files[i]
        const reader = new FileReader()
        let rawImg
        reader.onloadend = () => {
          rawImg = reader.result
          //console.log(rawImg.slice(10, 18))
          this.passedData.images.push(rawImg)
        }
        reader.readAsDataURL(file)
      }
    },
    removeImage: function (index) {
      this.passedData.images.splice(index, 1)
    },
    getDbData: function () {
      fetch('https://rassmin.com/api/Size/GetSizes', {
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
          throw new Error('Something went wrong')
        })
        .then((data) => {
          this.dbSizes = data
          console.log(data)
        })
        .catch(() => {
          this.$emit('sizeLoadFailed')
        })
    },
  },
  mounted() {},
  beforeMount() {
    // if (this.data != '') {
    //   for (var i = 0; this.data.prices.length; i++) {
    //     this.passedSizePriceArray.push(this.data.prices[i])
    //   }
    // }
    this.getDbData()
  },
}
</script>
