<template>
  <CModal alignment="center" :visible="isVisible" @close="closeModal">
    <CModalHeader>
      <CModalTitle>Create New Item{{ model.itemName }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon1">N</CInputGroupText>
        <CFormInput
          v-model="model.itemName"
          placeholder="Item Name"
          aria-label="ItemName"
          aria-describedby="basic-addon1"
        />
      </CInputGroup>
      <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon2">D</CInputGroupText>
        <CFormInput
          v-model="model.description"
          placeholder="Description"
          aria-label="Description"
          aria-describedby="basic-addon2"
        />
      </CInputGroup>
      <CInputGroup class="mb-3">
        <VueMultiselect
          v-model="selectedSize"
          :options="sizes"
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
        v-for="(item, index) in selectedSizes"
        :key="item.id"
      >
        <CInputGroupText id="basic-addon1"
          >{{ index + 1 }}: {{ item.name }} -
          {{ item.description }}</CInputGroupText
        >
        <CFormInput
          v-model.number="model.prices[index].price"
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
          v-for="(item, index) in model.tags"
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
            v-for="(image, index) in model.images"
            :key="image"
            @click="removeImage(index)"
            class="w-25 border border-dark"
          >
            <img class="w-100" :src="image" />
          </div>
        </div>
      </div>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="closeModal"> Close </CButton>
      <CButton @click="saveChanges" color="primary">Save changes</CButton>
    </CModalFooter>
  </CModal>
</template>
<script>
import { ref } from 'vue'
import VueMultiselect from 'vue-multiselect'
import nameIcon from '@/assets/images/icons/name-icon.png'
import 'vue-multiselect/dist/vue-multiselect.css'
export default {
  props: ['isVisible'],
  components: { VueMultiselect },
  data() {
    const model = {
      itemName: '',
      description: '',
      tags: [],
      images: [],
      prices: [],
    }
    const sizes = []
    const selectedSize = ref()
    const selectedSizes = []
    const tag = ''
    return {
      nameIcon,
      model,
      sizes,
      selectedSize,
      tag,
      selectedSizes,
    }
  },
  methods: {
    closeModal: function () {
      this.$emit('closeModal')
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
      this.selectedSizes.push(sizePriceObj)
      this.model.prices.push(tempPriceObj)
    },
    removeSize: function (size) {
      this.selectedSizes = this.selectedSizes.filter((x) => x.sizeId != size.id)
    },
    addTag: function () {
      this.model.tags.push(this.tag)
      this.tag = ''
      //console.log(this.model.tags)
    },
    removeTag: function (index) {
      this.model.tags.splice(index, 1)
    },
    uploadImage: function (el) {
      for (let i = 0; i < el.target.files.length; i++) {
        let file = el.target.files[i]
        const reader = new FileReader()
        let rawImg
        reader.onloadend = () => {
          rawImg = reader.result
          //console.log(rawImg.slice(10, 18))
          this.model.images.push(rawImg)
        }
        reader.readAsDataURL(file)
      }
    },
    removeImage: function (index) {
      this.model.images.splice(index, 1)
    },
    saveChanges: function () {
      //console.log(this.model)
      this.$emit('create', this.model)
    },
  },
  beforeMount() {
    //console.log('salam')
    fetch('https://rassmin.com/api/Size/GetSizes')
      .then((response) => response.json())
      .then((data) => (this.sizes = data.data))
  },
}
</script>
