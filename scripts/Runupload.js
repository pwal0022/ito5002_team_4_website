// runUpload.js
// Simple runner script for uploadDataToFirebase.js
// Usage: node runUpload.js

import { uploadAllData } from './uploadDataToFirebase.js';

console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log('  Australian Household Carbon Calculator - Data Upload');
console.log('  ITO5002-TP6-25 Team 4');
console.log('═══════════════════════════════════════════════════════════');
console.log('');

uploadAllData()
  .then((result) => {
    console.log('');
    console.log('✓ Upload process completed!');
    console.log('');
    if (result && result.totalSuccess) {
      console.log(`✅ Successfully uploaded ${result.totalSuccess} documents`);
    }
    if (result && result.totalFail > 0) {
      console.log(`⚠️  ${result.totalFail} uploads failed`);
    }
    console.log('');
    process.exit(result && result.success ? 0 : 1);
  })
  .catch((error) => {
    console.error('');
    console.error('✗ Upload process failed:', error.message);
    console.error('');
    process.exit(1);
  });