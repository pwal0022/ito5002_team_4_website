<template>
  <div class="solar">
    <h1>This is the solar page</h1>
    <form @submit.prevent="submitForm" action="https://formsubmit.co/el/bahixi" method="POST">
      <div class="row mb-3">
        <!-- post code -->
        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
          <label for="postCode" class="form-label">Post Code</label>
          <input
            type="text"
            class="form-control"
            id="postCode"
            alt="postCode"
            @blur="() => validatePostCode(true)"
            @input="() => validatePostCode(false)"
            v-model="formData.postCode"
            required
          />
          <div v-if="errors.postCode" class="text-danger">
            {{ errors.postCode }}
          </div>
        </div>
        <!-- household size -->
        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
          <label for="familySize" class="form-label">Household Size</label>
          <input
            type="text"
            class="form-control"
            id="familySize"
            @blur="() => validateFamilySize(true)"
            @input="() => validateFamilySize(false)"
            v-model="formData.familySize"
            required
          />
          <div v-if="errors.familySize" class="text-danger">
            {{ errors.familySize }}
          </div>
        </div>
      </div>
      <!-- home type -->

      <div>
        <b-form-select v-model="selectedHomeType" :options="homeTypeOptions"></b-form-select>
        <!-- <div class="mt-3">
          Home Type: <strong>{{ selectedHomeType }}</strong>
        </div> -->
      </div>
      <!-- Do you have solar -->
      <br>
      <h1>Do you have Solar?</h1>
      <div>
        <b-form-checkbox
          id="checkbox-1"
          v-model="solarStatus"
          name="checkbox-1"
          value="I have solar"
          unchecked-value="No solar"
        >
         I have solar
        </b-form-checkbox>

        <!-- <div>
          State: <strong>{{ solarStatus }}</strong>
        </div> -->
      </div>
      <h1> Energy</h1>
      <!-- Electricity bill  -->
       <div class="row mb-3">
          <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
          <label for="electricityBill" class="form-label">How much was your last Electriciy bill?</label>
          <input
            type="text"
            class="form-control"
            id="electricityBill"
            alt="electricityBill"
            @blur="() => validateElectricityBill(true)"
            @input="() => validateElectricityBill(false)"
            v-model="formData.electricityBill"
            required
          />
          <div v-if="errors.electricityBill" class="text-danger">
            {{ errors.electricityBill }}
          </div>
        </div>
        <!-- Electricity Bill Frequency -->
        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
          <label for="electricityBillFrequency" class="form-label">What is your bill frequency?</label>
        <b-form-select v-model="electricityBillFrequency" :options="electricityBillFrequencyOptions"></b-form-select>
        <!-- <div class="mt-3">
          Frequency: <strong>{{ electricityBillFrequency }}</strong>
        </div> -->
      </div>
      </div>


<!-- Gas Bill  -->
       <div class="row mb-3">
          <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
          <label for="gasBill" class="form-label">How much was your last Gas bill?</label>
          <input
            type="text"
            class="form-control"
            id="gasBill"
            alt="gasBill"
            @blur="() => validateGasBill(true)"
            @input="() => validateGasBill(false)"
            v-model="formData.gasBill"
            required
          />
          <div v-if="errors.gasBill" class="text-danger">
            {{ errors.gasBill }}
          </div>
        </div>
        <!-- Gas Bill Frequency -->
        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
          <label for="electricityBillFrequency" class="form-label">What is your  bill frequency?</label>
        <b-form-select v-model="GasBillFrequency" :options="gasBillFrequencyOptions"></b-form-select>
        <!-- <div class="mt-3">
          Frequency: <strong>{{ GasBillFrequency }}</strong>
        </div> -->
      </div>
      </div>









      <!-- Submit and clear form buttons -->
      <div class="text-center">
        <button type="submit" class="btn btn-primary me-2">Submit</button>
        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SolarView',
  data() {
    return {
      selectedHomeType: null,
      homeTypeOptions: [
        { value: null, text: 'Please select a house type' },
        { value: 'House', text: 'House' },
        { value: 'Townhouse', text: 'Townhouse' },
        { value: 'Semi', text: 'Semi' },
        { value: 'Duplex', text: 'Duplex' },
        { value: 'Terrace', text: 'Terrace' },
        { value: 'Apartment', text: 'Apartment' },
      ],
      solarStatus: 'no solar',
      electricityBillFrequency: null,
      electricityBillFrequencyOptions: [
        { value: null, text: 'Please select frequency' },
        { value: 'Annually', text: 'Annually' },
        { value: 'Quarterly', text: 'Quarterly' },
        { value: 'Monthly', text: 'Monthly' },
        { value: 'Weekly', text: 'Weekly' },
      ],
      gasBillFrequency: null,
      gasBillFrequencyOptions: [
        { value: null, text: 'Please select frequency' },
        { value: 'Annually', text: 'Annually' },
        { value: 'Quarterly', text: 'Quarterly' },
        { value: 'Monthly', text: 'Monthly' },
        { value: 'Weekly', text: 'Weekly' },
      ],
    }
  },
}
</script>

<script setup>
// import Footer from "../components/Footer.vue";
import { ref } from 'vue'

const formData = ref({
  postCode: '',
  familySize: '',
  electricityBill: '',
  gasBill: '',
})

const submittedCards = ref([])

const submitForm = () => {
  validatePostCode(true)
  validateFamilySize(true)
  validateElectricityBill(true)
  validateGasBill(true)

  if (!errors.value.postCode && !errors.value.familySize && !errors.value.electricityBill && !errors.value.gasBill) {
    submittedCards.value.push({
      ...formData.value,
    })
    clearForm()
    alert(
      'Thank you for your enquiry, we will endeavour to respond to you within two business days.',
    )
  }
}

const clearForm = () => {
  formData.value = {
    postCode: '',
    familySize: '',
    electricityBill: '',
    gasBill: '',
  }
  errors.value = {
    postCode: null,
    familySize: null,
    electricityBill: null,
    gasBill: null,
  }
}

const errors = ref({
  postCode: null,
  familySize: null,
  electricityBill: null,
  gasBill: null,
})

const validatePostCode = (blur) => {
  if (formData.value.postCode.length != 4) {
    if (blur) errors.value.postCode = 'postcode must be at 4 numbers long'
  } else {
    errors.value.postCode = null
  }
}

const validateFamilySize = (blur) => {
  if (formData.value.familySize.length < 1) {
    if (blur) errors.value.familySize = 'How many people in your family?'
  } else {
    errors.value.familySize = null
  }
}

const validateElectricityBill = (blur) => {
  if (formData.value.electricityBill.length < 1) {
    if (blur) errors.value.electricityBill = 'Please enter your electricity bill amount'
  } else {
    errors.value.electricityBill = null
  }
}

const validateGasBill = (blur) => {
  if (formData.value.gasBill.length < 1) {
    if (blur) errors.value.gasBill = 'Please enter your gas bill amount'
  } else {
    errors.value.gasBill = null
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>