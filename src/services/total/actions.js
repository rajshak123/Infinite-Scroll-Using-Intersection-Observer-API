import { UPDATE_CART } from './actionTypes';

export const updateCart = cartProducts => dispatch => {
  const productQuantity = cartProducts.reduce((sum, p) => {
    let sCopy = sum;
    sCopy += p.quantity;
    return sCopy;
  }, 0);

  const totalPrice = cartProducts.reduce((sum, p) => {
    let sCopy = sum;
    sCopy += p.price * p.quantity;
    return sCopy;
  }, 0);

  const cartTotal = {
    productQuantity,
    totalPrice,
    currencyId: 'INR',
    currencyFormat: 'INR',
  };

  dispatch({
    type: UPDATE_CART,
    payload: cartTotal,
  });
};
