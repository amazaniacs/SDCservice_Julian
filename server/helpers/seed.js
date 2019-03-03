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
function generateValues(i) {
  const columns = 'product_id, name, category, price, reviews, stars, is_prime, image_url\n';
  const product_id = i;
  const name = `Amazon Product ${i}`;
  const category = categories[i % 10];
  const price = faker.random.number({ min: 5, max: 200 });
  const reviews = faker.random.number({ min: 1, max: 200 });
  const stars = faker.random.number({ min: 0, max: 5 });
  const is_prime = faker.random.boolean();
  const image_url = faker.image.imageUrl(240, 240, 'technics');
  if (i === 1) {
    return `${columns}${product_id}, ${name}, ${category}, ${price}, ${reviews}, ${stars}, ${is_prime}, ${image_url}\n`;
  }
  return `${product_id}, ${name}, ${category}, ${price}, ${reviews}, ${stars}, ${is_prime}, ${image_url}\n`;
}

const stream = fs.createWriteStream('amazon-products.cvs');

function streamWriter(writer, encoding, callback) {
  let i = 1;
  function writeStream() {
    let ready = true;
    do {
      const data = generateValues(i);
      i += 1;
      if (i === 30000000) {
        writer.write(data, encoding, callback);
      } else {
        ready = writer.write(data, encoding);
      }
    } while (i <= 30000000 && ready);

    if (i <= 30000000) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', writeStream);
    }
  }
  writeStream();
}

streamWriter(stream, 'utf8', () => console.log('Streaming complete!'));
