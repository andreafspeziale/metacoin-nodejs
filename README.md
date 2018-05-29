# MetaCoin + NodeJS
Truffle MetaCoin sample plus nodeJS server.

## System used and requirements

- `node`
- `geth`
- `macosx`
- `truffle`

## Steps
### Start a local network

`$ geth --networkid 42 --datadir ~/Library/Ethereum/net42 console`

### Network configuration in the truffle.js

```
development: {
    provider: new Web3.providers.IpcProvider(process.env['HOME'] + "/Library/Ethereum/net42", net),
    network_id: "*",
    gas: 3000000
}
```