import React from "react";
import PropTypes from "prop-types";
import Loader from "../../Components/Loader";
import Coin from '../../Components/Coin'
import { useRequest } from '../../hooks/useRequest'

const Coins = () => {
  const {loading, response: coins} = useRequest('coins');
  return (
    loading && 
    loading ? (
      <Loader />
    ) : (
      coins && 
      coins
        .filter(coin => coin.rank !== 0)
        .sort((first, second) => first.rank - second.rank)
        .map(coin => <Coin key={coin.id} {...coin} />)
    )
  );
}

Coins.propTypes = {
  loading: PropTypes.bool,
  coins: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      rank: PropTypes.number.isRequired
    }).isRequired
  )
};

export default Coins;
