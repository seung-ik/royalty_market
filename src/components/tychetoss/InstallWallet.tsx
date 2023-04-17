import React from "react";
import { CgToolbox } from "react-icons/cg";

const InstallWallet = () => {
  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', border: '2px solid black', padding: '8px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '8px', background: '#fc6238', borderRadius: '7px' }}
      onClick={() => window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn')}>
      <CgToolbox size={36} />
      <div>Install wallet</div>
    </div>
  )
};

export default InstallWallet;
