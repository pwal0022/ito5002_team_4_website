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
          src="\src\assets\sourcesbanner.jpg"
          class="img-fluid w-100 rounded-3 shadow-sm"
          style="height: 360px; object-fit: cover; filter: brightness(0.55)"
          alt="Australian nature banner"
        />

        <!-- Text -->
        <div
          class="position-absolute top-50 start-50 translate-middle text-center text-white px-3 px-md-5"
        >
          <h1 class="banner-title mb-3">Data Sources</h1>

          <p class="banner-subtitle mb-4">
            We gather and colate sources from a range of trusted agencies for use within our
            calculator.
            <br />
            Last Update: 24/11/25
          </p>
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
              src="\src\assets\DCCEEW.png"
              class="card-img-top"
              alt="dcceew"
              style="height: 190px; object-fit: scale-down"
            />
            <div class="card-body">
              <h4 class="card-title fw-semibold mb-3">
                Department of Climate Change, Energy, the Environment and Water.(DCCEEW)
              </h4>
              <p class="card-text text-secondary">
                <a
                  href="https://www.dcceew.gov.au/sites/default/files/documents/national-greenhouse-account-factors-2024.pdf#:~:text=(kg%20CO2-e/kWh)%20National%200.81%200.11%20Page%2010,Climate%20Change%2C%20Energy%2C%20the%20Environment%20and%20Water
"
                  target="_blank"
                  >DCCEEW (2024). National Greenhouse Accounts Factors 2024.
                </a>
              </p>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="col-lg-4">
          <div class="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
            <img
              src="\src\assets\EnergyAustralia.png"
              class="card-img-top"
              alt="Energy Australia"
              style="height: 190px; object-fit: scale-down"
            />
            <div class="card-body">
              <h4 class="card-title fw-semibold mb-3">Energy Australia</h4>
              <p class="card-text text-secondary">
                <a
                  href="https://www.energy.gov.au/solar/solar-system-design/size-your-solar-system"
                  target="_blank"
                  >Office of the Chief Economist. (Year). Size your solar system. Australian
                  Government Department of Energy.
                </a>
              </p>
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="col-lg-4">
          <div class="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
            <img
              src="\src\assets\ABS.png"
              class="card-img-top"
              alt="Calculate carbon savings"
              style="height: 190px; object-fit: scale-down"
            />
            <div class="card-body">
              <h4 class="card-title fw-semibold mb-3">Australian Bureau of Statistics (ABS)</h4>
              <p class="card-text text-secondary">
                <a
                  href="https://www.abs.gov.au/statistics/industry/tourism-and-transport/survey-motor-vehicle-use-australia/12-months-ended-30-june-2018"
                  target="_blank"
                  >Australian Bureau of Statistics. (2019). Survey — Motor Vehicle Use, Australia:
                  12 months ended 30 June 2018.
                </a>
                <br />
                <a
                  href="https://www.abs.gov.au/articles/snapshot-vic-2021#:~:text=$1%2C715%20for%20families.-,Household%20and%20families,15.2%25%20were%20one-parent%20families "
                  target="_blank"
                  >Australian Bureau of Statistics. (2021). Snapshot – VIC 2021: Household and
                  families
                </a>
              </p>
            </div>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="col-lg-4">
          <div class="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
            <img
              src="\src\assets\AER.jpeg"
              class="card-img-top"
              alt="dcceew"
              style="height: 190px; object-fit: scale-down"
            />
            <div class="card-body">
              <h4 class="card-title fw-semibold mb-3">Australian Energy Regulator (AER)</h4>
              <p class="card-text text-secondary">
                <a
                  href="https://www.aer.gov.au/system/files/Residential%20energy%20consumption%20benchmarks%20-%209%20December%202020_0.pdf
"
                  target="_blank"
                  >Australian Energy Regulator. (2020, December 9). Residential energy consumption
                  benchmarks. Frontier Economics.
                </a>
              </p>
            </div>
          </div>
        </div>

        <!-- Card 5 -->
        <div class="col-lg-4">
          <div class="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
            <img
              src="\src\assets\carloop.png"
              class="card-img-top"
              alt="Energy Australia"
              style="height: 190px; object-fit: scale-down"
            />
            <div class="card-body">
              <h4 class="card-title fw-semibold mb-3">Carloop</h4>
              <p class="card-text text-secondary">
                <a
                  href="https://carloop.com.au/chart-of-the-week/chart-of-the-week-1/"
                  target="_blank"
                  >CarLoop. (2024). Chart of the Week: EV adoption in Australia.
                </a>
              </p>
            </div>
          </div>
        </div>

        <!-- Card 6 -->
        <div class="col-lg-4">
          <div class="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
            <img
              src="\src\assets\statista.png"
              class="card-img-top"
              alt="Calculate carbon savings"
              style="height: 190px; object-fit: scale-down"
            />
            <div class="card-body">
              <h4 class="card-title fw-semibold mb-3">Statista Summaries</h4>
              <p class="card-text text-secondary">
                <a
                  href="https://www.statista.com/statistics/608977/australia-households-by-state/"
                  target="_blank"
                  >Statista. Australia: Number of households by state.
                </a>
              </p>
            </div>
          </div>
        </div>

        <!-- Card 7 -->

        <div class="col-lg-4">
          <div class="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
            <img
              src="\src\assets\carsguide.jpeg"
              class="card-img-top"
              alt="dcceew"
              style="height: 190px; object-fit: scale-down"
            />
            <div class="card-body">
              <h4 class="card-title fw-semibold mb-3">Cars Guide</h4>
              <p class="card-text text-secondary">
                <a
                  href="https://www.carsguide.com.au/ev/advice/top-10-most-energy-efficient-evs-in-australia-86871#:~:text=ICE%20vehicles%2C%20of%20course%2C%20measure,energy%20efficiency%20of%20an%20EV
"
                  target="_blank"
                  >CarsGuide. (2024). Top 10 most energy-efficient EVs in Australia.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SourcesContent',
}
</script>

<style scoped>
/* h1 {
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
} */

/* Navigation Buttons Styling */
/* .btn-lg {
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
} */
</style>

<style scoped>
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
/* .step-badge {
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
} */

/* Card Gradients */
/* .bg-gradient-primary {
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
} */

/* Calculate Button */
/* .btn-calculate {
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
} */

/* Results Section */
/* .results-section {
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
} */

/* Mobile Responsiveness */
/* @media (max-width: 768px) {
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
} */

/* Shadow utilities */
/* .shadow-sm {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.shadow-lg {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
} */
</style>
