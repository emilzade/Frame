<template>
  <CModal alignment="center" :visible="isVisible" @close="closeModal">
    <CModalHeader>
      <CModalTitle
        ><span v-if="this.data != ''">Update</span
        ><span v-else>Create New</span> Size</CModalTitle
      >
    </CModalHeader>
    <CModalBody>
      <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon1">N</CInputGroupText>
        <CFormInput
          v-model="passedData.name"
          placeholder="Size Name"
          aria-label="Name"
          aria-describedby="basic-addon1"
        />
      </CInputGroup>
      <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon2">D</CInputGroupText>
        <CFormInput
          v-model="this.passedData.description"
          placeholder="Description"
          aria-label="Description"
          aria-describedby="basic-addon2"
        />
      </CInputGroup>
      <div v-if="this.data != ''">
        <CFormLabel>Is Active ?</CFormLabel> <br />
        <!--eslint-disable vue/no-mutating-props-->
        <switches
          :value="data.enabled"
          theme="bootstrap"
          color="info"
          @click="data.enabled = !data.enabled"
          type-bold="true"
        ></switches>
      </div>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="closeModal"> Close </CButton>
      <CButton @click="saveChanges" color="primary">Save changes</CButton>
    </CModalFooter>
  </CModal>
</template>
<script>
import { CInputGroup } from '@coreui/vue'
import Switches from 'vue-switches'
export default {
  props: ['isVisible', 'data'],
  components: { Switches, CInputGroup },
  data() {
    const model = {
      name: '',
      description: '',
    }
    return {
      model,
    }
  },
  computed: {
    passedData() {
      return this.data != '' ? this.data : this.model
    },
  },
  methods: {
    closeModal: function () {
      this.$emit('closeModal')
    },
    saveChanges: function () {
      this.data != ''
        ? this.$emit('update', {
            id: this.passedData.id,
            name: this.passedData.name,
            description: this.passedData.description,
            enabled: this.passedData.enabled == true ? 1 : 0,
          })
        : this.$emit('create', {
            name: this.passedData.name,
            description: this.passedData.description,
          })
    },
    triggerIsActive: function (a) {
      this.enabled = a.target.checked
    },
  },
  mounted() {},
  beforeMount() {},
}
</script>
