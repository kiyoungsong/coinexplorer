import React from "react";
import PropTypes from "prop-types";
import Loader from "../../Components/Loader";
import Price from "../../Components/Price";
import { useRequest } from "../../hooks/useRequest";

const Prices = () =>{
  const {loading, response: prices} = useRequest('prices');

  return (
    loading && 
    loading ? (
    <Loader />
  ) : (
    prices && 
    prices.map(price => <Price key={price.id} {...price} />)
  )
  );
}

Prices.propTypes = {
  loading: PropTypes.bool,
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      quotes: PropTypes.shape({
        USD: PropTypes.shape({
          price: PropTypes.number.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  )
};

export default Prices;
