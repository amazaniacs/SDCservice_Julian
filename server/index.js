const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// const compression = require('compression');

const { relatedProducts } = require('../db/models/queries.js');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../public')));
// app.use(compression());

// GET method
app.get('/products/:productId', (req, res) => {
  const id = req.params.productId;
  relatedProducts(id, (err, data) => {
    if (err) {
      return err;
    }
    console.log('OKAY data');
    res.send(data.rows);
  });
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

app.listen(3007, console.log('listening to 3007'));
