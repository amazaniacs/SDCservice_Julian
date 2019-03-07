const fs = require('fs');
const faker = require('faker');

const categories = [
  'electronics',
  'beauty',
  'outdoor',
  'wearables',
  'bath',
  'clothing',
  'board games',
  'food',
  'toys',
  'jewelry',
];

// generate data
// table columns product_id, name, category, price, reviews, stars, is_prime, is_sponsored, image_url
function generateValues(i) {
  const product_id = i;
  const name = `Amazon Product ${i}`;
  const category = categories[i % 10];
  const price = faker.random.number({ min: 5, max: 200 });
  const reviews = faker.random.number({ min: 1, max: 200 });
  const stars = faker.random.number({ min: 0, max: 5 });
  const is_prime = faker.random.boolean();
  const is_sponsored = faker.random.boolean();
  const image_url = faker.image.imageUrl(240, 240, 'technics');
  return `${product_id},${name},${category},${price},${reviews},${stars},${is_prime},${is_sponsored},${image_url}\n`;
}

const stream = fs.createWriteStream('products.csv');

function streamWriter(writer, encoding, callback) {
  let i = 1;
  function writeStream() {
    let ready = true;
    do {
      const data = generateValues(i);
      i += 1;
      if (i === 10000000) {
        writer.write(data, encoding, callback);
      } else {
        ready = writer.write(data, encoding);
      }
    } while (i <= 10000000 && ready);

    if (i <= 10000000) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', writeStream);
    }
  }
  writeStream();
}

streamWriter(stream, 'utf8', () => console.log('Streaming complete!'));
