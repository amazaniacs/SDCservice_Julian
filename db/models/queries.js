const { Pool } = require('pg');
const config = require('../config.js');

const pool = new Pool(config);

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const relatedProducts = (id, cb) => {
  // callback - checkout a client
  pool.connect((err, client, done) => {
    if (err) throw err;
    const fetch = {
      name: 'fetch-products',
      text: `SELECT * FROM products WHERE category = (SELECT category FROM products WHERE product_id = ${id}) LIMIT 140;`,
    };
    client.query(fetch, (error, res) => {
      done();
      if (error) {
        cb(error);
      }
      cb(null, res.rows);
    });
  });
};

module.exports = { relatedProducts };
