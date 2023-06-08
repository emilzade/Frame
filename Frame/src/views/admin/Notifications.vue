<template>
  <div class="p-5">
    <div
      v-for="item in dbData"
      :key="item.id"
      class="border border-secondary rounded p-2 my-2"
    >
      <router-link :to="{ name: 'Notification', params: { id: item.id } }">
        <p class="fs-5 montserrat-regular m-0 p-0">Test Testov</p>
        <p>
          This is the page that opens on
          <strong>/notification/{{ $route.params.id }}</strong> route
        </p>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    const dbData = [
      {
        id: 1,
        owner: 'Test Testov',
        message: 'This is a notification , click to see more',
      },
      {
        id: 2,
        owner: 'Test Testov',
        message: '2This is a notification , click to see more',
      },
      {
        id: 3,
        owner: 'Test Testov',
        message: '3This is a notification , click to see more',
      },
      {
        id: 4,
        owner: 'Test Testov',
        message: '4This is a notification , click to see more',
      },
    ]
    return {
      dbData,
    }
  },
}
</script>
