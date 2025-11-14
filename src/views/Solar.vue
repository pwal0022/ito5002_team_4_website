<template>
  <div class="solar">
    <div class="container">
      <!-- Hero Section -->
      <div class="hero-section text-center mb-5">
        <h1 class="display-4 mb-3">🌏 Carbon Savings Calculator</h1>
        <p class="lead">See how much CO₂ you can save with solar panels and electric vehicles</p>
        <p class="text-muted">It only takes 2 minutes to get your personalised results!</p>
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

        <!-- Step 2: What to Calculate -->
        <div class="card mb-4 shadow-sm">
          <div class="card-header bg-gradient-success text-white">
            <div class="d-flex align-items-center">
              <span class="step-badge me-3">2</span>
              <h3 class="mb-0">💡 What would you like to calculate?</h3>
            </div>
          </div>
          <div class="card-body">
            <p class="text-muted mb-4">Choose one or both options to see your potential savings</p>

            <!-- Solar Option -->
            <div class="option-card mb-3" :class="{ 'option-selected': calculations.includeSolar }">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="includeSolar"
                  v-model="calculations.includeSolar"
                />
                <label class="form-check-label" for="includeSolar">
                  <div class="d-flex align-items-center">
                    <div class="option-icon me-3">☀️</div>
                    <div>
                      <h5 class="mb-1">Solar Panels</h5>
                      <p class="text-muted small mb-0">
                        Calculate savings from installing solar panels on your roof
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <!-- EV Option -->
            <div class="option-card" :class="{ 'option-selected': calculations.includeEV }">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="includeEV"
                  v-model="calculations.includeEV"
                />
                <label class="form-check-label" for="includeEV">
                  <div class="d-flex align-items-center">
                    <div class="option-icon me-3">🚗</div>
                    <div>
                      <h5 class="mb-1">Electric Vehicle</h5>
                      <p class="text-muted small mb-0">
                        Calculate savings from switching to an electric car
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div
              v-if="!calculations.includeSolar && !calculations.includeEV"
              class="alert alert-info mt-3"
            >
              <strong>👆 Please select at least one option above to continue</strong>
            </div>
          </div>
        </div>

        <!-- Step 3: Solar Details (Conditional) -->
        <div v-if="calculations.includeSolar" class="card mb-4 shadow-sm animate-in">
          <div class="card-header bg-gradient-warning">
            <div class="d-flex align-items-center">
              <span class="step-badge me-3">3</span>
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
                />
                <small class="form-text text-muted">
                  💡 <strong>Typical homes:</strong> 15-25 panels (each panel = 400 watts)
                </small>

                <div v-if="errors.numberOfPanels" class="text-danger small mt-1">
                  {{ errors.numberOfPanels }}
                </div>
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

        <!-- Step 3/4: EV Details (Conditional) -->
        <div v-if="calculations.includeEV" class="card mb-4 shadow-sm animate-in">
          <div class="card-header bg-gradient-info text-white">
            <div class="d-flex align-items-center">
              <span class="step-badge me-3">{{ calculations.includeSolar ? '4' : '3' }}</span>
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
          <button
            type="submit"
            class="btn btn-primary btn-lg btn-calculate shadow-lg"
            :disabled="!calculations.includeSolar && !calculations.includeEV"
          >
            <span class="btn-icon">🧮</span>
            Calculate My Savings
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
            <h2 class="mb-0">🎉 Your Personalised Results</h2>
            <p class="mb-0 mt-2">Here's how much you could save!</p>
          </div>
          <div class="card-body p-4">
            <!-- Solar Results -->
            <div v-if="calculations.includeSolar && results.solar" class="mb-5">
              <div class="result-header mb-4">
                <h3 class="d-flex align-items-center">
                  <span class="result-icon me-2">☀️</span>
                  Solar Panel Savings
                </h3>
              </div>

              <div class="row g-3 mb-4">
                <div class="col-md-4">
                  <div class="result-card bg-warning-light">
                    <div class="result-icon-large">🌍</div>
                    <h2 class="result-number">{{ results.solar.annualCO2Saved }}</h2>
                    <p class="result-unit">tonnes of CO₂</p>
                    <p class="result-label">Saved every year</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="result-card bg-warning-light">
                    <div class="result-icon-large">⚡</div>
                    <h2 class="result-number">{{ results.solar.kWhGenerated.toLocaleString() }}</h2>
                    <p class="result-unit">kWh</p>
                    <p class="result-label">Clean energy generated</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="result-card bg-warning-light">
                    <div class="result-icon-large">💰</div>
                    <h2 class="result-number">${{ results.solar.costSavings.toLocaleString() }}</h2>
                    <p class="result-unit">per year</p>
                    <p class="result-label">Money saved</p>
                  </div>
                </div>
              </div>

              <div class="impact-banner">
                <h5>🌳 Environmental Impact</h5>
                <p class="mb-0">
                  This is like
                  <strong>planting {{ results.solar.treesEquivalent }} trees</strong> or taking
                  <strong>{{ results.solar.carsOffRoad }} cars</strong> off the road for a whole
                  year!
                </p>
              </div>

              <!-- Friendly Comparisons -->
              <div class="row mt-4">
                <div class="col-md-4">
                  <div class="comparison-card">
                    <div class="comparison-emoji">🏠</div>
                    <div class="comparison-text">
                      <strong>Powers your home</strong>
                      <p class="mb-0 small text-muted">
                        Enough energy for most of your daily needs
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="comparison-card">
                    <div class="comparison-emoji">📱</div>
                    <div class="comparison-text">
                      <strong
                        >{{ Math.round(results.solar.kWhGenerated / 0.015).toLocaleString() }} phone
                        charges</strong
                      >
                      <p class="mb-0 small text-muted">That's a lot of scrolling!</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="comparison-card">
                    <div class="comparison-emoji">☕</div>
                    <div class="comparison-text">
                      <strong
                        >{{ Math.round(results.solar.kWhGenerated / 0.11).toLocaleString() }} cups
                        of coffee</strong
                      >
                      <p class="mb-0 small text-muted">Made with an electric kettle</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- EV Results -->
            <div v-if="calculations.includeEV && results.ev" class="mb-5">
              <div class="result-header mb-4">
                <h3 class="d-flex align-items-center">
                  <span class="result-icon me-2">🚗</span>
                  Electric Vehicle Savings
                </h3>
              </div>

              <div class="row g-3 mb-4">
                <div class="col-md-4">
                  <div class="result-card bg-info-light">
                    <div class="result-icon-large">🌍</div>
                    <h2 class="result-number">{{ results.ev.annualCO2Saved }}</h2>
                    <p class="result-unit">tonnes of CO₂</p>
                    <p class="result-label">Saved every year</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="result-card bg-info-light">
                    <div class="result-icon-large">⛽</div>
                    <h2 class="result-number">{{ results.ev.fuelSaved.toLocaleString() }}</h2>
                    <p class="result-unit">litres</p>
                    <p class="result-label">Fuel saved</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="result-card bg-info-light">
                    <div class="result-icon-large">💰</div>
                    <h2 class="result-number">${{ results.ev.costSavings.toLocaleString() }}</h2>
                    <p class="result-unit">per year</p>
                    <p class="result-label">Money saved</p>
                  </div>
                </div>
              </div>

              <div class="impact-banner">
                <h5>🌳 Environmental Impact</h5>
                <p class="mb-0">
                  This is like
                  <strong>planting {{ results.ev.treesEquivalent }} trees</strong> every year!
                </p>
              </div>

              <!-- Friendly Comparisons -->
              <div class="row mt-4">
                <div class="col-md-4">
                  <div class="comparison-card">
                    <div class="comparison-emoji">🛣️</div>
                    <div class="comparison-text">
                      <strong
                        >{{ Math.round(formData.ev.annualKm / 5).toLocaleString() }} trips</strong
                      >
                      <p class="mb-0 small text-muted">Around your local area (5km each)</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="comparison-card">
                    <div class="comparison-emoji">✈️</div>
                    <div class="comparison-text">
                      <strong
                        >Same as
                        {{ (results.ev.annualCO2Saved / 0.255).toFixed(0) }} flights</strong
                      >
                      <p class="mb-0 small text-muted">Melbourne to Sydney return trips saved</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="comparison-card">
                    <div class="comparison-emoji">🍔</div>
                    <div class="comparison-text">
                      <strong
                        >{{
                          Math.round((results.ev.annualCO2Saved * 1000) / 2.5).toLocaleString()
                        }}
                        burgers</strong
                      >
                      <p class="mb-0 small text-muted">In CO₂ emissions (beef burgers)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Combined Results -->
            <div
              v-if="calculations.includeSolar && calculations.includeEV && results.combined"
              class="combined-results"
            >
              <div class="result-header text-center mb-4">
                <h3 class="d-flex align-items-center justify-content-center">
                  <span class="result-icon me-2">🌟</span>
                  Your Total Impact
                </h3>
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
                    :aria-valuenow="results.combined.percentageOfTarget"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <strong>{{ results.combined.percentageOfTarget }}% of household target!</strong>
                  </div>
                </div>
                <p class="text-muted small mt-2 mb-0">
                  Australia needs to reduce Co2 emissions by 43%. You're doing your part! 🎯
                </p>
              </div>

              <!-- Fun Comparison Grid -->
              <div class="fun-facts-section mt-4">
                <h4 class="text-center mb-4">📊 Put It in Perspective</h4>
                <div class="row g-3">
                  <div class="col-md-3 col-6">
                    <div class="fun-fact-box">
                      <div class="fun-fact-emoji">🌲</div>
                      <div class="fun-fact-number">{{ results.combined.totalTreesEquivalent }}</div>
                      <div class="fun-fact-label">Trees planted</div>
                    </div>
                  </div>
                  <div class="col-md-3 col-6">
                    <div class="fun-fact-box">
                      <div class="fun-fact-emoji">🚗</div>
                      <div class="fun-fact-number">{{ results.combined.totalCarsOffRoad }}</div>
                      <div class="fun-fact-label">Cars off the road</div>
                    </div>
                  </div>
                  <div class="col-md-3 col-6">
                    <div class="fun-fact-box">
                      <div class="fun-fact-emoji">🏊</div>
                      <div class="fun-fact-number">
                        {{ Math.round(results.combined.totalCO2Saved * 385) }}
                      </div>
                      <div class="fun-fact-label">Olympic pools of CO₂</div>
                    </div>
                  </div>
                  <div class="col-md-3 col-6">
                    <div class="fun-fact-box">
                      <div class="fun-fact-emoji">🎈</div>
                      <div class="fun-fact-number">
                        {{ Math.round(results.combined.totalCO2Saved * 509000).toLocaleString() }}
                      </div>
                      <div class="fun-fact-label">Balloons of CO₂</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Money & CO2 Over Time -->
              <div class="savings-timeline mt-4">
                <h4 class="text-center mb-4">💰 Your Savings & Environmental Impact Over Time</h4>

                <!-- Money Savings -->
                <div class="timeline-section mb-4">
                  <h5 class="timeline-heading">
                    <span class="timeline-icon">💵</span>
                    Money Saved
                  </h5>
                  <div class="row g-3">
                    <div class="col-md-3 col-6">
                      <div class="money-period-card">
                        <div class="money-period">1 Year</div>
                        <div class="money-amount">
                          ${{ results.combined.totalCostSavings.toLocaleString() }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3 col-6">
                      <div class="money-period-card">
                        <div class="money-period">5 Years</div>
                        <div class="money-amount">
                          ${{ (results.combined.totalCostSavings * 5).toLocaleString() }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3 col-6">
                      <div class="money-period-card">
                        <div class="money-period">10 Years</div>
                        <div class="money-amount">
                          ${{ (results.combined.totalCostSavings * 10).toLocaleString() }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3 col-6">
                      <div class="money-period-card">
                        <div class="money-period">25 Years</div>
                        <div class="money-amount">
                          ${{ (results.combined.totalCostSavings * 25).toLocaleString() }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- CO2 Savings -->
                <div class="timeline-section">
                  <h5 class="timeline-heading">
                    <span class="timeline-icon">🌍</span>
                    CO₂ Emissions Prevented
                  </h5>
                  <div class="row g-3">
                    <div class="col-md-3 col-6">
                      <div class="co2-period-card">
                        <div class="co2-period">1 Year</div>
                        <div class="co2-amount">{{ results.combined.totalCO2Saved }}</div>
                        <div class="co2-unit">tonnes</div>
                      </div>
                    </div>
                    <div class="col-md-3 col-6">
                      <div class="co2-period-card">
                        <div class="co2-period">5 Years</div>
                        <div class="co2-amount">
                          {{ (results.combined.totalCO2Saved * 5).toFixed(1) }}
                        </div>
                        <div class="co2-unit">tonnes</div>
                      </div>
                    </div>
                    <div class="col-md-3 col-6">
                      <div class="co2-period-card">
                        <div class="co2-period">10 Years</div>
                        <div class="co2-amount">
                          {{ (results.combined.totalCO2Saved * 10).toFixed(1) }}
                        </div>
                        <div class="co2-unit">tonnes</div>
                      </div>
                    </div>
                    <div class="col-md-3 col-6">
                      <div class="co2-period-card">
                        <div class="co2-period">25 Years</div>
                        <div class="co2-amount">
                          {{ (results.combined.totalCO2Saved * 25).toFixed(1) }}
                        </div>
                        <div class="co2-unit">tonnes</div>
                      </div>
                    </div>
                  </div>
                  <p class="text-center text-muted mt-3 mb-0">
                    <small
                      >🌳 That's
                      <strong
                        >{{
                          (results.combined.totalTreesEquivalent * 25).toLocaleString()
                        }}
                        trees</strong
                      >
                      planted over 25 years!</small
                    >
                  </p>
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
  name: 'SolarView',
  data() {
    return {
      calculations: {
        includeSolar: false,
        includeEV: false,
      },
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
      if (
        this.calculations.includeSolar &&
        (!this.formData.solar.numberOfPanels || this.formData.solar.numberOfPanels <= 0)
      ) {
        if (blur) this.errors.numberOfPanels = 'Please enter your number of solar panels'
      } else {
        this.errors.electricityBill = null
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
        if (blur) this.errors.annualKm = 'Please enter how far you drive per year'
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

      // Convert number of panels to system size in kW
      // Assuming standard 400W (0.4kW) panels
      const panelWattage = 0.4 // 400W per panel
      const numberOfPanels = parseFloat(this.formData.solar.numberOfPanels)
      const systemSize = numberOfPanels * panelWattage

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
      let annualCO2Saved
      if (this.formData.ev.chargingType === 'home-solar') {
        const evEmissionsReduced = evEmissions * 0.3
        annualCO2Saved = ((currentEmissions - evEmissionsReduced) / 1000).toFixed(2)
      } else {
        annualCO2Saved = ((currentEmissions - evEmissions) / 1000).toFixed(2)
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
      if (this.calculations.includeSolar) {
        this.validateElectricityBill(true)
      }

      if (this.calculations.includeEV) {
        this.validateAnnualKm(true)
      }

      // Check for errors
      const hasErrors = Object.values(this.errors).some((error) => error !== null)
      if (hasErrors) {
        alert('Please fill in all required fields before calculating.')
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
          parseFloat(this.results.solar.annualCO2Saved) + parseFloat(this.results.ev.annualCO2Saved)
        ).toFixed(2)
        const totalCostSavings = this.results.solar.costSavings + this.results.ev.costSavings
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
/* Hero Section */
.hero-section {
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 15px;
  margin-bottom: 2rem;
}

.hero-section h1 {
  font-weight: 700;
}

/* Step Badges */
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

/* Card Gradients */
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

/* Option Cards */
.option-card {
  padding: 1.5rem;
  border: 3px solid #e0e0e0;
  border-radius: 15px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.option-card:hover {
  border-color: #667eea;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

.option-selected {
  border-color: #667eea;
  background-color: #f0f4ff;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.option-icon {
  font-size: 3rem;
}

.form-check-input {
  width: 2rem;
  height: 2rem;
  cursor: pointer;
}

/* Radio Cards */
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

/* Calculate Button */
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

.animate-in {
  animation: slideUp 0.5s ease-out;
}

.result-header {
  border-bottom: 3px solid #e0e0e0;
  padding-bottom: 1rem;
}

.result-icon {
  font-size: 2rem;
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

.result-label {
  font-size: 1rem;
  color: #888;
  margin: 0;
}

/* Impact Banners */
.impact-banner {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  padding: 1.5rem;
  border-radius: 15px;
  border-left: 5px solid #4caf50;
}

.achievement-banner {
  background: linear-gradient(135deg, #fff9c4 0%, #ffeb3b 100%);
  padding: 2rem;
  border-radius: 15px;
  border: 3px solid #ffc107;
  text-align: center;
}

/* Combined Results */
.combined-results {
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 3px dashed #28a745;
}

/* Comparison Cards */
.comparison-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  transition: all 0.3s ease;
  height: 100%;
}

.comparison-card:hover {
  border-color: #667eea;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.comparison-emoji {
  font-size: 2.5rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.comparison-text {
  flex: 1;
}

.comparison-text strong {
  display: block;
  font-size: 1.1rem;
  color: #333;
}

/* Fun Facts Section */
.fun-facts-section {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
  border-radius: 15px;
}

.fun-fact-box {
  background: white;
  padding: 1.5rem 1rem;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  height: 100%;
}

.fun-fact-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.fun-fact-emoji {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.fun-fact-number {
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 0.3rem;
}

.fun-fact-label {
  font-size: 0.9rem;
  color: #666;
}

/* Savings Timeline (Money + CO2) */
.savings-timeline {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  padding: 2rem;
  border-radius: 15px;
}

.timeline-section {
  margin-bottom: 2rem;
}

.timeline-section:last-child {
  margin-bottom: 0;
}

.timeline-heading {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  color: #333;
}

.timeline-icon {
  font-size: 2rem;
  margin-right: 0.5rem;
}

.money-period-card {
  background: white;
  padding: 1.5rem 1rem;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  border: 3px solid #4caf50;
  height: 100%;
}

.money-period-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
}

.money-period {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.money-amount {
  font-size: 1.8rem;
  font-weight: bold;
  color: #4caf50;
}

.co2-period-card {
  background: white;
  padding: 1.5rem 1rem;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  border: 3px solid #2196f3;
  height: 100%;
}

.co2-period-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(33, 150, 243, 0.3);
}

.co2-period {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.co2-amount {
  font-size: 1.8rem;
  font-weight: bold;
  color: #2196f3;
}

.co2-unit {
  font-size: 0.9rem;
  color: #888;
  margin-top: 0.2rem;
}

/* Money Timeline (old - remove if not needed) */
.money-timeline {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  padding: 2rem;
  border-radius: 15px;
}

/* Next Steps */
.next-steps {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #e0e0e0;
}

.next-step-card {
  padding: 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.next-step-card:hover {
  border-color: #667eea;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

.next-step-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 1rem;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .option-icon {
    font-size: 2rem;
  }

  .radio-icon {
    font-size: 2rem;
  }

  .result-number {
    font-size: 2rem;
  }

  .result-number-large {
    font-size: 2.5rem;
  }

  .btn-calculate {
    width: 100%;
    margin-bottom: 1rem;
  }

  .comparison-emoji {
    font-size: 2rem;
  }

  .fun-fact-emoji {
    font-size: 2rem;
  }

  .fun-fact-number {
    font-size: 1.5rem;
  }

  .money-amount {
    font-size: 1.5rem;
  }

  .co2-amount {
    font-size: 1.5rem;
  }
}

/* Shadow utilities */
.shadow-sm {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.shadow-lg {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}
</style>
