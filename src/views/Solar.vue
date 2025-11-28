<template>
  <div class="hero-section mb-5">
    <div id="hero-container">
      <img class="hero" src="\src\assets\solarbanner.jpg" />
      <div id="center-text">
        <p id="text">☀️ Solar Panel Carbon Calculator</p>
        <p id="text2">
          Calculate your potential carbon savings and cost benefits from solar panel installation
        </p>
      </div>
    </div>

    <!-- Loading indicator -->
    <div v-if="isLoading" class="text-center py-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading data...</span>
      </div>
      <p class="mt-2 text-muted">Loading calculator data...</p>
    </div>

    <form @submit.prevent="submitForm">
      <!-- Step 1: Location Information -->
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
                We use this for state-specific solar generation rates and emissions factors
              </small>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Solar Panel Details -->
      <div class="card mb-4 shadow-sm">
        <div class="card-header bg-gradient-primary text-white">
          <div class="d-flex align-items-center">
            <span class="step-badge me-3">2</span>
            <h3 class="mb-0">☀️ Solar Panel System Details</h3>
          </div>
        </div>
        <div class="card-body">
          <!-- Current Solar Status -->
          <div class="row mb-4">
            <div class="col-12">
              <label class="form-label fw-bold">Do you currently have solar panels?</label>
              <div class="row g-3">
                <div class="col-md-6">
                  <div
                    class="radio-card"
                    :class="{ 'radio-selected': formData.solar.hasSolar === 'yes' }"
                    @click="formData.solar.hasSolar = 'yes'"
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      name="hasSolar"
                      id="hasSolarYes"
                      value="yes"
                      v-model="formData.solar.hasSolar"
                    />
                    <div class="radio-icon">✅</div>
                    <h5>Yes, I have solar</h5>
                    <p class="text-muted mb-0">Calculate current savings</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div
                    class="radio-card"
                    :class="{ 'radio-selected': formData.solar.hasSolar === 'no' }"
                    @click="formData.solar.hasSolar = 'no'"
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      name="hasSolar"
                      id="hasSolarNo"
                      value="no"
                      v-model="formData.solar.hasSolar"
                    />
                    <div class="radio-icon">💡</div>
                    <h5>No, I'm considering it</h5>
                    <p class="text-muted mb-0">See potential savings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- System Size -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="numberOfPanels" class="form-label fw-bold"
                >How many solar panels? *</label
              >
              <input
                type="number"
                class="form-control form-control-lg"
                id="numberOfPanels"
                v-model="formData.solar.numberOfPanels"
                @blur="() => validateSolarPanels(true)"
                @input="() => validateSolarPanels(false)"
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
              <label for="panelQuality" class="form-label fw-bold">Panel Quality</label>
              <select
                class="form-select form-select-lg"
                id="panelQuality"
                v-model="formData.solar.efficiency"
              >
                <option value="0.95">Premium (95% efficiency)</option>
                <option value="0.85">Standard (85% efficiency)</option>
                <option value="0.75">Budget (75% efficiency)</option>
              </select>
            </div>
          </div>

          <!-- Electricity Bill -->
          <div class="row mb-3">
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
          <div class="row">
            <div class="col-md-6 mb-3">
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

      <!-- Submit Button -->
      <div class="text-center mb-5">
        <button type="submit" class="btn btn-primary btn-lg btn-calculate shadow-lg px-5">
          <span class="btn-icon">☀️</span>
          Calculate Solar Savings
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
        <div class="card-header bg-gradient-primary text-white text-center py-4">
          <h2 class="mb-0">🎉 Your Solar Savings Results</h2>
          <p class="mb-0 mt-2">Here's the environmental and financial impact!</p>
        </div>
        <div class="card-body p-4">
          <!-- Key Metrics -->
          <div class="row g-4 mb-4">
            <div class="col-md-4">
              <div class="result-card bg-warning-light">
                <div class="result-icon-large">⚡</div>
                <p class="result-number">{{ results.kWhGenerated.toLocaleString() }}</p>
                <p class="result-unit">kWh/year</p>
                <small class="text-muted">Energy Generated</small>
              </div>
            </div>

            <div class="col-md-4">
              <div class="result-card bg-success-light">
                <div class="result-icon-large">🌱</div>
                <p class="result-number">{{ results.annualCO2Saved }}</p>
                <p class="result-unit">tonnes CO₂/year</p>
                <small class="text-muted">Carbon Saved</small>
              </div>
            </div>

            <div class="col-md-4">
              <div class="result-card bg-info-light">
                <div class="result-icon-large">💰</div>
                <p class="result-number">${{ results.costSavings.toLocaleString() }}</p>
                <p class="result-unit">per year</p>
                <small class="text-muted">Cost Savings</small>
              </div>
            </div>
          </div>

          <!-- Environmental Impact -->
          <div class="row g-4 mb-4">
            <div class="col-md-6">
              <div class="result-card bg-success-light">
                <div class="result-icon-large">🌳</div>
                <p class="result-number">{{ results.treesEquivalent.toLocaleString() }}</p>
                <p class="result-label">Trees Planted Equivalent</p>
                <small class="text-muted">Based on 21kg CO₂ absorbed per tree/year</small>
              </div>
            </div>

            <div class="col-md-6">
              <div class="result-card bg-info-light">
                <div class="result-icon-large">📱</div>
                <p class="result-number">{{ results.systemSizeKW }} kW</p>
                <p class="result-label">System Size</p>
                <small class="text-muted"
                  >{{ formData.solar.numberOfPanels }} panels × 400W each</small
                >
              </div>
            </div>
          </div>

          <!-- Timeline Projections -->
          <div class="timeline-section">
            <h4 class="timeline-heading">💵 Your Savings Over Time</h4>
            <div class="row g-3">
              <div class="col-md-4">
                <div class="money-period-card">
                  <p class="money-period text-muted">Per Month</p>
                  <p class="money-amount">${{ results.monthlySavings }}</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="money-period-card">
                  <p class="money-period text-muted">5 Years</p>
                  <p class="money-amount">${{ results.fiveYearSavings.toLocaleString() }}</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="money-period-card">
                  <p class="money-period text-muted">10 Years</p>
                  <p class="money-amount">${{ results.tenYearSavings.toLocaleString() }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Carbon Impact Timeline -->
          <div class="timeline-section">
            <h4 class="timeline-heading">🌍 Your Carbon Impact Over Time</h4>
            <div class="row g-3">
              <div class="col-md-4">
                <div class="co2-period-card">
                  <p class="co2-period text-muted">5 Years</p>
                  <p class="co2-amount">
                    {{ results.fiveYearCO2 }} <span class="co2-unit">tonnes</span>
                  </p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="co2-period-card">
                  <p class="co2-period text-muted">10 Years</p>
                  <p class="co2-amount">
                    {{ results.tenYearCO2 }} <span class="co2-unit">tonnes</span>
                  </p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="co2-period-card">
                  <p class="co2-period text-muted">25 Years (Lifespan)</p>
                  <p class="co2-amount">
                    {{ results.lifespanCO2 }} <span class="co2-unit">tonnes</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Info Box -->
          <div class="alert alert-info">
            <h5>📊 How We Calculated This</h5>
            <ul class="mb-0">
              <li>
                <strong>System:</strong> {{ results.systemSizeKW }} kW ({{
                  formData.solar.numberOfPanels
                }}
                panels × 400W)
              </li>
              <li>
                <strong>Location:</strong> {{ formData.state }} with
                {{ currentStateData?.dailyOutputKwh || 'N/A' }} kWh daily output per 6.6kW system
              </li>
              <li>
                <strong>Panel Quality:</strong>
                {{ (parseFloat(formData.solar.efficiency) * 100).toFixed(0) }}% efficiency
              </li>
              <li>
                <strong>Roof Orientation:</strong>
                {{
                  formData.solar.orientation.charAt(0).toUpperCase() +
                  formData.solar.orientation.slice(1)
                }}
              </li>
              <li>
                <strong>Grid Emissions Factor:</strong>
                {{ currentStateData?.totalEmissionsFactor || 'N/A' }} kg CO₂-e per kWh
              </li>
            </ul>
          </div>
        </div>
        <div class="text-center mb-5">
          <router-link to="/rebates" class="nav-link" active-class="active" aria-current="page"
            ><button type="button" class="btn btn-primary btn-md btn-calculate shadow-lg px-5">
              <span class="btn-icon">☀️</span>
              Find rebates for your state here.
            </button></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchAllCalculatorData } from '@/services/calculatorData'

