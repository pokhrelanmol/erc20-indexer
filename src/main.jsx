import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { ChakraProvider } from "@chakra-ui/react";
const { chains, provider } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: "Token Indexer",
    chains,
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});
ReactDOM.createRoot(document.getElementById("root")).render(
    <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </RainbowKitProvider>
    </WagmiConfig>
);
