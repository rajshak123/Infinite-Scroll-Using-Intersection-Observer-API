import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateSort } from '../../../services/sort/actions';
import Selectbox from '../../Selectbox';

const sortBy = [
  { value: '', label: 'Select' },
  { value: 'lowestprice', label: 'Lowest to highest' },
  { value: 'highestprice', label: 'Highest to lowest' },
];

// eslint-disable-next-line no-shadow
const Sort = ({ updateSort }) => (
  <div className="sort">
    Order by
    <Selectbox options={sortBy} handleOnChange={value => updateSort(value)} />
  </div>
);

Sort.propTypes = {
  updateSort: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sort: state.sort.type,
});

export default connect(
  mapStateToProps,
  { updateSort },
)(Sort);
