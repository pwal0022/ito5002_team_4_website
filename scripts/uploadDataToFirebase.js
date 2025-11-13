// uploadDataToFirebase.js
// Utility script for uploading Australian emissions data to Firebase
// ITO5002-TP6-25 - Australian Household Carbon Calculator - Team 4
// Run this once to upload your Excel data to Firestore
// Usage: node uploadDataToFirebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, collection, writeBatch } from 'firebase/firestore';

// Your Firebase configuration - Team 4 Carbon Calculator
const firebaseConfig = {
  apiKey: "AIzaSyCdsgqXRiAqtnbHU-UsHH4Tnm44XLDb5QI",
  authDomain: "team4-carbon-calculator.firebaseapp.com",
  projectId: "team4-carbon-calculator",
  storageBucket: "team4-carbon-calculator.firebasestorage.app",
  messagingSenderId: "637912504620",
  appId: "1:637912504620:web:6b6d56d72a02d776ec7489"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Solar data by state (from your Excel file)
// All calculations are per 6.6kW system
const solarData = {
  "ACT": {
    "dailyOutputKwh": 26.0,
    "scope2": 0.66,
    "scope3": 0.04,
    "annualOutputKwh": 9490.0,
    "totalEmissionsFactor": 0.70,
    "annualCO2SavedKg": 6643.0,
    "annualCO2SavedTonnes": 6.643,
    "co2SavedPerKwPerYear": 1.007,
    "source": "Team 4 Excel Calculator - Solar Tab",
    "systemSize": "6.6kW",
    "lastUpdated": new Date().toISOString()
  },
  "NSW": {
    "dailyOutputKwh": 26.0,
    "scope2": 0.66,
    "scope3": 0.04,
    "annualOutputKwh": 9490.0,
    "totalEmissionsFactor": 0.70,
    "annualCO2SavedKg": 6643.0,
    "annualCO2SavedTonnes": 6.643,
    "co2SavedPerKwPerYear": 1.007,
    "source": "Team 4 Excel Calculator - Solar Tab",
    "systemSize": "6.6kW",
    "lastUpdated": new Date().toISOString()
  },
  "VIC": {
    "dailyOutputKwh": 22.5,
    "scope2": 0.77,
    "scope3": 0.09,
    "annualOutputKwh": 8212.5,
    "totalEmissionsFactor": 0.86,
    "annualCO2SavedKg": 7062.75,
    "annualCO2SavedTonnes": 7.063,
    "co2SavedPerKwPerYear": 1.070,
    "source": "Team 4 Excel Calculator - Solar Tab",
    "systemSize": "6.6kW",
    "lastUpdated": new Date().toISOString()
  },
  "QLD": {
    "dailyOutputKwh": 28.0,
    "scope2": 0.71,
    "scope3": 0.1,
    "annualOutputKwh": 10220.0,
    "totalEmissionsFactor": 0.81,
    "annualCO2SavedKg": 8278.2,
    "annualCO2SavedTonnes": 8.278,
    "co2SavedPerKwPerYear": 1.254,
    "source": "Team 4 Excel Calculator - Solar Tab",
    "systemSize": "6.6kW",
    "lastUpdated": new Date().toISOString()
  },
  "SA": {
    "dailyOutputKwh": 25.0,
    "scope2": 0.23,
    "scope3": 0.0,
    "annualOutputKwh": 9125.0,
    "totalEmissionsFactor": 0.23,
    "annualCO2SavedKg": 2098.75,
    "annualCO2SavedTonnes": 2.099,
    "co2SavedPerKwPerYear": 0.318,
    "source": "Team 4 Excel Calculator - Solar Tab",
    "systemSize": "6.6kW",
    "lastUpdated": new Date().toISOString()
  },
  "WA": {
    "dailyOutputKwh": 27.0,
    "scope2": 0.51,
    "scope3": 0.06,
    "annualOutputKwh": 9855.0,
    "totalEmissionsFactor": 0.57,
    "annualCO2SavedKg": 5617.35,
    "annualCO2SavedTonnes": 5.617,
    "co2SavedPerKwPerYear": 0.851,
    "source": "Team 4 Excel Calculator - Solar Tab",
    "systemSize": "6.6kW",
    "lastUpdated": new Date().toISOString()
  },
  "TAS": {
    "dailyOutputKwh": 20.0,
    "scope2": 0.15,
    "scope3": 0.02,
    "annualOutputKwh": 7300.0,
    "totalEmissionsFactor": 0.17,
    "annualCO2SavedKg": 1241.0,
    "annualCO2SavedTonnes": 1.241,
    "co2SavedPerKwPerYear": 0.188,
    "source": "Team 4 Excel Calculator - Solar Tab",
    "systemSize": "6.6kW",
    "lastUpdated": new Date().toISOString()
  },
  "NT": {
    "dailyOutputKwh": 29.0,
    "scope2": 0.56,
    "scope3": 0.07,
    "annualOutputKwh": 10585.0,
    "totalEmissionsFactor": 0.63,
    "annualCO2SavedKg": 6668.55,
    "annualCO2SavedTonnes": 6.669,
    "co2SavedPerKwPerYear": 1.010,
    "source": "Team 4 Excel Calculator - Solar Tab",
    "systemSize": "6.6kW",
    "lastUpdated": new Date().toISOString()
  }
};

// EV data by state (from your Excel file)
const evData = {
  "ACT": {
    "numberOfEVs": 10044,
    "avgEfficiencyKwhPer100km": 20.0,
    "avgKmPerYear": 12700.0,
    "gridEmissionsFactorScope2": 0.66,
    "avgPetrolDieselEmissionsGPerKm": 181.0,
    "co2SavedPerEVPerYearKg": 693.4,
    "co2SavedPerEVPerYearTonnes": 0.693,
    "source": "Team 4 Excel Calculator - EV Tab",
    "lastUpdated": new Date().toISOString()
  },
  "NSW": {
    "numberOfEVs": 73752,
    "avgEfficiencyKwhPer100km": 20.0,
    "avgKmPerYear": 13300.0,
    "gridEmissionsFactorScope2": 0.66,
    "avgPetrolDieselEmissionsGPerKm": 181.0,
    "co2SavedPerEVPerYearKg": 726.6,
    "co2SavedPerEVPerYearTonnes": 0.727,
    "source": "Team 4 Excel Calculator - EV Tab",
    "lastUpdated": new Date().toISOString()
  },
  "VIC": {
    "numberOfEVs": 58244,
    "avgEfficiencyKwhPer100km": 20.0,
    "avgKmPerYear": 14100.0,
    "gridEmissionsFactorScope2": 0.77,
    "avgPetrolDieselEmissionsGPerKm": 181.0,
    "co2SavedPerEVPerYearKg": 523.5,
    "co2SavedPerEVPerYearTonnes": 0.524,
    "source": "Team 4 Excel Calculator - EV Tab",
    "lastUpdated": new Date().toISOString()
  },
  "QLD": {
    "numberOfEVs": 52394,
    "avgEfficiencyKwhPer100km": 20.0,
    "avgKmPerYear": 13700.0,
    "gridEmissionsFactorScope2": 0.71,
    "avgPetrolDieselEmissionsGPerKm": 181.0,
    "co2SavedPerEVPerYearKg": 573.3,
    "co2SavedPerEVPerYearTonnes": 0.573,
    "source": "Team 4 Excel Calculator - EV Tab",
    "lastUpdated": new Date().toISOString()
  },
  "SA": {
    "numberOfEVs": 12293,
    "avgEfficiencyKwhPer100km": 20.0,
    "avgKmPerYear": 12900.0,
    "gridEmissionsFactorScope2": 0.23,
    "avgPetrolDieselEmissionsGPerKm": 181.0,
    "co2SavedPerEVPerYearKg": 1455.7,
    "co2SavedPerEVPerYearTonnes": 1.456,
    "source": "Team 4 Excel Calculator - EV Tab",
    "lastUpdated": new Date().toISOString()
  },
  "WA": {
    "numberOfEVs": 24832,
    "avgEfficiencyKwhPer100km": 20.0,
    "avgKmPerYear": 12400.0,
    "gridEmissionsFactorScope2": 0.51,
    "avgPetrolDieselEmissionsGPerKm": 181.0,
    "co2SavedPerEVPerYearKg": 845.4,
    "co2SavedPerEVPerYearTonnes": 0.845,
    "source": "Team 4 Excel Calculator - EV Tab",
    "lastUpdated": new Date().toISOString()
  },
  "TAS": {
    "numberOfEVs": 4431,
    "avgEfficiencyKwhPer100km": 20.0,
    "avgKmPerYear": 12100.0,
    "gridEmissionsFactorScope2": 0.15,
    "avgPetrolDieselEmissionsGPerKm": 181.0,
    "co2SavedPerEVPerYearKg": 1811.5,
    "co2SavedPerEVPerYearTonnes": 1.812,
    "source": "Team 4 Excel Calculator - EV Tab",
    "lastUpdated": new Date().toISOString()
  },
  "NT": {
    "numberOfEVs": 942,
    "avgEfficiencyKwhPer100km": 20.0,
    "avgKmPerYear": 13400.0,
    "gridEmissionsFactorScope2": 0.56,
    "avgPetrolDieselEmissionsGPerKm": 181.0,
    "co2SavedPerEVPerYearKg": 625.2,
    "co2SavedPerEVPerYearTonnes": 0.625,
    "source": "Team 4 Excel Calculator - EV Tab",
    "lastUpdated": new Date().toISOString()
  }
};

// ABS Household data by state (from your Excel file)
const absHouseholdData = {
  "ACT": {
    "numberOfHouseholds": 188583,
    "avgHouseholdSize": 2.5,
    "avgAnnualElectricitySummerKwh": 1200.0,
    "avgAnnualElectricityWinterKwh": 2042.0,
    "avgAnnualGasMJ": 34927.0,
    "avgVehiclesPerHousehold": 1.8,
    "source": "Australian Bureau of Statistics - Team 4 Excel Calculator",
    "lastUpdated": new Date().toISOString()
  },
  "NSW": {
    "numberOfHouseholds": 3362731,
    "avgHouseholdSize": 2.6,
    "avgAnnualElectricitySummerKwh": 1412.0,
    "avgAnnualElectricityWinterKwh": 1208.0,
    "avgAnnualGasMJ": 18384.0,
    "avgVehiclesPerHousehold": 1.8,
    "source": "Australian Bureau of Statistics - Team 4 Excel Calculator",
    "lastUpdated": new Date().toISOString()
  },
  "VIC": {
    "numberOfHouseholds": 2871342,
    "avgHouseholdSize": 2.5,
    "avgAnnualElectricitySummerKwh": 1586.0,
    "avgAnnualElectricityWinterKwh": 1779.0,
    "avgAnnualGasMJ": 49799.0,
    "avgVehiclesPerHousehold": 1.8,
    "source": "Australian Bureau of Statistics - Team 4 Excel Calculator",
    "lastUpdated": new Date().toISOString()
  },
  "QLD": {
    "numberOfHouseholds": 2146381,
    "avgHouseholdSize": 2.5,
    "avgAnnualElectricitySummerKwh": 1721.0,
    "avgAnnualElectricityWinterKwh": 1309.0,
    "avgAnnualGasMJ": 7238.0,
    "avgVehiclesPerHousehold": 1.8,
    "source": "Australian Bureau of Statistics - Team 4 Excel Calculator",
    "lastUpdated": new Date().toISOString()
  },
  "SA": {
    "numberOfHouseholds": 754090,
    "avgHouseholdSize": 2.4,
    "avgAnnualElectricitySummerKwh": 1472.0,
    "avgAnnualElectricityWinterKwh": 1833.0,
    "avgAnnualGasMJ": 16199.0,
    "avgVehiclesPerHousehold": 1.8,
    "source": "Australian Bureau of Statistics - Team 4 Excel Calculator",
    "lastUpdated": new Date().toISOString()
  },
  "WA": {
    "numberOfHouseholds": 1090518,
    "avgHouseholdSize": 2.5,
    "avgVehiclesPerHousehold": 1.8,
    "source": "Australian Bureau of Statistics - Team 4 Excel Calculator",
    "lastUpdated": new Date().toISOString(),
    "note": "Electricity and gas data not available for WA in source"
  },
  "TAS": {
    "numberOfHouseholds": 239711,
    "avgHouseholdSize": 2.4,
    "avgAnnualElectricitySummerKwh": 1581.0,
    "avgAnnualElectricityWinterKwh": 2950.0,
    "avgAnnualGasMJ": 34927.0,
    "avgVehiclesPerHousehold": 1.8,
    "source": "Australian Bureau of Statistics - Team 4 Excel Calculator",
    "lastUpdated": new Date().toISOString()
  },
  "NT": {
    "numberOfHouseholds": 84719,
    "avgHouseholdSize": 2.8,
    "avgVehiclesPerHousehold": 1.8,
    "source": "Australian Bureau of Statistics - Team 4 Excel Calculator",
    "lastUpdated": new Date().toISOString(),
    "note": "Electricity and gas data not available for NT in source"
  }
};

/**
 * Function to verify uploaded data
 */
async function verifyUpload(collectionName, state, expectedData) {
  try {
    const docRef = doc(db, collectionName, state);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const uploadedData = docSnap.data();
      // Compare key fields rather than exact JSON match (due to timestamps)
      const dataMatches = Object.keys(expectedData).every(key => {
        if (key === 'lastUpdated') return true; // Skip timestamp comparison
        return JSON.stringify(uploadedData[key]) === JSON.stringify(expectedData[key]);
      });
      return dataMatches;
    }
    return false;
  } catch (error) {
    console.error(`   ⚠️  Verification failed for ${state}:`, error.message);
    return false;
  }
}

