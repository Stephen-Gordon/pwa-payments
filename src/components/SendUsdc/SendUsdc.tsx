import { useContractWrite, usePrepareContractWrite, erc20ABI } from 'wagmi'

import { useContractBatchWrite, usePrepareContractBatchWrite } from '@zerodev/wagmi';
import { parseEther, parseUnits } from "viem";

import { usePrepareSendUserOperation, useSendUserOperation } from "@zerodev/wagmi";
import { useWaitForTransaction } from "wagmi";


export default function SendUsdc() {

	const usdc = "0x38EB8B22Df3Ae7fb21e92881151B365Df14ba967"

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
	})

	// write contract

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


	return (
		<div>
			<button
				onClick={() => sendUsdc()}
			>Send USDC</button>
			<div className='mt-5'>
				{isLoading ? 'loading...' : 'Batch Example'}
			</div>
		</div>
	);
}