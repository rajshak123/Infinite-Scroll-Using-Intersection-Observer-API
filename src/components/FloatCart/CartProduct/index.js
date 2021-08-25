/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Thumb from '../../Thumb';
import { formatPrice } from '../../../services/util';

class CartProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      isMouseOver: false,
    };
  }

  handleMouseOver = () => {
    this.setState({ isMouseOver: true });
  };

  handleMouseOut = () => {
    this.setState({ isMouseOver: false });
  };

  handleOnIncrease = () => {
    const { changeProductQuantity } = this.props;
    const { product } = this.state;
    product.quantity += 1;
    changeProductQuantity(product);
  };

  handleOnDecrease = () => {
    const { changeProductQuantity } = this.props;
    const { product } = this.state;
    product.quantity -= 1;
    changeProductQuantity(product);
  };

  render() {
    const { removeProduct } = this.props;
    const { product } = this.state;

    const classes = ['shelf-item'];

    if (this.state.isMouseOver) {
      classes.push('shelf-item--mouseover');
    }

    return (
      <div className={classes.join(' ')}>
        <div
          className="shelf-item__del"
          onMouseOver={() => this.handleMouseOver()}
          onFocus={() => this.handleMouseOver()}
          onMouseOut={() => this.handleMouseOut()}
          onBlur={() => this.handleMouseOut()}
          onClick={() => removeProduct(product)}
        />
        <Thumb
          classes="shelf-item__thumb"
          src={product.searchImage}
          alt={product.title}
        />
        <div className="shelf-item__details">
          <p className="title">{product.title}</p>
        </div>
        <div className="shelf-item__price">
          <p>{`₹ ${formatPrice(product.price)}`}</p>
          <div>
            <button
              onClick={this.handleOnDecrease}
              disabled={product.quantity === 1}
              className="change-product-button"
            >
              -
            </button>
            <button
              onClick={this.handleOnIncrease}
              className="change-product-button"
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  }
}
CartProduct.propTypes = {
  product: PropTypes.object.isRequired,
  removeProduct: PropTypes.func.isRequired,
  changeProductQuantity: PropTypes.func.isRequired,
};
export default CartProduct;
