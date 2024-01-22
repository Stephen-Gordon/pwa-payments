//dashboard.zerodev.app/
//github.com/orgs/zerodevapp/repositories
//github.com/zerodevapp/zerodev-privy-nextjs-example
//css

'use client';

// Redux
import { Providers } from '../GlobalRedux/provider'



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
					/* new FacebookSocialWalletConnector(options),
					new GithubSocialWalletConnector(options),
					new DiscordSocialWalletConnector(options),
					new TwitchSocialWalletConnector(options),
					new TwitterSocialWalletConnector(options), */
				],
				publicClient,
				webSocketPublicClient,
			});
		}
	});

	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => {
		setMounted(true);
				
	}, []);
	if (typeof window === "undefined") return null;

	return (
		<Providers>
			<WagmiConfig config={config!}>
				<NextHead>
					<title>wagmi</title>
					<meta name="viewport" content="width=device-width,initial-scale=1" />
					<title>My awesome PWA app</title>
					<meta name="description" content="Best PWA app in the world!" />
					<link rel="shortcut icon" href="/favicon.ico" />
					<link rel="mask-icon" href="/icons/mask-icon.svg" color="#FFFFFF" />
					<meta name="theme-color" content="#ffffff" />
					<link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
					<link
						rel="apple-touch-icon"
						sizes="152x152"
						href="/icons/touch-icon-ipad.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/icons/touch-icon-iphone-retina.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="167x167"
						href="/icons/touch-icon-ipad-retina.png"
					/>
					<link rel="manifest" href="/manifest.json" />
					<meta name="twitter:card" content="summary" />
					<meta name="twitter:url" content="https://yourdomain.com" />
					<meta name="twitter:title" content="My awesome PWA app" />
					<meta
						name="twitter:description"
						content="Best PWA app in the world!"
					/>
					<meta name="twitter:image" content="/icons/twitter.png" />
					<meta name="twitter:creator" content="@DavidWShadow" />
					<meta property="og:type" content="website" />
					<meta property="og:title" content="My awesome PWA app" />
					<meta
						property="og:description"
						content="Best PWA app in the world!"
					/>
					<meta property="og:site_name" content="My awesome PWA app" />
					<meta property="og:url" content="https://yourdomain.com" />
					<meta property="og:image" content="/icons/og.png" />
					{/* add the following only if you want to add a startup image for Apple devices. */}
					<link
						rel="apple-touch-startup-image"
						href="/images/apple_splash_2048.png"
						sizes="2048x2732"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/images/apple_splash_1668.png"
						sizes="1668x2224"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/images/apple_splash_1536.png"
						sizes="1536x2048"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/images/apple_splash_1125.png"
						sizes="1125x2436"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/images/apple_splash_1242.png"
						sizes="1242x2208"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/images/apple_splash_750.png"
						sizes="750x1334"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/images/apple_splash_640.png"
						sizes="640x1136"
					/>
				</NextHead>

				{mounted && <Component {...pageProps} />}
			</WagmiConfig>
		</Providers>
	);
}

export default App;
