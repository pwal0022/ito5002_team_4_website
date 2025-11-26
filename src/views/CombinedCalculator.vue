<template>
  <div class="combined-calculator">
    <div class="hero-section mb-5">
      <!-- <div class="container"> -->
      <!-- Hero Section -->
      <!-- <div class="hero-section text-center mb-5"> -->
      <div id="hero-container">
        <img class="hero" src="\src\assets\combinedbanner.png" />
        <div id="center-text">
          <p id="text">🌏 Combined Carbon Calculator</p>
          <p id="text2">Calculate your total impact from both solar panels AND electric vehicles</p>
        </div>
      </div>
      <!-- <h1 class="display-4 mb-3">🌏 Combined Carbon Calculator</h1>
        <p class="lead">Calculate your total impact from both solar panels AND electric vehicles</p>
        <p class="text-muted">See your complete household carbon reduction potential!</p> -->

      <form @submit.prevent="submitForm">
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
                <small class="form-text text-muted">
                  We need this to calculate your state's energy emissions
                </small>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Solar Details -->
        <div class="card mb-4 shadow-sm">
          <div class="card-header bg-gradient-primary text-white">
            <div class="d-flex align-items-center">
              <span class="step-badge me-3">2</span>
              <h3 class="mb-0">☀️ Solar Panel System Details</h3>
            </div>
          </div>
          <div class="card-body">
            <!-- Current Status -->
            <div class="mb-4">
              <label class="form-label fw-bold mb-3">Do you currently have solar panels?</label>
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
                        <h5>Yes, I have solar</h5>
                        <p class="text-muted mb-0">Calculate current savings</p>
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
                        <div class="radio-icon">💡</div>
                        <h5>No, I'm considering it</h5>
                        <p class="text-muted mb-0">See potential savings</p>
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
                  placeholder="e.g., 20"
                  required
                />
                <div v-if="errors.numberOfPanels" class="text-danger small mt-1">
                  {{ errors.numberOfPanels }}
                </div>
                <small class="form-text text-muted">
                  💡 <strong>Typical homes:</strong> have 15-25 panels (6-10kW system)
                </small>
              </div>
              <div class="col-md-6">
                <label for="panelQuality" class="form-label fw-bold">Panel quality</label>
                <select
                  class="form-select form-select-lg"
                  id="panelQuality"
                  v-model="formData.solar.efficiency"
                >
                  <option value="0.95">Premium (95% efficiency)</option>
                  <option value="0.85">Standard (85% efficiency)</option>
                  <option value="0.75">Budget (75% efficiency)</option>
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
                  Current Electricity Bill Amount *
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
                <label for="billFrequency" class="form-label fw-bold">Billing Frequency</label>
                <select
                  class="form-select form-select-lg"
                  id="billFrequency"
                  v-model="formData.solar.billFrequency"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly (every 3 months)</option>
                  <option value="annual">Annual</option>
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
                        <h5>Yes, I drive electric</h5>
                        <p class="text-muted mb-0">Calculate current savings</p>
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
                        <div class="radio-icon">🚗</div>
                        <h5>No, I'm considering it</h5>
                        <p class="text-muted mb-0">See potential savings</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Current Vehicle & Driving -->
            <div class="row mb-4">
              <div class="col-md-6">
                <label for="currentVehicle" class="form-label fw-bold"
                  >What type of car do you currently drive? *</label
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
                  💡 <strong>Average Australian:</strong> 10,000-15,000 km/year
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
                  >How would you mainly charge your EV?</label
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
          <button type="button" class="btn btn-link mt-3" @click="clearForm" style="color: black">
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

            <!-- Achievement Banner -->
            <div class="achievement-banner">
              <h3 class="mb-3">🏆 Outstanding Climate Action!</h3>
              <p class="lead mb-2">
                You could save
                <strong>{{ results.combined.totalCO2Saved }} tonnes of CO₂</strong> per year!
              </p>
              <p>
                That's <strong>{{ results.combined.percentageOfTarget }}%</strong> of the way to
                Australia's target of 10 tonnes per person per year.
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
    <!-- </div> -->
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
        numberOfPanels * 0.4 * state.sunHours * 365 * efficiency * orientation * shading,
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
/* All styling is now in the external style.css file */
/* This component uses the shared styles from /src/assets/style.css */
</style>
