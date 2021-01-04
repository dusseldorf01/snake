const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.resolve(__dirname, 'dist');
const homeFile = `${publicDir}/index.html`;

app.use((req, res, next) => {
  res.set({
    'Content-Security-Policy': 'default-src *',
    'X-Content-Security-Policy': 'default-src *',
    'X-WebKit-CSP': 'default-src *',
  });
  next();
});

app.get('/:file', (req, res) => {
  let file = `${publicDir}/${req.params.file}`;
  if (!fs.existsSync(file)) {
    file = homeFile;
  }
  return res.sendFile(file);
});

app.use('/assets', express.static('dist/assets'));

app.get('/', (req, res) => {
  res.sendFile(homeFile);
});

app.listen(port, () => console.log(`listening on port ${port}!`));
