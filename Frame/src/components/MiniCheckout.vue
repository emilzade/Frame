<template>
  <div class="mini-checkout-parent pt-4" style="background-color: white">
    <TriangleBorderTop :right="right"></TriangleBorderTop>
    <div class="mini-checkout py-2 pt-3 shadow">
      <div style="max-height: 400px; overflow-y: auto">
        <div
          v-for="item in basketData.data"
          :key="item.item_PriceId"
          class="d-flex justify-content-between align-items-center px-3 py-2 gap-2"
        >
          <div class="border" style="width: 5rem">
            <img :src="item.imagepath" alt="image" class="w-100" />
          </div>
          <div class="d-flex flex-column justify-content-around w-50">
            <div>{{ item.itemName }}</div>
            <div>{{ item.price }}₼</div>

            <div style="width: 80px" class="d-flex align-items-center border">
              <div
                @click="item.count--"
                class="cursor-pointer"
                style="width: 20px; box-shadow: none"
              >
                <CIcon :content="cilMinus" />
              </div>
              <CFormInput
                style="border-radius: 0px; border: 0; width: 40px"
                type="text"
                class="border-0"
                :value="item.count"
              />
              <div
                @click="item.count++"
                class="cursor-pointer"
                style="width: 20px; box-shadow: none"
              >
                <CIcon :content="cilPlus" />
              </div>
            </div>
          </div>
          <div class="p-2 cursor-pointer">
            <img style="width: 1rem" :src="remove" />
          </div>
        </div>
      </div>
      <router-link v-if="isAuthenticated" :to="{ name: 'Checkout' }">
        <div class="bg-black text-light w-75 m-auto py-2 px-3 text-center">
          Checkout
        </div>
      </router-link>
      <router-link v-else :to="{ name: 'Login' }">
        <div class="bg-black text-light w-75 m-auto py-2 px-3 text-center">
          Login to use checkout
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

import { cilPlus, cilMinus } from '@coreui/icons'
import remove from '@/assets/icons/remove.svg'
export default {
  name: 'MiniCheckout',
  props: ['basketData', 'right', 'isAuthenticated'],
  components: { TriangleBorderTop },
  data() {
    return {
      remove,
      cilPlus,
      cilMinus,
    }
  },
  beforeMount() {},
}
</script>
