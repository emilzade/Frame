<template>
  <div>
    <div class="pt-5 collections-container">
      <div
        class="py-5 display-3 text-center collections-header montserrat-medium"
      >
        Collections
      </div>
      <p class="w-75 m-auto py-3 lh-lg text-secondary">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eveniet
        voluptas minus obcaecati magni velit a odit suscipit voluptate magnam
        adipisci corporis optio? Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Vero sapiente nesciunt repellat accusamus, laborum
        consequuntur nostrum. Corporis quisquam ab iusto! Accusamus neque sequi
        animi repudiandae, quidem eveniet quod aliquid doloremque quam
        possimus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
        iusto odio distinctio doloribus nostrum blanditiis labore pariatur
        excepturi laboriosam natus!
      </p>
    </div>
    <CRow class="w-75 m-auto">
      <CCol class="col-md-6 col-12 p-4">
        <router-link
          :to="{
            name: 'Collection',
            params: {
              id: 1,
            },
          }"
        >
          <div
            class="border rounded w-100 h-100 collection-item position-relative"
          >
            <img class="w-100" src="../../assets/images/mercedes.png" />
            <h1 class="montserrat-medium position-absolute top-0 start-0 p-4">
              I Love winter
            </h1>
            <div
              class="collection-hovered-label rounded position-absolute p-4 d-flex flex-column justify-content-between"
            >
              <h1 class="montserrat-medium">I Love winter</h1>
              <div class="pb-5 w-75">
                <p class="montserrat-medium">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Beatae, ipsa! Lorem ipsum dolor sit amet.
                </p>
                <router-link
                  :to="{
                    name: 'Collection',
                    params: {
                      id: 1,
                    },
                  }"
                >
                  <p class="montserrat-medium btn btn-light">Buy Now!</p>
                </router-link>
              </div>
            </div>
          </div>
        </router-link>
      </CCol>
      <CCol class="col-md-6 col-12 p-4">
        <router-link
          :to="{
            name: 'Collection',
            params: {
              id: 2,
            },
          }"
        >
          <div
            class="border rounded w-100 h-100 collection-item position-relative"
          >
            <img class="w-100" src="../../assets/images/mercedes.png" />
            <h1 class="montserrat-medium position-absolute top-0 start-0 p-4">
              I Love winter
            </h1>
            <div
              class="collection-hovered-label rounded position-absolute p-4 d-flex flex-column justify-content-between"
            >
              <h1 class="montserrat-medium">I Love winter</h1>
              <div class="pb-5 w-75">
                <p class="montserrat-medium">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Beatae, ipsa! Lorem ipsum dolor sit amet.
                </p>
                <router-link
                  :to="{
                    name: 'Collection',
                    params: {
                      id: 2,
                    },
                  }"
                >
                  <p class="montserrat-medium btn btn-light">Buy Now!</p>
                </router-link>
              </div>
            </div>
          </div>
        </router-link>
      </CCol>
      <CCol class="col-md-6 col-12 p-4">
        <router-link
          :to="{
            name: 'Collection',
            params: {
              id: 3,
            },
          }"
        >
          <div
            class="border rounded w-100 h-100 collection-item position-relative"
          >
            <img class="w-100" src="../../assets/images/mercedes.png" />
            <h1 class="montserrat-medium position-absolute top-0 start-0 p-4">
              I Love winter
            </h1>
            <div
              class="collection-hovered-label rounded position-absolute p-4 d-flex flex-column justify-content-between"
            >
              <h1 class="montserrat-medium">I Love winter</h1>
              <div class="pb-5 w-75">
                <p class="montserrat-medium">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Beatae, ipsa! Lorem ipsum dolor sit amet.
                </p>
                <router-link
                  :to="{
                    name: 'Collection',
                    params: {
                      id: 3,
                    },
                  }"
                >
                  <p class="montserrat-medium btn btn-light">Buy Now!</p>
                </router-link>
              </div>
            </div>
          </div>
        </router-link>
      </CCol>
    </CRow>
  </div>
</template>
<style lang="scss">
a {
  color: black;
}
.collection-item {
  .collection-hovered-label {
    filter: opacity(0);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: 0.3s;
  }
  &:hover {
    .collection-hovered-label {
      filter: opacity(1);
      background-color: rgba(0, 0, 0, 0.4);
      color: white;
    }
  }
}
</style>
