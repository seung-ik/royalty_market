import React, { useEffect, useState } from "react";
import axios from 'axios';
import { addDays, format, subDays } from 'date-fns';
import GameItem from "@/components/tychetoss/GameItem";

export interface NBAEventType {
  id: string;
  completed: boolean;
  name: string;
  shortName: string;
  homeTeam: any;
  awayTeam: any;
}

const TycheToss = () => {
  const [date, setDate] = useState(new Date());
  const [gameList, setGameList] = useState([]);
  const normalizeGameInfo = (info: any): NBAEventType => {
    // console.log(info);
    const _info: NBAEventType = {
      id: info.id,
      completed: info.status.type.completed,
      name: info.name,
      shortName: info.shortName,
      homeTeam: info.competitions[0].competitors[0],
      awayTeam: info.competitions[0].competitors[1],
    };
    return _info;
  }
  useEffect(() => {
    axios.get(`http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=${format(date, 'yyyyMMdd')}`).then(({ data }) => {
      const _list = data.events.map((event: any) => normalizeGameInfo(event))
      setGameList(_list);
    });
  }, [date])

  return (
    <div style={{ borderLeft: '1px solid gray', borderRight: '2px solid black', maxWidth: '1040px', display: 'flex', flexDirection: 'column', margin: 'auto', minHeight: '100vh', padding: '24px' }}>
      <div style={{ display: 'flex', width: '300px', justifyContent: 'space-between' }}>
        <button>nba</button>
        <button>mlb</button>
      </div>
      <div style={{ display: 'flex', marginTop: '30px' }}>

        <button onClick={() => {
          const _date = subDays(date, 1);
          setDate(_date);
        }}>
          뒤로
        </button>
        <div>{format(date, 'MM/dd')}</div>
        <button onClick={() => {
          const _date = addDays(date, 1);
          setDate(_date);
        }}>앞으로</button>
      </div>
      <section style={{ marginTop: '40px' }}>
        <h1>경기일정</h1>
        <ul>
          {gameList.length === 0 && <div>일정이 없습니다.</div>}
          {gameList.map((game: any) => {
            return <GameItem key={game.id} {...game} />
          })}
        </ul>

      </section>
    </div >
  )
};

export default TycheToss;
