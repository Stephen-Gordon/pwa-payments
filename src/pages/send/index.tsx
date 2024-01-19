// Next
import { useRouter } from "next/router";
import { Alchemy, Network } from "alchemy-sdk";

import { useAccount } from "wagmi";


const config = {
	apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
	network: Network.MATIC_MUMBAI,
};
const alchemy = new Alchemy(config);



export default function Page() {

	const { address } = useAccount();

	const getData = async () => {
		const data = await alchemy.core.getAssetTransfers({
			fromBlock: "0x0",
			fromAddress: address,
			category: ["internal"],
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
			</>
		);
}