<template>
  <div class="w-100">
    <div class="d-none d-md-block border-end px-2">
      <div class="pt-3 transition-05">
        <div>
          <p class="gallery-filter-element px-2">Popular</p>
          <p class="gallery-filter-element px-2">Popular</p>
          <p class="gallery-filter-element px-2">On Sale</p>
          <p class="gallery-filter-element px-2">Newly Added</p>
        </div>
        <div
          class="d-flex flex-column justify-content-between align-items-center"
        >
          <p class="p-0 m-0">Price</p>
          <div class="d-flex justify-content-between align-items-center gap-2">
            <CFormInput placeholder="Min" /> - <CFormInput placeholder="Max" />
          </div>
        </div>
      </div>
    </div>
    <div class="d-md-none text-center border-bottom">
      <div @click="isCategoriesExpanded = !isCategoriesExpanded">
        <div
          class="toggle-menu d-md-none"
          :class="{
            'active ': isCategoriesExpanded,
          }"
        >
          <i></i>
          <i></i>
          <i></i>
        </div>
      </div>
      <div
        :style="[
          isCategoriesExpanded
            ? { height: `${categoriesHeight}px` }
            : { height: '0px' },
        ]"
        :class="{
          'categories-sm-expanded': isCategoriesExpanded,
          'categories-sm-closed': !isCategoriesExpanded,
        }"
        ref="categoriesSm"
        class="transition-05 categories-sm-default overflow-hidden"
      >
        <div class="">
          <p class="gallery-filter-element p-2 m-0">Popular</p>
          <p class="gallery-filter-element p-2 m-0">Popular</p>
          <p class="gallery-filter-element p-2 m-0">On Sale</p>
          <p class="gallery-filter-element p-2 m-0">Newly Added</p>
        </div>
        <div
          class="d-flex flex-column justify-content-between align-items-center p-2"
        >
          <p class="p-0 m-0">Price</p>
          <div class="d-flex justify-content-between align-items-center gap-2">
            <CFormInput placeholder="Min" /> - <CFormInput placeholder="Max" />
          </div>
        </div>
        <div class="border border-dark p-3 bg-light">Search</div>
      </div>
    </div>
    <!-- <div
      class="d-md-none overlay overlay-gallery-menu"
      v-if="isCategoriesExpanded"
      @click="isCategoriesExpanded = !isCategoriesExpanded"
    ></div> -->
  </div>
</template>
<style lang="scss">
.categories-sm-default {
  z-index: 9999;
  box-shadow: 0px -35px 60px -16px rgba(0, 0, 0, 0.29) inset;
}
</style>
<script>
import { ref } from 'vue'
import { cilMenu, cilX } from '@coreui/icons'

export default {
  data() {
    const isCategoriesExpanded = ref(false)
    const categoriesHeight = 0
    return {
      cilMenu,
      cilX,
      isCategoriesExpanded,
      categoriesHeight,
    }
  },
  methods: {},
  mounted() {
    for (let i = 0; i < this.$refs.categoriesSm.children.length; i++) {
      this.categoriesHeight += this.$refs.categoriesSm.children[i].clientHeight
    }
  },
}
</script>
