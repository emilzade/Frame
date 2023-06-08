<template>
  <div class="shadow mini-checkout-parent pt-4" style="background-color: white">
    <TriangleBorderTop :right="right"></TriangleBorderTop>
    <div class="mini-checkout mx-3 py-2">
      <div
        v-for="item in basketData.data"
        :key="item.item_PriceId"
        class="d-flex justify-content-between align-items-center px-3 py-2 gap-2"
      >
        <div class="p-4 border border-dark"></div>
        <div class="d-flex flex-column justify-content-around text-center">
          <div>{{ item.itemName }}</div>
          <div>{{ item.price }}₼</div>
          <div>{{ item.count }}</div>
        </div>
        <div class="border border-dark p-2">x</div>
      </div>
      <router-link :to="{ name: 'Checkout' }">
        <div class="bg-dark text-light w-100 py-2 px-3 text-center">
          Checkout
        </div>
      </router-link>
    </div>
  </div>
</template>
<style lang="scss">
.mini-checkout-parent {
  transition: 0.4s;
  position: absolute;
  right: 30px;
  width: 350px;
  top: 72px;
  visibility: hidden;
  opacity: 0;
}
</style>
<script>
import TriangleBorderTop from './TriangleBorderTop.vue'
export default {
  name: 'MiniCheckout',
  props: ['basketData', 'right'],
  components: { TriangleBorderTop },
  beforeMount() {},
}
</script>
