const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const pathName = path.join(__dirname, 'dist/index.html');

app.use(express.static('dist'));

app.get('/*', (req, res) => {
  res.sendFile(pathName);
});

app.listen(PORT, () => {
  console.log(`Heylynx messenger listening on port ${PORT}`);
});
