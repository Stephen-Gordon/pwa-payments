// Wagmi
import { erc20ABI, useWaitForTransaction, useAccount } from "wagmi";

// ZeroDev
import { usePrepareSendUserOperation, useSendUserOperation } from "@zerodev/wagmi";

// Viem
import { encodeFunctionData, parseUnits } from "viem";

export default function SendUsdc() {

	// Get the user's address hook
	const { address } = useAccount();
	
	// USDC contract address
	const usdc = "0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97"

	// Encode the data with Viem Function
	// Requires the abi of the contract, the function name, and the arguments address and amount
	const encoded = encodeFunctionData({
		abi: erc20ABI,
		functionName: "transfer",
		args: [!address ? "0xc8C26Ab40fe4723519fE66B8dBb625FC070A982c" : address, parseUnits("1", 6)],
	});	

	// Prepare the transaction with Wagmi
	const { config } = usePrepareSendUserOperation({
		to: usdc,
		data: encoded,
	});
	// Send the transaction with Wagmi
	const { sendUserOperation, data } = useSendUserOperation(config);

	// Wait for the transaction executed
	useWaitForTransaction({
		hash: data?.hash,
		enabled: !!data,
		onSuccess(data) {
			console.log("Transaction was successful.");
		},
	});

	// Send transaction function
	const sendTx = async () => {
		try {
			// check if the operation exists
			sendUserOperation && sendUserOperation();
		} catch (error) {
			console.log(error);
		}
	};
	
	return (
			<button
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				onClick={() => sendTx()}
			>
				Send USDC
			</button>
	);
}