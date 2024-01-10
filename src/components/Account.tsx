import { useAccount, useEnsName } from 'wagmi'


import {
	usePrepareSendUserOperation,
	useSendUserOperation,
} from "@zerodev/wagmi";
import { useWaitForTransaction } from "wagmi";

export function Account() {
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })

  
  const sendTx = async () => {
		try {
			
      console.log("sendTx");  
			const { config } = usePrepareSendUserOperation({
				to: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 ",
				data: "0x",
				value: "0.00002",
			});

			const { sendUserOperation, data } = useSendUserOperation(config);

			
        sendUserOperation(); 

			// Wait on the status of the tx
			useWaitForTransaction({
				hash: data?.hash,
				enabled: !!data,
				onSuccess(data) {
					console.log("Transaction was successful.");
				},
			});
		} catch (error) {}
	};
   


  return (
		<div>
			{ensName ?? address}
			{ensName ? ` (${address})` : null}
			<button onClick={sendTx}>Send</button>
      
		</div>
	);
}
