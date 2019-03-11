require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const { relatedProducts } = require('../db/models/queries.js');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));

app.use(express.static(path.resolve(__dirname, '../public')));

// GET method
app.get('/products/:productId', (req, res) => {
  const id = req.params.productId;
  relatedProducts(id, (err, data) => {
    if (err) {
      console.log(err);
      res.status(404).send();
    }
    res.send(data);
  });
});
// redirect
app.get('/:productId', (req, res) => {
  const id = req.params.productId;
  res.redirect(`/index.html?productID=${id}`);
});
// POST method
app.post('/', (req, res) => {
  res.send('POST request to the homepage');
});
// PUT method
app.put('/', (req, res) => {
  res.send('PUT request to the homepage');
});
// DELETE method
app.delete('/', (req, res) => {
  res.send('DELETE request to the homepage');
});

app.listen(3004, console.log('listening to 3004'));
