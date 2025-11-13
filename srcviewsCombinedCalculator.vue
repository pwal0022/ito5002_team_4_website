<template>
  <div class="calculator">
    <div class="container">
      <h1 class="text-center mb-4">Australian Household Carbon Calculator</h1>
      <p class="lead text-center mb-5">
        Calculate your potential carbon savings from solar panels and electric vehicles
      </p>

      <form @submit.prevent="submitForm">
        <!-- Household Information Section -->
        <div class="card mb-4">
          <div class="card-header bg-primary text-white">
            <h3 class="mb-0">Household Information</h3>
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <!-- Post Code -->
              <div class="col-md-4">
                <label for="postCode" class="form-label">Post Code *</label>
                <input
                  type="text"
                  class="form-control"
                  id="postCode"
                  v-model="formData.postCode"
                  @blur="() => validatePostCode(true)"
                  @input="() => validatePostCode(false)"
                  required
                />
                <div v-if="errors.postCode" class="text-danger small">
                  {{ errors.postCode }}
                </div>
              </div>

              <!-- Household Size -->
              <div class="col-md-4">
                <label for="familySize" class="form-label">Household Size *</label>
                <input
                  type="number"
                  class="form-control"
                  id="familySize"
                  v-model="formData.familySize"
                  @blur="() => validateFamilySize(true)"
                  @input="() => validateFamilySize(false)"
                  min="1"
                  required
                />
                <div v-if="errors.familySize" class="text-danger small">
                  {{ errors.familySize }}
                </div>
              </div>

              <!-- Home Type -->
              <div class="col-md-4">
                <label for="homeType" class="form-label">Home Type *</label>
                <select class="form-select" id="homeType" v-model="formData.homeType" required>
                  <option value="">Select home type</option>
                  <option value="House">House</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Semi">Semi-detached</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Terrace">Terrace</option>
                  <option value="Apartment">Apartment</option>
                </select>
              </div>
            </div>

            <!-- State Selection (for emissions factors) -->
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="state" class="form-label">State/Territory *</label>
                <select class="form-select" id="state" v-model="formData.state" required>
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
              </div>
            </div>
          </div>
        </div>

        <!-- What would you like to calculate? -->
        <div class="card mb-4">
          <div class="card-header bg-success text-white">
            <h3 class="mb-0">What would you like to calculate?</h3>
          </div>
          <div class="card-body">
            <div class="form-check form-switch mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                id="includeSolar"
                v-model="calculations.includeSolar"
              />
              <label class="form-check-label" for="includeSolar">
                <strong>Solar Panel Savings</strong> - Calculate carbon reduction from solar panels
              </label>
            </div>

            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="includeEV"
                v-model="calculations.includeEV"
              />
              <label class="form-check-label" for="includeEV">
                <strong>Electric Vehicle Savings</strong> - Calculate carbon reduction from switching
                to an EV
              </label>
            </div>

            <div
              v-if="!calculations.includeSolar && !calculations.includeEV"
              class="alert alert-info mt-3"
            >
              Please select at least one calculation option above.
            </div>
          </div>
        </div>

        <!-- Solar Panel Section (Conditional) -->
        <div v-if="calculations.includeSolar" class="card mb-4">
          <div class="card-header bg-warning">
            <h3 class="mb-0">☀️ Solar Panel Details</h3>
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <!-- Current Solar Status -->
              <div class="col-md-12 mb-3">
                <label class="form-label">Do you currently have solar panels?</label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="hasSolar"
                    id="hasSolarYes"
                    value="yes"
                    v-model="formData.solar.hasSolar"
                  />
                  <label class="form-check-label" for="hasSolarYes"> Yes </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="hasSolar"
                    id="hasSolarNo"
                    value="no"
                    v-model="formData.solar.hasSolar"
                  />
                  <label class="form-check-label" for="hasSolarNo">
                    No (I want to see potential savings)
                  </label>
                </div>
              </div>

              <!-- System Size -->
              <div class="col-md-6">
                <label for="solarSystemSize" class="form-label"
                  >Solar System Size (kW) *</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="solarSystemSize"
                  v-model="formData.solar.systemSize"
                  step="0.5"
                  min="1"
                  max="100"
                  placeholder="e.g., 6.6"
                />
                <small class="form-text text-muted">Typical residential: 5-10 kW</small>
              </div>

              <!-- Panel Efficiency -->
              <div class="col-md-6">
                <label for="panelEfficiency" class="form-label">Panel Quality</label>
                <select class="form-select" id="panelEfficiency" v-model="formData.solar.efficiency">
                  <option value="0.85">Standard (85% efficiency)</option>
                  <option value="0.90">Premium (90% efficiency)</option>
                  <option value="0.95">High-end (95% efficiency)</option>
                </select>
              </div>
            </div>

            <div class="row mb-3">
              <!-- Current Electricity Bill -->
              <div class="col-md-6">
                <label for="electricityBill" class="form-label"
                  >Current Electricity Bill ($) *</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="electricityBill"
                  v-model="formData.solar.electricityBill"
                  @blur="() => validateElectricityBill(true)"
                  @input="() => validateElectricityBill(false)"
                  step="0.01"
                  min="0"
                />
                <div v-if="errors.electricityBill" class="text-danger small">
                  {{ errors.electricityBill }}
                </div>
              </div>

              <!-- Bill Frequency -->
              <div class="col-md-6">
                <label for="billFrequency" class="form-label">Bill Frequency</label>
                <select class="form-select" id="billFrequency" v-model="formData.solar.billFrequency">
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
            </div>

            <!-- Roof Orientation -->
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="roofOrientation" class="form-label">Roof Orientation</label>
                <select class="form-select" id="roofOrientation" v-model="formData.solar.orientation">
                  <option value="north">North (Best in Australia)</option>
                  <option value="northeast">North-East</option>
                  <option value="northwest">North-West</option>
                  <option value="east">East</option>
                  <option value="west">West</option>
                  <option value="south">South</option>
                </select>
              </div>

              <div class="col-md-6">
                <label for="roofShading" class="form-label">Roof Shading</label>
                <select class="form-select" id="roofShading" v-model="formData.solar.shading">
                  <option value="none">No shading (full sun)</option>
                  <option value="minimal">Minimal shading</option>
                  <option value="moderate">Moderate shading</option>
                  <option value="heavy">Heavy shading</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Electric Vehicle Section (Conditional) -->
        <div v-if="calculations.includeEV" class="card mb-4">
          <div class="card-header bg-info text-white">
            <h3 class="mb-0">🚗 Electric Vehicle Details</h3>
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <!-- Current Vehicle Status -->
              <div class="col-md-12 mb-3">
                <label class="form-label">Do you currently have an electric vehicle?</label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="hasEV"
                    id="hasEVYes"
                    value="yes"
                    v-model="formData.ev.hasEV"
                  />
                  <label class="form-check-label" for="hasEVYes"> Yes </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="hasEV"
                    id="hasEVNo"
                    value="no"
                    v-model="formData.ev.hasEV"
                  />
                  <label class="form-check-label" for="hasEVNo">
                    No (I want to see potential savings)
                  </label>
                </div>
              </div>

              <!-- Current Vehicle Type -->
              <div class="col-md-6">
                <label for="currentVehicleType" class="form-label">Current Vehicle Type *</label>
                <select
                  class="form-select"
                  id="currentVehicleType"
                  v-model="formData.ev.currentVehicleType"
                >
                  <option value="">Select vehicle type</option>
                  <option value="petrol-small">Petrol - Small Car</option>
                  <option value="petrol-medium">Petrol - Medium Car</option>
                  <option value="petrol-large">Petrol - Large Car/SUV</option>
                  <option value="diesel-small">Diesel - Small Car</option>
                  <option value="diesel-medium">Diesel - Medium Car</option>
                  <option value="diesel-large">Diesel - Large Car/SUV</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <!-- Annual Kilometers -->
              <div class="col-md-6">
                <label for="annualKm" class="form-label">Annual Kilometers Driven *</label>
                <input
                  type="number"
                  class="form-control"
                  id="annualKm"
                  v-model="formData.ev.annualKm"
                  @blur="() => validateAnnualKm(true)"
                  @input="() => validateAnnualKm(false)"
                  min="0"
                  step="100"
                  placeholder="e.g., 15000"
                />
                <small class="form-text text-muted">Australian average: ~13,000 km/year</small>
                <div v-if="errors.annualKm" class="text-danger small">
                  {{ errors.annualKm }}
                </div>
              </div>
            </div>

            <!-- EV Model Interest -->
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="evModel" class="form-label">EV Model (Optional)</label>
                <select class="form-select" id="evModel" v-model="formData.ev.evModel">
                  <option value="">Any EV (average)</option>
                  <option value="tesla-model-3">Tesla Model 3</option>
                  <option value="tesla-model-y">Tesla Model Y</option>
                  <option value="mg-zs-ev">MG ZS EV</option>
                  <option value="nissan-leaf">Nissan Leaf</option>
                  <option value="hyundai-ioniq">Hyundai Ioniq</option>
                  <option value="byd-atto-3">BYD Atto 3</option>
                </select>
              </div>

              <!-- Charging Type -->
              <div class="col-md-6">
                <label for="chargingType" class="form-label">Expected Charging Method</label>
                <select class="form-select" id="chargingType" v-model="formData.ev.chargingType">
                  <option value="home">Home charging (standard grid)</option>
                  <option value="home-solar">Home charging (with solar)</option>
                  <option value="mixed">Mixed (home + public)</option>
                  <option value="public">Mainly public charging</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="text-center mb-4">
          <button
            type="submit"
            class="btn btn-primary btn-lg px-5"
            :disabled="!calculations.includeSolar && !calculations.includeEV"
          >
            Calculate My Carbon Savings
          </button>
          <button type="button" class="btn btn-outline-secondary btn-lg px-5 ms-3" @click="clearForm">
            Clear Form
          </button>
        </div>
      </form>

      <!-- Results Section -->
      <div v-if="showResults" class="card mt-5 border-success">
        <div class="card-header bg-success text-white">
          <h2 class="mb-0">Your Carbon Savings Results</h2>
        </div>
        <div class="card-body">
          <!-- Solar Results -->
          <div v-if="calculations.includeSolar && results.solar" class="mb-4">
            <h3>☀️ Solar Panel Savings</h3>
            <div class="row">
              <div class="col-md-4">
                <div class="alert alert-warning">
                  <h4>{{ results.solar.annualCO2Saved }} tonnes CO₂e</h4>
                  <p class="mb-0">Annual carbon saved</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="alert alert-warning">
                  <h4>{{ results.solar.kWhGenerated }} kWh</h4>
                  <p class="mb-0">Annual energy generated</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="alert alert-warning">
                  <h4>${{ results.solar.costSavings }}</h4>
                  <p class="mb-0">Annual cost savings</p>
                </div>
              </div>
            </div>
            <p class="text-muted">
              <strong>Equivalent to:</strong> Planting {{ results.solar.treesEquivalent }} trees or
              taking {{ results.solar.carsOffRoad }} cars off the road for a year
            </p>
          </div>

          <!-- EV Results -->
          <div v-if="calculations.includeEV && results.ev" class="mb-4">
            <h3>🚗 Electric Vehicle Savings</h3>
            <div class="row">
              <div class="col-md-4">
                <div class="alert alert-info">
                  <h4>{{ results.ev.annualCO2Saved }} tonnes CO₂e</h4>
                  <p class="mb-0">Annual carbon saved</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="alert alert-info">
                  <h4>{{ results.ev.fuelSaved }} L</h4>
                  <p class="mb-0">Fuel saved annually</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="alert alert-info">
                  <h4>${{ results.ev.costSavings }}</h4>
                  <p class="mb-0">Annual cost savings</p>
                </div>
              </div>
            </div>
            <p class="text-muted">
              <strong>Equivalent to:</strong> Planting {{ results.ev.treesEquivalent }} trees
            </p>
          </div>

          <!-- Combined Results -->
          <div
            v-if="calculations.includeSolar && calculations.includeEV && results.combined"
            class="alert alert-success"
          >
            <h3>🌟 Combined Impact</h3>
            <div class="row">
              <div class="col-md-6">
                <h2 class="text-success">{{ results.combined.totalCO2Saved }} tonnes CO₂e</h2>
                <p><strong>Total annual carbon reduction</strong></p>
              </div>
              <div class="col-md-6">
                <h2 class="text-success">${{ results.combined.totalCostSavings }}</h2>
                <p><strong>Total annual cost savings</strong></p>
              </div>
            </div>
            <hr />
            <p class="mb-0">
              <strong>🌳 Environmental Impact:</strong> This is equivalent to planting
              {{ results.combined.totalTreesEquivalent }} trees or removing
              {{ results.combined.totalCarsOffRoad }} cars from the road for an entire year!
            </p>
            <p class="mt-3 mb-0">
              <strong>💡 Achievement:</strong> You're contributing
              {{ results.combined.percentageOfTarget }}% towards closing Australia's 50% emissions
              gap for a typical household!
            </p>
          </div>

          <!-- Next Steps -->
          <div class="mt-4">
            <h4>Next Steps</h4>
            <ul>
              <li v-if="calculations.includeSolar && formData.solar.hasSolar === 'no'">
                Research solar installers in your area and get quotes
              </li>
              <li v-if="calculations.includeEV && formData.ev.hasEV === 'no'">
                Visit EV showrooms and take test drives
              </li>
              <li>Check government rebates and incentives for your state</li>
              <li>Calculate your return on investment timeline</li>
              <li>Share these results with your household to make an informed decision</li>
            </ul>
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
      calculations: {
        includeSolar: false,
        includeEV: false,
      },
      formData: {
        postCode: '',
        familySize: '',
        homeType: '',
        state: '',
        solar: {
          hasSolar: 'no',
          systemSize: '',
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
        postCode: null,
        familySize: null,
        electricityBill: null,
        annualKm: null,
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
    validatePostCode(blur) {
      if (this.formData.postCode.length !== 4) {
        if (blur) this.errors.postCode = 'Postcode must be 4 digits'
      } else {
        this.errors.postCode = null
      }
    },
    validateFamilySize(blur) {
      if (this.formData.familySize < 1) {
        if (blur) this.errors.familySize = 'Please enter household size'
      } else {
        this.errors.familySize = null
      }
    },
    validateElectricityBill(blur) {
      if (
        this.calculations.includeSolar &&
        (!this.formData.solar.electricityBill || this.formData.solar.electricityBill <= 0)
      ) {
        if (blur) this.errors.electricityBill = 'Please enter your electricity bill'
      } else {
        this.errors.electricityBill = null
      }
    },
    validateAnnualKm(blur) {
      if (
        this.calculations.includeEV &&
        (!this.formData.ev.annualKm || this.formData.ev.annualKm <= 0)
      ) {
        if (blur) this.errors.annualKm = 'Please enter annual kilometers driven'
      } else {
        this.errors.annualKm = null
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

      const systemSize = parseFloat(this.formData.solar.systemSize)
      const efficiency = parseFloat(this.formData.solar.efficiency)
      const emissionsFactor = emissionsFactors[this.formData.state] || 0.79
      const orientationFactor = orientationFactors[this.formData.solar.orientation] || 1.0
      const shadingFactor = shadingFactors[this.formData.solar.shading] || 1.0

      // Average sun hours per day in Australia (conservative estimate)
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
      const treesEquivalent = Math.round((annualCO2Saved * 1000) / 21)

      // Cars off road (average car emits ~4.6 tonnes CO2 per year)
      const carsOffRoad = (annualCO2Saved / 4.6).toFixed(1)

      return {
        annualCO2Saved,
        kWhGenerated,
        costSavings,
        treesEquivalent,
        carsOffRoad,
      }
    },
    calculateEVSavings() {
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

      // Vehicle emissions (kg CO2 per liter of fuel)
      const vehicleEmissions = {
        'petrol-small': { emissionsPerKm: 0.15, fuelConsumption: 6.5 },
        'petrol-medium': { emissionsPerKm: 0.18, fuelConsumption: 8.0 },
        'petrol-large': { emissionsPerKm: 0.25, fuelConsumption: 11.0 },
        'diesel-small': { emissionsPerKm: 0.14, fuelConsumption: 5.5 },
        'diesel-medium': { emissionsPerKm: 0.17, fuelConsumption: 7.0 },
        'diesel-large': { emissionsPerKm: 0.23, fuelConsumption: 9.5 },
        hybrid: { emissionsPerKm: 0.1, fuelConsumption: 4.5 },
      }

      // EV efficiency (kWh per 100km)
      const evEfficiency = 18

      const annualKm = parseFloat(this.formData.ev.annualKm)
      const vehicleType = vehicleEmissions[this.formData.ev.currentVehicleType]
      const emissionsFactor = emissionsFactors[this.formData.state] || 0.79

      // Current vehicle emissions (in kg CO2)
      const currentEmissions = annualKm * vehicleType.emissionsPerKm

      // EV emissions (accounting for grid emissions)
      const evKWhUsed = (annualKm / 100) * evEfficiency
      const evEmissions = evKWhUsed * emissionsFactor

      // If charging with solar, reduce EV emissions by 70%
      if (this.formData.ev.chargingType === 'home-solar') {
        const evEmissionsReduced = evEmissions * 0.3
        var annualCO2Saved = ((currentEmissions - evEmissionsReduced) / 1000).toFixed(2)
      } else {
        var annualCO2Saved = ((currentEmissions - evEmissions) / 1000).toFixed(2)
      }

      // Fuel saved
      const fuelSaved = Math.round((annualKm / 100) * vehicleType.fuelConsumption)

      // Cost savings (assuming $2.00/L petrol vs $0.30/kWh electricity)
      const fuelCost = fuelSaved * 2.0
      const electricityCost = evKWhUsed * 0.3
      const costSavings = Math.round(fuelCost - electricityCost)

      // Trees equivalent
      const treesEquivalent = Math.round((annualCO2Saved * 1000) / 21)

      return {
        annualCO2Saved,
        fuelSaved,
        costSavings,
        treesEquivalent,
      }
    },
    submitForm() {
      // Validate all fields
      this.validatePostCode(true)
      this.validateFamilySize(true)

      if (this.calculations.includeSolar) {
        this.validateElectricityBill(true)
      }

      if (this.calculations.includeEV) {
        this.validateAnnualKm(true)
      }

      // Check for errors
      const hasErrors = Object.values(this.errors).some((error) => error !== null)
      if (hasErrors) {
        alert('Please fix the errors in the form before submitting.')
        return
      }

      // Calculate results
      if (this.calculations.includeSolar) {
        this.results.solar = this.calculateSolarSavings()
      }

      if (this.calculations.includeEV) {
        this.results.ev = this.calculateEVSavings()
      }

      // Calculate combined results
      if (this.calculations.includeSolar && this.calculations.includeEV) {
        const totalCO2Saved = (
          parseFloat(this.results.solar.annualCO2Saved) +
          parseFloat(this.results.ev.annualCO2Saved)
        ).toFixed(2)
        const totalCostSavings =
          this.results.solar.costSavings + this.results.ev.costSavings
        const totalTreesEquivalent =
          this.results.solar.treesEquivalent + this.results.ev.treesEquivalent
        const totalCarsOffRoad = (totalCO2Saved / 4.6).toFixed(1)

        // Australian household average emissions: ~20 tonnes CO2e per year
        // Target: 50% reduction = 10 tonnes
        const percentageOfTarget = ((totalCO2Saved / 10) * 100).toFixed(0)

        this.results.combined = {
          totalCO2Saved,
          totalCostSavings,
          totalTreesEquivalent,
          totalCarsOffRoad,
          percentageOfTarget,
        }
      }

      this.showResults = true

      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.querySelector('.border-success')
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    },
    clearForm() {
      this.formData = {
        postCode: '',
        familySize: '',
        homeType: '',
        state: '',
        solar: {
          hasSolar: 'no',
          systemSize: '',
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
      this.calculations = {
        includeSolar: false,
        includeEV: false,
      }
      this.errors = {
        postCode: null,
        familySize: null,
        electricityBill: null,
        annualKm: null,
      }
      this.showResults = false
      this.results = {
        solar: null,
        ev: null,
        combined: null,
      }

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>

<style scoped>
.calculator {
  padding: 2rem 0;
  min-height: 100vh;
}

.card-header h3,
.card-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
}

.form-check-input:checked {
  background-color: #28a745;
  border-color: #28a745;
}

.form-check-label {
  font-size: 1.1rem;
  cursor: pointer;
}

.alert h4 {
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
  font-weight: bold;
}

.alert p {
  font-size: 0.9rem;
}

.lead {
  font-size: 1.2rem;
  color: #6c757d;
}

@media (max-width: 768px) {
  .calculator {
    padding: 1rem 0;
  }

  .btn-lg {
    width: 100%;
    margin-bottom: 1rem;
  }

  .btn-lg.ms-3 {
    margin-left: 0 !important;
  }
}
</style>