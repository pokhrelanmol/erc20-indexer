import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Box, Flex } from "@chakra-ui/react";

const ConnectWallet = () => {
    return (
        <Flex justifyContent="right" mt="5" mr="5">
            <ConnectButton />
        </Flex>
    );
};

export default ConnectWallet;
