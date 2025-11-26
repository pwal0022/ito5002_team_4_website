<template>
  <div class="calculator-page">
    <div class="hero-section mb-5">
      <!-- <div class="container py-4"> -->
      <!-- Hero Section -->
      <div id="hero-container">
        <img class="hero" src="\src\assets\solarbanner.jpg" />
        <div id="center-text">
          <p id="text">☀️ Solar Panel Carbon Calculator</p>
          <p id="text2">
            Calculate your potential carbon savings and cost benefits from solar panel installation
          </p>
        </div>
      </div>
      <!-- <div class="hero-section text-center mb-4">
          <h1 class="display-5 fw-bold mb-3">☀️ Solar Panel Carbon Calculator</h1>
          <p class="lead">
            Calculate your potential carbon savings and cost benefits from solar panel installation
          </p>
        </div> -->

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
                <select
                  class="form-select form-select-lg"
                  id="state"
                  v-model="formData.state"
                  required
                >
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
          <div class="card-header bg-gradient-warning text-dark">
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
          <button type="submit" class="btn btn-warning btn-lg btn-calculate shadow-lg px-5">
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
        <div class="card border-warning shadow-lg mb-5">
          <div class="card-header bg-gradient-warning text-dark text-center py-4">
            <h2 class="mb-0">🎉 Your Solar Savings Results</h2>
            <p class="mb-0 mt-2">Here's the environmental and financial impact!</p>
          </div>
          <div class="card-body p-4">
            <!-- Key Metrics -->
            <div class="row g-3 mb-4">
              <div class="col-md-3">
                <div class="result-card bg-warning-light">
                  <div class="result-icon-large">🌍</div>
                  <div class="result-number">{{ results.annualCO2Saved }}</div>
                  <div class="result-label">tonnes CO₂ saved/year</div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="result-card bg-info-light">
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
                <div class="result-card bg-warning-light">
                  <div class="result-icon-large">🌳</div>
                  <div class="result-number">{{ results.treesEquivalent }}</div>
                  <div class="result-label">trees equivalent</div>
                </div>
              </div>
            </div>

            <!-- Environmental Impact Timeline -->
            <div class="mt-5">
              <h4 class="text-center mb-4">📊 Your Impact Over Time</h4>

              <!-- Money Savings Timeline -->
              <div class="timeline-section mb-4">
                <h5 class="timeline-heading">
                  <span class="timeline-icon">💵</span>
                  Money Saved
                </h5>
                <div class="row g-3">
                  <div class="col-md-3 col-6">
                    <div class="money-period-card">
                      <div class="money-period">1 Year</div>
                      <div class="money-amount">${{ results.costSavings.toLocaleString() }}</div>
                    </div>
                  </div>
                  <div class="col-md-3 col-6">
                    <div class="money-period-card">
                      <div class="money-period">5 Years</div>
                      <div class="money-amount">
                        ${{ (results.costSavings * 5).toLocaleString() }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 col-6">
                    <div class="money-period-card">
                      <div class="money-period">10 Years</div>
                      <div class="money-amount">
                        ${{ (results.costSavings * 10).toLocaleString() }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 col-6">
                    <div class="money-period-card">
                      <div class="money-period">25 Years</div>
                      <div class="money-amount">
                        ${{ (results.costSavings * 25).toLocaleString() }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- CO2 Savings Timeline -->
              <div class="timeline-section">
                <h5 class="timeline-heading">
                  <span class="timeline-icon">🌍</span>
                  CO₂ Emissions Prevented
                </h5>
                <div class="row g-3">
                  <div class="col-md-3 col-6">
                    <div class="co2-period-card">
                      <div class="co2-period">1 Year</div>
                      <div class="co2-amount">{{ results.annualCO2Saved }}</div>
                      <div class="co2-unit">tonnes</div>
                    </div>
                  </div>
                  <div class="col-md-3 col-6">
                    <div class="co2-period-card">
                      <div class="co2-period">5 Years</div>
                      <div class="co2-amount">{{ (results.annualCO2Saved * 5).toFixed(1) }}</div>
                      <div class="co2-unit">tonnes</div>
                    </div>
                  </div>
                  <div class="col-md-3 col-6">
                    <div class="co2-period-card">
                      <div class="co2-period">10 Years</div>
                      <div class="co2-amount">{{ (results.annualCO2Saved * 10).toFixed(1) }}</div>
                      <div class="co2-unit">tonnes</div>
                    </div>
                  </div>
                  <div class="col-md-3 col-6">
                    <div class="co2-period-card">
                      <div class="co2-period">25 Years</div>
                      <div class="co2-amount">{{ (results.annualCO2Saved * 25).toFixed(1) }}</div>
                      <div class="co2-unit">tonnes</div>
                    </div>
                  </div>
                </div>
                <p class="text-center text-muted mt-3 mb-0">
                  <small
                    >🌳 That's
                    <strong>{{ (results.treesEquivalent * 25).toLocaleString() }} trees</strong>
                    worth of CO₂ absorption over 25 years!</small
                  >
                </p>
              </div>
            </div>

            <!-- Context Box -->
            <div class="alert alert-info mt-4">
              <h5>💡 What does this mean?</h5>
              <p class="mb-2">
                <strong>{{ results.annualCO2Saved }} tonnes of CO₂</strong> is equivalent to:
              </p>
              <ul class="mb-0">
                <li>
                  Taking <strong>{{ results.carsOffRoad }}</strong> cars off the road for a year
                </li>
                <li>
                  Planting <strong>{{ results.treesEquivalent }}</strong> trees
                </li>
                <li>
                  Avoiding <strong>{{ (results.annualCO2Saved * 400).toFixed(0) }}</strong> kg of
                  coal being burned
                </li>
              </ul>
            </div>

            <!-- Next Steps -->
            <div class="mt-4">
              <h5>🚀 Next Steps</h5>
              <ul>
                <li v-if="formData.solar.hasSolar === 'no'">
                  Research solar installers in your area and get quotes
                </li>
                <li v-if="formData.solar.hasSolar === 'no'">
                  Check government rebates and incentives for {{ formData.state }}
                </li>
                <li v-if="formData.solar.hasSolar === 'yes'">
                  Monitor your system's performance regularly
                </li>
                <li>Consider adding battery storage to maximize savings</li>
                <li>
                  Explore combining solar with an electric vehicle for even greater carbon reduction
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
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
      results: {
        annualCO2Saved: 0,
        kWhGenerated: 0,
        costSavings: 0,
        treesEquivalent: 0,
        carsOffRoad: 0,
      },
    }
  },
  methods: {
    validateSolarPanels(blur) {
      const panels = parseInt(this.formData.solar.numberOfPanels)
      if (!panels || panels < 1) {
        if (blur) this.errors.numberOfPanels = 'Please enter number of panels (minimum 1)'
      } else if (panels > 100) {
        if (blur) this.errors.numberOfPanels = 'Maximum 100 panels for residential systems'
      } else {
        this.errors.numberOfPanels = null
      }
    },
    validateElectricityBill(blur) {
      const bill = parseFloat(this.formData.solar.electricityBill)
      if (!bill || bill <= 0) {
        if (blur) this.errors.electricityBill = 'Please enter your electricity bill amount'
      } else {
        this.errors.electricityBill = null
      }
    },
    calculateSolarSavings() {
      // State-specific emissions factors (kg CO2e per kWh)
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

      // Orientation multipliers
      const orientationFactors = {
        north: 1.0,
        northeast: 0.95,
        northwest: 0.95,
        east: 0.85,
        west: 0.85,
        south: 0.65,
      }

      // Shading multipliers
      const shadingFactors = {
        none: 1.0,
        minimal: 0.9,
        moderate: 0.75,
        heavy: 0.5,
      }

      // Calculate system size from number of panels
      const numberOfPanels = parseInt(this.formData.solar.numberOfPanels)
      const panelWattage = 0.4 // 400W per panel standard
      const systemSize = numberOfPanels * panelWattage

      const efficiency = parseFloat(this.formData.solar.efficiency)
      const emissionsFactor = emissionsFactors[this.formData.state] || 0.79
      const orientationFactor = orientationFactors[this.formData.solar.orientation] || 1.0
      const shadingFactor = shadingFactors[this.formData.solar.shading] || 1.0

      // Average sun hours per day in Australia
      const avgSunHours = 4.5

      // Annual kWh generated
      const kWhGenerated = Math.round(
        systemSize * avgSunHours * 365 * efficiency * orientationFactor * shadingFactor,
      )

      // Annual CO2 saved (in tonnes)
      const annualCO2Saved = ((kWhGenerated * emissionsFactor) / 1000).toFixed(2)

      // Cost savings (assuming $0.30 per kWh)
      const costSavings = Math.round(kWhGenerated * 0.3)

      // Trees equivalent (1 tree absorbs ~21kg CO2 per year)
      const treesEquivalent = Math.round((parseFloat(annualCO2Saved) * 1000) / 21)

      // Cars off road (average car emits ~4.6 tonnes CO2 per year)
      const carsOffRoad = (parseFloat(annualCO2Saved) / 4.6).toFixed(1)

      return {
        annualCO2Saved: parseFloat(annualCO2Saved),
        kWhGenerated,
        costSavings,
        treesEquivalent,
        carsOffRoad: parseFloat(carsOffRoad),
      }
    },
    submitForm() {
      // Validate
      this.validateSolarPanels(true)
      this.validateElectricityBill(true)

      const hasErrors = Object.values(this.errors).some((error) => error !== null)

      if (hasErrors) {
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
/* Hero Section */
/* .hero-section {
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
  color: white;
  border-radius: 15px;
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

.bg-gradient-warning {
  background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
} */

/* Radio Cards */
/* .radio-card {
  padding: 2rem 1rem;
  border: 3px solid #e0e0e0;
  border-radius: 15px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;
}

.radio-card:hover {
  border-color: #ffc107;
  transform: translateY(-2px);
}

.radio-selected {
  border-color: #ffc107;
  background-color: #fff9e6;
  box-shadow: 0 5px 15px rgba(255, 193, 7, 0.3);
}

.radio-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.radio-card .form-check-input {
  position: absolute;
  opacity: 0;
} */

/* Calculate Button */
/* .btn-calculate {
  padding: 1rem 3rem;
  font-size: 1.3rem;
  font-weight: bold;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.btn-calculate:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(255, 193, 7, 0.4);
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
} */

/* Result Cards */
/* .result-card {
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
}

.result-label {
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
} */

/* Timeline */
/* .timeline-section {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 1.5rem;
}

.timeline-heading {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
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
}

.money-period-card:hover,
.co2-period-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
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
  color: #28a745;
}

.co2-amount {
  font-size: 1.8rem;
  font-weight: bold;
  color: #007bff;
}

.co2-unit {
  font-size: 0.9rem;
  color: #666;
} */

/* Responsive */
/* @media (max-width: 768px) {
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
} */
</style>