export default {
  name: 'SolarCalculator',
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
      },
      errors: {
        numberOfPanels: null,
        electricityBill: null,
      },
      showResults: false,
      results: null,
      // Firebase data
      firebaseData: null,
      isLoading: true,
    }
  },
  computed: {
    // Get current state data from Firebase
    currentStateData() {
      if (!this.formData.state || !this.firebaseData?.solarData) {
        return null
      }
      return this.firebaseData.solarData[this.formData.state]
    },
  },
  async mounted() {
    // Load data from Firebase when component mounts
    await this.loadFirebaseData()
  },
  methods: {
    async loadFirebaseData() {
      this.isLoading = true
      try {
        const data = await fetchAllCalculatorData()
        this.firebaseData = data
        console.log('✅ Solar calculator data loaded from Firebase')
      } catch (error) {
        console.error('Failed to load Firebase data:', error)
      } finally {
        this.isLoading = false
      }
    },
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
    calculateSolarSavings() {
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

      // Get state data from Firebase
      const stateData = this.currentStateData || {
        dailyOutputKwh: 25,
        totalEmissionsFactor: 0.7,
      }

      // Default electricity rate
      const electricityRate = 0.30

      const numberOfPanels = parseInt(this.formData.solar.numberOfPanels)
      const efficiency = parseFloat(this.formData.solar.efficiency)
      const orientation = orientationFactors[this.formData.solar.orientation]
      const shading = shadingFactors[this.formData.solar.shading]

      // System size in kW (assuming 400W panels)
      const systemSizeKW = (numberOfPanels * 0.4).toFixed(2)

      // Calculate daily output per kW from Firebase data (based on 6.6kW system)
      const dailyOutputPerKw = stateData.dailyOutputKwh / 6.6

      // Annual energy generation (kWh) using Firebase data
      const kWhGenerated = Math.round(
        parseFloat(systemSizeKW) * dailyOutputPerKw * 365 * efficiency * orientation * shading,
      )

      // Annual CO2 saved (tonnes) using Firebase emissions factor
      const annualCO2Saved = ((kWhGenerated * stateData.totalEmissionsFactor) / 1000).toFixed(2)

      // Convert electricity bill to annual
      let annualBill = parseFloat(this.formData.solar.electricityBill)
      if (this.formData.solar.billFrequency === 'monthly') {
        annualBill *= 12
      } else if (this.formData.solar.billFrequency === 'quarterly') {
        annualBill *= 4
      }

      // Annual cost savings (70% of generation offsets bill)
      const costSavings = Math.round(kWhGenerated * electricityRate * 0.7)

      // Trees equivalent (1 tree absorbs ~21kg CO2/year)
      const treesEquivalent = Math.round((parseFloat(annualCO2Saved) * 1000) / 21)

      // Timeline projections
      const monthlySavings = Math.round(costSavings / 12)
      const fiveYearSavings = costSavings * 5
      const tenYearSavings = costSavings * 10
      const fiveYearCO2 = (parseFloat(annualCO2Saved) * 5).toFixed(2)
      const tenYearCO2 = (parseFloat(annualCO2Saved) * 10).toFixed(2)
      const lifespanCO2 = (parseFloat(annualCO2Saved) * 25).toFixed(2)

      return {
        systemSizeKW,
        kWhGenerated,
        annualCO2Saved,
        costSavings,
        treesEquivalent,
        monthlySavings,
        fiveYearSavings,
        tenYearSavings,
        fiveYearCO2,
        tenYearCO2,
        lifespanCO2,
      }
    },
    submitForm() {
      // Validate all fields
      const panelsValid = this.validateSolarPanels(true)
      const billValid = this.validateElectricityBill(true)

      if (!panelsValid || !billValid) {
        // Scroll to first error
        this.$nextTick(() => {
          const firstError = document.querySelector('.text-danger')
          if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        })
        return
      }

      if (!this.formData.state) {
        alert('Please select your state.')
        return
      }

      // Calculate results
      this.results = this.calculateSolarSavings()
      this.showResults = true

      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.querySelector('.results-section')
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
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
      }
      this.errors = {
        numberOfPanels: null,
        electricityBill: null,
      }
      this.showResults = false
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>

<style scoped>
/* All styling is now in the external style.css file */
/* This component uses the shared styles from /src/assets/style.css */
</style>