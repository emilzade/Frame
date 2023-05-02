<template>
  <CButtonGroup role="group" aria-label="Button Group">
    <router-link
      :to="{
        name: elementType,
        params: {
          id: elementId,
        },
      }"
    >
      <CButton color="secondary">
        <CIcon :content="cilInfo" />
      </CButton>
    </router-link>
    <CButton color="info">
      <CIcon :content="cilSettings" />
    </CButton>
    <CButton color="danger">
      <CIcon :content="cilTrash" />
    </CButton>
  </CButtonGroup>
</template>
<script>
import { cilInfo, cilTrash, cilSettings } from '@coreui/icons'

export default {
  name: 'EditButtonGroup',
  props: ['elementType', 'elementId'],
  data() {
    return {
      cilInfo,
      cilTrash,
      cilSettings,
    }
  },
}
</script>
