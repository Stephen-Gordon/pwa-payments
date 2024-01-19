import Link from "next/link";
import { Account, Connect } from "../../components";
import Balance from "../../components/Balance/Balance";
import Send from "../../components/Send/Send";
export default function Page () {
    return (
			<div>
				<div className="text-5xl text-center items-center mt-60">
					<Balance />
				</div>
				<Link href="/send?address=12345" passHref>
					go
				</Link>
				<Link
					href={{
						pathname: "/send",
						query: { address: "12345" },
					}}
				>
					Go to send button
				</Link>
				<Send />
				<Account />
				<Connect />
			</div>
		);
}