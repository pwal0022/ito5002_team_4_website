<script setup></script>
<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/feed" class="nav-link" active-class="active">Feed</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/register" class="nav-link" active-class="active">Register</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/signin" class="nav-link" active-class="active">Sign In</router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active"
            >Firebase Registration</router-link
          >
        </li> -->
        <!-- <li class="nav-item">
          <a href="#" class="nav-link" @click="logMeOut">Log Out</a>
        </li> -->
        <!-- <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Newsletter</router-link>
        </li> -->
      </ul>
    </header>
  </div>
</template>

<!-- <template>
  <div class="container">
    Menu
    <header class="p-3 bg-dark text-white">
      <div class="container">
        <div
          class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
        >
          <a
            href="/"
            class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
              <use xlink:href="#bootstrap"></use>
            </svg>
          </a>

          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <router-link to="/" class="nav-link" active-class="active" aria-current="page"
                >Home (Week 5)</router-link
              >
            </li>
            <li>
              <router-link to="/about" class="nav-link" active-class="active">About</router-link>
            </li>
            <li><a href="#" class="nav-link px-2 text-white">Contact us</a></li>
          </ul>
        </div>
      </div>
    </header>
  </div>
</template> -->
