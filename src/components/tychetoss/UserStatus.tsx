import React from "react";
import { useAppSelector } from '../../store/index';
import InstallWallet from "./InstallWallet";
import ConnectedWallet from "./ConnectedWallet";
import ConnectWallet from "./ConnectWallet";

const UserStatus = () => {
  const userInfo = useAppSelector((state) => state.user);

  if (!window.ethereum) {
    return <InstallWallet />
  } else if (userInfo.address) {
    return <ConnectedWallet />
  } else {
    return <ConnectWallet />
  }

};

export default UserStatus;


