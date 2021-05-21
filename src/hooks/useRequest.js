import React, { useEffect, useState } from 'react'
import { 
  getPrices,
  getExchanges,
  getCoins,
  getCoinDetail,
  getCoinExchanges,
  getCoinMarkets
 } from "../api";

export const useRequest = (url, id="") => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const getDatas = async () => {
      setError(null); // 에러 null 처리
      try {
        setLoading(true); // 로딩중
        let data;
        switch(url){
          case 'prices':
            data = await getPrices();
            break;
          case 'exchanges':
            data = await getExchanges();
            break;
          case 'coins':
            data = await getCoins();
            break;
          case 'coinDetail':
            data = await getCoinDetail(id);
            break;
          case 'coinExchanges':
            data = await getCoinExchanges(id);
            break;
          case 'coinMarkets':
            data = await getCoinMarkets(id);
            break;
          default:
            break;
        }
        setResponse(data.data); // response 설정
      } catch (e) {
        setError(e); // error 설정
      }
      setLoading(false); // 로딩 끝
    }

    useEffect(() => {
      getDatas();
    }, [url])

    return {loading, response, error};
}