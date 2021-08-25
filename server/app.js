const path = require('path');

const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 8001;
const DATA_URL = 'https://run.mocky.io/v3/05e9651d-528e-4d7c-a60b-bae8f09684c6';

const callApi = url =>
  new Promise((resolve, reject) => {
    request(url, { json: true }, (err, res, body) => {
      if (err) reject(err);
      resolve(body);
    });
  });

app.get('/fetchProducts', (req, res) => {
  callApi(DATA_URL)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.send(error);
    });
});

app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'products.json'));
});

app.listen(port, () => {
  console.log(`[products] API listening on port ${port}.`);
});
