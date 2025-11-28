// Firebase configuration and initialization
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyCdsgqXRiAqtnbHU-UsHH4Tnm44XLDb5QI',
  authDomain: 'team4-carbon-calculator.firebaseapp.com',
  projectId: 'team4-carbon-calculator',
  storageBucket: 'team4-carbon-calculator.firebasestorage.app',
  messagingSenderId: '637912504620',
  appId: '1:637912504620:web:6b6d56d72a02d776ec7489',
  measurementId: 'G-BJEN9HE9Q0',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore(app)

// Initialize Analytics (only in browser environment)
let analytics = null
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app)
}

export { db, analytics }
export default app