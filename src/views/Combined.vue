# Combined Calculator (CombinedCalculator.vue) - Quick Reference

## Key Structure

Your existing `CombinedCalculator.vue` is mostly correct, but here are the key sections it should have:

### 1. Data Structure

```javascript
data() {
  return {
    calculations: {
      includeSolar: false,  // Checkbox for solar
      includeEV: false,     // Checkbox for EV
    },
    formData: {
      state: '',
      solar: {
        hasSolar: 'no',
        numberOfPanels: '',  // CHANGED from systemSize
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
        chargingType: 'home',
      },
    },
    errors: {
      numberOfPanels: null,
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
}
```

### 2. Template Structure

```vue
<template>
  <div class="container">
    <!-- Hero Section -->
    
    <form @submit.prevent="submitForm">
      <!-- Step 1: Location -->
      <div class="card">
        <div class="card-header bg-primary">
          <h3>📍 Your Location</h3>
        </div>
        <div class="card-body">
          <select v-model="formData.state">
            <!-- States -->
          </select>
        </div>
      </div>

      <!-- Step 2: What to Calculate -->
      <div class="card">
        <div class="card-header bg-success">
          <h3>What would you like to calculate?</h3>
        </div>
        <div class="card-body">
          <div class="form-check form-switch">
            <input type="checkbox" v-model="calculations.includeSolar" />
            <label>Solar Panel Savings</label>
          </div>
          <div class="form-check form-switch">
            <input type="checkbox" v-model="calculations.includeEV" />
            <label>Electric Vehicle Savings</label>
          </div>
        </div>
      </div>

      <!-- Conditional Solar Section -->
      <div v-if="calculations.includeSolar" class="card">
        <div class="card-header bg-warning">
          <h3>☀️ Solar Panel Details</h3>
        </div>
        <div class="card-body">
          <!-- Solar form fields -->
        </div>
      </div>

      <!-- Conditional EV Section -->
      <div v-if="calculations.includeEV" class="card">
        <div class="card-header bg-info">
          <h3>🚗 Electric Vehicle Details</h3>
        </div>
        <div class="card-body">
          <!-- EV form fields -->
        </div>
      </div>

      <!-- Submit Button -->
      <button 
        type="submit" 
        :disabled="!calculations.includeSolar && !calculations.includeEV"
      >
        Calculate My Carbon Savings
      </button>
    </form>

    <!-- Results Section -->
    <div v-if="showResults">
      <!-- Solar Results (if calculated) -->
      <div v-if="calculations.includeSolar && results.solar">
        <!-- Solar results cards -->
      </div>

      <!-- EV Results (if calculated) -->
      <div v-if="calculations.includeEV && results.ev">
        <!-- EV results cards -->
      </div>

      <!-- Combined Results (if both calculated) -->
      <div v-if="calculations.includeSolar && calculations.includeEV && results.combined">
        <h3>🎉 Combined Impact</h3>
        <p>Total CO₂ Saved: {{ results.combined.totalCO2Saved }} tonnes/year</p>
        <p>Total Cost Savings: ${{ results.combined.totalCostSavings }}</p>
        <p>Target Achievement: {{ results.combined.percentageOfTarget }}%</p>
      </div>
    </div>
  </div>
</template>
```

### 3. Key Methods

