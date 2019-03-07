const { Client } = require('pg');
const config = require('./config');

const client = new Client(config);

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected to postgres');
  }
});

module.exports = client;
