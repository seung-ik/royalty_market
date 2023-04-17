interface NetworkItem {
	chainId: string;
	chainName: string;
	nativeCurrency: {
		name: string;
		symbol: string;
		decimals: number;
	};
	rpcUrls: string[];
	blockExplorerUrls: string[];
}

export enum Network {
	ethereum = "Ethereum Mainnet",
	goerli = "Ethereum Goerli Testnet",
	bnb = "Binance Smart Chain Mainnet",
	polygon = "Polygon Mainnet",
	mumbai = "Polygon Mumbai Testnet",
}

type NetworksGroupType = {
	[key in Network]: NetworkItem;
};

export const networks: NetworksGroupType = {
	"Polygon Mainnet": {
		chainId: `0x${Number(137).toString(16)}`,
		chainName: "Polygon Mainnet",
		nativeCurrency: {
			name: "MATIC",
			symbol: "MATIC",
			decimals: 18,
		},
		rpcUrls: ["https://polygon-rpc.com/"],
		blockExplorerUrls: ["https://polygonscan.com/"],
	},
	"Polygon Mumbai Testnet": {
		chainId: `0x${Number(80001).toString(16)}`,
		chainName: "Polygon Testnet Mumbai",
		nativeCurrency: {
			name: "MATIC",
			symbol: "MATIC",
			decimals: 18,
		},
		rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
		blockExplorerUrls: ["https://mumbai.polygonscan.com"],
	},
	"Ethereum Goerli Testnet": {
		chainId: `0x${Number(5).toString(16)}`,
		chainName: "Ethereum Testnet Goerli",
		nativeCurrency: {
			name: "GoerliETH",
			symbol: "GoerliETH",
			decimals: 18,
		},
		rpcUrls: ["https://goerli.infura.io/v3/"],
		blockExplorerUrls: ["https://goerli.etherscan.io"],
	},
	"Ethereum Mainnet": {
		chainId: `0x${Number(1).toString(16)}`,
		chainName: "Ethereum Mainnet",
		nativeCurrency: {
			name: "Ether",
			symbol: "ETH",
			decimals: 18,
		},
		rpcUrls: ["https://mainnet.infura.io/v3/"],
		blockExplorerUrls: ["https://etherscan.io"],
	},
	"Binance Smart Chain Mainnet": {
		chainId: `0x${Number(56).toString(16)}`,
		chainName: "Binance Smart Chain Mainnet",
		nativeCurrency: {
			name: "BNB",
			symbol: "BNB",
			decimals: 18,
		},
		rpcUrls: ["https://bsc-dataseed.binance.org/"],
		blockExplorerUrls: ["https://bscscan.com/"],
	},
};

export default networks;
