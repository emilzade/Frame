<template>
  <div class="position-absolute top-0 p-5 pt-5">
    <div class="gallery-hover-menu shadow mt-5">
      <TriangleBorderTop :right="right"></TriangleBorderTop>
      <CRow class="p-5">
        <CCol class="col-3 d-flex justify-content-center align-items-center">
          <ul>
            <li>Popular</li>
            <li>On Sale</li>
            <li>Newly added</li>
          </ul>
        </CCol>
        <CCol class="col-6 d-flex flex-column justify-content-center">
          <p class="text-center">Categories</p>
          <ul
            style="columns: 2"
            class="text-center list-style-none gap-5 text-secondary"
          >
            <li>Abstradefct</li>
            <li>Abstefract</li>
            <li>Abstefract</li>
            <li>Absteftract</li>
            <li>Abseffftract</li>
            <li>Abstefefract</li>
            <li>Abstract1</li>
            <li>Absefftract</li>
            <li>Absefefefract</li>
            <li>Abstract</li>
          </ul>
        </CCol>
        <CCol class="col-3 d-flex align-items-center justify-content-center">
          <div class="p-2 w-75 m-auto">
            <img class="w-100" src="../assets/images/carousel-2.jpg" />
          </div>
        </CCol>
      </CRow>
    </div>
  </div>
</template>
<style>
.gallery-hover-menu {
  transition: 0.3s;
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  background-color: white;
  opacity: 0;
  visibility: hidden;
  /* background-color: white; */
}
</style>
<script>
import TriangleBorderTop from './TriangleBorderTop.vue'
export default {
  name: 'GalleryHoverMenu',
  props: ['right'],
  components: { TriangleBorderTop },
}
</script>
