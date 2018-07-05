/// utility methods
const writeValue = (elementId, value) => document.getElementById(elementId).textContent = value;
const toEthString = wei => wei / (10 ^ 18) + ' ETH';
const hexSecondsToMillis = hexSeconds => web3.toBigNumber(hexSeconds).toNumber() * 1000;

function convertDate(data) {
  var getdate = parseInt(data.replace("/Date(", "").replace(")/", ""));
  var ConvDate= new Date(getdate);
  return ConvDate.getDate() + "/" + ConvDate.getMonth() + "/" + ConvDate.getFullYear();
}

const abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "totalTokensMintable",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "hasClosed",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "tokensForMarketing",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "rate",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "cap",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "goal",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "weiRaised",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "closingTime",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "finalize",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "capReached",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "wallet",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalTokensForSale",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "tokensForAdvisers",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "goalReached",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "tokensForCrowdsale",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isFinalized",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "tokensForAirdrops",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "claimRefund",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "openingTime",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "tokensForFounders",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "stage",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "tokensForStakeRewards",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_beneficiary",
        "type": "address"
      }
    ],
    "name": "buyTokens",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "tokensForDevelopment",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "ETHRaisedDuringPreICO",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "vault",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "token",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_openingTime",
        "type": "uint256"
      },
      {
        "name": "_closingTime",
        "type": "uint256"
      },
      {
        "name": "_rate",
        "type": "uint256"
      },
      {
        "name": "_wallet",
        "type": "address"
      },
      {
        "name": "_cap",
        "type": "uint256"
      },
      {
        "name": "_token",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "text",
        "type": "string"
      }
    ],
    "name": "EthTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "text",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "EthRefunded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "Finalized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipRenounced",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "purchaser",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "beneficiary",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "TokenPurchase",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getTokensMinted",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getTokensForCrowdsale",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_rate",
        "type": "uint256"
      }
    ],
    "name": "setRate",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_cap",
        "type": "uint256"
      }
    ],
    "name": "setCap",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "setCrowdsaleStage",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_crowdsaleTokenFund",
        "type": "address"
      }
    ],
    "name": "finish",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "destroy",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_recipient",
        "type": "address"
      }
    ],
    "name": "destroyAndSend",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "hasEnded",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

        const abi_token = [{
            "constant ": true,
            "inputs ": [],
            "name ": "mintingFinished ",
            "outputs ": [{
                "name ": " ",
                "type ": "bool "
            }],
            "payable ": false,
            "stateMutability ": "view ",
            "type ": "function "
        }, {
            "constant ": true,
            "inputs ": [],
            "name ": "name ",
            "outputs ": [{
                "name ": " ",
                "type ": "string "
            }],
            "payable ": false,
            "stateMutability ": "view ",
            "type ": "function "
        }, {
            "constant ": false,
            "inputs ": [{
                "name ": "_spender ",
                "type ": "address "
            }, {
                "name ": "_value ",
                "type ": "uint256 "
            }],
            "name ": "approve ",
            "outputs ": [{
                "name ": " ",
                "type ": "bool "
            }],
            "payable ": false,
            "stateMutability ": "nonpayable ",
            "type ": "function "
        }, {
            "constant ": true,
            "inputs ": [],
            "name ": "totalSupply ",
            "outputs ": [{
                "name ": " ",
                "type ": "uint256 "
            }],
            "payable ": false,
            "stateMutability ": "view ",
            "type ": "function "
        }, {
            "constant ": false,
            "inputs ": [{
                "name ": "_from ",
                "type ": "address "
            }, {
                "name ": "_to ",
                "type ": "address "
            }, {
                "name ": "_value ",
                "type ": "uint256 "
            }],
            "name ": "transferFrom ",
            "outputs ": [{
                "name ": " ",
                "type ": "bool "
            }],
            "payable ": false,
            "stateMutability ": "nonpayable ",
            "type ": "function "
        }, {
            "constant ": true,
            "inputs ": [],
            "name ": "decimals ",
            "outputs ": [{
                "name ": " ",
                "type ": "uint8 "
            }],
            "payable ": false,
            "stateMutability ": "view ",
            "type ": "function "
        }, {
            "constant ": false,
            "inputs ": [{
                "name ": "_to ",
                "type ": "address "
            }, {
                "name ": "_amount ",
                "type ": "uint256 "
            }],
            "name ": "mint ",
            "outputs ": [{
                "name ": " ",
                "type ": "bool "
            }],
            "payable ": false,
            "stateMutability ": "nonpayable ",
            "type ": "function "
        }, {
            "constant ": false,
            "inputs ": [{
                "name ": "_spender ",
                "type ": "address "
            }, {
                "name ": "_subtractedValue ",
                "type ": "uint256 "
            }],
            "name ": "decreaseApproval ",
            "outputs ": [{
                "name ": " ",
                "type ": "bool "
            }],
            "payable ": false,
            "stateMutability ": "nonpayable ",
            "type ": "function "
        }, {
            "constant ": true,
            "inputs ": [{
                "name ": "_owner ",
                "type ": "address "
            }],
            "name ": "balanceOf ",
            "outputs ": [{
                "name ": " ",
                "type ": "uint256 "
            }],
            "payable ": false,
            "stateMutability ": "view ",
            "type ": "function "
        }, {
            "constant ": false,
            "inputs ": [],
            "name ": "finishMinting ",
            "outputs ": [{
                "name ": " ",
                "type ": "bool "
            }],
            "payable ": false,
            "stateMutability ": "nonpayable ",
            "type ": "function "
        }, {
            "constant ": true,
            "inputs ": [],
            "name ": "owner ",
            "outputs ": [{
                "name ": " ",
                "type ": "address "
            }],
            "payable ": false,
            "stateMutability ": "view ",
            "type ": "function "
        }, {
            "constant ": true,
            "inputs ": [],
            "name ": "symbol ",
            "outputs ": [{
                "name ": " ",
                "type ": "string "
            }],
            "payable ": false,
            "stateMutability ": "view ",
            "type ": "function "
        }, {
            "constant ": false,
            "inputs ": [{
                "name ": "_to ",
                "type ": "address "
            }, {
                "name ": "_value ",
                "type ": "uint256 "
            }],
            "name ": "transfer ",
            "outputs ": [{
                "name ": " ",
                "type ": "bool "
            }],
            "payable ": false,
            "stateMutability ": "nonpayable ",
            "type ": "function "
        }, {
            "constant ": false,
            "inputs ": [{
                "name ": "_spender ",
                "type ": "address "
            }, {
                "name ": "_addedValue ",
                "type ": "uint256 "
            }],
            "name ": "increaseApproval ",
            "outputs ": [{
                "name ": " ",
                "type ": "bool "
            }],
            "payable ": false,
            "stateMutability ": "nonpayable ",
            "type ": "function "
        }, {
            "constant ": true,
            "inputs ": [{
                "name ": "_owner ",
                "type ": "address "
            }, {
                "name ": "_spender ",
                "type ": "address "
            }],
            "name ": "allowance ",
            "outputs ": [{
                "name ": " ",
                "type ": "uint256 "
            }],
            "payable ": false,
            "stateMutability ": "view ",
            "type ": "function "
        }, {
            "constant ": false,
            "inputs ": [{
                "name ": "newOwner ",
                "type ": "address "
            }],
            "name ": "transferOwnership ",
            "outputs ": [],
            "payable ": false,
            "stateMutability ": "nonpayable ",
            "type ": "function "
        }, {
            "anonymous ": false,
            "inputs ": [{
                "indexed ": true,
                "name ": "to ",
                "type ": "address "
            }, {
                "indexed ": false,
                "name ": "amount ",
                "type ": "uint256 "
            }],
            "name ": "Mint ",
            "type ": "event "
        }, {
            "anonymous ": false,
            "inputs ": [],
            "name ": "MintFinished ",
            "type ": "event "
        }, {
            "anonymous ": false,
            "inputs ": [{
                "indexed ": true,
                "name ": "previousOwner ",
                "type ": "address "
            }, {
                "indexed ": true,
                "name ": "newOwner ",
                "type ": "address "
            }],
            "name ": "OwnershipTransferred ",
            "type ": "event "
        }, {
            "anonymous ": false,
            "inputs ": [{
                "indexed ": true,
                "name ": "owner ",
                "type ": "address "
            }, {
                "indexed ": true,
                "name ": "spender ",
                "type ": "address "
            }, {
                "indexed ": false,
                "name ": "value ",
                "type ": "uint256 "
            }],
            "name ": "Approval ",
            "type ": "event "
        }, {
            "anonymous ": false,
            "inputs ": [{
                "indexed ": true,
                "name ": "from ",
                "type ": "address "
            }, {
                "indexed ": true,
                "name ": "to ",
                "type ": "address "
            }, {
                "indexed ": false,
                "name ": "value ",
                "type ": "uint256 "
            }],
            "name ": "Transfer ",
            "type ": "event "
        }];

