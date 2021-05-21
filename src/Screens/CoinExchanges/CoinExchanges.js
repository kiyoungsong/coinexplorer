import React from "react";
import PropTypes from "prop-types";
import Loader from "../../Components/Loader";
import Exchange from "../../Components/CoinExchange";
import { useRequest } from "../../hooks/useRequest";

const CoinExchanges = ({match}) => {
  const { params: { id } } = match;
  const {loading, response: exchanges} = useRequest('coinExchanges', id);
  return (
    loading && 
    loading ? (
      <Loader />
    ) : (
      exchanges && 
      exchanges
        .filter(exchange => exchange.fiats.length > 0)
        .map(exchange => <Exchange key={exchange.id} {...exchange} />)
    )
  );
}
  

CoinExchanges.propTypes = {
  loading: PropTypes.bool,
  exchanges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      adjusted_volume_24h_share: PropTypes.number,
      fiats: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          symbol: PropTypes.string
        })
      )
    })
  )
};

export default CoinExchanges;
