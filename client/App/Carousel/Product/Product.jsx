import React from 'react';
// import propTypes from 'prop-types';
import product from './Product.css';
import Rating from './Rating/Rating.jsx';

const primeSprite = 'https://res.cloudinary.com/dcywbu46z/image/upload/h_20,f_auto/v1550951658/amazon-FEC/prime.png';

const Product = ({ product: { product_id, name, price, is_prime, reviews, image_url } }) => (
  <div className={product.column}>
    <a href={`/${product_id}`}>
      <div className={product.ad_image}>
        <div style={{ background: `url(${image_url}`, backgroundSize: 'cover', height: '160px' }} alt="product was here" />
      </div>
    </a>
    <a href={`/${product_id}`} className={product.name}>{name}</a>
    <div className={product.row}>
      <Rating avgReview={3} />
      <span className={product.review_count}>
        {reviews}
      </span>
    </div>
    <div className={product.row}>
      <span className={product.price}>{`$${price}`}</span>
      <span>
        {is_prime === true
          ? <img className={product.prime} src={primeSprite} alt="" />
          : null}
      </span>
    </div>
  </div>
);

// Product.propTypes = {
//   product: propTypes.shape({
//     id: propTypes.number.isRequired,
//     name: propTypes.string.isRequired,
//     avgReview: propTypes.string.isRequired,
//     price: propTypes.string.isRequired,
//     is_prime: propTypes.bool.isRequired,
//     reviews: propTypes.number.isRequired,
//     category: propTypes.string.isRequired,
//   }).isRequired,
// };

export default Product;