/**
 * Upload Solar data to Firestore
 */
async function uploadSolarData() {
  console.log('📊 Uploading Solar data to "solarData" collection...');
  let successCount = 0;
  let failCount = 0;

  for (const [state, data] of Object.entries(solarData)) {
    try {
      await setDoc(doc(db, 'solarData', state), data);
      
      // Verify the upload
      const verified = await verifyUpload('solarData', state, data);
      if (verified) {
        console.log(`   ✅ ${state}: ${data.dailyOutputKwh} kWh/day, ${data.co2SavedPerKwPerYear} tonnes CO2/kW/year`);
        successCount++;
      } else {
        console.log(`   ⚠️  ${state}: Uploaded but verification failed`);
        failCount++;
      }
    } catch (error) {
      console.error(`   ❌ ${state}: Upload failed - ${error.message}`);
      failCount++;
    }
  }

  return { success: failCount === 0, successCount, failCount };
}

/**
 * Upload EV data to Firestore
 */
async function uploadEVData() {
  console.log('📊 Uploading EV data to "evData" collection...');
  let successCount = 0;
  let failCount = 0;

  for (const [state, data] of Object.entries(evData)) {
    try {
      await setDoc(doc(db, 'evData', state), data);
      
      // Verify the upload
      const verified = await verifyUpload('evData', state, data);
      if (verified) {
        console.log(`   ✅ ${state}: ${data.numberOfEVs} EVs, ${data.co2SavedPerEVPerYearKg} kg CO2 saved/EV/year`);
        successCount++;
      } else {
        console.log(`   ⚠️  ${state}: Uploaded but verification failed`);
        failCount++;
      }
    } catch (error) {
      console.error(`   ❌ ${state}: Upload failed - ${error.message}`);
      failCount++;
    }
  }

  return { success: failCount === 0, successCount, failCount };
}

