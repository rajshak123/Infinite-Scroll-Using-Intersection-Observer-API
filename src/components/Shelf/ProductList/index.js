import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';
import ScrollList from '../../../scroll/List';

const ProductList = ({ products }) => {
  const itemsRenderer = (items, ref) => (
    <ul className="list" ref={ref}>
      {items}
    </ul>
  );

  const itemRenderer = index => (
    <Product key={products[index].productId} product={products[index]} />
  );
  return (
    <ScrollList
      itemCount={products.length}
      itemsRenderer={itemsRenderer}
      renderItem={itemRenderer}
      pageSize={3}
    />
  );
};
ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;
