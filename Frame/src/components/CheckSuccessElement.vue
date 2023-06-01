<template>
  <div class="check-custom-element">
    <div
      class="check-container d-flex justify-content-center align-items-center border flex-column bg-light p-3 shadow"
    >
      <div class="fs-1 dune-rise">
        {{ itemName }} {{ actionName }} <span v-if="isSuccess">successfull</span
        ><span v-else>failed</span>
      </div>
      <div v-if="isSuccess" class="ui-success">
        <svg
          viewBox="0 0 87 87"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g id="Group-3" transform="translate(2.000000, 2.000000)">
              <circle
                id="Oval-2"
                stroke="rgba(165, 220, 134, 0.2)"
                stroke-width="4"
                cx="41.5"
                cy="41.5"
                r="41.5"
              ></circle>
              <circle
                class="ui-success-circle"
                id="Oval-2"
                stroke="#A5DC86"
                stroke-width="4"
                cx="41.5"
                cy="41.5"
                r="41.5"
              ></circle>
              <polyline
                class="ui-success-path"
                id="Path-2"
                stroke="#A5DC86"
                stroke-width="4"
                points="19 38.8036813 31.1020744 54.8046875 63.299221 28"
              ></polyline>
            </g>
          </g>
        </svg>
      </div>

      <div v-if="!isSuccess" class="ui-error">
        <svg
          viewBox="0 0 87 87"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g id="Group-2" transform="translate(2.000000, 2.000000)">
              <circle
                id="Oval-2"
                stroke="rgba(252, 191, 191, .5)"
                stroke-width="4"
                cx="41.5"
                cy="41.5"
                r="41.5"
              ></circle>
              <circle
                class="ui-error-circle"
                stroke="#F74444"
                stroke-width="4"
                cx="41.5"
                cy="41.5"
                r="41.5"
              ></circle>
              <path
                class="ui-error-line1"
                d="M22.244224,22 L60.4279902,60.1837662"
                id="Line"
                stroke="#F74444"
                stroke-width="3"
                stroke-linecap="square"
              ></path>
              <path
                class="ui-error-line2"
                d="M60.755776,21 L23.244224,59.8443492"
                id="Line"
                stroke="#F74444"
                stroke-width="3"
                stroke-linecap="square"
              ></path>
            </g>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.check-custom-element {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 900;
}
.check-container {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
}
.ui-success,
.ui-error {
  width: 100px;
  height: 100px;
  margin: 40px;
  // border:1px solid #eee;
}

.ui-success {
  &-circle {
    stroke-dasharray: 260.75219024795285px, 260.75219024795285px;
    stroke-dashoffset: 260.75219024795285px;
    transform: rotate(220deg);
    transform-origin: center center;
    stroke-linecap: round;
    animation: ani-success-circle 1s ease-in both;
  }
  &-path {
    stroke-dasharray: 60px 64px;
    stroke-dashoffset: 62px;
    stroke-linecap: round;
    animation: ani-success-path 0.4s 1s ease-in both;
  }
}

@keyframes ani-success-circle {
  to {
    stroke-dashoffset: 782.2565707438586px;
  }
}

@keyframes ani-success-path {
  0% {
    stroke-dashoffset: 62px;
  }
  65% {
    stroke-dashoffset: -5px;
  }
  84% {
    stroke-dashoffset: 4px;
  }
  100% {
    stroke-dashoffset: -2px;
  }
}

.ui-error {
  &-circle {
    stroke-dasharray: 260.75219024795285px, 260.75219024795285px;
    stroke-dashoffset: 260.75219024795285px;
    animation: ani-error-circle 1.2s linear;
  }
  &-line1 {
    stroke-dasharray: 54px 55px;
    stroke-dashoffset: 55px;
    stroke-linecap: round;
    animation: ani-error-line 0.15s 1.2s linear both;
  }
  &-line2 {
    stroke-dasharray: 54px 55px;
    stroke-dashoffset: 55px;
    stroke-linecap: round;
    animation: ani-error-line 0.2s 0.9s linear both;
  }
}

@keyframes ani-error-line {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes ani-error-circle {
  0% {
    stroke-dasharray: 0, 260.75219024795285px;
    stroke-dashoffset: 0;
  }
  35% {
    stroke-dasharray: 120px, 120px;
    stroke-dashoffset: -120px;
  }
  70% {
    stroke-dasharray: 0, 260.75219024795285px;
    stroke-dashoffset: -260.75219024795285px;
  }
  100% {
    stroke-dasharray: 260.75219024795285px, 0;
    stroke-dashoffset: -260.75219024795285px;
  }
}
</style>
<script>
export default {
  name: 'CheckSuccessElement',
  props: ['itemName', 'actionName', 'isSuccess'],
}
</script>
