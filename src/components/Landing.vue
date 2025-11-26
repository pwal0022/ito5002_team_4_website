<template>
  <div class="landing-page">
    <div class="hero-section mb-5">
    <!-- HERO BANNER -->
     <div id="hero-container">
  <img class="hero"  src="https://streetfurniture.com/wp-content/uploads/2024/06/Top-Banner.jpg" />
  <div id="center-text">
    <p id="text">
   Australian Household Carbon Calculator
    </p>
    <p id="text2">
      Helping Australians measure, understand, and reduce their carbon emissions.
    </p>
  </div>
</div>
    <!-- <div class="container-fluid p-0 mb-5">
      <div class="position-relative"> -->
        <!-- Background -->
        <!-- <img
          src="https://streetfurniture.com/wp-content/uploads/2024/06/Top-Banner.jpg"
          class="img-fluid w-100 rounded-3 shadow-sm"
          style="height: 360px; object-fit: cover; filter: brightness(0.55)"
          alt="Australian nature banner"
        /> -->

        <!-- Text -->
        <!-- <div
          class="position-absolute top-50 start-50 translate-middle text-center text-white px-3 px-md-5"
        >
          <h1 class="banner-title mb-3">Australian Household Carbon Calculator</h1>

          <p class="banner-subtitle mb-4">
            Helping Australians measure, understand, and reduce their carbon emissions.
          </p>
        </div>
      </div>
    </div> -->

    <!-- THREE NAVIGATION BUTTONS -->
    <div class="container my-5">
      <div class="row g-3 justify-content-center">
        <div class="col-12 4">
          <h2 style="color: black; text-align: center">
            Welcome to the Australian Household Carbon Calculator
          </h2>
          <p style="color: black;">
            Welcome! This tool helps Australian households estimate the real financial and
            carbon-emission benefits of switching to an electric vehicle (EV) and installing home
            solar panels. Whether you're exploring cleaner transport options, looking to reduce
            energy bills, or wanting to make a positive environmental impact, this calculator gives
            you a simple, personalised overview of your potential savings.
          </p>
        </div>
        <div class="col-12 col-md-4">
          <router-link to="/solar" class="btn btn-info btn-lg w-100 py-3" style="background-color: #099ec8;">
            <i class="bi bi-sun-fill me-2"></i>
            Solar Calculator
          </router-link>
        </div>
        <div class="col-12 col-md-4">
          <router-link to="/ev" class="btn btn-info btn-lg w-100 py-3" style="background-color: #099ec8;">
            <i class="bi bi-ev-front-fill me-2"></i>
            EV Calculator
          </router-link>
        </div>
        <div class="col-12 col-md-4">
          <router-link to="/combined" class="btn btn-info btn-lg w-100 py-3" style="background-color: #099ec8;">
            <i class="bi bi-calculator-fill me-2"></i>
            Combined Calculator
          </router-link>
        </div>
      </div>
    </div>

    <!-- INTRO CARDS -->
    <div class="container my-5">
      <div class="row g-4">
        <!-- Card 1 -->
        <div class="col-lg-4">
          <div class="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
            <img
              src="\src\assets\carbon.jpeg"
              class="card-img-top"
              alt="Australia emissions"
              style="height: 190px; object-fit: cover"
            />
            <div class="card-body">
              <h4 class="card-title fw-semibold mb-3">Why Reducing Emissions Matters</h4>
              <p class="card-text text-secondary">
                Australia remains one of the world's highest per-capita emitters. Energy use and
                transport are major contributors, making personal awareness crucial for climate
                action.
              </p>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="col-lg-4">
          <div class="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
            <img
              src="\src\assets\solarcharging.jpeg"
              class="card-img-top"
              alt="Solar and EV solutions"
              style="height: 190px; object-fit: cover"
            />
            <div class="card-body">
              <h4 class="card-title fw-semibold mb-3">Solar & EVs Are Powerful Solutions</h4>
              <p class="card-text text-secondary">
                Switching to solar panels or an electric vehicle can significantly lower household
                carbon emissions while reducing long-term costs.
              </p>
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="col-lg-4">
          <div class="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
            <img
              src="\src\assets\calculator2.png"
              class="card-img-top"
              alt="Calculate carbon savings"
              style="height: 190px; object-fit: cover"
            />
            <div class="card-body">
              <h4 class="card-title fw-semibold mb-3">See Your Impact With Our Calculator</h4>
              <p class="card-text text-secondary">
                Our tool helps you estimate how solar power or electric vehicles can reduce your
                carbon footprint based on real Australian data.
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 4" style="color: black;">
          <h2 style="color: black; text-align: center">
            Supporting UN Sustainable Development Goal 13
          </h2>
          <p>
            This project directly supports UN SDG 13: Climate Action, which encourages individuals
            and communities to reduce greenhouse gas emissions and adopt sustainable energy systems.
            By exploring your future with an EV and home solar, you're contributing to:
          </p>
          <ul>
            <li>Lower transport emissions</li>
            <li>Increased renewable energy use</li>
            <li>Reduced national reliance on fossil fuels</li>
            <li>A healthier climate for future generations</li>
          </ul>
          <p>
            Small decisions at home—like switching how you drive and power your household—play a vital role in Australia's transition to a low-carbon future.
          </p>
        </div>
      </div>
    </div>
    </div>
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
.landing-page h1 {
  font-weight: 600;
  letter-spacing: -0.5px;
}

