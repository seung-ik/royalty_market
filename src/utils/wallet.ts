import networks, { Network } from "@/constants/networkInfo";
import { ethers } from "ethers";

export const handleSwitchChain = async (_ethereum: any, _network: Network) => {
	try {
		await _ethereum.request({
			method: "wallet_switchEthereumChain",
			params: [{ chainId: networks[_network]["chainId"] }],
		});
	} catch (switchError: any) {
		if (switchError.code === 4902) {
			try {
				await _ethereum.request({
					method: "wallet_addEthereumChain",
					params: [networks[_network]],
				});
			} catch (addError) {
				console.error("Add new network FAILED", addError);
			}
		}
		console.error("Switch network FAILED", switchError);
	}
};

export const getWalletInfo = async (_ethereum: any, _account?: string) => {
	const provider = new ethers.BrowserProvider(_ethereum);
	const _chainId = await _ethereum.request({ method: "eth_chainId" });

	if (_account) {
		const _balance = await provider.getBalance(_account);
		const eth = ethers.formatEther(_balance);
		return { address: _account, token: eth, chainId: parseInt(_chainId, 16) };
	} else {
		await _ethereum.request({
			method: "wallet_requestPermissions",
			params: [
				{
					eth_accounts: {},
				},
			],
		});
		const _accounts = await _ethereum.request({ method: "eth_requestAccounts" });
		const _balance = await provider.getBalance(_accounts[0]);
		const eth = ethers.formatEther(_balance);
		return { address: _accounts[0], token: eth, chainId: parseInt(_chainId, 16) };
	}
};
