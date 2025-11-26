<template>
  <!-- <div class="ev-page"> -->
  <div class="hero-section mb-5">
    <!-- <div class="container"> -->
    <div id="hero-container">
      <img class="hero" src="\src\assets\evbanner.jpeg" />
      <div id="center-text">
        <p id="text">🚗 Electric Vehicle CO2 Calculator</p>
        <p id="text2">Compare emissions: Petrol/Diesel vs Electric Vehicle</p>
      </div>
    </div>
    <!-- <h1>Electric Vehicle CO2 Calculator</h1>
      <p class="subtitle">Compare emissions: Petrol/Diesel vs Electric Vehicle</p> -->

    <!-- <div class="calculator-card"> -->
    <form @submit.prevent="calculateSavings">
      <!-- Step 1: Location -->
      <div class="card mb-4 shadow-sm">
        <div class="card-header bg-gradient-primary text-white">
          <div class="d-flex align-items-center">
            <span class="step-badge me-3">1</span>
            <h3 class="mb-0">📍 Your Location</h3>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-12 mb-3">
              <!-- <div class="form-group"> -->
              <label for="state" class="form-label fw-bold">State/Territory *</label>
              <select
                v-model="formData.state"
                id="state"
                class="form-select form-select-lg"
                required
              >
                <option value="">Choose your state...</option>
                <option value="NSW">🏙️ New South Wales</option>
                <option value="VIC">🎭 Victoria</option>
                <option value="QLD">☀️ Queensland</option>
                <option value="SA">🍷 South Australia</option>
                <option value="WA">🏖️ Western Australia</option>
                <option value="TAS">🌲 Tasmania</option>
                <option value="NT">🦘 Northern Territory</option>
                <option value="ACT">🏛️ Australian Capital Territory</option>
              </select>
              <small class="form-text text-muted">
                We use this for state-specific grid emissions factors
              </small>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Tell us about your driving -->
      <div class="card mb-4 shadow-sm">
        <div class="card-header bg-gradient-primary text-white">
          <div class="d-flex align-items-center">
            <span class="step-badge me-3">2</span>
            <h3 class="mb-0">🚗 Tell us about your driving</h3>
          </div>
        </div>
        <div class="card-body">
          <!-- Current EV Status -->
          <div class="mb-4">
            <label class="form-label fw-bold mb-3">Do you already have an electric vehicle?</label>
            <div class="row">
              <div class="col-md-6 mb-2">
                <div
                  class="radio-card"
                  :class="{ 'radio-selected': formData.hasEV === 'yes' }"
                  @click="formData.hasEV = 'yes'"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    name="hasEV"
                    id="hasEVYes"
                    value="yes"
                    v-model="formData.hasEV"
                  />
                  <div class="radio-icon">⚡</div>
                  <h5>Yes, I drive electric</h5>
                  <p class="text-muted mb-0">Calculate current savings</p>
                </div>
              </div>
              <div class="col-md-6 mb-2">
                <div
                  class="radio-card"
                  :class="{ 'radio-selected': formData.hasEV === 'no' }"
                  @click="formData.hasEV = 'no'"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    name="hasEV"
                    id="hasEVNo"
                    value="no"
                    v-model="formData.hasEV"
                  />
                  <div class="radio-icon">🚗</div>
                  <h5>No, I'm considering it</h5>
                  <p class="text-muted mb-0">See potential savings</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Current Vehicle Type -->
          <div class="row mb-4">
            <div class="col-md-6">
              <label for="currentVehicle" class="form-label fw-bold"
                >What type of car do you currently drive? *</label
              >
              <select
                v-model="formData.currentVehicle"
                id="currentVehicle"
                class="form-select form-select-lg"
                required
              >
                <option value="">Choose your car type...</option>
                <option value="petrol-small">🚗 Small petrol car (e.g., Mazda 3, Corolla)</option>
                <option value="petrol-medium">🚙 Medium petrol car (e.g., Camry, Accord)</option>
                <option value="petrol-large">🚐 Large petrol car/SUV (e.g., RAV4, CX-5)</option>
                <option value="diesel-small">🚗 Small diesel car</option>
                <option value="diesel-medium">🚙 Medium diesel car</option>
                <option value="diesel-large">🚐 Large diesel car/SUV</option>
              </select>
            </div>

            <div class="col-md-6">
              <label for="annualKm" class="form-label fw-bold"
                >How many kilometers do you drive per year? *</label
              >
              <input
                type="number"
                v-model.number="formData.annualKm"
                id="annualKm"
                class="form-control form-control-lg"
                min="1000"
                max="50000"
                step="100"
                placeholder="15000"
                required
              />
              <small class="form-text text-muted"
                >💡 <strong>Average Australian:</strong> 10,000-15,000 km/year</small
              >
            </div>
          </div>

          <!-- EV Model -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="evModel" class="form-label fw-bold"
                >Which electric vehicle are you considering? *</label
              >
              <select
                v-model="formData.evModel"
                id="evModel"
                class="form-select form-select-lg"
                required
              >
                <option value="">Select EV model...</option>
                <option value="tesla-model3">Tesla Model 3</option>
                <option value="tesla-modely">Tesla Model Y</option>
                <option value="nissan-leaf">Nissan Leaf</option>
                <option value="hyundai-kona">Hyundai Kona Electric</option>
                <option value="mg-zs">MG ZS EV</option>
                <option value="byd-atto3">BYD Atto 3</option>
                <option value="polestar-2">Polestar 2</option>
                <option value="bmw-i4">BMW i4</option>
              </select>
            </div>

            <div class="col-md-6">
              <label for="chargingType" class="form-label fw-bold"
                >How would you mainly charge your EV?</label
              >
              <select
                v-model="formData.chargingType"
                id="chargingType"
                class="form-select form-select-lg"
              >
                <option value="home">🏠 At home (cheapest)</option>
                <option value="work">🏢 At work</option>
                <option value="public">⚡ Public charging stations</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="text-center mb-5">
        <!-- <button type="submit" class="btn-primary">Compare Emissions</button> -->
        <button type="submit" class="btn btn-primary btn-lg btn-calculate shadow-lg">
          <span class="btn-icon">🧮</span>
          Calculate My EV Savings
        </button>
        <br />
        <button type="button" class="btn btn-link mt-3" @click="clearForm" style="color: black">
          Clear and start over
        </button>
        <!-- <button type="button" class="btn-secondary" @click="clearForm" style="color: black">
          Clear and start over
        </button> -->
      </div>
    </form>
    <!-- </div> -->

    <!-- Results -->
    <div v-if="results" class="results-card animate-in">
      <div class="card border-success shadow-lg mb-5">
        <div class="card-header bg-gradient-success text-white text-center py-4">
          <h2 class="mb-0">🌱 Your EV Impact</h2>
          <p class="mb-0 mt-2">See how much you could save by switching to electric!</p>
        </div>
        <div class="card-body p-4">
          <!-- Comparison Cards -->
          <div class="comparison-grid">
            <div class="comparison-card ice">
              <h3>🚗 Current Vehicle</h3>
              <div class="vehicle-name">{{ results.currentVehicleName }}</div>
              <div class="emission-value">{{ results.iceEmissions }}</div>
              <div class="emission-label">tonnes CO2/year</div>
            </div>

            <div class="vs-badge">VS</div>

            <div class="comparison-card ev">
              <h3>⚡ Electric Vehicle</h3>
              <div class="vehicle-name">{{ results.evName }}</div>
              <div class="emission-value">{{ results.evEmissions }}</div>
              <div class="emission-label">tonnes CO2/year</div>
            </div>
          </div>

          <!-- Savings -->
          <div class="savings-highlight">
            <div class="savings-icon">🌱</div>
            <div class="savings-content">
              <h3>You Could Save</h3>
              <div class="savings-value">{{ results.co2Saved }} tonnes CO2/year</div>
              <div class="savings-percent">
                {{ results.reductionPercent }}% reduction in emissions!
              </div>
            </div>
          </div>

          <!-- Additional Metrics -->
          <div class="results-grid">
            <div class="result-item">
              <div class="result-icon">🚗</div>
              <div class="result-value">{{ results.carsOffRoad }}</div>
              <div class="result-label">Cars Off Road (Equivalent)</div>
            </div>

            <div class="result-item">
              <div class="result-icon">🌳</div>
              <div class="result-value">{{ results.treesEquivalent }}</div>
              <div class="result-label">Trees Planted Equivalent</div>
            </div>

            <div class="result-item">
              <div class="result-icon">🏠</div>
              <div class="result-value">{{ results.householdPercent }}%</div>
              <div class="result-label">Of Avg Household Emissions</div>
            </div>

            <div class="result-item">
              <div class="result-icon">💰</div>
              <div class="result-value">${{ results.fuelSavings }}</div>
              <div class="result-label">Estimated Fuel Savings/Year</div>
            </div>
          </div>

          <!-- Info Box -->
          <div class="info-box">
            <h5>📊 How We Calculated This</h5>
            <div class="row">
              <div class="col-md-6">
                <p><strong>Annual distance:</strong> {{ formData.annualKm.toLocaleString() }} km</p>
                <p>
                  <strong>State grid emissions:</strong> {{ results.gridEmissions }} kg CO2-e per
                  kWh
                </p>
              </div>
              <div class="col-md-6">
                <p><strong>EV efficiency:</strong> {{ results.evEfficiency }} kWh/100km</p>
                <p><strong>ICE emissions:</strong> {{ results.iceEmissionsPerKm }} kg CO2/km</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
  <!-- </div> -->
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  state: '',
  hasEV: 'no',
  currentVehicle: '',
  annualKm: null,
  evModel: '',
  chargingType: 'home',
})

