<template>
  <div class="top-triangle-parent position-relative">
    <div class="top-triangle" :style="{ right: right + 'px' }"></div>
  </div>
</template>
<style lang="scss">
.top-triangle-parent {
  border: 1px solid black;
  .top-triangle {
    position: absolute;
    top: -17px;
    width: 22px;
    height: 17px;

    border-left-width: 3px;
    border-left-style: solid;
    border-left-color: transparent;

    border-right-width: 3px;
    border-right-style: solid;
    border-right-color: transparent;

    border-top-width: 3px;
    border-top-style: solid;
    border-top-color: transparent;

    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: transparent;
    transition: all 0.4s ease-in-out;
    &:before {
      content: '';
      display: block;
      position: absolute;
      left: -2px;
      bottom: -13px;
      transform: rotate(45deg) skew(10deg, 10deg);
      transition: all 0.4s ease-in-out;

      border-left-width: 3px;
      border-left-style: solid;
      border-left-color: black;

      border-top-width: 3px;
      border-top-style: solid;
      border-top-color: black;

      border-bottom-width: 3px;
      border-bottom-style: solid;
      border-bottom-color: transparent;

      border-right-width: 3px;
      border-right-style: solid;
      border-right-color: transparent;

      width: 20px;
      height: 20px;
      background: white;
    }
  }
}

// .top-triangle {
//   position: absolute;
//   top: 0;
//   right: 0px;
//   border-top: 10px solid transparent;
//   border-left: 10px solid transparent;
//   border-bottom: 10px solid blue;
//   border-right: 10px solid transparent;
//   //transform: rotate(90deg);
// }
</style>
<script>
export default {
  name: 'TriangleBorderTop',
  props: ['right'],
}
</script>
