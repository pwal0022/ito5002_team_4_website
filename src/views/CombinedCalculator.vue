<template>
  <div class="combined-calculator">
    <div class="container">
      <!-- Hero Section -->
      <div class="hero-section text-center mb-5">
        <h1 class="display-4 mb-3">🌏 Combined Carbon Calculator</h1>
        <p class="lead">Calculate your total impact from both solar panels AND electric vehicles</p>
        <p class="text-light">See your complete household carbon reduction potential!</p>
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
          <div class="card-header bg-gradient-secondary text-white">
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
          <div class="card-header bg-gradient-tertiary text-white">
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
                        <strong>Yes, I drive electric</strong>
                      </div>
                    </label>
                  </div>
                </div>
                <div class="col-md-6 mb-2">
                  <div
                    class="radio-card"
                    :class="{ 'radio-selected': formData.ev.hasEV === 'no' }"
                  >
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
                        <div class="radio-icon">🚗</div>
                        <strong>No, I'm considering it</strong>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Current Vehicle Type -->
            <div class="row mb-4">
              <div class="col-md-6">
                <label for="currentVehicleType" class="form-label fw-bold"
                  >What type of car do you currently drive? *</label
                >
                <select
                  class="form-select form-select-lg"
                  id="currentVehicleType"
                  v-model="formData.ev.currentVehicleType"
                  required
                >
                  <option value="">Select vehicle type...</option>
                  <option value="petrol-small">Small Petrol Car (e.g., Toyota Corolla)</option>
                  <option value="petrol-medium">Medium Petrol Car (e.g., Mazda CX-5)</option>
                  <option value="petrol-large">Large Petrol Car (e.g., Ford Ranger)</option>
                  <option value="diesel-small">Small Diesel Car</option>
                  <option value="diesel-medium">Medium Diesel Car</option>
                  <option value="diesel-large">Large Diesel Car/4WD</option>
                </select>
              </div>

              <div class="col-md-6">
                <label for="annualKm" class="form-label fw-bold"
                  >How many kilometers do you drive per year? *</label
                >
                <input
                  type="number"
                  class="form-control form-control-lg"
                  id="annualKm"
                  v-model="formData.ev.annualKm"
                  @blur="() => validateAnnualKm(true)"
                  @input="() => validateAnnualKm(false)"
                  min="1000"
                  max="50000"
                  placeholder="15000"
                  required
                />
                <div v-if="errors.annualKm" class="text-danger small mt-1">
                  {{ errors.annualKm }}
                </div>
                <small class="form-text text-muted">
                  💡 <strong>Average Australian:</strong> 12,000-15,000 km/year
                </small>
              </div>
            </div>

            <!-- EV Model -->
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="evModel" class="form-label fw-bold"
                  >Which electric vehicle are you considering? *</label
                >
                <select
                  class="form-select form-select-lg"
                  id="evModel"
                  v-model="formData.ev.evModel"
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
                  class="form-select form-select-lg"
                  id="chargingType"
                  v-model="formData.ev.chargingType"
                >
                  <option value="home">🏠 At home (cheapest)</option>
                  <option value="work">🏢 At work</option>
                  <option value="public">⚡ Public charging stations</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="text-center mb-5">
          <button type="submit" class="btn btn-primary btn-lg btn-calculate shadow-lg px-5">
            <span class="btn-icon">🌏</span>
            Calculate Combined Impact
          </button>
          <br />
          <button type="button" class="btn btn-link mt-3" @click="clearForm">
            Clear and start over
          </button>
        </div>
      </form>

      <!-- Results Section -->
      <div v-if="showResults" class="results-section">
        <!-- Combined Impact Card -->
        <div class="card border-success shadow-lg mb-4">
          <div class="card-header bg-gradient-primary text-white text-center py-4">
            <h2 class="mb-0">🎉 Your Combined Environmental Impact!</h2>
            <p class="mb-0 mt-2">Here's what solar + EV means for the planet and your wallet</p>
          </div>
          <div class="card-body p-4">
            <!-- Main Combined Results -->
            <div class="row g-3 mb-4">
              <div class="col-md-3">
                <div class="result-card bg-primary-light">
                  <div class="result-icon-large">🌍</div>
                  <div class="result-number-large">{{ results.combined.totalCO2Saved }}</div>
                  <div class="result-unit">tonnes CO₂/year saved</div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="result-card bg-success-light">
                  <div class="result-icon-large">💰</div>
                  <div class="result-number-large">${{ results.combined.totalCostSavings.toLocaleString() }}</div>
                  <div class="result-unit">total savings/year</div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="result-card bg-secondary-light">
                  <div class="result-icon-large">🌳</div>
                  <div class="result-number-large">{{ results.combined.totalTreesEquivalent }}</div>
                  <div class="result-unit">trees planted equivalent</div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="result-card bg-accent-light">
                  <div class="result-icon-large">🚗</div>
                  <div class="result-number-large">{{ results.combined.totalCarsOffRoad }}</div>
                  <div class="result-unit">cars off road equivalent</div>
                </div>
              </div>
            </div>

            <!-- Achievement Banner -->
            <div class="achievement-banner">
              <h3 class="mb-3">🏆 Outstanding Climate Action!</h3>
              <p class="lead mb-2">
                You could save <strong>{{ results.combined.totalCO2Saved }} tonnes of CO₂</strong> per year!
              </p>
              <p>
                That's <strong>{{ results.combined.percentageOfTarget }}%</strong> of the way to Australia's target
                of 10 tonnes per person per year.
              </p>
            </div>
          </div>
        </div>

        <!-- Breakdown: Solar -->
        <div class="card shadow-sm mb-4">
          <div class="card-header bg-gradient-secondary text-white">
            <h4 class="mb-0">☀️ Solar Panel Contribution</h4>
          </div>
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-4">
                <div class="result-card-small">
                  <div class="result-number">{{ results.solar.annualCO2Saved }}</div>
                  <div class="result-label">tonnes CO₂ saved/year</div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="result-card-small">
                  <div class="result-number">${{ results.solar.costSavings.toLocaleString() }}</div>
                  <div class="result-label">cost savings/year</div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="result-card-small">
                  <div class="result-number">{{ results.solar.kWhGenerated.toLocaleString() }}</div>
                  <div class="result-label">kWh generated/year</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Breakdown: EV -->
        <div class="card shadow-sm mb-5">
          <div class="card-header bg-gradient-tertiary text-white">
            <h4 class="mb-0">🚗 Electric Vehicle Contribution</h4>
          </div>
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-4">
                <div class="result-card-small">
                  <div class="result-number">{{ results.ev.co2Saved }}</div>
                  <div class="result-label">tonnes CO₂ saved/year</div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="result-card-small">
                  <div class="result-number">${{ results.ev.costSavings.toLocaleString() }}</div>
                  <div class="result-label">fuel savings/year</div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="result-card-small">
                  <div class="result-number">{{ results.ev.reductionPercent }}%</div>
                  <div class="result-label">emissions reduction</div>
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
    validateSolarPanels(showError) {
      const panels = parseInt(this.formData.solar.numberOfPanels)
      if (!panels || panels < 1) {
        if (showError) this.errors.numberOfPanels = 'Please enter at least 1 panel'
        return false
      }
      if (panels > 100) {
        if (showError) this.errors.numberOfPanels = 'Maximum 100 panels allowed'
        return false
      }
      this.errors.numberOfPanels = null
      return true
    },
    validateElectricityBill(showError) {
      const bill = parseFloat(this.formData.solar.electricityBill)
      if (!bill || bill < 1) {
        if (showError) this.errors.electricityBill = 'Please enter a valid bill amount'
        return false
      }
      this.errors.electricityBill = null
      return true
    },
    validateAnnualKm(showError) {
      const km = parseInt(this.formData.ev.annualKm)
      if (!km || km < 1000) {
        if (showError) this.errors.annualKm = 'Please enter at least 1000 km'
        return false
      }
      if (km > 50000) {
        if (showError) this.errors.annualKm = 'Maximum 50,000 km allowed'
        return false
      }
      this.errors.annualKm = null
      return true
    },
    calculateSolarSavings() {
      const stateData = {
        NSW: { sunHours: 5.2, emissionsFactor: 0.79, electricityRate: 0.3 },
        VIC: { sunHours: 4.6, emissionsFactor: 0.98, electricityRate: 0.28 },
        QLD: { sunHours: 5.5, emissionsFactor: 0.82, electricityRate: 0.27 },
        SA: { sunHours: 5.3, emissionsFactor: 0.42, electricityRate: 0.32 },
        WA: { sunHours: 5.8, emissionsFactor: 0.64, electricityRate: 0.29 },
        TAS: { sunHours: 4.2, emissionsFactor: 0.15, electricityRate: 0.26 },
        NT: { sunHours: 6.0, emissionsFactor: 0.59, electricityRate: 0.25 },
        ACT: { sunHours: 5.1, emissionsFactor: 0.0, electricityRate: 0.28 },
      }

      const orientationFactors = {
        north: 1.0,
        northeast: 0.95,
        northwest: 0.95,
        east: 0.85,
        west: 0.85,
        south: 0.6,
      }

      const shadingFactors = {
        none: 1.0,
        minimal: 0.9,
        moderate: 0.75,
        heavy: 0.5,
      }

      const state = stateData[this.formData.state]
      const numberOfPanels = parseInt(this.formData.solar.numberOfPanels)
      const efficiency = parseFloat(this.formData.solar.efficiency)
      const orientation = orientationFactors[this.formData.solar.orientation]
      const shading = shadingFactors[this.formData.solar.shading]

      const systemSizeKW = (numberOfPanels * 0.4).toFixed(2)
      const kWhGenerated = Math.round(
        numberOfPanels * 0.4 * state.sunHours * 365 * efficiency * orientation * shading
      )
      const annualCO2Saved = ((kWhGenerated * state.emissionsFactor) / 1000).toFixed(2)

      let annualBill = parseFloat(this.formData.solar.electricityBill)
      if (this.formData.solar.billFrequency === 'monthly') {
        annualBill *= 12
      } else if (this.formData.solar.billFrequency === 'quarterly') {
        annualBill *= 4
      }

      const costSavings = Math.round(kWhGenerated * state.electricityRate * 0.7)
      const treesEquivalent = Math.round((parseFloat(annualCO2Saved) * 1000) / 21)

      return {
        systemSizeKW,
        kWhGenerated,
        annualCO2Saved: parseFloat(annualCO2Saved),
        costSavings,
        treesEquivalent,
      }
    },
    calculateEVSavings() {
      const gridEmissions = {
        NSW: 0.79,
        VIC: 0.98,
        QLD: 0.82,
        SA: 0.42,
        WA: 0.64,
        TAS: 0.15,
        NT: 0.59,
        ACT: 0.0,
      }

      const iceVehicles = {
        'petrol-small': { emissions: 0.15, fuelCost: 0.18 },
        'petrol-medium': { emissions: 0.2, fuelCost: 0.22 },
        'petrol-large': { emissions: 0.28, fuelCost: 0.3 },
        'diesel-small': { emissions: 0.14, fuelCost: 0.16 },
        'diesel-medium': { emissions: 0.18, fuelCost: 0.2 },
        'diesel-large': { emissions: 0.25, fuelCost: 0.28 },
      }

      const evModels = {
        'tesla-model3': 15.0,
        'tesla-modely': 16.5,
        'nissan-leaf': 17.0,
        'hyundai-kona': 14.5,
        'mg-zs': 16.0,
        'byd-atto3': 15.5,
        'polestar-2': 18.0,
        'bmw-i4': 17.5,
      }

      const annualKm = parseInt(this.formData.ev.annualKm)
      const iceData = iceVehicles[this.formData.ev.currentVehicleType]
      const evEfficiency = evModels[this.formData.ev.evModel]
      const gridEmissionsFactor = gridEmissions[this.formData.state]

      const iceEmissionsKg = annualKm * iceData.emissions
      const evEnergyKwh = (annualKm / 100) * evEfficiency
      const evEmissionsKg = evEnergyKwh * gridEmissionsFactor

      const co2SavedKg = iceEmissionsKg - evEmissionsKg
      const co2Saved = (co2SavedKg / 1000).toFixed(2)
      const reductionPercent = Math.round((co2SavedKg / iceEmissionsKg) * 100)

      const treesEquivalent = Math.round(co2SavedKg / 60)

      const fuelCostAnnual = annualKm * iceData.fuelCost
      const electricityCostAnnual = evEnergyKwh * 0.3
      const costSavings = Math.round(fuelCostAnnual - electricityCostAnnual)

      return {
        co2Saved: parseFloat(co2Saved),
        reductionPercent,
        treesEquivalent,
        costSavings,
      }
    },
    submitForm() {
      try {
        const panelsValid = this.validateSolarPanels(true)
        const billValid = this.validateElectricityBill(true)
        const kmValid = this.validateAnnualKm(true)

        if (!panelsValid || !billValid || !kmValid) {
          alert('Please fix the errors before calculating.')
          return
        }

        if (!this.formData.state) {
          alert('Please select your state.')
          return
        }

        if (!this.formData.ev.currentVehicleType || !this.formData.ev.evModel) {
          alert('Please complete all EV fields.')
          return
        }

        this.results.solar = this.calculateSolarSavings()
        this.results.ev = this.calculateEVSavings()

        const solarCO2 = this.results.solar.annualCO2Saved
        const evCO2 = this.results.ev.co2Saved
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
/* Energy-Friendly Color Palette */
:root {
  --olive-primary: #6b8e23;
  --olive-dark: #556b2f;
  --olive-light: #9acd32;
  --sage-green: #87a96b;
  --earth-brown: #8b7355;
  --sky-blue: #87ceeb;
  --leaf-green: #90ee90;
  --sand-beige: #f5f5dc;
}

/* Hero Section */
.hero-section {
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #6b8e23 0%, #87a96b 100%);
  color: white;
  border-radius: 15px;
  margin-bottom: 2rem;
}

.text-light {
  opacity: 0.95;
}

/* Step Badge */
.step-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: white;
  color: #556b2f;
  border-radius: 50%;
  font-weight: bold;
  font-size: 1.2rem;
}

/* Card Headers */
.bg-gradient-primary {
  background: linear-gradient(135deg, #6b8e23 0%, #87a96b 100%);
}

.bg-gradient-secondary {
  background: linear-gradient(135deg, #87a96b 0%, #9acd32 100%);
}

.bg-gradient-tertiary {
  background: linear-gradient(135deg, #9acd32 0%, #b8d94d 100%);
}

/* Radio Cards */
.radio-card {
  padding: 2rem 1rem;
  border: 3px solid #e0e0e0;
  border-radius: 15px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;
  background: white;
}

.radio-card:hover {
  border-color: #6b8e23;
  transform: translateY(-2px);
}

.radio-selected {
  border-color: #6b8e23;
  background-color: #f5f9f0;
  box-shadow: 0 5px 15px rgba(107, 142, 35, 0.3);
}

.radio-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.radio-card .form-check-input {
  position: absolute;
  opacity: 0;
}

/* Form Controls */
.form-select:focus,
.form-control:focus {
  border-color: #6b8e23;
  box-shadow: 0 0 0 0.2rem rgba(107, 142, 35, 0.25);
}

/* Calculate Button */
.btn-primary {
  background: linear-gradient(135deg, #6b8e23 0%, #87a96b 100%);
  border: none;
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #556b2f 0%, #6b8e23 100%);
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
  box-shadow: 0 10px 30px rgba(107, 142, 35, 0.4);
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

/* Result Cards */
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

.bg-primary-light {
  background: linear-gradient(135deg, #f5f9f0 0%, #e8f5e8 100%);
  border-color: #6b8e23;
}

.bg-secondary-light {
  background: linear-gradient(135deg, #fafce8 0%, #f0f8e8 100%);
  border-color: #9acd32;
}

.bg-success-light {
  background: linear-gradient(135deg, #e6f9f0 0%, #ccf2e0 100%);
  border-color: #90ee90;
}

.bg-accent-light {
  background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%);
  border-color: #87ceeb;
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

.result-card-small {
  background: #f5f9f0;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  border: 2px solid #e8f5e8;
  transition: all 0.3s ease;
}

.result-card-small:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(107, 142, 35, 0.2);
  border-color: #6b8e23;
}

.result-label {
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.5rem;
}

/* Achievement Banner */
.achievement-banner {
  background: linear-gradient(135deg, #fff9c4 0%, #ffeb3b 100%);
  padding: 2rem;
  border-radius: 15px;
  border: 3px solid #ffc107;
  text-align: center;
  margin-top: 2rem;
}

.achievement-banner h3 {
  color: #856404;
}

.achievement-banner p {
  color: #333;
  margin-bottom: 0;
}

/* Shadow utilities */
.shadow-sm {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.shadow-lg {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

/* Responsive */
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
}
</style>