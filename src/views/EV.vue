<template>
  <div class="hero-section mb-5">
    <div id="hero-container">
      <img class="hero" src="\src\assets\evbanner.jpeg" />
      <div id="center-text">
        <p id="text">🚗 Electric Vehicle CO2 Calculator</p>
        <p id="text2">Compare emissions: Petrol/Diesel vs Electric Vehicle</p>
      </div>
    </div>

    <!-- Loading indicator -->
    <div v-if="isLoading" class="text-center py-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading data...</span>
      </div>
      <p class="mt-2 text-muted">Loading calculator data...</p>
    </div>

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
              <label for="state" class="form-label fw-bold">State/Territory *</label>
              <select
                v-model="formData.state"
                id="state"
                class="form-select form-select-lg"
                :class="{ 'is-invalid': errors.state }"
                @change="validateState"
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
              <div v-if="errors.state" class="invalid-feedback d-block">
                {{ errors.state }}
              </div>
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
                :class="{ 'is-invalid': errors.currentVehicle }"
                @change="validateCurrentVehicle"
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
              <div v-if="errors.currentVehicle" class="invalid-feedback d-block">
                {{ errors.currentVehicle }}
              </div>
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
                :class="{ 'is-invalid': errors.annualKm }"
                @blur="validateAnnualKm(true)"
                @input="validateAnnualKm(false)"
                min="1000"
                max="50000"
                step="100"
                placeholder="15000"
                required
              />
              <div v-if="errors.annualKm" class="invalid-feedback d-block">
                {{ errors.annualKm }}
              </div>
              <small class="form-text text-muted"
                >💡 <strong>Average Australian:</strong> {{ currentStateData?.avgKmPerYear?.toLocaleString() || '12,000-14,000' }} km/year</small
              >
            </div>
          </div>

          <!-- EV Model - OPTIONAL -->
          <div class="row mb-3">
            <div class="col-md-12">
              <label for="evModel" class="form-label fw-bold"
                >Are you interested in a specific electric vehicle?</label
              >
              <select
                v-model="formData.evModel"
                id="evModel"
                class="form-select form-select-lg"
              >
                <option value="">Not sure yet / Use average EV</option>
                <option value="tesla-model3">Tesla Model 3</option>
                <option value="tesla-modely">Tesla Model Y</option>
                <option value="nissan-leaf">Nissan Leaf</option>
                <option value="hyundai-kona">Hyundai Kona Electric</option>
                <option value="mg-zs">MG ZS EV</option>
                <option value="byd-atto3">BYD Atto 3</option>
                <option value="polestar-2">Polestar 2</option>
                <option value="bmw-i4">BMW i4</option>
              </select>
              <small class="form-text text-muted">
                Optional: Leave blank to use average EV efficiency ({{ currentStateData?.avgEfficiencyKwhPer100km || 20 }} kWh/100km)
              </small>
            </div>
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="text-center mb-5">
        <button 
          type="submit" 
          class="btn btn-primary btn-lg btn-calculate shadow-lg"
        >
          <span class="btn-icon">🧮</span>
          Calculate My EV Savings
        </button>
        <br />
        <button type="button" class="btn btn-link mt-3" @click="clearForm" style="color: black">
          Clear and start over
        </button>
      </div>
    </form>

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

          <!-- Key Metrics -->
          <div class="row g-4 mb-4">
            <div class="col-md-4">
              <div class="result-card bg-success-light">
                <div class="result-icon-large">🌱</div>
                <p class="result-number">{{ results.co2Saved }}</p>
                <p class="result-unit">tonnes CO₂ saved/year</p>
                <small class="text-muted">{{ results.reductionPercent }}% reduction</small>
              </div>
            </div>

            <div class="col-md-4">
              <div class="result-card bg-warning-light">
                <div class="result-icon-large">💰</div>
                <p class="result-number">${{ results.fuelSavings }}</p>
                <p class="result-unit">fuel savings/year</p>
                <small class="text-muted">Based on current fuel prices</small>
              </div>
            </div>

            <div class="col-md-4">
              <div class="result-card bg-info-light">
                <div class="result-icon-large">🌳</div>
                <p class="result-number">{{ results.treesEquivalent }}</p>
                <p class="result-unit">trees planted equivalent</p>
                <small class="text-muted">Annual carbon offset</small>
              </div>
            </div>
          </div>

          <!-- Info Box -->
          <div class="alert alert-info">
            <h5>📊 How We Calculated This</h5>
            <ul class="mb-0">
              <li>
                <strong>Your State:</strong> {{ formData.state }} - Grid emissions factor: {{ results.gridEmissions }} kg CO₂/kWh
              </li>
              <li>
                <strong>Current Vehicle:</strong> {{ results.iceEmissionsPerKm * 1000 }} g CO₂/km
              </li>
              <li>
                <strong>EV Efficiency:</strong> {{ results.evEfficiency }} kWh/100km
              </li>
              <li>
                <strong>Annual Distance:</strong> {{ formData.annualKm?.toLocaleString() }} km
              </li>
            </ul>
          </div>
        </div>
        <div class="text-center mb-5">
          <router-link to="/rebates" class="nav-link" active-class="active" aria-current="page">
            <button type="button" class="btn btn-primary btn-md btn-calculate shadow-lg px-5">
              <span class="btn-icon">🚗</span>
              Find EV rebates for your state here.
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchAllCalculatorData } from '@/services/calculatorData'