const results = ref(null)

const TEST_DATA = {
  gridEmissions: {
    NSW: 0.79,
    VIC: 0.98,
    QLD: 0.82,
    SA: 0.42,
    WA: 0.64,
    TAS: 0.15,
    NT: 0.59,
    ACT: 0.0,
  },
  iceVehicles: {
    'petrol-small': { emissions: 0.15, name: 'Small Petrol Car', fuelCost: 0.18 },
    'petrol-medium': { emissions: 0.2, name: 'Medium Petrol Car', fuelCost: 0.22 },
    'petrol-large': { emissions: 0.28, name: 'Large Petrol Car', fuelCost: 0.3 },
    'diesel-small': { emissions: 0.14, name: 'Small Diesel Car', fuelCost: 0.16 },
    'diesel-medium': { emissions: 0.18, name: 'Medium Diesel Car', fuelCost: 0.2 },
    'diesel-large': { emissions: 0.25, name: 'Large Diesel Car/4WD', fuelCost: 0.28 },
  },
  evModels: {
    'tesla-model3': { efficiency: 15.0, name: 'Tesla Model 3' },
    'tesla-modely': { efficiency: 16.5, name: 'Tesla Model Y' },
    'nissan-leaf': { efficiency: 17.0, name: 'Nissan Leaf' },
    'hyundai-kona': { efficiency: 14.5, name: 'Hyundai Kona Electric' },
    'mg-zs': { efficiency: 16.0, name: 'MG ZS EV' },
    'byd-atto3': { efficiency: 15.5, name: 'BYD Atto 3' },
    'polestar-2': { efficiency: 18.0, name: 'Polestar 2' },
    'bmw-i4': { efficiency: 17.5, name: 'BMW i4' },
  },
  electricityCost: 0.3,
}

