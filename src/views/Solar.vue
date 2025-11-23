<template>
  <div class="calculator-page">
    <div class="container py-4">
      <!-- Hero Section -->
      <div class="hero-section text-center mb-4">
        <h1 class="display-5 fw-bold mb-3">☀️ Solar Panel Carbon Calculator</h1>
        <p class="lead">
          Calculate your potential carbon savings and cost benefits from solar panel installation
        </p>
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
              <div class="col-md-6 mb-3">
                <label for="state" class="form-label fw-bold">State/Territory *</label>
                <select class="form-select form-select-lg" id="state" v-model="formData.state" required>
                  <option value="">Select your state</option>
                  <option value="NSW">New South Wales</option>
                  <option value="VIC">Victoria</option>
                  <option value="QLD">Queensland</option>
                  <option value="SA">South Australia</option>
                  <option value="WA">Western Australia</option>
                  <option value="TAS">Tasmania</option>
                  <option value="NT">Northern Territory</option>
                  <option value="ACT">Australian Capital Territory</option>
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
          <div class="card-header bg-gradient-secondary text-white">
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
                  Typical homes have 15-25 panels (6-10kW system)
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
                <label for="electricityBill" class="form-label fw-bold"
                  >Current Electricity Bill Amount *</label
                >
                <input
                  type="number"
                  class="form-control form-control-lg"
                  id="electricityBill"
                  v-model="formData.solar.electricityBill"
                  @blur="() => validateElectricityBill(true)"
                  @input="() => validateElectricityBill(false)"
                  min="1"
                  placeholder="e.g., 450"
                  required
                />
                <div v-if="errors.electricityBill" class="text-danger small mt-1">
                  {{ errors.electricityBill }}
                </div>
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
                  <option value="north">⬆️ North (Best!)</option>
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
          <button type="button" class="btn btn-link mt-3" @click="clearForm">
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
            <div class="row g-3 mb-4">
              <div class="col-md-3">
                <div class="result-card bg-primary-light">
                  <div class="result-icon-large">🌍</div>
                  <div class="result-number">{{ results.annualCO2Saved }}</div>
                  <div class="result-label">tonnes CO₂ saved/year</div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="result-card bg-secondary-light">
                  <div class="result-icon-large">⚡</div>
                  <div class="result-number">{{ results.kWhGenerated.toLocaleString() }}</div>
                  <div class="result-label">kWh generated/year</div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="result-card bg-success-light">
                  <div class="result-icon-large">💰</div>
                  <div class="result-number">${{ results.costSavings.toLocaleString() }}</div>
                  <div class="result-label">saved per year</div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="result-card bg-accent-light">
                  <div class="result-icon-large">🌳</div>
                  <div class="result-number">{{ results.treesEquivalent }}</div>
                  <div class="result-label">trees planted equivalent</div>
                </div>
              </div>
            </div>

            <!-- Timeline Section: Savings Projections -->
            <div class="timeline-section">
              <h4 class="timeline-heading">
                <span class="timeline-icon">💰</span> Your Money Savings Over Time
              </h4>
              <div class="row g-3">
                <div class="col-md-3">
                  <div class="money-period-card">
                    <div class="money-period">Monthly</div>
                    <div class="money-amount">${{ results.monthlySavings }}</div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="money-period-card">
                    <div class="money-period">Yearly</div>
                    <div class="money-amount">${{ results.costSavings.toLocaleString() }}</div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="money-period-card">
                    <div class="money-period">5 Years</div>
                    <div class="money-amount">${{ results.fiveYearSavings.toLocaleString() }}</div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="money-period-card">
                    <div class="money-period">10 Years</div>
                    <div class="money-amount">${{ results.tenYearSavings.toLocaleString() }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Timeline Section: CO2 Reduction -->
            <div class="timeline-section">
              <h4 class="timeline-heading">
                <span class="timeline-icon">🌍</span> Your Carbon Impact Over Time
              </h4>
              <div class="row g-3">
                <div class="col-md-3">
                  <div class="co2-period-card">
                    <div class="co2-period">Yearly</div>
                    <div class="co2-amount">{{ results.annualCO2Saved }}</div>
                    <div class="co2-unit">tonnes CO₂</div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="co2-period-card">
                    <div class="co2-period">5 Years</div>
                    <div class="co2-amount">{{ results.fiveYearCO2 }}</div>
                    <div class="co2-unit">tonnes CO₂</div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="co2-period-card">
                    <div class="co2-period">10 Years</div>
                    <div class="co2-amount">{{ results.tenYearCO2 }}</div>
                    <div class="co2-unit">tonnes CO₂</div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="co2-period-card">
                    <div class="co2-period">25 Years (Lifespan)</div>
                    <div class="co2-amount">{{ results.lifespanCO2 }}</div>
                    <div class="co2-unit">tonnes CO₂</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- System Details -->
            <div class="alert alert-info mt-4">
              <h5 class="alert-heading">📊 Your System Details</h5>
              <div class="row">
                <div class="col-md-6">
                  <p><strong>System size:</strong> {{ results.systemSizeKW }} kW</p>
                  <p><strong>Number of panels:</strong> {{ formData.solar.numberOfPanels }}</p>
                  <p><strong>Panel efficiency:</strong> {{ (formData.solar.efficiency * 100).toFixed(0) }}%</p>
                </div>
                <div class="col-md-6">
                  <p><strong>Roof orientation:</strong> {{ formData.solar.orientation }}</p>
                  <p><strong>Shading level:</strong> {{ formData.solar.shading }}</p>
                  <p><strong>State:</strong> {{ formData.state }}</p>
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
      results: {},
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
    calculateSolarSavings() {
      const stateData = {
        NSW: { sunHours: 5.2, emissionsFactor: 0.79, electricityRate: 0.30 },
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

      // System size in kW (assuming 400W panels)
      const systemSizeKW = (numberOfPanels * 0.4).toFixed(2)

      // Annual energy generation (kWh)
      const kWhGenerated = Math.round(
        numberOfPanels * 0.4 * state.sunHours * 365 * efficiency * orientation * shading
      )

      // Annual CO2 saved (tonnes)
      const annualCO2Saved = ((kWhGenerated * state.emissionsFactor) / 1000).toFixed(2)

      // Convert electricity bill to annual
      let annualBill = parseFloat(this.formData.solar.electricityBill)
      if (this.formData.solar.billFrequency === 'monthly') {
        annualBill *= 12
      } else if (this.formData.solar.billFrequency === 'quarterly') {
        annualBill *= 4
      }

      // Annual cost savings (70% of generation offsets bill)
      const costSavings = Math.round(kWhGenerated * state.electricityRate * 0.7)

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
        alert('Please fix the errors before calculating.')
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
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #6b8e23 0%, #9acd32 100%);
  color: white;
  border-radius: 15px;
}

/* Step Badges */
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

/* Card Gradients */
.bg-gradient-primary {
  background: linear-gradient(135deg, #6b8e23 0%, #87a96b 100%);
}

.bg-gradient-secondary {
  background: linear-gradient(135deg, #87a96b 0%, #9acd32 100%);
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
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(107, 142, 35, 0.4);
}

.btn-calculate {
  padding: 1rem 3rem;
  font-size: 1.3rem;
  font-weight: bold;
  border-radius: 50px;
  transition: all 0.3s ease;
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
}

.result-label {
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Timeline */
.timeline-section {
  background: #f5f9f0;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 1.5rem;
  border: 2px solid #e8f5e8;
}

.timeline-heading {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #556b2f;
}

.timeline-icon {
  font-size: 1.8rem;
  margin-right: 0.5rem;
}

.money-period-card,
.co2-period-card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid #e8f5e8;
}

.money-period-card:hover,
.co2-period-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(107, 142, 35, 0.2);
  border-color: #6b8e23;
}

.money-period,
.co2-period {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.money-amount {
  font-size: 1.8rem;
  font-weight: bold;
  color: #6b8e23;
}

.co2-amount {
  font-size: 1.8rem;
  font-weight: bold;
  color: #556b2f;
}

.co2-unit {
  font-size: 0.9rem;
  color: #666;
}

/* Alert */
.alert-info {
  background-color: #f5f9f0;
  border-color: #9acd32;
  color: #556b2f;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }

  .result-number {
    font-size: 2rem;
  }

  .money-amount,
  .co2-amount {
    font-size: 1.5rem;
  }
}
</style>