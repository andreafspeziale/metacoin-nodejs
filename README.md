# MetaCoin + NodeJS
Truffle MetaCoin sample plus nodeJS server.

## System used and requirements

- `node`
- `geth@1.8.7-stable`
- `macosx`
- `truffle@4.1.8`

## Steps
### Start a local network

`$ geth --networkid 42 --datadir ~/Library/Ethereum/net42 console`

Remember also to:

- start mining with `miner.start(1)`
- unlock your account with `personal.unlockAccount(YOUR_ACCOUNT, PSW, 0)`

### Network configuration in the truffle.js

```
development: {
    provider: new Web3.providers.IpcProvider(process.env['HOME'] + "/Library/Ethereum/net42", net),
    network_id: "*",
    gas: 3000000
}
```

### Migrate the contracts

`$ truffle migrate`

Take note of the tx hash during the migration, for example:

```
...
Linking ConvertLib to MetaCoin
  Deploying MetaCoin...
  ... 0x82f6008c4335ab5acaad505c6726fa40c8e050ccb8edbbfaf90bf6ed11cc1e1a
  MetaCoin: 0x08f216f94c89e651772794eafb300b210aa70194
...
```

### Start the server

`$ cd /app`
`$ node server.js`

### Start the event logger

`$ cd /app`
`$ node listen.js`

### Try the API
While the server and the event listener are running open a new terminal window and using the txhash during the migration process and your accounts try:

`$ curl http://localhost:8080/tx/0x82f6008c4335ab5acaad505c6726fa40c8e050ccb8edbbfaf90bf6ed11cc1e1a`

or

`$ curl http://localhost:8080/balance/DEPLOYER_ACCOUNT_ADDRESS`

or

`$ curl -X PATCH http://localhost:8080/sendOneTo/0xbfbdf60fc49ecfcac2e98efe1cd4db6d5d239722`

