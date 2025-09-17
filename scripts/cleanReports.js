const fs = require('fs-extra');
const path = 'cypress/reports';

if (fs.existsSync(path)) {
  fs.removeSync(path);
  console.log('🧹 Removed', path);
} else {
  console.log('No cypress/reports folder present.');
}