// Next
import { useRouter } from "next/router";

export default function Page() {

    const router = useRouter();
		const { address } = router.query;

    return (
			<>
				<h1>Send Page</h1>
				<p>Route address: {address}</p>
			</>
		);
}