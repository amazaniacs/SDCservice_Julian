const fs = require('fs');
const faker = require('faker');

const catArr = [
  'electronics',
  'beauty',
  'outdoor',
  'wearables',
  'bath',
  'clothing',
  'board games',
  'food',
  'toys',
  'jewelery',
];

// generate data for i < n
function seed() {
  const grid = ['product_id, name, category, price, reviews, stars, is_prime, image_url \n'];
  for (let i = 1; i <= 10000000; i += 1) {
    const product_id = i;
    const name = `Amazon Product ${i}`;
    const category = catArr[i % 10];
    const price = faker.random.number({ min: 5, max: 200 });
    const reviews = faker.random.number({ min: 1, max: 200 });
    const stars = faker.random.number({ min: 0, max: 5 });
    const is_prime = faker.random.boolean();
    const image_url = faker.image.imageUrl(240, 240, 'technics');
    const linebreak = '\n';
    grid.push(`${product_id}, ${name}, ${category}, ${price}, ${reviews}, ${stars}, ${is_prime}, ${image_url} ${linebreak}`);
  }
  return grid;
}

// output to .csv file format
const data = seed().join('');
fs.writeFile('SDCpostgres.csv', data, 'utf8', (err) => {
  if (err) {
    throw err;
  }
  console.log('Successfully saved file');
});
