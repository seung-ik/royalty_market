import { ethers } from 'ethers';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store';
import userSlice from '@/store/userSlice';

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { address, token } = useAppSelector((state) => state.user);

  const onClick = async () => {
    if (!window.ethereum) {
      alert('메타마스크를 까세요')
    } else {
      const ethereum = window.ethereum;
      const provider = new ethers.BrowserProvider(ethereum);
      const _accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const _balance = await provider.getBalance(_accounts[0]);
      const eth = ethers.formatEther(_balance);
      dispatch(userSlice.actions.setUser({
        address: _accounts[0],
        token: eth
      }))
    }
  }

  return (
    <div>
      <button onClick={onClick}>지갑연결</button>
      <div>
        <div>{address}</div>
        <div>{token}</div>

      </div>
      <button onClick={() => router.push("/calendar")}>calendar</button>
    </div>

  )
}

