const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');

// uncommment if you are using MongoDB
// const mongoose = require('mongoose');
// const Product = require('../db/models/Products');
// mongoose.connect('mongodb://localhost:27017/sdc', { useNewUrlParser: true });

// uncomment if you are using PostgreSQL
const { Client } = require('pg');
const config = require('../db/postgresql/config.js');

const client = new Client(config);

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected to postgres');
  }
});

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(compression());
app.use(express.static(`${__dirname}/dist`));

// PostgreSQL routes
// GET method route
app.get('/postgres', (req, res) => {
  client.query('SELECT * FROM public.products LIMIT(3);', (err, data) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log('OKAY data');
      res.send(data).sendStatus(200);
    }
  });
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

// Mongo routes
// GET method route
// app.get('/mongoose', (req, res) => {
//   Product.find(
//     {
//       category: 'food',
//       is_sponsored: true,
//       reviews: {
//         $gte: 100,
//       },
//       stars: {
//         $gte: 2,
//       },
//     },
//   )
//     .limit(140)
//     .exec()
//     .then((docs) => {
//       res.send(docs).sendStatus(200);
//     })
//     .catch((err) => {
//       console.log('error catched');
//       res.send(err).sendStatus(400);
//     });
// });
// // POST method route
// app.post('/', (req, res) => {
//   res.send('POST request to the homepage');
// });
// // PUT method route
// app.put('/', (req, res) => {
//   res.send('PUT request to the homepage');
// });
// // DELETE method route
// app.delete('/', (req, res) => {
//   res.send('DELETE request to the homepage');
// });

// old code
// app.get('/api/bundle.js', (req, res) => {
//   res.sendFile(`${__dirname}/dist/bundle.js`);
// });
// app.get('/api/bundle', (req, res) => {
//   res.sendFile(`${__dirname}/dist/bundle.js`);
// });
// app.get('/products/:id', (req, res) => {
//   res.sendFile(`${__dirname}/dist/index.html`);
// });
// app.get('*', (req, res) => {
//   res.redirect('/products/1');
// });

// app.get('/api/products/:productId/', (req, res) => {
//   const id = req.params.productId;
//   db(id)
//     .then((data) => {
//       res.status(200).send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(503).send(err);
//     });
// });


app.listen(3007, console.log('listening to 3007'));
