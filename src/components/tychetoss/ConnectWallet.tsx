import { Network } from "@/constants/networkInfo";
import userSlice from "@/store/userSlice";
import { getWalletInfo, handleSwitchChain } from "@/utils/wallet";
import React, { useState } from "react";
import { FaWallet } from "react-icons/fa";
import { useAppDispatch } from '../../store/index';

const ConnectWallet = () => {
  const dispatch = useAppDispatch();

  const [isShow, setIsShow] = useState<boolean>(false);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(Network.polygon)

  const onClickOpenModal = () => {
    setIsShow(true);
    document.body.style.overflow = "hidden";
  }

  const onClickCloseModal = () => {
    document.body.style.overflow = "visible";
    setIsShow(false);
  }

  const onClickConnect = async () => {
    if (!window.ethereum) {
      alert('메타마스크를 까세요')
    } else {
      const ethereum = window.ethereum;
      await handleSwitchChain(ethereum, selectedNetwork);
      const { address, token, chainId } = await getWalletInfo(ethereum);
      dispatch(userSlice.actions.setUser({ address, token, chainId }));
    }
    onClickCloseModal();
  }

  return (
    <>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', border: '2px solid black', padding: '8px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '8px', background: '#fc6238', borderRadius: '7px' }}
        onClick={onClickOpenModal}>
        <FaWallet size={36} />
        <div>Connect Wallet</div>
      </div>
      {
        isShow &&
        <div style={{
          border: '1px solid black', width: '100vw', height: '100%', position: 'fixed', bottom: 0, left: 0, background: 'rgba(189, 190, 210, 0.25)', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}
          onClick={onClickCloseModal} >
          <div
            style={{ width: '330px', height: '240px', border: '2px solid red', backgroundColor: 'white', opacity: 1, display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ flex: 3 }}>
              <div>
                Wallet
              </div>
              <button>
                메타마스크
              </button>
              <div>Network</div>
              <button disabled>Ethereum Mainnet</button>
              <button disabled>Ethereum Goerli Testnet</button>
              <button onClick={() => setSelectedNetwork(Network.polygon)} style={{ background: selectedNetwork === Network.polygon ? 'purple' : 'none' }}>Polygon Mainnet</button>
              <button onClick={() => setSelectedNetwork(Network.mumbai)} style={{ background: selectedNetwork === Network.mumbai ? 'purple' : 'none' }}>Polygon Mumbai Testnet</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flex: 1, alignItems: 'center' }}>
              <button onClick={onClickConnect}>connect</button>
            </div>
          </div>
        </div>
      }
    </>
  )
};

export default ConnectWallet;
 // const permission = await ethereum.request({
      //   method: 'wallet_requestPermissions',
      //   params: [
      //     {
      //       eth_accounts: {}
      //     }
      //   ]
      // })
      // console.log(permission, "permission")