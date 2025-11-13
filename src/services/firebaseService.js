import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore'

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCdsgqXRiAqtnbHU-UsHH4Tnm44XLDb5QI",
  authDomain: "team4-carbon-calculator.firebaseapp.com",
  projectId: "team4-carbon-calculator",
  storageBucket: "team4-carbon-calculator.firebasestorage.app",
  messagingSenderId: "637912504620",
  appId: "1:637912504620:web:6b6d56d72a02d776ec7489"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Get all solar data for all states
export async function getAllSolarData() {
  const solarCollection = collection(db, 'solarData')
  const snapshot = await getDocs(solarCollection)
  const data = {}
  snapshot.forEach(doc => {
    data[doc.id] = doc.data()
  })
  return data
}

// Get solar data for specific state
export async function getSolarDataByState(state) {
  const docRef = doc(db, 'solarData', state)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    throw new Error(`No solar data found for ${state}`)
  }
}

// Get all EV data
export async function getAllEVData() {
  const evCollection = collection(db, 'evData')
  const snapshot = await getDocs(evCollection)
  const data = {}
  snapshot.forEach(doc => {
    data[doc.id] = doc.data()
  })
  return data
}

// Get EV data for specific state
export async function getEVDataByState(state) {
  const docRef = doc(db, 'evData', state)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    throw new Error(`No EV data found for ${state}`)
  }
}

// Get all household data
export async function getAllHouseholdData() {
  const householdCollection = collection(db, 'householdData')
  const snapshot = await getDocs(householdCollection)
  const data = {}
  snapshot.forEach(doc => {
    data[doc.id] = doc.data()
  })
  return data
}

// Get household data for specific state
export async function getHouseholdDataByState(state) {
  const docRef = doc(db, 'householdData', state)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    throw new Error(`No household data found for ${state}`)
  }
}