const network = 'http://localhost:8545';
const contractAddress = '0xdc39f30fb06f5112015c8edee75bbc248a07bf8a';
const tokenAddress = '0xc87d9aef81d6f3e2ab53b5a0d88527b2c6f6d1b4';

/// getting contract
const web3 = new Web3(new Web3.providers.HttpProvider(network));
const crowdsale = web3.eth.contract(abi).at(contractAddress);
const token = web3.eth.contract(abi_token).at(tokenAddress);

// System stats
if (network == 'http://localhost:7545') target = 'Ganache GUI [7545]';
else if (network == 'http://localhost:8545') target = 'Ganache CLI [8545]';
if (web3.eth.protocolVersion == 63) protocol = 'any local network [63]';
if (web3.net.mining == 1) mining = 'yes'; else mining = 'no';
const hashrate = web3.eth.hashrate;
const peers = web3.net.peerCount;
if (web3.net.listening == 1) listening = 'yes'; else listening = 'no';
const gasLimit = web3.eth.getBlock('latest').gasLimit;
const lblock = web3.eth.getBlock('latest').number;
const ltstamp = web3.eth.getBlock('latest').timestamp;

writeValue('network', 'Platform > '+ target);
//writeValue('protocol','$Protocol >   '+ protocol);
//writeValue('mining',   'Mining:     '+ mining);
//writeValue('hashrate', 'Hash rate:  '+ hashrate);
//writeValue('peers', '$Peer count > '+ peers);
//writeValue('listening','Listening: '+ listening);
//writeValue('gasLimit','$Gas limit > '+ gasLimit);
writeValue('lblock','Latest block > '+ lblock);
writeValue('ltstamp', 'Latest timestamp > '+ ltstamp);