const calculateSavings = () => {
  const { state, currentVehicle, annualKm, evModel } = formData.value

  if (!state || !currentVehicle || !annualKm || !evModel) {
    alert('Please fill in all fields')
    return
  }

  const iceData = TEST_DATA.iceVehicles[currentVehicle]
  const evData = TEST_DATA.evModels[evModel]
  const gridEmissionsFactor = TEST_DATA.gridEmissions[state]

  const iceEmissionsKg = annualKm * iceData.emissions
  const iceEmissionsTonnes = (iceEmissionsKg / 1000).toFixed(2)

  const evEnergyKwh = (annualKm / 100) * evData.efficiency
  const evEmissionsKg = evEnergyKwh * gridEmissionsFactor
  const evEmissionsTonnes = (evEmissionsKg / 1000).toFixed(2)

  const co2SavedKg = iceEmissionsKg - evEmissionsKg
  const co2Saved = (co2SavedKg / 1000).toFixed(2)
  const reductionPercent = Math.round((co2SavedKg / iceEmissionsKg) * 100)

  const carsOffRoad = Math.round(co2SavedKg / 1000 / 4)
  const treesEquivalent = Math.round(co2SavedKg / 60)
  const householdPercent = Math.round((co2SavedKg / 1000 / 14) * 100)

  const fuelCostAnnual = annualKm * iceData.fuelCost
  const electricityCostAnnual = evEnergyKwh * TEST_DATA.electricityCost
  const fuelSavings = Math.round(fuelCostAnnual - electricityCostAnnual)

  results.value = {
    currentVehicleName: iceData.name,
    evName: evData.name,
    iceEmissions: iceEmissionsTonnes,
    evEmissions: evEmissionsTonnes,
    co2Saved,
    reductionPercent,
    carsOffRoad: carsOffRoad.toLocaleString(),
    treesEquivalent: treesEquivalent.toLocaleString(),
    householdPercent,
    fuelSavings: fuelSavings.toLocaleString(),
    gridEmissions: gridEmissionsFactor,
    evEfficiency: evData.efficiency,
    iceEmissionsPerKm: iceData.emissions,
  }

  setTimeout(() => {
    const resultsElement = document.querySelector('.results-card')
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 100)
}

const clearForm = () => {
  formData.value = {
    state: '',
    hasEV: 'no',
    currentVehicle: '',
    annualKm: null,
    evModel: '',
    chargingType: 'home',
  }
  results.value = null
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
/* All styling is now in the external style.css file */
</style>
