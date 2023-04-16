import React from "react";
import Image from "next/image";

interface Props {
  isHome: boolean;
  info: any;
}
const ScoreBoard: React.FC<Props> = ({ isHome, info }) => {
  if (isHome) {
    return (
      <div style={{ display: 'flex', minWidth: '300px', gap: '30px' }}>
        <Image src={info.team.logo} alt="aa" width={120} height={120} style={{ objectFit: 'contain', flex: 1 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontSize: '30px' }}>Home</div>
          <div>{info.team.displayName}</div>
          <div style={{ fontSize: '24px' }}>{info.score}</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', minWidth: '300px', gap: '30px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: '30px' }}>Away</div>
        <div>{info.team.displayName}</div>
        <div style={{ fontSize: '24px' }}>{info.score}</div>
      </div>
      <Image src={info.team.logo} alt="aa" width={120} height={120} style={{ objectFit: 'contain', flex: 1 }} />
    </div>
  )
};

export default ScoreBoard;
