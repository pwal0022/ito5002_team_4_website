<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      <div class="container-fluid p-0 mb-5">
        <div class="position-relative">
          <!-- Background image -->
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=60"
            class="img-fluid w-100"
            style="height: 350px; object-fit: cover; filter: brightness(0.55)"
            alt="Australian nature banner"
          />

          <!-- Text content -->
          <div
            class="position-absolute top-50 start-50 translate-middle text-center text-white px-3 px-md-5"
          >
            <h1 class="fw-bold display-5 display-md-3">Australian Household Carbon Calculator</h1>

            <p class="lead mt-3">
              Helping Australians understand, measure, and reduce their carbon emissions.
            </p>

            <a href="#start" class="btn btn-success btn-lg mt-3"> Get Started </a>
          </div>
        </div>
      </div>
      <div class="container my-5">
        <div class="row g-4">
          <!-- Card 1 -->
          <div class="col-lg-4">
            <div class="card h-100 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=900&q=60"
                class="card-img-top"
                alt="Australian landscape heat"
              />
              <div class="card-body">
                <h4 class="card-title">Australians Are Concerned</h4>
                <p class="card-text">
                  Climate change is a pressing concern for <strong>70–75% of Australians</strong>
                  (Climate Safety, 2024). This growing awareness highlights the need for accessible
                  tools that help people understand and reduce their individual carbon footprint.
                </p>
              </div>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="col-lg-4">
            <div class="card h-100 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=900&q=60"
                class="card-img-top"
                alt="Australian city emissions"
              />
              <div class="card-body">
                <h4 class="card-title">High Household Emissions</h4>
                <p class="card-text">
                  The average Australian household emits
                  <strong>15–20 tonnes of CO₂e per year</strong> — nearly
                  <strong>three times</strong> the global average. Understanding these emissions is
                  crucial for taking meaningful action.
                </p>
              </div>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="col-lg-4">
            <div class="card h-100 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=900&q=60"
                class="card-img-top"
                alt="Climate action UN goals"
              />
              <div class="card-body">
                <h4 class="card-title">Aligned With Global Goals</h4>
                <p class="card-text">
                  Our project directly supports the United Nations’
                  <strong>SDG 13: Climate Action</strong>. Through
                  <strong>education, awareness, and empowerment</strong>, we help households adopt
                  sustainable habits and reduce their overall environmental impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p>
        Welcome to the Australian Household Carbon Calculator where you can compare your energy
        usage and see how you compare to others in your area and get suggestions for how you can
        reduce your carbon footprint
      </p>
      <p>This is a group project for ITO5002 completed by HS, DW, MW and PW</p>
      <br />
      <p>To add and change content, do so by modifying the Landing.vue component</p>
      <p>found in ito5002_team_4_website\src\components\Landing.vue</p>
    </h3>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
}
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
