<template>
  <div
    ref="body"
    style="top: 0; left: 0; bottom: 0; right: 0"
    class="w-100 h-100 d-flex justify-content-center align-items-center overflow-hidden position-relative"
  >
    <CCardGroup class="position-absolute">
      <CCard class="p-4 login-card">
        <CCardBody>
          <CForm>
            <h1>Login</h1>
            <p class="text-medium-emphasis">Sign In to your account</p>
            <CInputGroup class="mb-3">
              <CInputGroupText class="border border-light">
                <CIcon icon="cil-user" />
              </CInputGroupText>
              <CFormInput
                class="border border-light"
                autocomplete="email"
                placeholder="Email"
                v-model="payload.email"
              />
            </CInputGroup>
            <CInputGroup class="mb-4">
              <CInputGroupText class="border border-light">
                <CIcon icon="cil-lock-locked" />
              </CInputGroupText>
              <CFormInput
                class="border border-light"
                v-model="payload.password"
                type="password"
                placeholder="Password"
                autocomplete="password"
              />
            </CInputGroup>
            <CRow>
              <CCol :xs="6">
                <CButton color="primary" @click="login" class="px-4">
                  Login
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </CCardGroup>
  </div>
</template>
<style>
.login-card {
  background-color: rgba(235, 235, 235, 0.8);
}
.asset-img {
  display: none;
}
</style>
<script>
import { mapActions, mapGetters } from 'vuex'
import { inject } from 'vue'
import router from '@/router'
import loginBg from '@/assets/images/loginbg.jpg'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  name: 'Login',
  data() {
    const payload = {
      email: '',
      password: '',
    }
    const $cookies = inject('$cookies')
    return {
      payload,
      loginBg,
      $cookies,
    }
  },
  computed: {
    ...mapGetters('auth', {
      getLoginApiStatus: 'getLoginApiStatus',
      getToken: 'getToken',
    }),
  },
  methods: {
    ...mapActions('auth', {
      actionLoginApi: 'loginApi',
    }),
    async login() {
      await this.actionLoginApi(this.payload)
      console.log(this.getLoginApiStatus)

      if (this.getLoginApiStatus == 'success') {
        router.push({ name: 'Index' })
      } else {
        console.log('failed')
      }
    },
  },
  mounted() {
    let scene = new THREE.Scene()
    scene.background = new THREE.Color(0x160016)
    let camera = new THREE.PerspectiveCamera(
      60,
      innerWidth / innerHeight,
      1,
      1000,
    )
    camera.position.set(0, 4, 21)
    let renderer = new THREE.WebGLRenderer()
    renderer.setSize(innerWidth, innerHeight)
    this.$refs.body.appendChild(renderer.domElement)
    window.addEventListener('resize', () => {
      camera.aspect = innerWidth / innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(innerWidth, innerHeight)
    })

    let controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false

    let gu = {
      time: { value: 0 },
    }

    let sizes = []
    let shift = []
    let pushShift = () => {
      shift.push(
        Math.random() * Math.PI,
        Math.random() * Math.PI * 2,
        (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
        Math.random() * 0.9 + 0.1,
      )
    }
    let pts = new Array(50000).fill().map(() => {
      sizes.push(Math.random() * 1.5 + 0.5)
      pushShift()
      return new THREE.Vector3()
        .randomDirection()
        .multiplyScalar(Math.random() * 0.5 + 9.5)
    })
    for (let i = 0; i < 100000; i++) {
      let r = 10,
        R = 40
      let rand = Math.pow(Math.random(), 1.5)
      let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r)
      pts.push(
        new THREE.Vector3().setFromCylindricalCoords(
          radius,
          Math.random() * 2 * Math.PI,
          (Math.random() - 0.5) * 2,
        ),
      )
      sizes.push(Math.random() * 1.5 + 0.5)
      pushShift()
    }

    let g = new THREE.BufferGeometry().setFromPoints(pts)
    g.setAttribute('sizes', new THREE.Float32BufferAttribute(sizes, 1))
    g.setAttribute('shift', new THREE.Float32BufferAttribute(shift, 4))
    let m = new THREE.PointsMaterial({
      size: 0.125,
      transparent: true,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      onBeforeCompile: (shader) => {
        shader.uniforms.time = gu.time
        shader.vertexShader = `
      uniform float time;
      attribute float sizes;
      attribute vec4 shift;
      varying vec3 vColor;
      ${shader.vertexShader}
    `
          .replace(`gl_PointSize = size;`, `gl_PointSize = size * sizes;`)
          .replace(
            `#include <color_vertex>`,
            `#include <color_vertex>
        float d = length(abs(position) / vec3(40., 10., 40));
        d = clamp(d, 0., 1.);
        vColor = mix(vec3(227., 155., 0.), vec3(100., 50., 255.), d) / 255.;
      `,
          )
          .replace(
            `#include <begin_vertex>`,
            `#include <begin_vertex>
        float t = time;
        float moveT = mod(shift.x + shift.z * t, PI2);
        float moveS = mod(shift.y + shift.z * t, PI2);
        transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.w;
      `,
          )
        //console.log(shader.vertexShader);
        shader.fragmentShader = `
      varying vec3 vColor;
      ${shader.fragmentShader}
    `
          .replace(
            `#include <clipping_planes_fragment>`,
            `#include <clipping_planes_fragment>
        float d = length(gl_PointCoord.xy - 0.5);
        //if (d > 0.5) discard;
      `,
          )
          .replace(
            `vec4 diffuseColor = vec4( diffuse, opacity );`,
            `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.1, d)/* * 0.5 + 0.5*/ );`,
          )
        //console.log(shader.fragmentShader);
      },
    })
    let p = new THREE.Points(g, m)
    p.rotation.order = 'ZYX'
    p.rotation.z = 0.2
    scene.add(p)

    let clock = new THREE.Clock()

    renderer.setAnimationLoop(() => {
      controls.update()
      let t = clock.getElapsedTime() * 0.5
      gu.time.value = t * Math.PI
      p.rotation.y = t * 0.05
      renderer.render(scene, camera)
    })
  },
}
</script>

