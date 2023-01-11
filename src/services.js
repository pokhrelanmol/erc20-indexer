import { Alchemy, Network } from "alchemy-sdk";

export async function getTokenBalance(address) {
    const config = {
        apiKey: "Fd2D9YLaODQZavHANUXgkp4cDWmyDH67 ",
        network: Network.ETH_MAINNET,
    };

    const alchemy = new Alchemy(config);
    const data = await alchemy.core.getTokenBalances(address);
    let dataObjPromises = [];
    data.tokenBalances.length &&
        data.tokenBalances.map((_data) => {
            let objPromise = alchemy.core.getTokenMetadata(
                _data.contractAddress
            );
            dataObjPromises.push(objPromise);
        });
    const dataObj = await Promise.all(dataObjPromises);
    return { data, dataObj };
}
