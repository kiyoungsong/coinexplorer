import React from "react";
import PropTypes from "prop-types";
import Loader from "../../Components/Loader";
import Market from "../../Components/Market";
import { useRequest } from "../../hooks/useRequest";

const Markets = ({match}) =>{
  const { params: { id } } = match;
  const { loading, response: markets } = useRequest('coinMarkets', id);

  return (
    loading &&
    loading ? (
      <Loader />
    ) : (
      markets &&
      markets
        .filter(market => market.market_url)
        .map((market, index) => (
          <Market
            key={market.id || index}
            url={market.market_url}
            name={market.exchange_name}
          />
        ))
    )

  );
}
  
Markets.propTypes = {
  loading: PropTypes.bool,
  markets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  )
};

export default Markets;
