import { Network } from "@/constants/networkInfo";

export function parseChainId(_id: number): string | boolean {
	switch (_id) {
		case 1:
			return Network.ethereum;
		case 5:
			return Network.goerli;
		case 56:
			return Network.bnb;
		case 137:
			return Network.polygon;
		case 80001:
			return Network.mumbai;
		default:
			return false;
	}
}
