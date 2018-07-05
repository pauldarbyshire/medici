// http://truffleframework.com/docs/advanced/configuration
// https://michalzalecki.com/deploying-smart-contracts-with-truffle/
//const mnemonic = process.env.ethereum_mnemonic;
//var HDWalletProvider = require("truffle-hdwallet-provider");
var infura_apikey = "KbQuP7xkP1ZYNhJkUOXF"; // Get one at https://infura.io/signup
//var infura_apikey = "PgEtJvvPerIVoVtIZeJ7";
//var infura_apikey = "xxxxxxxxxxxxxx";
var mnemonic = "maple alert achieve chapter hard glove unique appear zone retreat merry million";

module.exports = {
    //build: "npm run dev", // https://www.npmjs.com/package/lite-server
    networks: {
        ganache: {
            host: "localhost",
            port: 7545,
            network_id: "5777", // $ truffle migrate --network ganache [run 'ganache in seperate terminal]'
            gas: 6500000
        },
        testrpc: {
            host: "localhost",
            port: 8545,
            network_id: "*" // $ truffle migrate --network testrpc [run 'testrpc' in seperate terminal] [install with: sudo npm install -g ethereumjs-testrpc]
        },
        ganachecli: {
            host: "localhost",
            port: 8545,
            network_id: "*" // $ truffle migrate --network ganache-cli [run 'ganache-cli in seperate terminal]'
        },
        private: {
            host: "localhost",
            port: 8545,
            network_id: "*" // $ truffle migrate --network private
        },
        ropsten: {
            //provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infura_apikey),
            //provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"),
            host: 'localhost',
            //port: 8545,
            network_id: 3,
            gas: 4500000 // $ truffle migrate --network ropsten
        }
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};