```javascript
methods: {
  calculateSolarSavings() {
    // Same as Solar.vue
    // But: Convert numberOfPanels to systemSize
    const numberOfPanels = parseInt(this.formData.solar.numberOfPanels)
    const systemSize = numberOfPanels * 0.4 // 400W per panel
    
    // ... rest of solar calculation
    
    return {
      annualCO2Saved,
      kWhGenerated,
      costSavings,
      treesEquivalent,
      carsOffRoad
    }
  },

  calculateEVSavings() {
    // Same as EV.vue
    // ... EV calculation logic
    
    return {
      annualCO2Saved,
      fuelSaved,
      costSavings,
      treesEquivalent
    }
  },

  submitForm() {
    // Validate at least one is selected
    if (!this.calculations.includeSolar && !this.calculations.includeEV) {
      alert('Please select at least one calculator option.');
      return;
    }

    // Validate state
    if (!this.formData.state) {
      alert('Please select your state.');
      return;
    }

    // Calculate solar if selected
    if (this.calculations.includeSolar) {
      this.results.solar = this.calculateSolarSavings();
    }

    // Calculate EV if selected
    if (this.calculations.includeEV) {
      this.results.ev = this.calculateEVSavings();
    }

    // Calculate combined if both selected
    if (this.calculations.includeSolar && this.calculations.includeEV) {
      const totalCO2Saved = (
        parseFloat(this.results.solar.annualCO2Saved) +
        parseFloat(this.results.ev.annualCO2Saved)
      ).toFixed(2);

      const totalCostSavings = 
        this.results.solar.costSavings + 
        this.results.ev.costSavings;

      const totalTreesEquivalent = 
        this.results.solar.treesEquivalent + 
        this.results.ev.treesEquivalent;

      const totalCarsOffRoad = (totalCO2Saved / 4.6).toFixed(1);

      // Target: 50% of 20 tonnes = 10 tonnes
      const percentageOfTarget = ((totalCO2Saved / 10) * 100).toFixed(0);

      this.results.combined = {
        totalCO2Saved: parseFloat(totalCO2Saved),
        totalCostSavings,
        totalTreesEquivalent,
        totalCarsOffRoad: parseFloat(totalCarsOffRoad),
        percentageOfTarget: parseInt(percentageOfTarget),
      };
    }

    this.showResults = true;

    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.querySelector('.results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  },

  clearForm() {
    // Reset all form data
    this.formData = { /* reset to defaults */ };
    this.calculations = {
      includeSolar: false,
      includeEV: false,
    };
    this.showResults = false;
    this.results = {
      solar: null,
      ev: null,
      combined: null,
    };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
```

## Key Differences from Individual Calculators

### 1. **Checkbox Selection**
Combined calculator has checkboxes to include/exclude Solar and/or EV, whereas individual calculators always calculate their specific type.

### 2. **Conditional Form Sections**
Form sections appear/disappear based on checkbox state using `v-if`.

### 3. **Combined Results Section**
When both are selected, shows:
- Individual solar results
- Individual EV results  
- **New: Combined totals section**

### 4. **Validation Logic**
Must validate:
- At least one option selected
- State selected
- Solar fields ONLY if solar selected
- EV fields ONLY if EV selected

### 5. **Number of Panels Input**
The combined calculator should use `numberOfPanels` (like the individual Solar calculator) rather than `systemSize`, then convert internally:

```javascript
const systemSize = numberOfPanels * 0.4; // 400W per panel
```

This makes it more user-friendly ("How many panels?" vs "What's your kW?").

## Critical Update Needed in Your Current CombinedCalculator.vue

If your current `CombinedCalculator.vue` uses `systemSize` (in kW), you should change it to `numberOfPanels` for consistency with the new Solar calculator:

**Change this:**
```vue
<label for="solarSystemSize">Solar System Size (kW) *</label>
<input v-model="formData.solar.systemSize" />
```

**To this:**
```vue
<label for="numberOfPanels">How many solar panels? *</label>
<input v-model="formData.solar.numberOfPanels" />
<small>Typical homes have 15-25 panels (6-10kW system)</small>
```

And update the calculation method to convert panels to kW:
```javascript
const numberOfPanels = parseInt(this.formData.solar.numberOfPanels);
const systemSize = numberOfPanels * 0.4; // 400W per panel
```

## Your Current CombinedCalculator.vue Status

Based on your project knowledge, your current `CombinedCalculator.vue` appears to:
✅ Have the basic structure correct
✅ Include checkbox toggles for Solar and EV
✅ Have conditional form sections
✅ Calculate combined results
⚠️ May need update from `systemSize` to `numberOfPanels` for consistency

## Testing the Combined Calculator

Test with Linda's Persona (VIC):
1. Check "Solar Panel Savings" ✓
2. Check "Electric Vehicle Savings" ✓
3. State: VIC
4. Solar: Yes, 20 panels, $420 quarterly
5. EV: Considering, RAV4 (petrol-large), 12,000 km, home+solar charging

Expected Results:
- Solar: ~4-5 tonnes CO₂, ~$1,500-1,800 savings
- EV: ~2.5-3 tonnes CO₂, ~$1,500-2,000 savings
- **Combined: ~7-8 tonnes CO₂ total, ~$3,500 savings, ~75% target achievement**

---

## Summary

Your Combined Calculator should be the most comprehensive option, allowing users to:
1. Choose Solar only, EV only, or both
2. See individual results for each
3. See combined totals when both selected
4. Understand percentage toward Australia's household emissions reduction target

The key is the **flexibility** - users can mix and match what they want to calculate!