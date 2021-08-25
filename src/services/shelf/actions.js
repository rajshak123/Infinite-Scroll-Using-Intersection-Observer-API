import axios from 'axios';
import { FETCH_PRODUCTS } from './actionTypes';

import { productsAPI } from '../util';

const compare = {
  lowestprice: (a, b) => {
    if (a.price < b.price) return -1;
    if (a.price > b.price) return 1;
    return 0;
  },
  highestprice: (a, b) => {
    if (a.price > b.price) return -1;
    if (a.price < b.price) return 1;
    return 0;
  },
};

export const fetchProducts = (
  filters,
  sortBy,
  callback,
  productsParam,
) => dispatch => {
  if (productsParam.length) {
    let productsCopy = [];
    if (sortBy) {
      productsCopy = productsParam.sort(compare[sortBy]);
    }
    if (callback) {
      callback();
    }
    return dispatch({
      type: FETCH_PRODUCTS,
      payload: productsCopy,
    });
  }
  return axios
    .get(productsAPI)
    .then(res => {
      let { products } = res.data;

      if (!!filters && filters.length > 0) {
        products = products.filter(p =>
          filters.find(f => p.sizes.split(',').find(size => size === f)),
        );
      }

      if (sortBy) {
        products = products.sort(compare[sortBy]);
      }

      if (callback) {
        callback();
      }

      return dispatch({
        type: FETCH_PRODUCTS,
        payload: products,
      });
    })
    .catch(err => {
      console.log('Could not fetch products. Try again later.', err);
    });
};