<!-- <template>
  <div
    :style="{ 'background-image': 'url(' + loginBg + ')' }"
    class="min-vh-100 d-flex flex-row align-items-center"
  >
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :xl="6" :lg="8">
          <CCardGroup>
            <CCard class="p-4 login-card">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText class="border border-light">
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      class="border border-light"
                      autocomplete="email"
                      placeholder="Email"
                      v-model="payload.email"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText class="border border-light">
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      class="border border-light"
                      v-model="payload.password"
                      type="password"
                      placeholder="Password"
                      autocomplete="password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" @click="login" class="px-4">
                        Login
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
<style>
.login-card {
  background-color: rgba(235, 235, 235, 0.64);
}
</style>
<script>
import { mapActions, mapGetters } from 'vuex'
import { inject } from 'vue'
import router from '@/router'
import loginBg from '@/assets/images/loginbg.jpg'

export default {
  name: 'Login',
  data() {
    const payload = {
      email: '',
      password: '',
    }
    const $cookies = inject('$cookies')
    return {
      payload,
      loginBg,
      $cookies,
    }
  },
  computed: {
    ...mapGetters('auth', {
      getLoginApiStatus: 'getLoginApiStatus',
      getToken: 'getToken',
    }),
  },
  methods: {
    ...mapActions('auth', {
      actionLoginApi: 'loginApi',
    }),
    async login() {
      await this.actionLoginApi(this.payload)
      console.log(this.getLoginApiStatus)

      if (this.getLoginApiStatus == 'success') {
        router.push({ name: 'Index' })
      } else {
        console.log('failed')
      }
    },
  },
}
</script> -->
