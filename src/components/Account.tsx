import { useAccount, useEnsName } from 'wagmi'

import { parseEther } from "viem"; 
import {
	usePrepareSendUserOperation,
	useSendUserOperation,
} from "@zerodev/wagmi";
import { useWaitForTransaction } from "wagmi";

export function Account() {
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })

  const { config } = usePrepareSendUserOperation({
		to: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
		data: "0x",
		value: parseEther("0.03"),
    
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
			console.log("sendTx");
      console.log(data, "data");
      console.log(config, "config");

			// Send the tx
      if(sendUserOperation){
        console.log("true")
        sendUserOperation()
      }
		
      console.log("senttt")
		} catch (error) {}
	};
   


  return (
		<div>
			{ensName ?? address}
			{ensName ? ` (${address})` : null}
			<button onClick={() => sendTx()}>Send</button>
		</div>
	);
}
