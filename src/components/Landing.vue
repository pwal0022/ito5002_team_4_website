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
      <p>
        Welcome to the Australian Household Carbon Calculator where you can compare your energy
        usage and see how you compare to others in your area and get suggestions for how you can
        reduce your carbon footprint
      </p>
      <p>This is a group project for ITO5002 completed by HS, DW, MW and PW</p>
      <br>
      <p>To add and change content, do so by modifying the Landing.vue component</p>
      <p>found in ito5002_team_4_website\src\components\Landing.vue</p>
    </h3>
  </div>
</template>

<script>
export default {
  name: 'LandingPage'
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