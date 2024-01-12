//dashboard.zerodev.app/
//github.com/orgs/zerodevapp/repositories
//github.com/zerodevapp/zerodev-privy-nextjs-example
//css
'use client';
import '../globals.css'

import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { goerli, mainnet, sepolia, polygonMumbai } from "wagmi/chains";
import {
	GoogleSocialWalletConnector,
	FacebookSocialWalletConnector,
	GithubSocialWalletConnector,
	DiscordSocialWalletConnector,
	TwitchSocialWalletConnector,
	TwitterSocialWalletConnector,
} from "@zerodev/wagmi";

import { publicProvider } from "wagmi/providers/public";
import Layout from '../components/Layout';

export const { chains, publicClient, webSocketPublicClient } = configureChains(
	[mainnet, ...(process.env.NODE_ENV === "development" ? [polygonMumbai] : [])],
	[publicProvider()]
);

function App({ Component, pageProps }: AppProps) {
	const [config] = React.useState(() => {
		if (typeof window !== "undefined") {
			const options = {
				chains,
				options: {
					projectId: "f1d2d8bf-0feb-430a-9f6f-dfeb8bc639a3",
					shimDisconnect: true,
				},
			};
			return createConfig({
				autoConnect: true,
				connectors: [
					new GoogleSocialWalletConnector(options),
					new FacebookSocialWalletConnector(options),
					new GithubSocialWalletConnector(options),
					new DiscordSocialWalletConnector(options),
					new TwitchSocialWalletConnector(options),
					new TwitterSocialWalletConnector(options),
				],
				publicClient,
				webSocketPublicClient,
			});
		}
	});

	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => setMounted(true), []);
	if (typeof window === "undefined") return null;

	return (

		<WagmiConfig config={config!}>
			<NextHead>
				<title>wagmi</title>
			</NextHead>

			{mounted && <Component {...pageProps} />}
		</WagmiConfig>


	);
}

export default App;
