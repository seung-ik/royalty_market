import { ethers } from 'ethers';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [account, setAccount] = useState<string>();
  const [balance, setBalance] = useState<string>();

  const onClick = async () => {
    if (!window.ethereum) {
      alert('메타마스크를 까세요')
    } else {
      const ethereum = window.ethereum;
      const provider = new ethers.BrowserProvider(ethereum);
      const _accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const _balance = await provider.getBalance(_accounts[0]);
      const eth = ethers.formatEther(_balance);
      setAccount(_accounts[0]);
      setBalance(eth);
    }
  }

  return (
    <div>
      <button onClick={onClick}>지갑연결</button>
      <div>{account}</div>
      <div>{balance}</div>
      <button onClick={() => router.push("/calendar")}>calendar</button>
    </div>

  )
}
