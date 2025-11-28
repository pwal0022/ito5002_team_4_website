const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const { writeFileSync } = require('fs');

const firebaseConfig = {
  apiKey: "AIzaSyCdsgqXRiAqtnbHU-UsHH4Tnm44XLDb5QI",
  authDomain: "team4-carbon-calculator.firebaseapp.com",
  projectId: "team4-carbon-calculator",
  storageBucket: "team4-carbon-calculator.firebasestorage.app",
  messagingSenderId: "637912504620",
  appId: "1:637912504620:web:6b6d56d72a02d776ec7489"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function exportData() {
  const collections = ['evData', 'solarData', 'householdData'];
  const data = {};

  for (const colName of collections) {
    data[colName] = {};
    try {
      const snapshot = await getDocs(collection(db, colName));
      snapshot.forEach(doc => {
        data[colName][doc.id] = doc.data();
      });
      console.log(`✅ Exported ${colName}`);
    } catch (e) {
      console.log(`❌ Error with ${colName}:`, e.message);
    }
  }

  writeFileSync('firestore-export.json', JSON.stringify(data, null, 2));
  console.log('✅ Saved to firestore-export.json');
  process.exit(0);
}

exportData();