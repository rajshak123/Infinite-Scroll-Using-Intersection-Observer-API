import React from 'react';
import PropTypes from 'prop-types';

import Sort from '../Sort';

const ProductNumContainer = props => (
  <div className="shelf-container-header">
    <small className="products-found">
      <span>{props.productsLength} Product(s) found.</span>
    </small>
    <Sort />
  </div>
);

ProductNumContainer.propTypes = {
  productsLength: PropTypes.number.isRequired,
};

export default ProductNumContainer;
