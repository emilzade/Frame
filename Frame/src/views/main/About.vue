<template>
  <div>
    <div class="w-75 m-auto pt-5">
      <div class="text-center py-5">
        <h1 class="text-dark roboto-regular">About RASMIN</h1>
        <p class="text-secondary roboto-regular">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto
          praesentium, impedit saepe perspiciatis culpa, eos aut, voluptate ut
          possimus id quos quasi provident vero. Optio blanditiis nesciunt saepe
          sequi eum quisquam assumenda laudantium tempora alias neque
          dignissimos, sed illo et reiciendis magnam iusto, facilis repudiandae
          ullam ipsum placeat pariatur unde.
        </p>
      </div>
      <hr width="20%" style="margin: auto" />
      <div class="text-center text-secondary py-5">
        <p class="text-secondary roboto-regular">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt,
          magnam? Nulla ea cum eligendi ipsa debitis quis excepturi quidem
          delectus pariatur fuga deserunt in illo, earum aut temporibus sit
          exercitationem laboriosam dolorum iste saepe recusandae qui ut quos
          fugit. Iusto nam commodi sint maiores ut voluptate possimus eum, nihil
          similique?Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Deleniti, suscipit nemo eaque amet dolorum quas cumque tempora magni
          harum rem provident quibusdam nesciunt modi nam qui quod blanditiis
          culpa, cupiditate est sit eius asperiores, ab veniam. Veritatis
          laudantium quasi quibusdam facilis, sapiente quia dolorum eligendi
          voluptatibus modi delectus tempora fuga.
        </p>
      </div>
      <div class="text-center my-4">
        <h3 class="roboto-thin">ABOUT OUR PRODUCTS</h3>
        <p class="text-secondary">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, fugiat
          quod a, perferendis ratione exercitationem necessitatibus ullam alias
          quos dolore, at dolorum perspiciatis ipsum vero inventore tempore
          architecto doloremque iste blanditiis eaque! Saepe, commodi illum.
          Dolorem nemo expedita nobis aut dignissimos, eaque rem fuga ex, vitae
          odit iusto voluptates veritatis?
        </p>
        <CAccordion class="accordion-flush w-50 m-auto" always-open>
          <CAccordionItem :item-key="1">
            <CAccordionHeader> Accordion Item #1 </CAccordionHeader>
            <CAccordionBody>
              <strong>This is the first item's accordion body.</strong> It is
              hidden by default, until the collapse plugin adds the appropriate
              classes that we use to style each element. These classes control
              the overall appearance, as well as the showing and hiding via CSS
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem :item-key="2">
            <CAccordionHeader> Accordion Item #2 </CAccordionHeader>
            <CAccordionBody>
              <strong>This is the second item's accordion body.</strong> It is
              hidden by default, until the collapse plugin adds the appropriate
              classes that we use to style each element. These classes control
              the overall appearance, as well as the showing and hiding via CSS
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem :item-key="3">
            <CAccordionHeader> Accordion Item #3 </CAccordionHeader>
            <CAccordionBody>
              <strong>This is the third item's accordion body.</strong> It is
              hidden by default, until the collapse plugin adds the appropriate
              classes that we use to style each element. These classes control
              the overall appearance, as well as the showing and hiding via CSS
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </div>
      <div class="py-4">
        <h2 class="text-secondary text-center roboto-thin py-4">OUR TEAM</h2>
        <div class="d-flex justify-content-around align-items-center">
          <div
            v-for="member in members"
            :key="member.id"
            class="d-flex flex-column justify-content-center align-items-center py-4"
          >
            <img
              class="rounded-circle"
              src="../../assets/images/avatars/1.jpg"
            />
            <p>{{ member.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <LastViewed />
  </div>
</template>
<script>
import LastViewed from '../../components/LastViewed.vue'
export default {
  components: {
    LastViewed,
  },
  data() {
    const members = [
      {
        id: 1,
        name: 'Francisko Stevenson1',
      },
      {
        id: 2,
        name: 'Francisko Stevenson2',
      },
      {
        id: 3,
        name: 'Francisko Stevenson3',
      },
      {
        id: 4,
        name: 'Francisko Stevenson4',
      },
    ]
    return {
      members,
    }
  },
}
</script>
