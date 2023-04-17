import { NBAEventType } from "@/pages/tychetoss";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ScoreBoard from "./ScoreBoard";


const GameItem: React.FC<NBAEventType> = (props) => {
  const { shortName, name, completed, homeTeam, awayTeam, id } = props;
  const router = useRouter();
  const [active, setActive] = useState<boolean>(false);
  return (
    <div
      style={{ border: '1px solid red', height: 'auto', padding: '8px', marginBottom: '20px' }}
      onClick={() => setActive(prev => !prev)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ minWidth: '300px' }}>{name}</div>
        <div>isCompleted: {completed ? 'O' : 'X'}</div>
      </div>
      {active && (
        <section style={{ marginTop: '20px' }} onClick={(e) => e.stopPropagation()}>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
            <ScoreBoard isHome info={homeTeam} />
            <div style={{ display: 'flex', alignItems: 'center', margin: '0 30px', fontSize: '60px' }}>:</div>
            <ScoreBoard isHome={false} info={awayTeam} />
          </div>
          <button>enroll</button>
          <button onClick={() => router.push(`/nba/${id}`)}>betting</button>
        </section>
      )}
    </div >
  )
};

export default GameItem;
