<template>
  <CModal alignment="center" :visible="isVisible" @close="closeModal">
    <CModalHeader>
      <CModalTitle>Create New Item</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon1">N</CInputGroupText>
        <CFormInput
          v-model="model.Name"
          placeholder="Size Name"
          aria-label="Name"
          aria-describedby="basic-addon1"
        />
      </CInputGroup>
      <CInputGroup class="mb-3">
        <CInputGroupText id="basic-addon2">D</CInputGroupText>
        <CFormInput
          v-model="model.Description"
          placeholder="Description"
          aria-label="Description"
          aria-describedby="basic-addon2"
        />
      </CInputGroup>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="closeModal"> Close </CButton>
      <CButton @click="saveChanges" color="primary">Save changes</CButton>
    </CModalFooter>
  </CModal>
</template>
<script>
export default {
  props: ['isVisible'],
  data() {
    const model = {
      Name: '',
      Description: '',
    }
    return {
      model,
    }
  },
  methods: {
    closeModal: function () {
      this.$emit('closeModal')
    },
    saveChanges: function () {
      //console.log(this.model)
      this.$emit('create', this.model)
    },
  },
  beforeMount() {},
}
</script>