const formData = ref({
  state: '',
  hasEV: 'no',
  currentVehicle: '',
  annualKm: null,
  evModel: '',
})

const results = ref(null)

// Firebase data
const firebaseData = ref(null)
const isLoading = ref(true)

// Error tracking
const errors = ref({
  state: null,
  currentVehicle: null,
  annualKm: null,
})

// ICE vehicle data (could be moved to Firebase in future)
const iceVehicles = {
  'petrol-small': { emissions: 0.15, name: 'Small Petrol Car', fuelCost: 0.18 },
  'petrol-medium': { emissions: 0.20, name: 'Medium Petrol Car', fuelCost: 0.22 },
  'petrol-large': { emissions: 0.28, name: 'Large Petrol Car', fuelCost: 0.30 },
  'diesel-small': { emissions: 0.14, name: 'Small Diesel Car', fuelCost: 0.16 },
  'diesel-medium': { emissions: 0.18, name: 'Medium Diesel Car', fuelCost: 0.20 },
  'diesel-large': { emissions: 0.25, name: 'Large Diesel Car/4WD', fuelCost: 0.28 },
}

// EV model efficiency data
const evModels = {
  'tesla-model3': { efficiency: 15.0, name: 'Tesla Model 3' },
  'tesla-modely': { efficiency: 16.5, name: 'Tesla Model Y' },
  'nissan-leaf': { efficiency: 17.0, name: 'Nissan Leaf' },
  'hyundai-kona': { efficiency: 14.5, name: 'Hyundai Kona Electric' },
  'mg-zs': { efficiency: 16.0, name: 'MG ZS EV' },
  'byd-atto3': { efficiency: 15.5, name: 'BYD Atto 3' },
  'polestar-2': { efficiency: 18.0, name: 'Polestar 2' },
  'bmw-i4': { efficiency: 17.5, name: 'BMW i4' },
}

// Computed property for current state data from Firebase
const currentStateData = computed(() => {
  if (!formData.value.state || !firebaseData.value?.evData) {
    return null
  }
  return firebaseData.value.evData[formData.value.state]
})

// Load Firebase data on mount
onMounted(async () => {
  await loadFirebaseData()
})

async function loadFirebaseData() {
  isLoading.value = true
  try {
    const data = await fetchAllCalculatorData()
    firebaseData.value = data
    console.log('✅ EV calculator data loaded from Firebase')
  } catch (error) {
    console.error('Failed to load Firebase data:', error)
  } finally {
    isLoading.value = false
  }
}

