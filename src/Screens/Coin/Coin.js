import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Route, Link, withRouter } from "react-router-dom";
import Loader from "../../Components/Loader";
import Markets from "../Markets";
import Exchanges from "../CoinExchanges";
import { useRequest } from "../../hooks/useRequest";

const Title = styled("h1")``;

const Description = styled("p")`
  margin: 30px 0px;
`;

const KeyValueRow = styled("div")`
  margin-bottom: 5px;
`;

const Key = styled("span")`
  font-weight: 600;
`;

const Value = styled("span")``;

const InsideMenu = styled("div")`
  margin: 20px 0px;
`;

const List = styled("ul")`
  display: flex;
`;

const Item = styled("li")`
  margin-right: 20px;
  text-transform: uppercase;
  font-weight: 600;
  border: 2px solid #1abc9c;
  padding: 5px;
  border-radius: 3px;
  background-color: ${props => (props.active ? "#1abc9c" : "transparent")};
  color: ${props => (props.active ? "white" : "black")};
`;

const Coin = withRouter(({ location: { pathname }}) => {
  const pathArray = pathname.split('/');
  const { loading, response:coin } = useRequest('coinDetail', pathArray[pathArray.length - 1]);
  return (
    loading && 
    loading ? 
    (
      <Loader />
    ) : 
    (
      coin && 
      <>
        <Title>
          {coin.name} / {coin.symbol}
        </Title>
        <Description>{coin.description}</Description>
        <KeyValueRow>
          <Key>Rank:</Key> <Value>{coin.rank}</Value>
        </KeyValueRow>
        <KeyValueRow>
          <Key>Open Source:</Key> <Value>{coin.open_source ? "Yes" : "No"}</Value>
        </KeyValueRow>
        <KeyValueRow>
          <Key>Proof Type:</Key> <Value>{coin.proof_type}</Value>
        </KeyValueRow>
        <KeyValueRow>
          <Key>Structure:</Key> <Value>{coin.org_structure}</Value>
        </KeyValueRow>
        <InsideMenu>
          <List>
            <Item active={pathname === `/coins/${coin.id}/markets`}>
              <Link to={`/coins/${coin.id}/markets`} id={coin.id}>Markets</Link>
            </Item>
            <Item active={pathname === `/coins/${coin.id}/exchanges`}>
              <Link to={`/coins/${coin.id}/exchanges`} id={coin.id}>Exchanges</Link>
            </Item>
          </List>
        </InsideMenu>
        <Route path="/coins/:id/markets" component={Markets} />
        <Route path="/coins/:id/exchanges" component={Exchanges} />
      </> 
    )
  );
});

Coin.propTypes = {
  loading: PropTypes.bool,
  coin: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
    open_source: PropTypes.bool.isRequired,
    proof_type: PropTypes.string.isRequired,
    org_structure: PropTypes.string.isRequired
  })
};

export default Coin;
