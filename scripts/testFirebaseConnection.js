// testFirebaseConnection.js
// Simple test to verify Firebase connection
// Run with: node testFirebaseConnection.js

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

console.log('🔍 Testing Firebase connection...\n');

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdsgqXRiAqtnbHU-UsHH4Tnm44XLDb5QI",
  authDomain: "team4-carbon-calculator.firebaseapp.com",
  projectId: "team4-carbon-calculator",
  storageBucket: "team4-carbon-calculator.firebasestorage.app",
  messagingSenderId: "637912504620",
  appId: "1:637912504620:web:6b6d56d72a02d776ec7489"
};

console.log('Step 1: Initializing Firebase...');
let app, db;

try {
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Firebase:', error.message);
  process.exit(1);
}

console.log('\nStep 2: Connecting to Firestore...');
try {
  db = getFirestore(app);
  console.log('✅ Firestore connected successfully');
} catch (error) {
  console.error('❌ Failed to connect to Firestore:', error.message);
  process.exit(1);
}

console.log('\nStep 3: Testing write operation...');
const testData = {
  test: true,
  message: "Hello from Team 4",
  timestamp: new Date().toISOString()
};

try {
  await setDoc(doc(db, 'test', 'connection'), testData);
  console.log('✅ Write successful!');
} catch (error) {
  console.error('❌ Write failed:', error.message);
  console.error('\n💡 Common issues:');
  console.error('   1. Firestore database not created in Firebase Console');
  console.error('   2. Security rules blocking writes');
  console.error('   3. Network/firewall issues');
  console.error('\n📋 Next steps:');
  console.error('   1. Go to https://console.firebase.google.com/project/team4-carbon-calculator/firestore');
  console.error('   2. Create Firestore database if it doesn\'t exist');
  console.error('   3. Set rules to "Test mode" for development');
  process.exit(1);
}

console.log('\nStep 4: Testing read operation...');
try {
  const docSnap = await getDoc(doc(db, 'test', 'connection'));
  if (docSnap.exists()) {
    console.log('✅ Read successful!');
    console.log('📄 Data:', docSnap.data());
  } else {
    console.log('⚠️  Document not found');
  }
} catch (error) {
  console.error('❌ Read failed:', error.message);
  process.exit(1);
}

console.log('\n═══════════════════════════════════════════════════');
console.log('🎉 SUCCESS! Firebase is working correctly!');
console.log('You can now run uploadDataToFirebase.js');
console.log('═══════════════════════════════════════════════════\n');

process.exit(0);