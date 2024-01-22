// wagmi
import { useBalance, useAccount } from "wagmi";

export default function Balance () {

	const { address } = useAccount();

    const result = useBalance({
        address: address,
    });
		console.log(result);
    
    return (
            <p>{result?.data?.formatted}</p>
		);
}