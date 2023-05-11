<template>
  <div class="loading">
    <div
      style="height: 200px; margin-top: 8%"
      class="d-flex justify-content-center align-items-center"
    >
      <img :src="logo" class="h-100" />
    </div>
    <div class="loading-text">
      <span class="loading-text-words">R</span>
      <span class="loading-text-words">A</span>
      <span class="loading-text-words">S</span>
      <span class="loading-text-words">S</span>
      <span class="loading-text-words">M</span>
      <span class="loading-text-words">I</span>
      <span class="loading-text-words">N</span>
    </div>
  </div>
</template>
<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Quattrocento+Sans);

@mixin position-center($text-align: center) {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: $text-align;
}

$componentSize: 179px;
$maskSize: 50px;
$speed: 1s;
$borderOffset: 8px;

$backgroundColor: #89cb66;
$animationProps: $speed linear infinite alternate;

@keyframes mask-move {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX($componentSize - $maskSize);
  }
}
@keyframes mask-inner-move {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-($componentSize - $maskSize));
  }
}

.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 9999;
  font-size: 2rem;
  .loading-text {
    @include position-center;
    width: 100%;
    height: 100px;
    line-height: 100px;
    span {
      display: inline-block;
      margin: 0 5px;
      color: #fff;
      font-family: 'Quattrocento Sans', sans-serif;
      @for $i from 0 through 6 {
        &:nth-child(#{$i + 1}) {
          filter: blur(0px);
          animation: blur-text 1.5s (#{$i/5}) + s infinite linear alternate;
        }
      }
    }
  }
}

@keyframes blur-text {
  0% {
    filter: blur(0px);
  }
  100% {
    filter: blur(4px);
  }
}
</style>
<script>
import logo from '@/assets/images/logos/logo_icon_negative.png'
export default {
  name: 'PreLoader',
  data() {
    return {
      logo,
    }
  },
}
</script>
