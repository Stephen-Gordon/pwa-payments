// Next
import { useRouter } from "next/router";
import { Alchemy, Network } from "alchemy-sdk";

import { useAccount } from "wagmi";
import SendUsdc from "../../components/SendUsdc/SendUsdc";


const config = {
	apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
	network: Network.MATIC_MUMBAI,
};
const alchemy = new Alchemy(config);



export default function Page() {

	const { address } = useAccount();
	console.log(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);

	const getData = async () => {
		const data = await alchemy.core.getAssetTransfers({
			fromBlock: "0x0",
			fromAddress: address,
			category: ["erc20", "internal", "erc721"],
		});
		console.log(data);
	}


	


    const router = useRouter();
		//const { address } = router.query;

    return (
			<>
				<h1>Send Page</h1>
				<p>Route address: {address}</p>
				<button onClick={getData} >get data</button>

				<div className="mt-20">
					<SendUsdc/>
				</div>
			</>
		);
}