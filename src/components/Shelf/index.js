/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchProducts } from '../../services/shelf/actions';

import Spinner from '../Spinner';
import Sort from './Sort';
import ProductList from './ProductList';

import './style.scss';

class ProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.handleFetchProducts();
  }

  componentWillReceiveProps(nextProps) {
    const { filters: nextFilters, sort: nextSort } = nextProps;
    const { filters } = this.props;
    if (nextFilters.length !== filters.length) {
      this.handleFetchProducts(nextFilters, undefined);
    }

    if (nextSort !== this.props.sort) {
      this.handleFetchProducts(undefined, nextSort);
    }
  }

  handleFetchProducts = (
    filters = this.props.filters,
    sort = this.props.sort,
  ) => {
    this.setState({ isLoading: true });
    this.props.fetchProducts(
      filters,
      sort,
      () => {
        this.setState({ isLoading: false });
      },
      this.props.products,
    );
  };

  openFloatCart = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const { products } = this.props;
    const { isLoading } = this.state;

    return (
      <React.Fragment>
        {isLoading && <Spinner />}
        <div className="shelf-container">
          <div className="shelf-container-header">
            <Sort />
            <span
              onClick={() => this.openFloatCart()}
              className="bag bag--float-cart-closed"
            />
          </div>

          {!isLoading && products.length && <ProductList products={products} />}
        </div>
      </React.Fragment>
    );
  }
}
ProductContainer.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  filters: PropTypes.array,
  sort: PropTypes.string,
  history: PropTypes.object,
};
const mapStateToProps = state => ({
  products: state.shelf.products,
  filters: state.filters.items,
  sort: state.sort.type,
});

export default connect(
  mapStateToProps,
  { fetchProducts },
)(ProductContainer);
