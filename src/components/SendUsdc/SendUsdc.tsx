import { useContractWrite, usePrepareContractWrite, erc20ABI } from 'wagmi'
import { useContractBatchWrite, usePrepareContractBatchWrite } from '@zerodev/wagmi';
import { parseEther, parseUnits } from "viem";

import { usePrepareSendUserOperation, useSendUserOperation } from "@zerodev/wagmi";
import { useWaitForTransaction, useAccount } from "wagmi";

import { encodeFunctionData, parseAbi } from 'viem';

//const contractABI = parseAbi();
export default function SendUsdc() {

	const address = "0xc8C26Ab40fe4723519fE66B8dBb625FC070A982c";

	const usdc = "0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97"
/* 
	const { config } = usePrepareContractBatchWrite({
		calls: [
			{
				address: usdc,
				abi: erc20ABI,
				functionName: "approve",
				args: ['0xc8C26Ab40fe4723519fE66B8dBb625FC070A982c', parseUnits('100', 6)],
			}, {
				address: usdc,
				abi: erc20ABI,
				functionName: "transfer",
				args: ['0xc8C26Ab40fe4723519fE66B8dBb625FC070A982c', parseUnits('100', 6)]
			}
		],
		enabled: true
	})

	const { sendUserOperation: batchSend, isLoading, data } = useContractBatchWrite(config)

	useWaitForTransaction({
		hash: data ? data.hash : undefined,
		enabled: !!data,
		onSuccess() {
			console.log("Transaction was successful.")
		},
		onError() {
			alert("Transaction was unsuccessful.")
		}
	}) */

	// write contract
/* 
	const sendUsdc = async () => {
		try {
			// Send the tx
			if (batchSend) {
				console.log("sending")
				console.log("sending")
				console.log(data, batchSend)
				batchSend()
				console.log("sent")
			} else {
				console.log("not sending")
			}
		} catch (error) {
			console.log(error)
		}
	}
 */
	const encoded = encodeFunctionData({
		abi: [
			{
				constant: false,
				inputs: [
					{ name: "_to", type: "address" },
					{ name: "_value", type: "uint256" },
				],
				name: "transfer",
				outputs: [{ name: "success", type: "bool" }],
				stateMutability: "nonpayable",
				type: "function",
			},
		],
		functionName: "transfer",
		args: [address, parseUnits("1", 6)],
	});

	console.log(encoded)
	

	const { config } = usePrepareSendUserOperation({
		to: usdc,
		data: encoded,
		//value: parseEther("0.01"),
	});
	const { sendUserOperation, data } = useSendUserOperation(config);

	useWaitForTransaction({
		hash: data?.hash,
		enabled: !!data,
		onSuccess(data) {
			console.log("Transaction was successful.");
		},
	});

	const sendTx = async () => {
		try {
			// Send the tx
			if (sendUserOperation) {
				console.log("true");
				console.log(data, sendUserOperation);
				sendUserOperation();
				console.log(data, sendUserOperation);
			} else {
				console.log("false");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<button
				onClick={() => sendTx()}
			>Send USDC New</button>
		
		</div>
	);
}