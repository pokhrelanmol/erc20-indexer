import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Input,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";
import { isKeystoreWallet } from "@ethersproject/json-wallets";
import { Alchemy, Network, Utils } from "alchemy-sdk";
import { ethers, utils } from "ethers";
import { useEffect, useState } from "react";
import { useProvider, useSigner } from "wagmi";
import { getTokenBalance } from "../services";
const Home = () => {
    const { data } = useSigner();
    const [userAddress, setUserAddress] = useState("");
    const [results, setResults] = useState({});
    const [hasQueried, setHasQueried] = useState(false);
    const [tokenDataObjects, setTokenDataObjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const provider = useProvider();
    const fetchData = async (_address) => {
        setLoading(true);
        let resolvedAddr = await provider.resolveName(_address);
        let address;
        if (utils.isAddress(resolvedAddr)) {
            address = resolvedAddr;
        } else if (utils.isAddress(_address)) {
            address = _address;
        } else {
            setLoading(false);
            alert("Invalid Address or ENS name");
            return;
        }

        const { data, dataObj } = await getTokenBalance(address);
        setResults(data);
        setTokenDataObjects(dataObj);
        setLoading(false);
        setHasQueried(true);
        setUserAddress("");
    };
    return (
        <Box>
            <Center mt={"20"}>
                <Flex
                    alignItems={"center"}
                    justifyContent="center"
                    flexDirection={"column"}
                >
                    <Heading mb={0} fontSize={36}>
                        ERC-20 Token Indexer
                    </Heading>
                    <Text>
                        Plug in an address and this website will return all of
                        its ERC-20 token balances!
                    </Text>
                </Flex>
            </Center>
            <Flex
                w="100%"
                flexDirection="column"
                alignItems="center"
                justifyContent={"center"}
            >
                <Flex
                    direction="column"
                    alignItems="center"
                    border={"2px"}
                    padding="10"
                    borderRadius="10"
                    mt="5"
                >
                    <Heading as="h3" size="lg" mb="5">
                        Enter Address
                    </Heading>
                    <Input
                        onChange={(e) => setUserAddress(e.target.value)}
                        value={userAddress}
                        color="black"
                        border="none"
                        w="600px"
                        p={4}
                        bgColor="lightgrey"
                        boxShadow="md"
                        placeholder="Address or ENS name"
                    />
                    <Button
                        colorScheme="teal"
                        onClick={() => {
                            fetchData(userAddress);
                        }}
                        mt={10}
                        disabled={loading ? true : false}
                    >
                        {loading ? "Loading..." : "Get Token Balances"}
                    </Button>
                </Flex>

                <Heading size={"lg"} my="10">
                    ERC-20 token balances:
                </Heading>

                {Object.keys(results).length ? (
                    <SimpleGrid w={"90vw"} columns={4} spacing={24}>
                        {results.tokenBalances.map((e, i) => {
                            return (
                                <Flex
                                    flexDir={"column"}
                                    bg="white"
                                    p={8}
                                    w={"20vw"}
                                    border="2px solid red"
                                    rounded={"md"}
                                    key={i}
                                >
                                    <Box>
                                        <b>Symbol:</b> $
                                        {tokenDataObjects[i].symbol}&nbsp;
                                    </Box>
                                    <Box>
                                        <b>Balance:</b>&nbsp;
                                        {Utils.formatUnits(
                                            e.tokenBalance,
                                            tokenDataObjects[i].decimals
                                        )}
                                    </Box>
                                    <Image src={tokenDataObjects[i].logo} />
                                </Flex>
                            );
                        })}
                    </SimpleGrid>
                ) : !Object.keys(results).length && hasQueried ? (
                    "No Tokens Founds"
                ) : (
                    "Please make a query"
                )}
            </Flex>
        </Box>
    );
};
export default Home;
