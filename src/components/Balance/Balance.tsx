// wagmi
import { useBalance, useAccount } from "wagmi";

export default function Balance () {

	const { address } = useAccount();

    const result = useBalance({
			address: address,
			token: "0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97",
		});

		console.log("balance", result);
    
    return (
            <p>{result?.data?.formatted}</p>
		);
}