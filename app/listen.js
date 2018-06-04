const prepared = require("./prepare.js")

const listen = async () => {
    const contract = await prepared.MetaCoin.deployed()
    contract.Transfer({}, { fromBlock: 0, toBlock: "latest" }).watch((err, newEvent) => {
        err ? console.error(err) : console.log(newEvent);
    })
}

/**
 * Small hack to avoid a possible race condition on Web3's JsonRPC.messageId here:
 * https://github.com/ethereum/web3.js/blob/develop/lib/web3/jsonrpc.js#L42
 */

setTimeout(listen, 100);