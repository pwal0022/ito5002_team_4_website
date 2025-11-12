<template>
  <div class="ev-page">
    <div class="container">
      <h1>Electric Vehicle CO2 Calculator</h1>
      <p class="subtitle">Compare emissions: Petrol/Diesel vs Electric Vehicle</p>

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

          <!-- Current Vehicle Type -->
          <div class="form-group">
            <label for="currentVehicle">Current Vehicle Type *</label>
            <select v-model="formData.currentVehicle" id="currentVehicle" required>
              <option value="">Select current vehicle...</option>
              <option value="petrol-small">Small Petrol Car (e.g., Toyota Corolla)</option>
              <option value="petrol-medium">Medium Petrol Car (e.g., Mazda CX-5)</option>
              <option value="petrol-large">Large Petrol Car (e.g., Ford Ranger)</option>
              <option value="diesel-small">Small Diesel Car</option>
              <option value="diesel-medium">Medium Diesel Car</option>
              <option value="diesel-large">Large Diesel Car/4WD</option>
            </select>
          </div>

          <!-- Annual KM Driven -->
          <div class="form-group">
            <label for="annualKm">Annual Kilometers Driven *</label>
            <input 
              type="number" 
              v-model.number="formData.annualKm" 
              id="annualKm"
              min="1000"
              max="50000"
              step="100"
              placeholder="e.g., 15000"
              required
            />
            <small>Average Australian: 12,000-15,000 km/year</small>
          </div>

          <!-- EV Model Selection -->
          <div class="form-group">
            <label for="evModel">Electric Vehicle Model *</label>
            <select v-model="formData.evModel" id="evModel" required>
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

          <!-- Buttons -->
          <div class="button-group">
            <button type="submit" class="btn-primary">Compare Emissions</button>
            <button type="button" class="btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>

      <!-- Results -->
      <div v-if="results" class="results-card">
        <h2>Your EV Impact</h2>

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
            <div class="savings-percent">{{ results.reductionPercent }}% reduction in emissions!</div>
          </div>
        </div>

        <!-- Additional Metrics -->
        <div class="results-grid">
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
            <div class="result-value">${{ results.fuelSavings }}</div>
            <div class="result-label">Estimated Fuel Savings/Year</div>
          </div>
        </div>

        <!-- Info Box -->
        <div class="info-box">
          <p><strong>Annual distance:</strong> {{ formData.annualKm.toLocaleString() }} km</p>
          <p><strong>State grid emissions:</strong> {{ results.gridEmissions }} kg CO2-e per kWh</p>
          <p><strong>EV efficiency:</strong> {{ results.evEfficiency }} kWh/100km</p>
          <p><strong>ICE emissions:</strong> {{ results.iceEmissionsPerKm }} kg CO2/km</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  state: '',
  currentVehicle: '',
  annualKm: null,
  evModel: ''
})

const results = ref(null)

// TEST DATA - Replace with real EV Council data later
const TEST_DATA = {
  // Grid emissions factors (kg CO2-e per kWh)
  gridEmissions: {
    'NSW': 0.79,
    'VIC': 0.98,
    'QLD': 0.82,
    'SA': 0.42,
    'WA': 0.64,
    'TAS': 0.15,
    'NT': 0.59,
    'ACT': 0.00
  },
  
  // ICE vehicle emissions (kg CO2 per km)
  iceVehicles: {
    'petrol-small': { emissions: 0.150, name: 'Small Petrol Car', fuelCost: 0.18 },
    'petrol-medium': { emissions: 0.200, name: 'Medium Petrol Car', fuelCost: 0.22 },
    'petrol-large': { emissions: 0.280, name: 'Large Petrol Car', fuelCost: 0.30 },
    'diesel-small': { emissions: 0.140, name: 'Small Diesel Car', fuelCost: 0.16 },
    'diesel-medium': { emissions: 0.180, name: 'Medium Diesel Car', fuelCost: 0.20 },
    'diesel-large': { emissions: 0.250, name: 'Large Diesel Car/4WD', fuelCost: 0.28 }
  },
  
  // EV models (kWh per 100km)
  evModels: {
    'tesla-model3': { efficiency: 15.0, name: 'Tesla Model 3' },
    'tesla-modely': { efficiency: 16.5, name: 'Tesla Model Y' },
    'nissan-leaf': { efficiency: 17.0, name: 'Nissan Leaf' },
    'hyundai-kona': { efficiency: 14.5, name: 'Hyundai Kona Electric' },
    'mg-zs': { efficiency: 16.0, name: 'MG ZS EV' },
    'byd-atto3': { efficiency: 15.5, name: 'BYD Atto 3' },
    'polestar-2': { efficiency: 18.0, name: 'Polestar 2' },
    'bmw-i4': { efficiency: 17.5, name: 'BMW i4' }
  },
  
  // Electricity cost ($/kWh)
  electricityCost: 0.30
}

