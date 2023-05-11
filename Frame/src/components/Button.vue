<template>
  <!-- HTML !-->
  <div
    :class="{
      'custom-button-light-to-dark': color == 'lightToDark',
      'custom-button-dark-to-light': color == 'darkToLight',
      'custom-button-none-to-light': color == 'noneToLight',
      'custom-button-dark': color == 'dark',
      'custom-button-light': color == 'light',
    }"
    class="custom-button text-center"
    role="button"
  >
    <span class="text" v-if="text">{{ text }}</span>
    <span v-else>See More</span>
    <span v-if="alterText">{{ alterText }}</span>
    <span v-else>See More</span>
  </div>
</template>
<style>
.custom-button-light-to-dark {
  background: #fff;
  color: #18181a;
}
.custom-button-light-to-dark:after {
  background-color: rgb(33, 33, 33);
}
.custom-button-light-to-dark:hover span:last-child {
  color: #fff;
}
.custom-button-dark-to-light {
  background: #18181a;
  color: #fff;
}
.custom-button-dark-to-light:after {
  background-color: #fff;
}
.custom-button-dark-to-light:hover span:last-child {
  color: #18181a;
}
.custom-button-none-to-light {
  background: transparent;
  color: #fff;
  border: 1px solid white !important;
}
.custom-button-none-to-light:after {
  background-color: #fff;
}
.custom-button-none-to-light:hover span:last-child {
  color: #18181a;
}
.custom-button-light {
  background: #fff;
}
.custom-button-light:after {
  background: rgb(190, 190, 190);
}
.custom-button-light:hover span:last-child {
  color: #18181a;
}
.custom-button-dark {
  background: #18181a;
  color: #fff;
}
.custom-button-dark:after {
  background: #18181a;
}
.custom-button-dark:hover span:last-child {
  color: #fff;
}

.custom-button {
  position: relative;
  overflow: hidden;
  border: 1px solid #18181a;
  display: inline-block;
  font-size: 16px;
  line-height: 16px;
  padding: 18px;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
.custom-button span:first-child {
  position: relative;
  transition: color 600ms cubic-bezier(0.48, 0, 0.12, 1);
  z-index: 10;
}
.custom-button span:last-child {
  color: white;
  display: block;
  position: absolute;
  bottom: 0;
  transition: all 0.5s cubic-bezier(0.48, 0, 0.12, 1);
  z-index: 100;
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translateY(225%) translateX(-50%);
  height: 13px;
  line-height: 12px;
}
.custom-button:after {
  content: '';
  position: absolute;
  bottom: -50%;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: bottom center;
  transition: transform 600ms cubic-bezier(0.48, 0, 0.12, 1);
  transform: skewY(9.3deg) scaleY(0);
  z-index: 50;
}
.custom-button:hover:after {
  transform-origin: bottom center;
  transform: skewY(9.3deg) scaleY(2);
}
.custom-button:hover span:last-child {
  transform: translateX(-50%) translateY(-100%);
  opacity: 1;
  transition: all 900ms cubic-bezier(0.48, 0, 0.12, 1);
}
</style>
<script>
export default {
  name: 'Button',
  props: ['text', 'color', 'alterText'],
}
</script>
