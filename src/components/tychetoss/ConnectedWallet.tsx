import { useAppDispatch, useAppSelector } from "@/store";
import userSlice from "@/store/userSlice";
import { parseChainId } from "@/utils/parser";
import React, { useEffect, useState } from "react";
import { RiArrowRightDownLine } from "react-icons/ri";
import { ethereum } from '../../../@types/index.d';
import { Network } from '@/constants/networkInfo';
import { getWalletInfo } from "@/utils/wallet";

const ConnectedWallet = () => {
  const [isSmall, setIsSmall] = useState<boolean>(false);
  const userInfo = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  //TODO: 메타마스크에서 이벤트도 받아서 처리해줘야함.
  const onClickDisconnect = () => {
    dispatch(userSlice.actions.reset());
    // ethereum.send('wallet_requestPermissions', [{ eth_accounts: {} }])
    // localStorage.removeItem('_user');
    // localStorage.removeItem('_wallet');
    // setTimeout(() => window.location.reload(), 1500);
  }


  useEffect(() => {
    const handleNetworkChanged = async (chainId: string) => {
      const network = parseChainId(parseInt(chainId, 16));
      if (!network) {
        alert('지원하지않는 체인입니다.')
        dispatch(userSlice.actions.reset());
      } else {
        const { address, token, chainId } = await getWalletInfo(ethereum);
        dispatch(userSlice.actions.setUser({ address, token, chainId }));
      }
    }
    const handleAccountChange = async (_accounts: string[]) => {
      const { address, token, chainId } = await getWalletInfo(ethereum, _accounts[0]);
      dispatch(userSlice.actions.setUser({ address, token, chainId }));
    }

    ethereum.on('chainChanged', handleNetworkChanged);
    ethereum.on('accountsChanged', handleAccountChange);
    return () => {
      ethereum.removeListener('chainChanged', handleNetworkChanged);
      ethereum.removeListener('accountsChanged', handleAccountChange);
    }
  }, [dispatch])

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', border: '2px solid black', background: '#3C3C3D', borderRadius: '7px', color: 'white', padding: '8px 20px' }}
    >
      {isSmall ?
        <div style={{ cursor: 'pointer' }} onClick={() => setIsSmall(prev => !prev)}>Connected Info</div>
        :
        <div style={{ width: "100%", height: '100%', display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>

          <div>{parseChainId(userInfo.chainId)}</div>
          <div>Address: {userInfo.address}</div>
          <div>Balance: {userInfo.token}</div>
          <div
            style={{ position: 'absolute', bottom: '-8px', right: '-20px', paddingLeft: '18px', paddingTop: '8px', cursor: 'pointer' }}
            onClick={() => setIsSmall(prev => !prev)}
          >
            <RiArrowRightDownLine size={20} />
          </div>
          <div>

            <button onClick={onClickDisconnect}>Disconnect</button>
          </div>
        </div>
      }
    </div>
  )
};

export default ConnectedWallet;
