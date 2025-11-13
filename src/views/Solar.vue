<template>
  <div class="solar-page">
    <div class="container">
      <h1>Solar Panel CO2 Calculator</h1>
      <p class="subtitle">Calculate your carbon emissions reduction from solar panels</p>

      <div class="calculator-card">
        <form @submit.prevent="calculateSavings">
          <!-- State Selection -->
          <div class="form-group">
            <label for="state">State/Territory *</label>
            <select v-model="formData.state" id="state" required>
              <option value="">Select your state...</option>
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

          <!-- Number of Panels -->
          <div class="form-group">
            <label for="numPanels">Number of Solar Panels *</label>
            <input 
              type="number" 
              v-model.number="formData.numPanels" 
              id="numPanels"
              min="1"
              max="50"
              step="1"
              placeholder="e.g., 20"
              required
            />
            <small>Typical residential: 15-25 panels</small>
          </div>

          <!-- Panel Wattage -->
          <div class="form-group">
            <label for="panelWattage">Panel Wattage (W) *</label>
            <select v-model.number="formData.panelWattage" id="panelWattage" required>
              <option value="">Select panel wattage...</option>
              <option value="250">250W (Older panels)</option>
              <option value="300">300W (Standard)</option>
              <option value="330">330W (Common)</option>
              <option value="350">350W (Modern)</option>
              <option value="370">370W (High efficiency)</option>
              <option value="400">400W (Premium)</option>
              <option value="450">450W (Latest technology)</option>
            </select>
            <small>Check your solar quote or panel specifications</small>
          </div>

          <!-- Buttons -->
          <div class="button-group">
            <button type="submit" class="btn-primary">Calculate CO2 Savings</button>
            <button type="button" class="btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>

      <!-- Results -->
      <div v-if="results" class="results-card">
        <h2>Your CO2 Impact</h2>
        
        <div class="results-grid">
          <div class="result-item primary">
            <div class="result-value">{{ results.co2Saved }}</div>
            <div class="result-label">Tonnes CO2 Saved/Year</div>
          </div>

          <div class="result-item">
            <div class="result-value">{{ results.carsOffRoad }}</div>
            <div class="result-label">Cars Off Road (Equivalent)</div>
          </div>

          <div class="result-item">
            <div class="result-value">{{ results.treesEquivalent }}</div>
            <div class="result-label">Trees Planted Equivalent</div>
          </div>

          <div class="result-item">
            <div class="result-value">{{ results.householdPercent }}%</div>
            <div class="result-label">Of Avg Household Emissions</div>
          </div>

          <div class="result-item">
            <div class="result-value">{{ results.energyGenerated }}</div>
            <div class="result-label">kWh Generated/Year</div>
          </div>

          <div class="result-item">
            <div class="result-value">{{ results.homePowered }}</div>
            <div class="result-label">Months Powering Avg Home</div>
          </div>
        </div>

        <div class="info-box">
          <p><strong>Your system:</strong> {{ results.numPanels }} × {{ results.panelWattage }}W panels = {{ results.systemSizeKw }} kW total</p>
          <p><strong>State emissions factor:</strong> {{ results.emissionsFactor }} kg CO2-e per kWh</p>
          <p><strong>Average sun hours:</strong> {{ results.sunHours }} hours per day</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  state: '',
  numPanels: null,
  panelWattage: null
})

const results = ref(null)

// TEST DATA - Replace with real CER data later
const TEST_DATA = {
  sunHours: {
    'NSW': 5.2,
    'VIC': 4.5,
    'QLD': 5.5,
    'SA': 5.3,
    'WA': 5.8,
    'TAS': 4.0,
    'NT': 6.0,
    'ACT': 5.0
  },
  emissionsFactors: {
    'NSW': 0.79,
    'VIC': 0.98,
    'QLD': 0.82,
    'SA': 0.42,
    'WA': 0.64,
    'TAS': 0.15,
    'NT': 0.59,
    'ACT': 0.00
  },
  systemEfficiency: 0.80
}

const calculateSavings = () => {
  const { state, numPanels, panelWattage } = formData.value
  
  if (!state || !numPanels || !panelWattage) {
    alert('Please fill in all fields')
    return
  }

  // Calculate total system size in kW
  // Formula: (Number of panels × Wattage per panel) ÷ 1000 = kW
  const systemSizeKw = (numPanels * panelWattage) / 1000

  // Get data for selected state
  const sunHours = TEST_DATA.sunHours[state]
  const emissionsFactor = TEST_DATA.emissionsFactors[state]
  
  // Calculate annual energy generation (kWh)
  const energyGenerated = Math.round(
    systemSizeKw * sunHours * 365 * TEST_DATA.systemEfficiency
  )
  
  // Calculate CO2 saved (kg -> tonnes)
  const co2SavedKg = energyGenerated * emissionsFactor
  const co2Saved = (co2SavedKg / 1000).toFixed(2)
  
  // Calculate trees equivalent (1 tree = ~60kg CO2/year)
  const treesEquivalent = Math.round(co2SavedKg / 60)
  
  // Calculate cars off road (average car = ~4 tonnes CO2/year)
  const carsOffRoad = Math.round((co2SavedKg / 1000) / 4)
  
  // Calculate household percentage (average household = 14 tonnes CO2/year)
  const householdPercent = Math.round(((co2SavedKg / 1000) / 14) * 100)
  
  // Calculate months powering average home (average home uses ~7,000 kWh/year)
  const homePowered = Math.round((energyGenerated / 7000) * 12)
  
  results.value = {
    co2Saved,
    energyGenerated: energyGenerated.toLocaleString(),
    treesEquivalent: treesEquivalent.toLocaleString(),
    carsOffRoad: carsOffRoad.toLocaleString(),
    householdPercent: householdPercent,
    homePowered: homePowered,
    systemSizeKw: systemSizeKw.toFixed(2),
    numPanels,
    panelWattage,
    emissionsFactor,
    sunHours
  }
}

const clearForm = () => {
  formData.value = {
    state: '',
    numPanels: null,
    panelWattage: null
  }
  results.value = null
}
</script>

<style scoped>
.solar-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: white;
  text-align: center;
  margin-bottom: 10px;
}

.subtitle {
  color: white;
  text-align: center;
  margin-bottom: 30px;
  opacity: 0.9;
}

.calculator-card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

input, select {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
}

input:focus, select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

small {
  display: block;
  color: #666;
  margin-top: 5px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

button {
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #e0e0e0;
  color: #333;
}

.btn-secondary:hover {
  background: #d0d0d0;
}

.results-card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s;
}

.results-card h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.result-item {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s;
}

.result-item:hover {
  transform: translateY(-5px);
}

.result-item.primary {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: white;
}

.result-value {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.result-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.info-box {
  background: #e3f2fd;
  border-left: 4px solid #2196f3;
  padding: 20px;
  border-radius: 8px;
}

.info-box p {
  margin: 5px 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .solar-page {
    padding: 20px 10px;
  }
  
  .calculator-card {
    padding: 20px;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .result-value {
    font-size: 2rem;
  }
}

@media (max-width: 375px) {
  h1 {
    font-size: 1.5rem;
  }
  
  .result-value {
    font-size: 1.8rem;
  }
}
</style>