# Product Advertisement Carousels

  product carousel modules. The key features to be created are:
  * Dynamic links to other products
  * Responsiveness to changing browser width, and mobile screens
  * Respond to button clicks to scroll through more items
  Stretch goals for this project are:
  * smooth animation on button click
  * rendering multiple kinds of carousels
  * SVG graphics for product ratings

## Related Projects

  - https://github.com/amazaniacs/SDCservice_TD
  - https://github.com/amazaniacs/SDCservice_Tim
  - https://github.com/amazaniacs/SDCservice_Matt

## Table of Contents

1. [Usage](#usage)
2. [Requirements](#requirements)
3. [RESTAPI](#restapi)
4. [Property Representation](#propertyrepresentation)

## Usage

> To run this code on your computer you will need to:
  0) create a config.js file in root directory
  1) run 'npm i' from the command line
  2) run 'npm start

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- npm 6.4.1


## REST API

#### READ
Return a list of the top 100 highest rated Sponsored Products
> GET /api/products

Response example
```js
Status: 200 OK
[
  {
    "product_id": 1,
    "name": "Amazon Product 1",
    "price": 88,
    "reviews": 161,
    "stars": 1,
    "is_prime": true,
    "image_url": "http://lorempixel.com/240/240/technics"
  },
  {
    "product_id": 2,
    "name": "Amazon Product 2",
    "price": 159,
    "reviews": 111,
    "stars": 3,
    "is_prime": true,
    "image_url": "http://lorempixel.com/240/240/technics"
  },
  ...
  {
    "product_id": 100,
    "name": "Amazon Product 3",
    "price": 50,
    "reviews": 63,
    "stars": 2,
    "is_prime": false,
    "image_url": "http://lorempixel.com/240/240/technics"
  }
]
```

Giving a parameter, return a single product.
> GET /api/products/:id

- id: number

Response example

```js
Status: 200 OK
{
  "product_id": 2,
  "name": "Amazon Product 2",
  "price": 159,
  "reviews": 111,
  "stars": 3,
  "is_prime": true,
  "image_url": "http://lorempixel.com/240/240/technics"
}
```

Errors
```js
Status: 400 badRequest
Status: 404 notFound
```


#### CREATE
Insert a new product.
> POST /api/products

Input Example
```js
{
  "product_id": 2,
  "name": "Amazon Product 2",
  "price": 159,
  "reviews": 111,
  "stars": 3,
  "is_prime": true,
  "image_url": "http://lorempixel.com/240/240/technics"
}
```
Response example
```js
Status: 201 Created
```
Errors
```js
Status: 400 badRequest
```


#### PUT
Given a parameter, update a product.
> PUT /api/products/:id

- id: number
```js
Status: 202 Accepted
{
  "product_id": 50,
  "name": "Amazon Product 50",
  "price": 99,
  "reviews": 11,
  "stars": 3,
  "is_prime": true,
  "image_url": "http://lorempixel.com/240/240/technics"
}
```
Errors
```js
Status: 400 badRequest
Status: 404 notFound
```
#### DELETE

Delete a single entry

> DELETE /api/products/:id/:name

the :id and :name of the product to be deleted.

```js
Status: 204 No Content
{
  "product_id": 2,
  "name": "Amazon Product 2"
}
```

Errors
```js
Status: 400 badRequest
Status: 404 notFound
```
## Property Representation

The following table defines the properties that appear in this resource:

| Properties | Typeof |
|:--|:--|
| product_id | number |
| name | string |
| price | number |
| reviews | number |
| stars | number |
| is_prime | boolean |
| image_url | string |
