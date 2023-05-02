<template>
  <div class="preloader flex-column">
    <h1>
      <span class="let1">W</span>
      <span class="let2">e</span>
      <span class="let3">l</span>
      <span class="let4">c</span>
      <span class="let5">o</span>
      <span class="let6">m</span>
      <span class="let7">e</span>
    </h1>
    <h1>
      <span class="let1">R</span>
      <span class="let2">a</span>
      <span class="let3">s</span>
      <span class="let4">s</span>
      <span class="let5">m</span>
      <span class="let6">i</span>
      <span class="let7">n</span>
    </h1>
  </div>
</template>
<style lang="scss">
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0;
    transform: translate(0rem, -20rem);
    padding: 0;
    font-family: ‘Arial Narrow’, sans-serif;
    font-weight: 100;
    font-size: 5em;
    color: #ffffff;
    border: 1px solid black;
    span {
      position: relative;
      top: 0.63em;
      display: inline-block;
      text-transform: uppercase;
      opacity: 0;
      transform: rotateX(-90deg);
    }

    .let1 {
      animation: drop 2s ease-in-out 1;
      animation-delay: 1.2s;
    }

    .let2 {
      animation: drop 2s ease-in-out 1;
      animation-delay: 1.3s;
    }

    .let3 {
      animation: drop 2s ease-in-out 1;
      animation-delay: 1.4s;
    }

    .let4 {
      animation: drop 2s ease-in-out 1;
      animation-delay: 1.5s;
    }

    .let5 {
      animation: drop 2s ease-in-out 1;
      animation-delay: 1.6s;
    }

    .let6 {
      animation: drop 2s ease-in-out 1;
      animation-delay: 1.7s;
    }

    .let7 {
      animation: drop 2s ease-in-out 1;
      animation-delay: 1.8s;
    }

    @keyframes drop {
      10% {
        opacity: 0.5;
      }
      20% {
        opacity: 1;
        top: 3.78em;
        transform: rotateX(-360deg);
      }
      80% {
        opacity: 1;
        top: 3.78em;
        transform: rotateX(-360deg);
      }
      90% {
        opacity: 0.5;
      }
      100% {
        opacity: 0;
        top: 6.94em;
      }
    }
  }
}
</style>
<script>
export default {
  name: 'PreLoader',
}
</script>
