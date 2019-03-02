const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const { fetchRelated } = require('./server/controllers/database.js');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(compression());
app.use(express.static(`${__dirname}/dist`));

app.get('/api/bundle.js', (req, res) => {
  res.sendFile(`${__dirname}/dist/bundle.js`);
});
app.get('/api/bundle', (req, res) => {
  res.sendFile(`${__dirname}/dist/bundle.js`);
});
app.get('/products/:id', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});
app.get('*', (req, res) => {
  res.redirect('/products/1');
});

app.get('/api/products/:productId/', (req, res) => {
  const id = req.params.productId;
  fetchRelated(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(503).send(err);
    });
});

// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage');
});

// PUT method route
app.put('/', (req, res) => {
  res.send('PUT request to the homepage');
});

// DELETE method route
app.delete('/', (req, res) => {
  res.send('DELETE request to the homepage');
});

app.listen(3007, console.log('listening to 3007'));
