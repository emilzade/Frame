<template>
  <!-- Navbar Start -->
  <nav class="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
    <router-link
      :to="{ name: 'Admin' }"
      class="navbar-brand d-flex d-lg-none me-4"
    >
      <h2 class="text-primary mb-0"><i class="fa fa-hashtag"></i></h2>
    </router-link>
    <a @click="sideBarToggle" class="sidebar-toggler flex-shrink-0">
      <i class="fa fa-bars"></i>
    </a>
    <form class="d-none d-md-flex ms-4">
      <input class="form-control border-0" type="search" placeholder="Search" />
    </form>
    <div class="navbar-nav align-items-center ms-auto">
      <div class="nav-item dropdown">
        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
          <i class="fa fa-envelope me-lg-2"></i>
          <span class="d-none d-lg-inline-flex">Message</span>
        </a>
        <div
          class="dropdown-menu dropdown-menu-end bg-light border border-secondary rounded-0 rounded-bottom m-0"
        >
          <router-link
            :to="{ name: 'Message', params: { id: data.id } }"
            class="dropdown-item"
            v-for="data in messages"
            :key="data.id"
          >
            <div class="d-flex align-items-center">
              <img
                class="rounded-circle"
                src="../assets/images/avatars/2.jpg"
                alt=""
                style="width: 40px; height: 40px"
              />
              <div class="ms-2">
                <h6 class="fw-normal mb-0">{{ data.message }}</h6>
                <small>15 minutes ago</small>
              </div>
            </div>
          </router-link>
          <router-link
            class="dropdown-item text-center"
            :to="{ name: 'Messages' }"
          >
            See All Messages
          </router-link>
        </div>
      </div>
      <div class="nav-item dropdown">
        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
          <i class="fa fa-bell me-lg-2"></i>
          <span class="d-none d-lg-inline-flex">Notifications</span>
        </a>
        <div
          class="dropdown-menu dropdown-menu-end bg-light border border-secondary rounded-0 rounded-bottom m-0"
        >
          <router-link
            :to="{ name: 'Notification', params: { id: data.id } }"
            v-for="data in notifications"
            :key="data.id"
            class="dropdown-item"
          >
            <h6 class="fw-normal mb-0">{{ data.message }}</h6>
            <small>15 minutes ago</small>
          </router-link>
          <router-link
            class="dropdown-item text-center"
            :to="{ name: 'Notifications' }"
            >See all notifications</router-link
          >
        </div>
      </div>
      <div class="nav-item dropdown">
        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
          <img
            class="rounded-circle me-lg-2"
            src="../assets/images/avatars/3.jpg"
            alt=""
            style="width: 40px; height: 40px"
          />
          <span class="d-none d-lg-inline-flex">Admin Name</span>
        </a>
        <div
          class="dropdown-menu dropdown-menu-end bg-light border border-secondary rounded-0 rounded-bottom m-0"
        >
          <a href="#" class="dropdown-item">My Profile</a>
          <a href="#" class="dropdown-item">Settings</a>
          <a href="#" class="dropdown-item">Log Out</a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Navbar End -->
</template>
<style>
@import '../styles/fontawesome-free/css/all.min.css';
</style>

<script>
import { mapGetters } from 'vuex'
import 'bootstrap'
export default {
  name: 'AdminNavbar',
  setup() {},
  data() {
    const messages = [
      {
        id: 1,
        message: 'User 3 send you a message',
      },
      {
        id: 2,
        message: 'User 1 send another message',
      },
      {
        id: 3,
        message: 'User 2 send you a message',
      },
      {
        id: 4,
        message: 'And another message',
      },
    ]
    const notifications = [
      {
        id: 1,
        message: 'Profile Updated',
      },
      {
        id: 2,
        message: 'New User Added',
      },
      {
        id: 3,
        message: 'Password Changed',
      },
      {
        id: 4,
        message: 'And another notification',
      },
    ]
    return {
      messages,
      notifications,
    }
  },
  computed: {
    ...mapGetters('auth', {
      getToken: 'getToken',
      getUserProfile: 'getUserProfile',
    }),
  },
  methods: {
    sideBarToggle: function () {
      this.$store.commit('setAdminSideBarActive')
    },
  },
}
</script>
