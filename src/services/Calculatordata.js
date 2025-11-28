// Calculator Data Service - Fetches data from Firebase Firestore
import { db } from './firebase'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'

/**
 * Fallback data in case Firebase is unavailable
 * This ensures the calculators still work offline or if there are permission issues
 */
const FALLBACK_DATA = {
  evData: {
    ACT: {
      gridEmissionsFactorScope2: 0.66,
      avgEfficiencyKwhPer100km: 20,
      avgKmPerYear: 12700,
      avgPetrolDieselEmissionsGPerKm: 181,
      co2SavedPerEVPerYearTonnes: 0.693,
    },
    NSW: {
      gridEmissionsFactorScope2: 0.66,
      avgEfficiencyKwhPer100km: 20,
      avgKmPerYear: 13300,
      avgPetrolDieselEmissionsGPerKm: 181,
      co2SavedPerEVPerYearTonnes: 0.727,
    },
    VIC: {
      gridEmissionsFactorScope2: 0.77,
      avgEfficiencyKwhPer100km: 20,
      avgKmPerYear: 14100,
      avgPetrolDieselEmissionsGPerKm: 181,
      co2SavedPerEVPerYearTonnes: 0.524,
    },
    QLD: {
      gridEmissionsFactorScope2: 0.71,
      avgEfficiencyKwhPer100km: 20,
      avgKmPerYear: 13700,
      avgPetrolDieselEmissionsGPerKm: 181,
      co2SavedPerEVPerYearTonnes: 0.573,
    },
    SA: {
      gridEmissionsFactorScope2: 0.23,
      avgEfficiencyKwhPer100km: 20,
      avgKmPerYear: 12900,
      avgPetrolDieselEmissionsGPerKm: 181,
      co2SavedPerEVPerYearTonnes: 1.456,
    },
    WA: {
      gridEmissionsFactorScope2: 0.51,
      avgEfficiencyKwhPer100km: 20,
      avgKmPerYear: 12400,
      avgPetrolDieselEmissionsGPerKm: 181,
      co2SavedPerEVPerYearTonnes: 0.845,
    },
    TAS: {
      gridEmissionsFactorScope2: 0.15,
      avgEfficiencyKwhPer100km: 20,
      avgKmPerYear: 12100,
      avgPetrolDieselEmissionsGPerKm: 181,
      co2SavedPerEVPerYearTonnes: 1.812,
    },
    NT: {
      gridEmissionsFactorScope2: 0.56,
      avgEfficiencyKwhPer100km: 20,
      avgKmPerYear: 13400,
      avgPetrolDieselEmissionsGPerKm: 181,
      co2SavedPerEVPerYearTonnes: 0.625,
    },
  },
  solarData: {
    ACT: {
      dailyOutputKwh: 26,
      annualOutputKwh: 9490,
      totalEmissionsFactor: 0.7,
      co2SavedPerKwPerYear: 1.007,
      annualCO2SavedTonnes: 6.643,
    },
    NSW: {
      dailyOutputKwh: 26,
      annualOutputKwh: 9490,
      totalEmissionsFactor: 0.7,
      co2SavedPerKwPerYear: 1.007,
      annualCO2SavedTonnes: 6.643,
    },
    VIC: {
      dailyOutputKwh: 22.5,
      annualOutputKwh: 8212.5,
      totalEmissionsFactor: 0.86,
      co2SavedPerKwPerYear: 1.07,
      annualCO2SavedTonnes: 7.063,
    },
    QLD: {
      dailyOutputKwh: 28,
      annualOutputKwh: 10220,
      totalEmissionsFactor: 0.81,
      co2SavedPerKwPerYear: 1.254,
      annualCO2SavedTonnes: 8.278,
    },
    SA: {
      dailyOutputKwh: 25,
      annualOutputKwh: 9125,
      totalEmissionsFactor: 0.23,
      co2SavedPerKwPerYear: 0.318,
      annualCO2SavedTonnes: 2.099,
    },
    WA: {
      dailyOutputKwh: 27,
      annualOutputKwh: 9855,
      totalEmissionsFactor: 0.57,
      co2SavedPerKwPerYear: 0.851,
      annualCO2SavedTonnes: 5.617,
    },
    TAS: {
      dailyOutputKwh: 20,
      annualOutputKwh: 7300,
      totalEmissionsFactor: 0.17,
      co2SavedPerKwPerYear: 0.188,
      annualCO2SavedTonnes: 1.241,
    },
    NT: {
      dailyOutputKwh: 29,
      annualOutputKwh: 10585,
      totalEmissionsFactor: 0.63,
      co2SavedPerKwPerYear: 1.01,
      annualCO2SavedTonnes: 6.669,
    },
  },
  householdData: {
    ACT: { avgHouseholdSize: 2.5, avgVehiclesPerHousehold: 1.8 },
    NSW: { avgHouseholdSize: 2.6, avgVehiclesPerHousehold: 1.8 },
    VIC: { avgHouseholdSize: 2.5, avgVehiclesPerHousehold: 1.8 },
    QLD: { avgHouseholdSize: 2.5, avgVehiclesPerHousehold: 1.8 },
    SA: { avgHouseholdSize: 2.4, avgVehiclesPerHousehold: 1.8 },
    WA: { avgHouseholdSize: 2.5, avgVehiclesPerHousehold: 1.8 },
    TAS: { avgHouseholdSize: 2.4, avgVehiclesPerHousehold: 1.8 },
    NT: { avgHouseholdSize: 2.8, avgVehiclesPerHousehold: 1.8 },
  },
}

