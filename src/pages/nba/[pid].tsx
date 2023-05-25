import { useRouter } from "next/router";
import React, { useEffect } from "react";
import axios from 'axios';

const DetailPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  useEffect(() => {
    if (pid) {
      axios.get(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=${pid}`).then((data) => {
        console.log(data); // headers.competition.competiator 여기에 승자있음
      })
    }

    axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD').then((data) => console.log(data));
  }, [pid])

  return (
    <div style={{ borderLeft: '1px solid gray', borderRight: '2px solid black', maxWidth: '1040px', display: 'flex', flexDirection: 'column', margin: 'auto', minHeight: '100vh', padding: '24px' }}>
      <button onClick={() => router.back()}>뒤로</button>
      <div>{pid}</div>
    </div>
  )
};

export default DetailPage;
