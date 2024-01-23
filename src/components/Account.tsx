import { useAccount, useEnsName, useBalance } from 'wagmi'

import { parseEther } from "viem";
import {
	usePrepareSendUserOperation,
	useSendUserOperation,
} from "@zerodev/wagmi";
import { useWaitForTransaction } from "wagmi";
//next
import Link from 'next/link'

export function Account() {
	const { address } = useAccount()
	const { data: ensName } = useEnsName({ address })

	const { config } = usePrepareSendUserOperation({
		to: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
		data: "0x",
		value: parseEther("0.01"),
		

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
				sendUserOperation()

			}
		} catch (error) {
			console.log(error)
		}
	};



	return (
		<div className='grid '>
			{ensName ?? address}
			{ensName ? ` (${address})` : null}
			<button onClick={() => sendTx()}>Send Matic</button>

		</div>
	);
}