/**
 * Upload ABS Household data to Firestore
 */
async function uploadHouseholdData() {
  console.log('📊 Uploading ABS Household data to "householdData" collection...');
  let successCount = 0;
  let failCount = 0;

  for (const [state, data] of Object.entries(absHouseholdData)) {
    try {
      await setDoc(doc(db, 'householdData', state), data);
      
      // Verify the upload
      const verified = await verifyUpload('householdData', state, data);
      if (verified) {
        console.log(`   ✅ ${state}: ${data.numberOfHouseholds.toLocaleString()} households, avg size ${data.avgHouseholdSize}`);
        successCount++;
      } else {
        console.log(`   ⚠️  ${state}: Uploaded but verification failed`);
        failCount++;
      }
    } catch (error) {
      console.error(`   ❌ ${state}: Upload failed - ${error.message}`);
      failCount++;
    }
  }

  return { success: failCount === 0, successCount, failCount };
}

/**
 * Upload all data to Firestore
 */
async function uploadAllData() {
  try {
    console.log('🔥 Starting Firebase data upload...');
    console.log('📦 Project: team4-carbon-calculator');
    console.log('');

    let totalSuccess = 0;
    let totalFail = 0;

    // Upload Solar data
    const solarResult = await uploadSolarData();
    totalSuccess += solarResult.successCount;
    totalFail += solarResult.failCount;
    console.log('');

    // Upload EV data
    const evResult = await uploadEVData();
    totalSuccess += evResult.successCount;
    totalFail += evResult.failCount;
    console.log('');

    // Upload Household data
    const householdResult = await uploadHouseholdData();
    totalSuccess += householdResult.successCount;
    totalFail += householdResult.failCount;
    console.log('');

    // Summary
    console.log('═══════════════════════════════════════════════════════════');
    if (totalFail === 0) {
      console.log('🎉 SUCCESS! All data uploaded and verified!');
    } else {
      console.log(`⚠️  Upload completed with ${totalFail} error(s)`);
    }
    console.log(`✅ Successful uploads: ${totalSuccess}`);
    console.log(`❌ Failed uploads: ${totalFail}`);
    console.log('');
    console.log('📋 Created 3 collections:');
    console.log('   • solarData (8 documents)');
    console.log('   • evData (8 documents)');
    console.log('   • householdData (8 documents)');
    console.log('');
    console.log('✅ View this data in Firebase Console:');
    console.log('   https://console.firebase.google.com/project/team4-carbon-calculator/firestore');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    
    return {
      success: totalFail === 0,
      totalSuccess,
      totalFail
    };
  } catch (error) {
    console.error('');
    console.error('❌ CRITICAL ERROR:', error.message);
    console.error('');
    console.error('Stack trace:', error.stack);
    console.error('');
    console.error('💡 Common issues:');
    console.error('   1. Firestore database not created in Firebase Console');
    console.error('   2. Security rules not set to "Test mode"');
    console.error('   3. Internet connection issue');
    console.error('   4. Invalid Firebase configuration');
    console.error('');
    throw error;
  }
}

// Export data for use in other modules
export {
  uploadAllData,
  uploadSolarData,
  uploadEVData,
  uploadHouseholdData,
  solarData,
  evData,
  absHouseholdData
};

// Note: To run this script, use: node runUpload.js
// Or import the functions in your Vue component