// Cache for storing fetched data
let cachedData = {
  evData: null,
  solarData: null,
  householdData: null,
  lastFetched: null,
}

// Cache duration: 5 minutes (in milliseconds)
const CACHE_DURATION = 5 * 60 * 1000

/**
 * Check if cache is still valid
 */
function isCacheValid() {
  if (!cachedData.lastFetched) return false
  return Date.now() - cachedData.lastFetched < CACHE_DURATION
}

/**
 * Fetch all data for a specific collection
 * @param {string} collectionName - Name of the Firestore collection
 * @returns {Object} - Object with state codes as keys and data as values
 */
async function fetchCollection(collectionName) {
  try {
    const collectionRef = collection(db, collectionName)
    const snapshot = await getDocs(collectionRef)

    const data = {}
    snapshot.forEach((doc) => {
      data[doc.id] = doc.data()
    })

    return data
  } catch (error) {
    console.warn(`Failed to fetch ${collectionName} from Firebase:`, error.message)
    return null
  }
}

/**
 * Fetch data for a specific state from a collection
 * @param {string} collectionName - Name of the Firestore collection
 * @param {string} stateCode - Australian state code (e.g., 'NSW', 'VIC')
 * @returns {Object|null} - State data or null if not found
 */
async function fetchStateData(collectionName, stateCode) {
  try {
    const docRef = doc(db, collectionName, stateCode)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    }
    return null
  } catch (error) {
    console.warn(`Failed to fetch ${stateCode} from ${collectionName}:`, error.message)
    return null
  }
}

/**
 * Fetch all calculator data from Firebase
 * Uses caching to minimize Firebase reads
 * @param {boolean} forceRefresh - Force refresh from Firebase
 * @returns {Object} - All calculator data
 */
export async function fetchAllCalculatorData(forceRefresh = false) {
  // Return cached data if valid
  if (!forceRefresh && isCacheValid() && cachedData.evData && cachedData.solarData) {
    console.log('📦 Using cached calculator data')
    return {
      evData: cachedData.evData,
      solarData: cachedData.solarData,
      householdData: cachedData.householdData,
      fromCache: true,
    }
  }

  console.log('🔥 Fetching calculator data from Firebase...')

  // Fetch all collections in parallel
  const [evData, solarData, householdData] = await Promise.all([
    fetchCollection('evData'),
    fetchCollection('solarData'),
    fetchCollection('householdData'),
  ])

  // Update cache with fetched data or fallback
  cachedData = {
    evData: evData || FALLBACK_DATA.evData,
    solarData: solarData || FALLBACK_DATA.solarData,
    householdData: householdData || FALLBACK_DATA.householdData,
    lastFetched: Date.now(),
  }

  const usingFallback = !evData || !solarData || !householdData

  if (usingFallback) {
    console.warn('⚠️ Using fallback data for some collections')
  } else {
    console.log('✅ Successfully loaded data from Firebase')
  }

  return {
    evData: cachedData.evData,
    solarData: cachedData.solarData,
    householdData: cachedData.householdData,
    fromCache: false,
    usingFallback,
  }
}

/**
 * Get EV data for a specific state
 * @param {string} stateCode - Australian state code
 * @returns {Object} - EV data for the state
 */
export async function getEVDataForState(stateCode) {
  if (isCacheValid() && cachedData.evData) {
    return cachedData.evData[stateCode] || FALLBACK_DATA.evData[stateCode]
  }

  const data = await fetchStateData('evData', stateCode)
  return data || FALLBACK_DATA.evData[stateCode]
}

/**
 * Get Solar data for a specific state
 * @param {string} stateCode - Australian state code
 * @returns {Object} - Solar data for the state
 */
export async function getSolarDataForState(stateCode) {
  if (isCacheValid() && cachedData.solarData) {
    return cachedData.solarData[stateCode] || FALLBACK_DATA.solarData[stateCode]
  }

  const data = await fetchStateData('solarData', stateCode)
  return data || FALLBACK_DATA.solarData[stateCode]
}

/**
 * Get Household data for a specific state
 * @param {string} stateCode - Australian state code
 * @returns {Object} - Household data for the state
 */
export async function getHouseholdDataForState(stateCode) {
  if (isCacheValid() && cachedData.householdData) {
    return cachedData.householdData[stateCode] || FALLBACK_DATA.householdData[stateCode]
  }

  const data = await fetchStateData('householdData', stateCode)
  return data || FALLBACK_DATA.householdData[stateCode]
}

/**
 * Get all data needed for calculations for a specific state
 * @param {string} stateCode - Australian state code
 * @returns {Object} - Combined data for solar, EV, and household
 */
export async function getAllDataForState(stateCode) {
  // Ensure we have all data loaded
  await fetchAllCalculatorData()

  return {
    ev: cachedData.evData[stateCode] || FALLBACK_DATA.evData[stateCode],
    solar: cachedData.solarData[stateCode] || FALLBACK_DATA.solarData[stateCode],
    household: cachedData.householdData[stateCode] || FALLBACK_DATA.householdData[stateCode],
  }
}

/**
 * Clear the cache (useful for testing or forcing refresh)
 */
export function clearCache() {
  cachedData = {
    evData: null,
    solarData: null,
    householdData: null,
    lastFetched: null,
  }
  console.log('🗑️ Cache cleared')
}

/**
 * Get fallback data (for offline mode)
 */
export function getFallbackData() {
  return FALLBACK_DATA
}

export default {
  fetchAllCalculatorData,
  getEVDataForState,
  getSolarDataForState,
  getHouseholdDataForState,
  getAllDataForState,
  clearCache,
  getFallbackData,
}