const calculateSavings = () => {
  const { state, currentVehicle, annualKm, evModel } = formData.value
  
  if (!state || !currentVehicle || !annualKm || !evModel) {
    alert('Please fill in all fields')
    return
  }

  // Get vehicle data
  const iceData = TEST_DATA.iceVehicles[currentVehicle]
  const evData = TEST_DATA.evModels[evModel]
  const gridEmissionsFactor = TEST_DATA.gridEmissions[state]

  // Calculate ICE emissions (kg CO2)
  const iceEmissionsKg = annualKm * iceData.emissions
  const iceEmissionsTonnes = (iceEmissionsKg / 1000).toFixed(2)

  // Calculate EV emissions
  // Energy consumption (kWh) = (km / 100) × efficiency (kWh/100km)
  const evEnergyKwh = (annualKm / 100) * evData.efficiency
  // EV emissions (kg CO2) = Energy × Grid emissions factor
  const evEmissionsKg = evEnergyKwh * gridEmissionsFactor
  const evEmissionsTonnes = (evEmissionsKg / 1000).toFixed(2)

  // Calculate savings
  const co2SavedKg = iceEmissionsKg - evEmissionsKg
  const co2Saved = (co2SavedKg / 1000).toFixed(2)
  const reductionPercent = Math.round((co2SavedKg / iceEmissionsKg) * 100)

  // Calculate additional metrics
  const carsOffRoad = Math.round((co2SavedKg / 1000) / 4)
  const treesEquivalent = Math.round(co2SavedKg / 60)
  const householdPercent = Math.round(((co2SavedKg / 1000) / 14) * 100)

  // Calculate fuel savings
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
    iceEmissionsPerKm: iceData.emissions
  }
}

const clearForm = () => {
  formData.value = {
    state: '',
    currentVehicle: '',
    annualKm: null,
    evModel: ''
  }
  results.value = null
}
</script>

<style scoped>
.ev-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  padding: 40px 20px;
}

.container {
  max-width: 900px;
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
  border-color: #4facfe;
  box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.1);
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
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(79, 172, 254, 0.4);
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

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  align-items: center;
  margin-bottom: 30px;
}

.comparison-card {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
}

.comparison-card.ice {
  border: 3px solid #ff6b6b;
}

.comparison-card.ev {
  border: 3px solid #51cf66;
}

.comparison-card h3 {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
}

.vehicle-name {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
}

.emission-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
}

.emission-label {
  font-size: 0.9rem;
  color: #666;
}

.vs-badge {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.savings-highlight {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.savings-icon {
  font-size: 3rem;
}

.savings-content h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  opacity: 0.9;
}

.savings-value {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.savings-percent {
  font-size: 1.1rem;
  opacity: 0.9;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}

.result-item {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
}

.result-value {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
}

.result-label {
  font-size: 0.85rem;
  color: #666;
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
  .ev-page {
    padding: 20px 10px;
  }
  
  .calculator-card {
    padding: 20px;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .comparison-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }
  
  .vs-badge {
    justify-self: center;
  }
  
  .savings-highlight {
    flex-direction: column;
    text-align: center;
  }
  
  .emission-value,
  .savings-value {
    font-size: 2rem;
  }
}

@media (max-width: 375px) {
  h1 {
    font-size: 1.5rem;
  }
  
  .emission-value {
    font-size: 1.8rem;
  }
  
  .result-value {
    font-size: 1.5rem;
  }
}
</style>