// Start & end dates 
const startDate = new Date(Date.parse("2018-08-15T00:00:01+0000")).toUTCString();
const endDate = new Date(Date.parse("2018-09-12T23:59:59+0000")).toUTCString();
//const startDate = new Date(parseInt(crowdsale.openingTime() * 1000)).toUTCString();
//const endDate = new Date(parseInt(crowdsale.closingTime() * 1000)).toUTCString();

// Rates & bonus
const USDValue = 0.15;
var bonus = 0.60;
// Est. ETH/USD = 468.98 @ 4 July, 2018
const xRate = 468.98;
//const tokensPerETHWithBonus = crowdsale.rate(); //.toFixed(2); //((521.81 / USDValue)*(1+bonus)).toFixed(2);
const tokensPerETHWithBonus = ((xRate / USDValue) * (1 + bonus)).toFixed(0);
console.log('Contract rate: 1 ETH =', crowdsale.rate().toNumber(), 'MDI');

// Token distribution
const div = 1e18;
const mil = 1e6;

// Initial supply
const tokensMintable = crowdsale.totalTokensMintable() / div; 
const tokensForSale = crowdsale.totalTokensForSale() / div; 
// Distribution
const tokensForStakeRewards = crowdsale.tokensForStakeRewards() / div;
const tokensForFounders = crowdsale.tokensForFounders() / div;
const tokensForAdvisers = crowdsale.tokensForAdvisers() / div;
const tokensForMarketing = crowdsale.tokensForMarketing() / div;
const tokensForDevelopment = crowdsale.tokensForDevelopment() / div;
const tokensForAirdrops = crowdsale.tokensForAirdrops() / div;

// ETH raised
var totalETHRaised = crowdsale.weiRaised() / div;  
console.log('ETH raised: ', crowdsale.weiRaised() / div, 'ETH');
// MDI sold
const totalMDISold = totalETHRaised *  tokensPerETHWithBonus;
const totalMDISold_tmp = totalETHRaised *  crowdsale.rate();
console.log('MDI sold: ', totalETHRaised *  crowdsale.rate(), 'MDI');
// USD raised
var totalUSDRaised = totalETHRaised * xRate; 

// Soft cap $5,000,000
var softcap = 5000000;
const softCap = (softcap / xRate).toFixed(0);
console.log('Contract cap: ', crowdsale.cap().toNumber() / div, 'ETH');
console.log('Cap reached: ', crowdsale.capReached.call());

// Wrire values to HTML
writeValue('startDate', startDate);
//writeValue('daysLeft', daysLeft);
writeValue('endDate', endDate);
writeValue('contractAddress', contractAddress);
writeValue('totalETHRaised', totalETHRaised.toFixed(2));
writeValue('totalMDISold', totalMDISold_tmp.toLocaleString('en', { useGrouping: true }));
writeValue('totalUSDRaised', totalUSDRaised.toLocaleString('en', { useGrouping: true }));
writeValue('USDValue', '1 MDI = $ '+USDValue);
writeValue('tokensPerETHWithBonus', '1 ETH = '+tokensPerETHWithBonus.toLocaleString('en', { useGrouping: true })+' MDI');
writeValue('tokensMintable', tokensMintable.toLocaleString('en', { useGrouping: true })+' MDI');
writeValue('tokensForSale', tokensForSale.toLocaleString('en', { useGrouping: true })+' MDI');
// Distribution table
writeValue('tokensForStakeRewards', tokensForStakeRewards.toLocaleString('en', { useGrouping: true })+' MDI');
writeValue('tokensForFounders', tokensForFounders.toLocaleString('en', { useGrouping: true })+' MDI');
writeValue('tokensForAdvisers', tokensForAdvisers.toLocaleString('en', { useGrouping: true })+' MDI');
writeValue('tokensForMarketing', tokensForMarketing.toLocaleString('en', { useGrouping: true })+' MDI');
writeValue('tokensForDevelopment', tokensForDevelopment.toLocaleString('en', { useGrouping: true })+' MDI');
writeValue('tokensForAirdrops', tokensForAirdrops.toLocaleString('en', { useGrouping: true })+' MDI');

writeValue('softCap', softCap+' ETH');
//writeValue('softCap', '$5m');
//writeValue('hardCap', hardCap.toLocaleString('en', { useGrouping: true })+' MDI');
if (crowdsale.capReached.call() == true) writeValue('capReached', 'Softcap reached, Pre-ICO now closed!');