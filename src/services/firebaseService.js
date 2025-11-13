// firebaseService.js
// Service for fetching data from Firebase Firestore
// ITO5002-TP6-25 - Australian Household Carbon Calculator - Team 4

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';

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

/**
 * Get solar data for a specific state
 * @param {string} state - State code (e.g., 'NSW', 'VIC')
 * @returns {Promise<Object|null>} Solar data object or null if not found
 */
export async function getSolarDataByState(state) {
  try {
    const docRef = doc(db, 'solarData', state);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.warn(`No solar data found for state: ${state}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching solar data:', error);
    throw error;
  }
}

/**
 * Get EV data for a specific state
 * @param {string} state - State code (e.g., 'NSW', 'VIC')
 * @returns {Promise<Object|null>} EV data object or null if not found
 */
export async function getEVDataByState(state) {
  try {
    const docRef = doc(db, 'evData', state);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.warn(`No EV data found for state: ${state}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching EV data:', error);
    throw error;
  }
}

/**
 * Get household data for a specific state
 * @param {string} state - State code (e.g., 'NSW', 'VIC')
 * @returns {Promise<Object|null>} Household data object or null if not found
 */
export async function getHouseholdDataByState(state) {
  try {
    const docRef = doc(db, 'householdData', state);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.warn(`No household data found for state: ${state}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching household data:', error);
    throw error;
  }
}

/**
 * Get all solar data (all states)
 * @returns {Promise<Object>} Object with state codes as keys
 */
export async function getAllSolarData() {
  try {
    const querySnapshot = await getDocs(collection(db, 'solarData'));
    const data = {};
    
    querySnapshot.forEach((doc) => {
      data[doc.id] = doc.data();
    });
    
    return data;
  } catch (error) {
    console.error('Error fetching all solar data:', error);
    throw error;
  }
}

/**
 * Get all EV data (all states)
 * @returns {Promise<Object>} Object with state codes as keys
 */
export async function getAllEVData() {
  try {
    const querySnapshot = await getDocs(collection(db, 'evData'));
    const data = {};
    
    querySnapshot.forEach((doc) => {
      data[doc.id] = doc.data();
    });
    
    return data;
  } catch (error) {
    console.error('Error fetching all EV data:', error);
    throw error;
  }
}

/**
 * Get all household data (all states)
 * @returns {Promise<Object>} Object with state codes as keys
 */
export async function getAllHouseholdData() {
  try {
    const querySnapshot = await getDocs(collection(db, 'householdData'));
    const data = {};
    
    querySnapshot.forEach((doc) => {
      data[doc.id] = doc.data();
    });
    
    return data;
  } catch (error) {
    console.error('Error fetching all household data:', error);
    throw error;
  }
}

/**
 * Get all data for a specific state (solar, EV, and household)
 * @param {string} state - State code (e.g., 'NSW', 'VIC')
 * @returns {Promise<Object>} Object containing solar, ev, and household data
 */
export async function getAllDataByState(state) {
  try {
    const [solarData, evData, householdData] = await Promise.all([
      getSolarDataByState(state),
      getEVDataByState(state),
      getHouseholdDataByState(state)
    ]);
    
    return {
      solar: solarData,
      ev: evData,
      household: householdData
    };
  } catch (error) {
    console.error(`Error fetching all data for state ${state}:`, error);
    throw error;
  }
}

/**
 * Calculate solar savings for a custom system size
 * @param {string} state - State code
 * @param {number} systemSizeKw - System size in kW (e.g., 6.6, 10.0)
 * @returns {Promise<Object>} Calculated savings based on state data
 */
export async function calculateSolarSavings(state, systemSizeKw) {
  try {
    const solarData = await getSolarDataByState(state);
    
    if (!solarData) {
      throw new Error(`No solar data available for state: ${state}`);
    }
    
    // Data is for 6.6kW system, scale proportionally
    const scaleFactor = systemSizeKw / 6.6;
    
    return {
      dailyOutputKwh: solarData.dailyOutputKwh * scaleFactor,
      annualOutputKwh: solarData.annualOutputKwh * scaleFactor,
      annualCO2SavedKg: solarData.annualCO2SavedKg * scaleFactor,
      annualCO2SavedTonnes: solarData.annualCO2SavedTonnes * scaleFactor,
      emissionsFactor: solarData.totalEmissionsFactor,
      scope2: solarData.scope2,
      scope3: solarData.scope3,
      systemSizeKw: systemSizeKw,
      state: state
    };
  } catch (error) {
    console.error('Error calculating solar savings:', error);
    throw error;
  }
}

/**
 * Calculate EV savings compared to petrol/diesel vehicle
 * @param {string} state - State code
 * @param {number} annualKm - Annual kilometers driven
 * @returns {Promise<Object>} Calculated EV vs ICE savings
 */
export async function calculateEVSavings(state, annualKm) {
  try {
    const evData = await getEVDataByState(state);
    
    if (!evData) {
      throw new Error(`No EV data available for state: ${state}`);
    }
    
    // Calculate emissions for ICE vehicle
    const iceEmissionsKg = (evData.avgPetrolDieselEmissionsGPerKm * annualKm) / 1000;
    
    // Calculate emissions for EV (electricity generation)
    const evElectricityKwh = (evData.avgEfficiencyKwhPer100km / 100) * annualKm;
    const evEmissionsKg = evElectricityKwh * evData.gridEmissionsFactorScope2;
    
    // Calculate savings
    const savingsKg = iceEmissionsKg - evEmissionsKg;
    const savingsTonnes = savingsKg / 1000;
    
    return {
      iceEmissionsKg: iceEmissionsKg,
      iceEmissionsTonnes: iceEmissionsKg / 1000,
      evEmissionsKg: evEmissionsKg,
      evEmissionsTonnes: evEmissionsKg / 1000,
      savingsKg: savingsKg,
      savingsTonnes: savingsTonnes,
      annualKm: annualKm,
      state: state,
      evEfficiencyKwhPer100km: evData.avgEfficiencyKwhPer100km,
      gridEmissionsFactor: evData.gridEmissionsFactorScope2
    };
  } catch (error) {
    console.error('Error calculating EV savings:', error);
    throw error;
  }
}

/**
 * Get emissions factor for a state (for custom calculations)
 * @param {string} state - State code
 * @returns {Promise<Object>} Emissions factors
 */
export async function getEmissionsFactors(state) {
  try {
    const solarData = await getSolarDataByState(state);
    
    if (!solarData) {
      throw new Error(`No emissions data available for state: ${state}`);
    }
    
    return {
      scope2: solarData.scope2,
      scope3: solarData.scope3,
      total: solarData.totalEmissionsFactor,
      state: state
    };
  } catch (error) {
    console.error('Error fetching emissions factors:', error);
    throw error;
  }
}

/**
 * Check if data exists in Firestore
 * @returns {Promise<Object>} Status of each collection
 */
export async function checkDataAvailability() {
  try {
    const [solarSnap, evSnap, householdSnap] = await Promise.all([
      getDocs(collection(db, 'solarData')),
      getDocs(collection(db, 'evData')),
      getDocs(collection(db, 'householdData'))
    ]);
    
    return {
      solarData: {
        exists: !solarSnap.empty,
        count: solarSnap.size
      },
      evData: {
        exists: !evSnap.empty,
        count: evSnap.size
      },
      householdData: {
        exists: !householdSnap.empty,
        count: householdSnap.size
      }
    };
  } catch (error) {
    console.error('Error checking data availability:', error);
    throw error;
  }
}

// Export all functions
export default {
  getSolarDataByState,
  getEVDataByState,
  getHouseholdDataByState,
  getAllSolarData,
  getAllEVData,
  getAllHouseholdData,
  getAllDataByState,
  calculateSolarSavings,
  calculateEVSavings,
  getEmissionsFactors,
  checkDataAvailability
};