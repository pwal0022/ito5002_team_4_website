<template>
  <div class="combined-calculator">
    <div class="container">
      <!-- Hero Section -->
      <div class="hero-section text-center mb-5">
        <h1 class="display-4 mb-3">🌏 Combined Carbon Calculator</h1>
        <p class="lead">Calculate your total impact from both solar panels AND electric vehicles</p>
        <p class="text-muted">See your complete household carbon reduction potential!</p>
      </div>

      <form @submit.prevent="submitForm">
        <!-- Step 1: Location -->
        <div class="card mb-4 shadow-sm">
          <div class="card-header bg-gradient-primary text-white">
            <div class="d-flex align-items-center">
              <span class="step-badge me-3">1</span>
              <h3 class="mb-0">📍 Where do you live?</h3>
            </div>
          </div>
          <div class="card-body">
            <p class="text-muted mb-3">We need this to calculate your state's energy emissions</p>
            <div class="row">
              <div class="col-md-6">
                <label for="state" class="form-label fw-bold">Select your state *</label>
                <select
                  class="form-select form-select-lg"
                  id="state"
                  v-model="formData.state"
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
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Solar Details -->
        <div class="card mb-4 shadow-sm">
          <div class="card-header bg-gradient-warning">
            <div class="d-flex align-items-center">
              <span class="step-badge me-3">2</span>
              <h3 class="mb-0">☀️ Tell us about your solar setup</h3>
            </div>
          </div>
          <div class="card-body">
            <!-- Current Status -->
            <div class="mb-4">
              <label class="form-label fw-bold mb-3">Do you already have solar panels?</label>
              <div class="row">
                <div class="col-md-6 mb-2">
                  <div
                    class="radio-card"
                    :class="{ 'radio-selected': formData.solar.hasSolar === 'yes' }"
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      name="hasSolar"
                      id="hasSolarYes"
                      value="yes"
                      v-model="formData.solar.hasSolar"
                    />
                    <label class="form-check-label w-100" for="hasSolarYes">
                      <div class="text-center">
                        <div class="radio-icon">✅</div>
                        <strong>Yes, I have solar</strong>
                      </div>
                    </label>
                  </div>
                </div>
                <div class="col-md-6 mb-2">
                  <div
                    class="radio-card"
                    :class="{ 'radio-selected': formData.solar.hasSolar === 'no' }"
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      name="hasSolar"
                      id="hasSolarNo"
                      value="no"
                      v-model="formData.solar.hasSolar"
                    />
                    <label class="form-check-label w-100" for="hasSolarNo">
                      <div class="text-center">
                        <div class="radio-icon">💭</div>
                        <strong>No, I'm considering it</strong>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Number of Panels & Quality -->
            <div class="row mb-4">
              <div class="col-md-6">
                <label for="numberOfPanels" class="form-label fw-bold">
                  How many solar panels? *
                </label>
                <input
                  type="number"
                  class="form-control form-control-lg"
                  id="numberOfPanels"
                  v-model="formData.solar.numberOfPanels"
                  @blur="() => validateSolarPanels(true)"
                  @input="() => validateSolarPanels(false)"
                  step="1"
                  min="1"
                  max="100"
                  placeholder="20"
                  required
                />
                <div v-if="errors.numberOfPanels" class="text-danger small mt-1">
                  {{ errors.numberOfPanels }}
                </div>
                <small class="form-text text-muted">
                  💡 <strong>Typical homes:</strong> 15-25 panels (each panel = 400 watts)
                </small>
              </div>
              <div class="col-md-6">
                <label for="panelQuality" class="form-label fw-bold">Panel quality</label>
                <select
                  class="form-select form-select-lg"
                  id="panelQuality"
                  v-model="formData.solar.efficiency"
                >
                  <option value="0.85">Good (Standard panels)</option>
                  <option value="0.90">Better (Premium panels)</option>
                  <option value="0.95">Best (High-efficiency panels)</option>
                </select>
                <small class="form-text text-muted">
                  Higher quality = more energy from same number of panels
                </small>
              </div>
            </div>

            <!-- Electricity Bill -->
            <div class="row mb-4">
              <div class="col-md-6">
                <label for="electricityBill" class="form-label fw-bold">
                  What's your electricity bill? *
                </label>
                <div class="input-group input-group-lg">
                  <span class="input-group-text">$</span>
                  <input
                    type="number"
                    class="form-control"
                    id="electricityBill"
                    v-model="formData.solar.electricityBill"
                    @blur="() => validateElectricityBill(true)"
                    @input="() => validateElectricityBill(false)"
                    step="0.01"
                    min="0"
                    placeholder="450"
                  />
                </div>
                <div v-if="errors.electricityBill" class="text-danger small mt-1">
                  {{ errors.electricityBill }}
                </div>
                <small class="form-text text-muted">
                  💡 <strong>Average Australian bill:</strong> $300-500 per quarter
                </small>
              </div>

              <div class="col-md-6">
                <label for="billFrequency" class="form-label fw-bold">How often do you pay?</label>
                <select
                  class="form-select form-select-lg"
                  id="billFrequency"
                  v-model="formData.solar.billFrequency"
                >
                  <option value="monthly">Every month</option>
                  <option value="quarterly">Every 3 months (quarter)</option>
                  <option value="annually">Once a year</option>
                </select>
              </div>
            </div>

            <!-- Roof Details -->
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="roofOrientation" class="form-label fw-bold"
                  >Which way does your roof face?</label
                >
                <select
                  class="form-select form-select-lg"
                  id="roofOrientation"
                  v-model="formData.solar.orientation"
                >
                  <option value="north">⬆️ North (Best in Australia!)</option>
                  <option value="northeast">↗️ North-East (Great)</option>
                  <option value="northwest">↖️ North-West (Great)</option>
                  <option value="east">➡️ East (Good)</option>
                  <option value="west">⬅️ West (Good)</option>
                  <option value="south">⬇️ South (OK)</option>
                </select>
                <small class="form-text text-muted">
                  North-facing roofs get the most sun in Australia
                </small>
              </div>

              <div class="col-md-6">
                <label for="roofShading" class="form-label fw-bold"
                  >How much shade is on your roof?</label
                >
                <select
                  class="form-select form-select-lg"
                  id="roofShading"
                  v-model="formData.solar.shading"
                >
                  <option value="none">☀️ No shade (full sun all day)</option>
                  <option value="minimal">🌤️ A little shade (trees/buildings)</option>
                  <option value="moderate">⛅ Moderate shade (part of the day)</option>
                  <option value="heavy">☁️ Lots of shade (most of the day)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: EV Details -->
        <div class="card mb-4 shadow-sm">
          <div class="card-header bg-gradient-info text-white">
            <div class="d-flex align-items-center">
              <span class="step-badge me-3">3</span>
              <h3 class="mb-0">🚗 Tell us about your driving</h3>
            </div>
          </div>
          <div class="card-body">
            <!-- Current EV Status -->
            <div class="mb-4">
              <label class="form-label fw-bold mb-3"
                >Do you already have an electric vehicle?</label
              >
              <div class="row">
                <div class="col-md-6 mb-2">
                  <div
                    class="radio-card"
                    :class="{ 'radio-selected': formData.ev.hasEV === 'yes' }"
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      name="hasEV"
                      id="hasEVYes"
                      value="yes"
                      v-model="formData.ev.hasEV"
                    />
                    <label class="form-check-label w-100" for="hasEVYes">
                      <div class="text-center">
                        <div class="radio-icon">⚡</div>
                        <strong>Yes, I drive an EV</strong>
                      </div>
                    </label>
                  </div>
                </div>
                <div class="col-md-6 mb-2">
                  <div class="radio-card" :class="{ 'radio-selected': formData.ev.hasEV === 'no' }">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="hasEV"
                      id="hasEVNo"
                      value="no"
                      v-model="formData.ev.hasEV"
                    />
                    <label class="form-check-label w-100" for="hasEVNo">
                      <div class="text-center">
                        <div class="radio-icon">💭</div>
                        <strong>No, I'm considering it</strong>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Current Vehicle & Driving -->
            <div class="row mb-4">
              <div class="col-md-6">
                <label for="currentVehicleType" class="form-label fw-bold"
                  >What do you drive now? *</label
                >
                <select
                  class="form-select form-select-lg"
                  id="currentVehicleType"
                  v-model="formData.ev.currentVehicleType"
                  required
                >
                  <option value="">Choose your car type...</option>
                  <option value="petrol-small">🚗 Small petrol car (e.g., Mazda 3, Corolla)</option>
                  <option value="petrol-medium">🚙 Medium petrol car (e.g., Camry, Accord)</option>
                  <option value="petrol-large">🚐 Large petrol car/SUV (e.g., RAV4, CX-5)</option>
                  <option value="diesel-small">🚗 Small diesel car</option>
                  <option value="diesel-medium">🚙 Medium diesel car</option>
                  <option value="diesel-large">🚐 Large diesel car/SUV</option>
                  <option value="hybrid">⚡ Hybrid car (petrol + electric)</option>
                </select>
              </div>

              <div class="col-md-6">
                <label for="annualKm" class="form-label fw-bold"
                  >How far do you drive per year? *</label
                >
                <div class="input-group input-group-lg">
                  <input
                    type="number"
                    class="form-control"
                    id="annualKm"
                    v-model="formData.ev.annualKm"
                    @blur="() => validateAnnualKm(true)"
                    @input="() => validateAnnualKm(false)"
                    min="0"
                    step="1000"
                    placeholder="15000"
                    required
                  />
                  <span class="input-group-text">km</span>
                </div>
                <div v-if="errors.annualKm" class="text-danger small mt-1">
                  {{ errors.annualKm }}
                </div>
                <small class="form-text text-muted">
                  💡 <strong>Average Australian:</strong> 10,000-15,000 km per year
                </small>
              </div>
            </div>

            <!-- EV Model & Charging -->
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="evModel" class="form-label fw-bold"
                  >Interested in a specific EV? (optional)</label
                >
                <select
                  class="form-select form-select-lg"
                  id="evModel"
                  v-model="formData.ev.evModel"
                >
                  <option value="">Any electric car (we'll use average)</option>
                  <option value="tesla-model-3">Tesla Model 3</option>
                  <option value="tesla-model-y">Tesla Model Y</option>
                  <option value="mg-zs-ev">MG ZS EV</option>
                  <option value="nissan-leaf">Nissan Leaf</option>
                  <option value="hyundai-ioniq">Hyundai Ioniq</option>
                  <option value="byd-atto-3">BYD Atto 3</option>
                </select>
              </div>

              <div class="col-md-6">
                <label for="chargingType" class="form-label fw-bold"
                  >How would you charge it?</label
                >
                <select
                  class="form-select form-select-lg"
                  id="chargingType"
                  v-model="formData.ev.chargingType"
                >
                  <option value="home">🏠 At home (standard power)</option>
                  <option value="home-solar">☀️ At home (with solar panels)</option>
                  <option value="mixed">🔌 Mix of home and public charging</option>
                  <option value="public">⚡ Mainly public charging stations</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="text-center mb-5">
          <button type="submit" class="btn btn-primary btn-lg btn-calculate shadow-lg">
            <span class="btn-icon">🧮</span>
            Calculate My Combined Savings
          </button>
          <br />
          <button type="button" class="btn btn-link mt-3" @click="clearForm">
            Clear and start over
          </button>
        </div>
      </form>

      <!-- Results Section -->
      <div v-if="showResults" class="results-section animate-in">
        <div class="card border-success shadow-lg mb-5">
          <div class="card-header bg-gradient-success text-white text-center py-4">
            <h2 class="mb-0">🎉 Your Combined Carbon Savings!</h2>
            <p class="mb-0 mt-2">Here's your complete household impact</p>
          </div>
          <div class="card-body p-4">
            <!-- Combined Total First -->
            <div class="combined-results-top mb-5">
              <div class="result-header text-center mb-4">
                <h3>🌟 Your Total Household Impact</h3>
              </div>

              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <div class="result-card bg-success-light">
                    <div class="result-icon-large">🌍</div>
                    <h1 class="result-number-large">{{ results.combined.totalCO2Saved }}</h1>
                    <p class="result-unit">tonnes of CO₂ saved per year</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="result-card bg-success-light">
                    <div class="result-icon-large">💰</div>
                    <h1 class="result-number-large">
                      ${{ results.combined.totalCostSavings.toLocaleString() }}
                    </h1>
                    <p class="result-unit">total savings per year</p>
                  </div>
                </div>
              </div>

              <div class="achievement-banner">
                <h4>🏆 Amazing Achievement!</h4>
                <p class="mb-3">
                  This is equivalent to
                  <strong>planting {{ results.combined.totalTreesEquivalent }} trees</strong> or
                  removing <strong>{{ results.combined.totalCarsOffRoad }} cars</strong> from the
                  road for an entire year!
                </p>
                <div class="progress" style="height: 30px">
                  <div
                    class="progress-bar bg-success progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    :style="{ width: Math.min(results.combined.percentageOfTarget, 100) + '%' }"
                  >
                    <strong>{{ results.combined.percentageOfTarget }}% of household target!</strong>
                  </div>
                </div>
                <p class="text-muted small mt-2 mb-0">
                  Australia's target: Reduce household emissions by 43%. You're making a difference!
                  🎯
                </p>
              </div>
            </div>

            <!-- Individual Breakdowns -->
            <div class="individual-breakdowns mt-5 pt-4 border-top">
              <h4 class="text-center mb-4">📋 Individual Breakdown</h4>

              <!-- Solar Breakdown -->
              <div class="mb-4">
                <h5>☀️ Solar Panel Contribution</h5>
                <div class="row g-3">
                  <div class="col-md-4">
                    <div class="result-card bg-warning-light">
                      <div class="result-icon-large">🌍</div>
                      <h3 class="result-number">{{ results.solar.annualCO2Saved }}</h3>
                      <p class="result-unit">tonnes CO₂/year</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="result-card bg-warning-light">
                      <div class="result-icon-large">⚡</div>
                      <h3 class="result-number">
                        {{ results.solar.kWhGenerated.toLocaleString() }}
                      </h3>
                      <p class="result-unit">kWh generated</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="result-card bg-warning-light">
                      <div class="result-icon-large">💰</div>
                      <h3 class="result-number">
                        ${{ results.solar.costSavings.toLocaleString() }}
                      </h3>
                      <p class="result-unit">saved/year</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- EV Breakdown -->
              <div>
                <h5>🚗 Electric Vehicle Contribution</h5>
                <div class="row g-3">
                  <div class="col-md-4">
                    <div class="result-card bg-info-light">
                      <div class="result-icon-large">🌍</div>
                      <h3 class="result-number">{{ results.ev.annualCO2Saved }}</h3>
                      <p class="result-unit">tonnes CO₂/year</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="result-card bg-info-light">
                      <div class="result-icon-large">⛽</div>
                      <h3 class="result-number">{{ results.ev.fuelSaved.toLocaleString() }}</h3>
                      <p class="result-unit">litres fuel saved</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="result-card bg-info-light">
                      <div class="result-icon-large">💰</div>
                      <h3 class="result-number">${{ results.ev.costSavings.toLocaleString() }}</h3>
                      <p class="result-unit">saved/year</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CombinedCalculator',
  data() {
    return {
      formData: {
        state: '',
        solar: {
          hasSolar: 'no',
          numberOfPanels: '',
          efficiency: '0.85',
          electricityBill: '',
          billFrequency: 'quarterly',
          orientation: 'north',
          shading: 'none',
        },
        ev: {
          hasEV: 'no',
          currentVehicleType: '',
          annualKm: '',
          evModel: '',
          chargingType: 'home',
        },
      },
      errors: {
        electricityBill: null,
        annualKm: null,
        numberOfPanels: null,
      },
      showResults: false,
      results: {
        solar: null,
        ev: null,
        combined: null,
      },
    }
  },
  methods: {
    validateSolarPanels(blur) {
      if (!this.formData.solar.numberOfPanels || this.formData.solar.numberOfPanels <= 0) {
        if (blur) this.errors.numberOfPanels = 'Please enter your number of solar panels'
      } else {
        this.errors.numberOfPanels = null
      }
    },
    validateElectricityBill(blur) {
      const value = this.formData.solar.electricityBill

      if (!this.isValidNumber(value)) {
        if (blur) {
          this.errors.electricityBill = 'Please enter a valid electricity bill amount'
        }
        return
      }

      const billAmount = parseFloat(value)

      if (billAmount <= 0) {
        if (blur) {
          this.errors.electricityBill = 'Bill amount must be greater than $0'
        }
      } else if (billAmount > 10000) {
        if (blur) {
          this.errors.electricityBill = 'That seems very high! Please check your bill amount'
        }
      } else {
        this.errors.electricityBill = null
      }
    },

    validateAnnualKm(blur) {
      const value = this.formData.ev.annualKm

      if (!this.isValidNumber(value)) {
        if (blur) {
          this.errors.annualKm = 'Please enter a valid distance in kilometers'
        }
        return
      }

      const km = parseFloat(value)

      if (km <= 0) {
        if (blur) {
          this.errors.annualKm = 'Distance must be greater than 0 km'
        }
      } else if (km > 100000) {
        if (blur) {
          this.errors.annualKm =
            'That seems very high! Average is 13,300 km/year. Please check your input'
        }
      } else {
        this.errors.annualKm = null
      }
    },
    isValidNumber(value) {
      if (value === null || value === undefined || value === '') {
        return false
      }
      const num = parseFloat(value)
      return !isNaN(num) && isFinite(num)
    },
    safeParseFloat(value, defaultValue = 0) {
      if (value === null || value === undefined || value === '') {
        return defaultValue
      }
      const parsed = parseFloat(value)
      return !isNaN(parsed) && isFinite(parsed) ? parsed : defaultValue
    },
    calculateSolarSavings() {
      try {
        const emissionsFactors = {
          NSW: 0.79,
          VIC: 1.02,
          QLD: 0.81,
          SA: 0.47,
          WA: 0.7,
          TAS: 0.16,
          NT: 0.59,
          ACT: 0.79,
        }

        const orientationFactors = {
          north: 1.0,
          northeast: 0.95,
          northwest: 0.95,
          east: 0.85,
          west: 0.85,
          south: 0.65,
        }

        const shadingFactors = {
          none: 1.0,
          minimal: 0.9,
          moderate: 0.75,
          heavy: 0.5,
        }

        const numberOfPanels = this.safeParseFloat(this.formData.solar.numberOfPanels, 0)

        if (numberOfPanels <= 0) {
          throw new Error('Invalid number of panels')
        }

        const panelWattage = 0.4
        const systemSize = numberOfPanels * panelWattage

        const efficiency = this.safeParseFloat(this.formData.solar.efficiency, 0.85)
        const emissionsFactor = emissionsFactors[this.formData.state] || 0.79
        const orientationFactor = orientationFactors[this.formData.solar.orientation] || 1.0
        const shadingFactor = shadingFactors[this.formData.solar.shading] || 1.0

        const avgSunHours = 4.5

        const kWhGenerated = Math.round(
          systemSize * avgSunHours * 365 * efficiency * orientationFactor * shadingFactor,
        )

        if (!isFinite(kWhGenerated) || isNaN(kWhGenerated)) {
          throw new Error('Calculation error')
        }

        const annualCO2Saved = ((kWhGenerated * emissionsFactor) / 1000).toFixed(2)
        const costSavings = Math.round(kWhGenerated * 0.3)
        const treesEquivalent = Math.round((parseFloat(annualCO2Saved) * 1000) / 21)
        const carsOffRoad = (parseFloat(annualCO2Saved) / 4.6).toFixed(1)

        return {
          annualCO2Saved: parseFloat(annualCO2Saved),
          kWhGenerated,
          costSavings,
          treesEquivalent,
          carsOffRoad: parseFloat(carsOffRoad),
        }
      } catch (error) {
        console.error('Solar calculation error:', error)
        return {
          annualCO2Saved: 0,
          kWhGenerated: 0,
          costSavings: 0,
          treesEquivalent: 0,
          carsOffRoad: 0,
        }
      }
    },
    calculateEVSavings() {
      try {
        const emissionsFactors = {
          NSW: 0.79,
          VIC: 1.02,
          QLD: 0.81,
          SA: 0.47,
          WA: 0.7,
          TAS: 0.16,
          NT: 0.59,
          ACT: 0.79,
        }

        const vehicleEmissions = {
          'petrol-small': { emissionsPerKm: 0.15, fuelConsumption: 6.5 },
          'petrol-medium': { emissionsPerKm: 0.18, fuelConsumption: 8.0 },
          'petrol-large': { emissionsPerKm: 0.25, fuelConsumption: 11.0 },
          'diesel-small': { emissionsPerKm: 0.14, fuelConsumption: 5.5 },
          'diesel-medium': { emissionsPerKm: 0.17, fuelConsumption: 7.0 },
          'diesel-large': { emissionsPerKm: 0.23, fuelConsumption: 9.5 },
          hybrid: { emissionsPerKm: 0.1, fuelConsumption: 4.5 },
        }

        const evEfficiency = 18

        const annualKm = this.safeParseFloat(this.formData.ev.annualKm, 0)

        if (annualKm <= 0) {
          throw new Error('Invalid annual kilometers')
        }

        const vehicleType = vehicleEmissions[this.formData.ev.currentVehicleType]

        if (!vehicleType) {
          throw new Error('Invalid vehicle type')
        }

        const emissionsFactor = emissionsFactors[this.formData.state] || 0.79

        const currentEmissions = annualKm * vehicleType.emissionsPerKm

        const evKWhUsed = (annualKm / 100) * evEfficiency
        const evEmissions = evKWhUsed * emissionsFactor

        let annualCO2Saved
        if (this.formData.ev.chargingType === 'home-solar') {
          const evEmissionsReduced = evEmissions * 0.3
          annualCO2Saved = ((currentEmissions - evEmissionsReduced) / 1000).toFixed(2)
        } else {
          annualCO2Saved = ((currentEmissions - evEmissions) / 1000).toFixed(2)
        }

        if (!isFinite(parseFloat(annualCO2Saved)) || isNaN(parseFloat(annualCO2Saved))) {
          throw new Error('Calculation error')
        }

        const fuelSaved = Math.round((annualKm / 100) * vehicleType.fuelConsumption)

        const fuelCost = fuelSaved * 2.0
        const electricityCost = evKWhUsed * 0.3
        const costSavings = Math.round(fuelCost - electricityCost)

        const treesEquivalent = Math.round((parseFloat(annualCO2Saved) * 1000) / 21)

        return {
          annualCO2Saved: parseFloat(annualCO2Saved),
          fuelSaved,
          costSavings,
          treesEquivalent,
        }
      } catch (error) {
        console.error('EV calculation error:', error)
        return {
          annualCO2Saved: 0,
          fuelSaved: 0,
          costSavings: 0,
          treesEquivalent: 0,
        }
      }
    },
    submitForm() {
      this.validateSolarPanels(true)
      this.validateElectricityBill(true)
      this.validateAnnualKm(true)

      const hasErrors = Object.values(this.errors).some((error) => error !== null)

      if (hasErrors) {
        const errorMessages = []
        if (this.errors.numberOfPanels) errorMessages.push(this.errors.numberOfPanels)
        if (this.errors.electricityBill) errorMessages.push(this.errors.electricityBill)
        if (this.errors.annualKm) errorMessages.push(this.errors.annualKm)

        alert('Please fix the following errors:\n\n' + errorMessages.join('\n'))
        return
      }

      if (!this.formData.state) {
        alert('Please select your state before calculating.')
        return
      }

      if (!this.formData.ev.currentVehicleType) {
        alert('Please select your current vehicle type.')
        return
      }

      try {
        this.results.solar = this.calculateSolarSavings()
        this.results.ev = this.calculateEVSavings()

        if (this.results.solar.annualCO2Saved === 0) {
          alert('There was an error calculating solar savings. Please check your inputs.')
          return
        }

        if (this.results.ev.annualCO2Saved === 0) {
          alert('There was an error calculating EV savings. Please check your inputs.')
          return
        }

        const solarCO2 = this.safeParseFloat(this.results.solar.annualCO2Saved, 0)
        const evCO2 = this.safeParseFloat(this.results.ev.annualCO2Saved, 0)
        const totalCO2Saved = (solarCO2 + evCO2).toFixed(2)

        const totalCostSavings = this.results.solar.costSavings + this.results.ev.costSavings
        const totalTreesEquivalent =
          this.results.solar.treesEquivalent + this.results.ev.treesEquivalent
        const totalCarsOffRoad = (parseFloat(totalCO2Saved) / 4.6).toFixed(1)

        const percentageOfTarget = ((parseFloat(totalCO2Saved) / 10) * 100).toFixed(0)

        this.results.combined = {
          totalCO2Saved: parseFloat(totalCO2Saved),
          totalCostSavings,
          totalTreesEquivalent,
          totalCarsOffRoad: parseFloat(totalCarsOffRoad),
          percentageOfTarget: parseInt(percentageOfTarget),
        }

        this.showResults = true

        setTimeout(() => {
          const resultsElement = document.querySelector('.results-section')
          if (resultsElement) {
            resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      } catch (error) {
        console.error('Calculation error:', error)
        alert('An error occurred. Please check your inputs.')
      }
    },
    clearForm() {
      this.formData = {
        state: '',
        solar: {
          hasSolar: 'no',
          numberOfPanels: '',
          efficiency: '0.85',
          electricityBill: '',
          billFrequency: 'quarterly',
          orientation: 'north',
          shading: 'none',
        },
        ev: {
          hasEV: 'no',
          currentVehicleType: '',
          annualKm: '',
          evModel: '',
          chargingType: 'home',
        },
      }
      this.errors = {
        electricityBill: null,
        annualKm: null,
        numberOfPanels: null,
      }
      this.showResults = false
      this.results = {
        solar: null,
        ev: null,
        combined: null,
      }

      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>

<style scoped>
/* .hero-section {
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 15px;
  margin-bottom: 2rem;
}

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

.radio-card {
  padding: 2rem 1rem;
  border: 3px solid #e0e0e0;
  border-radius: 15px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;
}

.radio-card:hover {
  border-color: #667eea;
  transform: translateY(-2px);
}

.radio-selected {
  border-color: #667eea;
  background-color: #f0f4ff;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.radio-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.radio-card .form-check-input {
  position: absolute;
  opacity: 0;
}

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

.result-card {
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.result-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.bg-warning-light {
  background: linear-gradient(135deg, #fff9e6 0%, #ffe6cc 100%);
  border-color: #ffc107;
}

.bg-info-light {
  background: linear-gradient(135deg, #e6f7ff 0%, #cceeff 100%);
  border-color: #17a2b8;
}

.bg-success-light {
  background: linear-gradient(135deg, #e6f9f0 0%, #ccf2e0 100%);
  border-color: #28a745;
}

.result-icon-large {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.result-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin: 0;
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

.achievement-banner {
  background: linear-gradient(135deg, #fff9c4 0%, #ffeb3b 100%);
  padding: 2rem;
  border-radius: 15px;
  border: 3px solid #ffc107;
  text-align: center;
}

.shadow-sm {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.shadow-lg {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 1rem;
  }

  .result-number {
    font-size: 2rem;
  }

  .result-number-large {
    font-size: 2.5rem;
  }

  .btn-calculate {
    width: 100%;
  }
} */
</style>
