<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="landing-page">
    <!-- HERO BANNER -->
    <div class="container-fluid p-0 mb-5">
      <div class="position-relative">
        <!-- Background -->
        <img
          src="\src\assets\rebateBanner.jpg"
          class="img-fluid w-100 rounded-3 shadow-sm"
          style="height: 360px; object-fit: cover; filter: brightness(0.55)"
          alt="Australian nature banner"
        />
        <!-- banner -->

        <div
          class="position-absolute top-50 start-50 translate-middle text-center text-white px-3 px-md-5"
        >
          <h1 class="banner-title mb-3">Rebates and Grants</h1>

          <p class="banner-subtitle mb-4">
            You might be eligible for a grant to help you pay for your EV or Solar System.
          </p>
          <h1 class="fw-bold display-5 mb-3"></h1>
        </div>
      </div>
    </div>
    <!-- Accordion -->
    <div class="w-100" style="max-width: 100vw; margin: 0; padding: 0">
      <div class="accordion w-100" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseZero"
              aria-expanded="true"
              aria-controls="collapseZero"
            >
              Federal Grants
            </button>
          </h2>
          <div
            id="collapseZero"
            class="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <a href="https://cer.gov.au/batteries" target="_blank"
                >Cheaper Home Batteries Program</a
              >
              discount is now available. discount is now available. discount is now available.
              discount is now available. discount is now available. discount is now available.
              discount is now available. discount is now available. discount is now available.
              discount is now available. discount is now available. discount is now available.
              discount is now available. discount is now available. discount is now available.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              New South Wales
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <a
                href="https://www.energy.nsw.gov.au/households/rebates-grants-and-schemes/household-energy-saving-upgrades/connect-your-battery-virtual"
                target="_blank"
                >Virtual Power Plant (VPP) incentive</a
              >
              / Peak Demand Reduction Scheme (PDRS) — NSW pays an upfront incentive for signing a
              household battery into a VPP (recently increased; can be combined with the federal
              CHBP). Eligibility requires a solar + battery at the address and an accredited
              supplier. Typical VPP incentive value examples cited around up to $1,500 (depends on
              capacity/provider). The old standalone NSW battery installation discount ended because
              of the federal program, but the VPP signup incentive remains.The Australian
              Government's
              <a href="https://cer.gov.au/batteries" target="_blank"
                >Cheaper Home Batteries Program</a
              >
              discount is now available.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Victoria
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <strong> Victoria This is the second item’s accordion body.</strong> It is hidden by
              default, until the collapse plugin adds the appropriate classes that we use to style
              each element. These classes control the overall appearance, as well as the showing and
              hiding via CSS transitions. You can modify any of this with custom CSS or overriding
              our default variables. It’s also worth noting that just about any HTML can go within
              the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Queensland
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <strong>QLD This is the third item’s accordion body.</strong> It is hidden by default,
              until the collapse plugin adds the appropriate classes that we use to style each
              element. These classes control the overall appearance, as well as the showing and
              hiding via CSS transitions. You can modify any of this with custom CSS or overriding
              our default variables. It’s also worth noting that just about any HTML can go within
              the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              South Australia
            </button>
          </h2>
          <div
            id="collapseFour"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <strong>This is the third item’s accordion body.</strong> It is hidden by default,
              until the collapse plugin adds the appropriate classes that we use to style each
              element. These classes control the overall appearance, as well as the showing and
              hiding via CSS transitions. You can modify any of this with custom CSS or overriding
              our default variables. It’s also worth noting that just about any HTML can go within
              the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              Western Australia
            </button>
          </h2>
          <div
            id="collapseFive"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <strong>This is the third item’s accordion body.</strong> It is hidden by default,
              until the collapse plugin adds the appropriate classes that we use to style each
              element. These classes control the overall appearance, as well as the showing and
              hiding via CSS transitions. You can modify any of this with custom CSS or overriding
              our default variables. It’s also worth noting that just about any HTML can go within
              the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
            >
              Tasmania
            </button>
          </h2>
          <div
            id="collapseSix"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <strong>This is the third item’s accordion body.</strong> It is hidden by default,
              until the collapse plugin adds the appropriate classes that we use to style each
              element. These classes control the overall appearance, as well as the showing and
              hiding via CSS transitions. You can modify any of this with custom CSS or overriding
              our default variables. It’s also worth noting that just about any HTML can go within
              the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSeven"
              aria-expanded="false"
              aria-controls="collapseSeven"
            >
              Northern Territory
            </button>
          </h2>
          <div
            id="collapseSeven"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <strong>This is the third item’s accordion body.</strong> It is hidden by default,
              until the collapse plugin adds the appropriate classes that we use to style each
              element. These classes control the overall appearance, as well as the showing and
              hiding via CSS transitions. You can modify any of this with custom CSS or overriding
              our default variables. It’s also worth noting that just about any HTML can go within
              the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseEight"
              aria-expanded="false"
              aria-controls="collapseEight"
            >
              Australian Capitol Territory
            </button>
          </h2>
          <div
            id="collapseEight"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <strong>This is the third item’s accordion body.</strong> It is hidden by default,
              until the collapse plugin adds the appropriate classes that we use to style each
              element. These classes control the overall appearance, as well as the showing and
              hiding via CSS transitions. You can modify any of this with custom CSS or overriding
              our default variables. It’s also worth noting that just about any HTML can go within
              the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RebatesAndSchemes',
}
</script>

<style scoped>
.accordion,
.accordion-item,
.accordion-button {
  width: 100% !important;
  display: block !important;
}

.accordion-item {
  border-left: none;
  border-right: none;
}

.accordion-body {
  width: 100% !important;
}
</style>
