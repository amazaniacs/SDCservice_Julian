# Product Advertisement Carousels

> This service aims to clone the visual and functional style of Amazon.com's
  product carousel modules. The key features to be created are:
  * Dynamic links to other products
  * Responsiveness to changing browser width, and mobile screens
  * Respond to button clicks to scroll through more items
  Stretch goals for this project are:
  * smooth animation on button click
  * rendering multiple kinds of carousels
  * SVG graphics for product ratings

## Related Projects

  - https://github.com/amazonians-110/add_to_cart-chris
  - https://github.com/amazonians-110/product-reviews-victor
  - https://github.com/amazonians-110/product-gallery-summary

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [RESTAPI](#RESTAPI)
4. [Development](#development)

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
Return a list of Sponsored Products
> GET /api/products

Response example
```js
Status: 200 OK
[
  {
    "product_id": 001,
    "name": "Backpack",
    "is_prime": true,
    "price": 10,
    "stars": 5,
  },
  {
    "product_id": 002,
    "name": "Black Shirt",
    "is_prime": true,
    "price": 10,
    "stars": 4,
  },
  {
    "product_id": 003,
    "name": "Full Metal Jacket",
    "is_prime": true,
    "price": 10,
    "stars": 0,
  },
]
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
  "product_id": 003,
  "name": "Full Metal Jacket",
  "is_prime": true,
  "price": 10,
}
```
Response example
```js
Status: 201 Created
[
  {
    "product_id": 001,
    "name": "Backpack",
    "is_prime": true,
    "price": 10,
    "stars": 5,
  },
  {
    "product_id": 002,
    "name": "Black Shirt",
    "is_prime": true,
    "price": 10,
    "stars": 4,
  },
  {
    "product_id": 003,
    "name": "Full Metal Jacket",
    "is_prime": true,
    "price": 10,
    "stars": 0,
  },
]
```
Errors
```js
Status: 400 badRequest
```
#### PUT
Update a product.
> PUT /api/products
```js
Status: 202 Accepted
[
  {
    "product_id": 001,
    "name": "Full Metal Jacket",
    "stars": 5,
    "price": 10,
    "is_prime": true,
  }
]
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
    "product_id": 001,
    "name": "camera"
}
```
Errors
```js
Status: 400 badRequest
Status: 404 notFound
```
## Development

### Installing Dependencies

none
