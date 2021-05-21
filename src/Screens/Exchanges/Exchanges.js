import React from "react";
import PropTypes from "prop-types";
import Loader from "../../Components/Loader";
import Exchange from "../../Components/Exchange";
import { useRequest } from "../../hooks/useRequest";

const Exchanges = () =>{
  const {loading, response: exchanges} = useRequest('exchanges');

  return (
    loading &&
    loading ? (
      <Loader />
    ) : (
      exchanges &&
      exchanges.map((exchange) => <Exchange key={exchange.id} {...exchange} />)
    )
  );
}

Exchanges.propTypes = {
  loading: PropTypes.bool,
  exchanges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      links: PropTypes.shape({
        website: PropTypes.arrayOf(PropTypes.string.isRequired)
      })
    }).isRequired
  )
};

export default Exchanges;
