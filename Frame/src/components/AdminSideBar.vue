<template>
  <!-- Sidebar Start -->
  <div class="sidebar pb-3">
    <nav class="navbar bg-light navbar-light">
      <router-link :to="{ name: 'Admin' }" class="navbar-brand mx-4 mb-3">
        <h3 class="text-secondary">
          <i class="fa fa-hashtag me-2"></i>Admin Panel
        </h3>
      </router-link>
      <div class="d-flex align-items-center ms-4 mb-4">
        <div class="position-relative">
          <img
            class="rounded-circle"
            src="../assets/images/avatars/3.jpg"
            alt=""
            style="width: 40px; height: 40px"
          />
          <div
            class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"
          ></div>
        </div>
        <div class="ms-3">
          <h6 class="mb-0 text-dark">Name Here</h6>
          <span class="text-dark">Admin</span>
        </div>
      </div>
      <div class="navbar-nav w-100">
        <router-link
          v-for="data in sidebarData"
          :key="data.id"
          :class="{ active: data.isActive }"
          class="nav-item nav-link"
          :to="{ name: data.routeName }"
          @click="toggleActive(data)"
        >
          <i class="fa fa-tachometer-alt me-2"></i>{{ data.title }}
        </router-link>
        <div class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown"
            ><i class="fa fa-laptop me-2"></i>Elements</a
          >
          <div class="dropdown-menu bg-transparent border-0">
            <a href="button.html" class="dropdown-item">Buttons</a>
            <a href="typography.html" class="dropdown-item">Typography</a>
            <a href="element.html" class="dropdown-item">Other Elements</a>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <!-- Sidebar End -->
</template>
<style>
@import '../styles/fontawesome-free/css/all.min.css';
</style>
<script>
export default {
  name: 'AdminSideBar',
  data() {
    const sidebarData = [
      {
        id: 1,
        title: 'Dashboard',
        routeName: 'Admin',
        isActive: true,
      },
      {
        id: 2,
        title: 'Items',
        routeName: 'Items',
        isActive: false,
      },
      {
        id: 3,
        title: 'Sizes',
        routeName: 'Sizes',
        isActive: false,
      },
      {
        id: 4,
        title: 'Orders',
        routeName: 'Orders',
        isActive: false,
      },
      {
        id: 5,
        title: 'Messages',
        routeName: 'Messages',
        isActive: false,
      },
    ]
    return {
      sidebarData,
    }
  },
  methods: {
    toggleActive: function (data) {
      this.sidebarData.forEach((data) => {
        data.isActive = false
      })
      data.isActive = !data.isActive
    },
  },
}
</script>
