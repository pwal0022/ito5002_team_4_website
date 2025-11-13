<script setup></script>

<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/"
          ><img src="\src\assets\logo.png" alt="logo" width="30px" height="35px"
        /></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link" active-class="active" aria-current="page"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/solar" class="nav-link" active-class="active" aria-current="page"
                >Household Carbon Calculator</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>