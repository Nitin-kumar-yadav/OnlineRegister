const http = require('http');

http.get('http://localhost:5000/api/register/60d5ecb74d6bb89283726521/entries/all', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log("Status:", res.statusCode);
    console.log("Data:", data);
  });
}).on('error', err => {
  console.log("Error:", err.message);
});
