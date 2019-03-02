const { Client } = require('pg');
const config = require('../../config');

const client = new Client(config);

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
});

const convertSQLtoJS = (product) => {
  const jsProduct = { ...product };
  jsProduct.id = product.product_id;
  delete jsProduct.product_id;
  jsProduct.avgReview = product.avg_review;
  delete jsProduct.avg_review;
  jsProduct.reviewCount = product.review_count;
  delete jsProduct.review_count;
  jsProduct.isPrime = product.is_prime;
  delete jsProduct.is_prime;
  // delete old keys from product?
  return jsProduct;
};

const readRelationship = (req, res) => {
  const id = req.params.productId;
  fetchRelated(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(503).send(err);
    });
};

// const fetchRelated = (id) => {
//   const subquery = database.select('related_id').from('products_index')
//     .where('product_id', id);
//   return database('products')
//     .whereIn('product_id', subquery)
//     .then(data => data.map(product => convertSQLtoJS(product)))
//     .catch(err => console.log(err));
// };

module.exports = {
  fetchRelated,
};
