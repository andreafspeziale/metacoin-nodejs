const Http = require('http');
const Url = require('url');
const prepared = require('./prepare.js');
const EthUtil = require("ethereumjs-util");

const serverError = (err, response) => {
    response.writeHeader(500, {'Content-Type': 'text/plain'});
    response.write(err.toString());
    response.end();                    
}

const invalidMethod = (response) => {
    response.writeHeader(405);
    response.end();
}

const notFound = (err, response) => {
    response.writeHeader(404, {'Content-Type': 'text/plain'});
    response.write(err.toString());
    response.end();
}

const badRequest = (response, err) => {
    response.writeHeader(400, {"Content-Type": "text/plain"});
    response.write(err.toString());
    response.end();
}

Http.createServer(( async (request, response) => {
    console.log(`REQUESTED URL: ${request.url}`)
    let pathname = Url.parse(request.url).pathname

    if(request.method == 'GET') {
        console.log(`GET REQUEST`)
        if(pathname.startsWith('/tx/')) {
            console.log(`START WITH /TX/`)
            const txHash = pathname.slice(4, 70);
            console.log(`TXHASH: ${txHash}`)
            prepared.web3.eth.getTransaction(txHash, (err, tx) => {
                if(err) {
                    console.log(`GETTRANSACTION ERROR: ${err}`)
                    serverError(err, response)
                } else if(tx == null) {
                    console.log(`GETTRANSACTION NOT FOUND`)
                    notFound(`${txHash} is not a known transactionn`, response)
                } else {
                    response.writeHeader(200, {'Content-Type': 'application/json'})
                    response.write(JSON.stringify(tx) + 'n')
                    response.end()
                }
            }) 
        } else if(pathname.startsWith('/balance/')) {
            console.log(`START WITH /balance/`)
            const who = pathname.slice(9, 51);
            if (!EthUtil.isValidAddress(who)) {
                console.log("invalid address")
                badRequest(`${who} is not a valid address`, response);
            } else {
                try {
                    const contract = await prepared.MetaCoin.deployed()
                    const balance = await contract.getBalance.call(who)
                    response.writeHeader(200, {"Content-Type": "application/json"});
                    response.write(JSON.stringify({
                        "address": who,
                        "balance": balance.toString(10)
                    }) + 'n');
                    response.end();
                } catch(e) {
                    erverError(e, response)
                }
            }
        } else {
            console.log(`${pathname} INVALID ENDPOINT`)
            notFound(`${pathname} not found`, response)
        } 
    } else {
            console.log('INVALID METHOD')
            invalidMethod(response)
        }
})).listen(8080)