// Validation Functions
const validateState = () => {
  if (!formData.value.state) {
    errors.value.state = 'Please select your state or territory'
    return false
  }
  errors.value.state = null
  return true
}

const validateCurrentVehicle = () => {
  if (!formData.value.currentVehicle) {
    errors.value.currentVehicle = 'Please select your current vehicle type'
    return false
  }
  errors.value.currentVehicle = null
  return true
}

const validateAnnualKm = (showError) => {
  const km = formData.value.annualKm
  
  if (!km || km === 0) {
    if (showError) {
      errors.value.annualKm = 'Please enter your annual driving distance'
    }
    return false
  }
  
  if (km < 1000) {
    if (showError) {
      errors.value.annualKm = 'Minimum 1,000 km per year. Please enter a realistic annual distance.'
    }
    return false
  }
  
  if (km > 50000) {
    if (showError) {
      errors.value.annualKm = 'Maximum 50,000 km per year. For higher distances, please contact us for a custom calculation.'
    }
    return false
  }
  
  errors.value.annualKm = null
  return true
}

const calculateSavings = () => {
  // Validate all fields before calculating
  const stateValid = validateState()
  const vehicleValid = validateCurrentVehicle()
  const kmValid = validateAnnualKm(true)

  if (!stateValid || !vehicleValid || !kmValid) {
    // Scroll to first error and highlight
    setTimeout(() => {
      const firstError = document.querySelector('.is-invalid')
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
        firstError.focus()
      }
    }, 100)
    return
  }

  const { state, currentVehicle, annualKm, evModel } = formData.value

  // Get state data from Firebase
  const stateData = currentStateData.value || {
    gridEmissionsFactorScope2: 0.7,
    avgEfficiencyKwhPer100km: 20,
  }

  const iceData = iceVehicles[currentVehicle]
  
  // Use specific model or fallback to Firebase average or default
  const evData = evModel 
    ? evModels[evModel]
    : { efficiency: stateData.avgEfficiencyKwhPer100km || 16.0, name: 'Average Electric Vehicle' }
  
  // Use Firebase grid emissions factor
  const gridEmissionsFactor = stateData.gridEmissionsFactorScope2

  const iceEmissionsKg = annualKm * iceData.emissions
  const iceEmissionsTonnes = (iceEmissionsKg / 1000).toFixed(2)

  const evEnergyKwh = (annualKm / 100) * evData.efficiency
  const evEmissionsKg = evEnergyKwh * gridEmissionsFactor
  const evEmissionsTonnes = (evEmissionsKg / 1000).toFixed(2)

  const co2SavedKg = iceEmissionsKg - evEmissionsKg
  const co2Saved = (co2SavedKg / 1000).toFixed(2)
  const reductionPercent = Math.round((co2SavedKg / iceEmissionsKg) * 100)

  const treesEquivalent = Math.round(co2SavedKg / 60)

  const fuelCostAnnual = annualKm * iceData.fuelCost
  const electricityCostAnnual = evEnergyKwh * 0.30
  const fuelSavings = Math.round(fuelCostAnnual - electricityCostAnnual)

  results.value = {
    currentVehicleName: iceData.name,
    evName: evData.name,
    iceEmissions: iceEmissionsTonnes,
    evEmissions: evEmissionsTonnes,
    co2Saved,
    reductionPercent,
    treesEquivalent: treesEquivalent.toLocaleString(),
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
  }
  errors.value = {
    state: null,
    currentVehicle: null,
    annualKm: null,
  }
  results.value = null
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
/* All styling is now in the external style.css file */

/* Additional styles for validation feedback */
.invalid-feedback {
  display: block;
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-control.is-invalid,
.form-select.is-invalid {
  border-color: #dc3545;
  padding-right: calc(1.5em + 0.75rem);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.form-control.is-invalid:focus,
.form-select.is-invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}

.btn-calculate:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>