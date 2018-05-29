const Web3 = require("web3");
const net = require("net");

console.log(`ENV ${process.env['HOME']}`) 

module.exports = {
  networks: {
      development: {
          provider: new Web3.providers.IpcProvider(process.env['HOME'] + "/Library/Ethereum/net42/geth.ipc", net),
          network_id: "*",
          gas: 3000000
      }
  }
};
