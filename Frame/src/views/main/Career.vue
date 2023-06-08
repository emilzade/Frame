<template>
  <div class="w-75 m-auto pt-5">
    <div class="text-center py-5">
      <h1 class="text-dark montserrat-bold">Careers</h1>
      <p class="text-secondary montserrat-regular">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto
        praesentium, impedit saepe perspiciatis culpa, eos aut, voluptate ut
        possimus id quos quasi provident vero. Optio blanditiis nesciunt saepe
        sequi eum quisquam assumenda laudantium tempora alias neque dignissimos,
        sed illo et reiciendis magnam iusto, facilis repudiandae ullam ipsum
        placeat pariatur unde.
      </p>
    </div>
    <hr width="20%" style="margin: auto" />
    <div class="text-center py-4">
      <h2 class="text-dark montserrat-bold">Why Rassmin</h2>
      <p class="text-secondary montserrat-regular">
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
    <div class="py-4">
      <CAccordion class="accordion-flush" :active-item-key="1" always-open>
        <CAccordionItem :item-key="1">
          <CAccordionHeader> Accordion Item #1 </CAccordionHeader>
          <CAccordionBody>
            <strong>This is the first item's accordion body.</strong> It is
            hidden by default, until the collapse plugin adds the appropriate
            classes that we use to style each element. These classes control the
            overall appearance, as well as the showing and hiding via CSS
            transitions. You can modify any of this with custom CSS or
            overriding our default variables. It's also worth noting that just
            about any HTML can go within the <code>.accordion-body</code>,
            though the transition does limit overflow.
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem :item-key="2">
          <CAccordionHeader> Accordion Item #2 </CAccordionHeader>
          <CAccordionBody>
            <strong>This is the second item's accordion body.</strong> It is
            hidden by default, until the collapse plugin adds the appropriate
            classes that we use to style each element. These classes control the
            overall appearance, as well as the showing and hiding via CSS
            transitions. You can modify any of this with custom CSS or
            overriding our default variables. It's also worth noting that just
            about any HTML can go within the <code>.accordion-body</code>,
            though the transition does limit overflow.
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem :item-key="3">
          <CAccordionHeader> Accordion Item #3 </CAccordionHeader>
          <CAccordionBody>
            <strong>This is the third item's accordion body.</strong> It is
            hidden by default, until the collapse plugin adds the appropriate
            classes that we use to style each element. These classes control the
            overall appearance, as well as the showing and hiding via CSS
            transitions. You can modify any of this with custom CSS or
            overriding our default variables. It's also worth noting that just
            about any HTML can go within the <code>.accordion-body</code>,
            though the transition does limit overflow.
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem :item-key="4">
          <CAccordionHeader> Accordion Item #4 </CAccordionHeader>
          <CAccordionBody>
            <strong>This is the third item's accordion body.</strong> It is
            hidden by default, until the collapse plugin adds the appropriate
            classes that we use to style each element. These classes control the
            overall appearance, as well as the showing and hiding via CSS
            transitions. You can modify any of this with custom CSS or
            overriding our default variables. It's also worth noting that just
            about any HTML can go within the <code>.accordion-body</code>,
            though the transition does limit overflow.
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem :item-key="5">
          <CAccordionHeader> Accordion Item #5 </CAccordionHeader>
          <CAccordionBody>
            <strong>This is the third item's accordion body.</strong> It is
            hidden by default, until the collapse plugin adds the appropriate
            classes that we use to style each element. These classes control the
            overall appearance, as well as the showing and hiding via CSS
            transitions. You can modify any of this with custom CSS or
            overriding our default variables. It's also worth noting that just
            about any HTML can go within the <code>.accordion-body</code>,
            though the transition does limit overflow.
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </div>
    <div class="py-5">
      <h3 class="montserrat-bold text-dark text-center">How to apply?</h3>
      <p class="text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
        suscipit.
        <a target="_blank" href="mailto:careers@rassmin.com"
          >careers@rassmin.com</a
        >
      </p>
    </div>
  </div>
</template>
