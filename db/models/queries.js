const { Client } = require('pg');
const config = require('../config.js');

const client = new Client(config);
client.connect();

const relatedProducts = (id, cb) => {
  console.log('HIT DATABASE!!');
  client.query(`SELECT * FROM products WHERE category = (SELECT category FROM products WHERE product_id = ${id}) LIMIT 140;`, (error, results) => {
    if (error) {
      cb(error);
    }
    cb(null, results);
  });
};

module.exports = { relatedProducts };