.card-title {
  font-size: 1.25rem;
}

.card-text {
  line-height: 1.5;
}

/* Navigation Buttons Styling */
.btn-lg {
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
}

.btn-lg:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.btn-primary {
  background-color: #667eea;
}

.btn-primary:hover {
  background-color: #5568d3;
}

.btn-success {
  background-color: #11998e;
}

.btn-success:hover {
  background-color: #0f8278;
}

.btn-info {
  background-color: #4facfe;
  color: white;
}

.btn-info:hover {
  background-color: #3a96e8;
}

/* Hero Section */
/* .hero-section {
  padding: 3rem 1rem;

  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 15px;
  margin-bottom: 2rem;
}

.hero-section h1 {
  font-weight: 700;
} */

/* Step Badges */
.step-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: white;
  color: #333;
  border-radius: 50%;
  font-weight: bold;
  font-size: 1.2rem;
}

/* Card Gradients */
.bg-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.bg-gradient-success {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.bg-gradient-warning {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.bg-gradient-info {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

/* Calculate Button */
.btn-calculate {
  padding: 1rem 3rem;
  font-size: 1.3rem;
  font-weight: bold;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.btn-calculate:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.btn-icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

/* Results Section */
.results-section {
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: slideUp 0.5s ease-out;
}

.result-header {
  border-bottom: 3px solid #e0e0e0;
  padding-bottom: 1rem;
}

.result-icon {
  font-size: 2rem;
}

.result-number-large {
  font-size: 3.5rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.result-unit {
  font-size: 1.2rem;
  color: #666;
  margin: 0.5rem 0 0 0;
}

.result-label {
  font-size: 1rem;
  color: #888;
  margin: 0;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 1rem;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .option-icon {
    font-size: 2rem;
  }

  .radio-icon {
    font-size: 2rem;
  }

  .result-number {
    font-size: 2rem;
  }

  .result-number-large {
    font-size: 2.5rem;
  }

  .btn-calculate {
    width: 100%;
    margin-bottom: 1rem;
  }

  .comparison-emoji {
    font-size: 2rem;
  }

  .fun-fact-emoji {
    font-size: 2rem;
  }

  .fun-fact-number {
    font-size: 1.5rem;
  }

  .money-amount {
    font-size: 1.5rem;
  }

  .co2-amount {
    font-size: 1.5rem;
  }
}

/* Shadow utilities */
.shadow-sm {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.shadow-lg {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}
</style>