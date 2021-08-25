/* eslint-disable no-param-reassign */
import { UPDATE_CART } from './actionTypes';

export const updateCart = cartProducts => dispatch => {
  const productQuantity = cartProducts.reduce((sum, p) => {
    sum += p.quantity;
    return sum;
  }, 0);

  const totalPrice = cartProducts.reduce((sum, p) => {
    sum += p.price * p.quantity;
    return sum;
  }, 0);

  const installments = cartProducts.reduce((greater, p) => {
    greater = p.installments > greater ? p.installments : greater;
    return greater;
  }, 0);

  const cartTotal = {
    productQuantity,
    installments,
    totalPrice,
    currencyId: 'INR',
    currencyFormat: 'INR',
  };

  dispatch({
    type: UPDATE_CART,
    payload: cartTotal,
  });
};
