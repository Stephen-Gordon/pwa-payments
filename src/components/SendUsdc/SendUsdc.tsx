import { useContractWrite, usePrepareContractWrite, erc20ABI } from 'wagmi'
import { parseEther } from "viem";

export default function SendUsdc () {
	const { config } = usePrepareContractWrite({
		//usdc
		address: "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23",
		abi: erc20ABI,
		functionName: "transfer",
		args: ["0xc8C26Ab40fe4723519fE66B8dBb625FC070A982c", parseEther("0.03")],
	});

	// get the transfer function
	const { data, isLoading, isSuccess, write } = useContractWrite(config);

	if (isLoading) {
		return <p>Waiting for confirmations on your wallet...</p>;
	}

	if (isSuccess) {
		return <p>Transaction was sent! Waiting for it to complete</p>;
	}

	const { config: configWrite } = usePrepareContractWrite({
		address: "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23", //Goerli USDC contract address
		abi: erc20ABI, //Standard ERC-20 ABI https://www.quicknode.com/guides/smart-contract-development/what-is-an-abi
		functionName: "transfer", //We're going to use the tranfer method provided in the ABI, here's an example of a standard transfer method https://docs.ethers.io/v5/single-page/#/v5/api/contract/example/
		args: ["0xc8C26Ab40fe4723519fE66B8dBb625FC070A982c", parseEther("0.03")], //[receiver, amount] Note that the units to parse are six because that's the number of decimals set for USDC in its contract. In order to add another token with a different amount of decimals its necessary to add additional logic here for it to work.
	});
	const { data: dataWrite, write } = useContractWrite(configWrite);

	//https://wagmi.sh/docs/hooks/useSendTransaction
	const { data, sendTransaction } = useSendTransaction(config);

	//Wait for payment to be completed https://wagmi.sh/docs/hooks/useWaitForTransaction
	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash || dataWrite?.hash, //transaction hash
	});
	return (
		<div>
			<button
				disabled={isLoading || isSuccess}
				onClick={sendTransaction}
			></button>
		</div>
	);
}