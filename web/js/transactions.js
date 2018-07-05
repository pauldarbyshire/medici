// https://ethereum.stackexchange.com/questions/2531/common-useful-javascript-snippets-for-geth/2936#2936
// https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_getblockbyhash

// Ethereum Blockchain Utilities
// Check ALL balances
function checkAllBalances() { 
    var i = 0; 
    var balances = [];

    web3.eth.accounts.forEach( function(e){
      //console.log("Account["+i+"]: " +  e + " \tBalance: " + web3.fromWei(web3.eth.getBalance(e), "ether") + " ETH"); 
      balances.push(web3.fromWei(web3.eth.getBalance(e), "ether"));
      i++; 
    });

    return balances;
}

// Check ALL balances & totalise
function checkAllBalancesTotal() { 
  var i = 0; 
  var total = 0.0;
  web3.eth.accounts.forEach( function(e){
    total += parseFloat(web3.eth.getBalance(e));
    console.log("Account["+i+"]: " +  e + " \tBalance: " +
      web3.fromWei(web3.eth.getBalance(e), "ether") + " ETH"); 
    i++; 
  });
  console.log("Total: " + web3.fromWei(total), " ETH");
  //document.getElementById("checkAllBalancesTotal").innerHTML = web3.fromWei(total)+ " ETH";
} 

// Get transactions by account between block numbers or all ("*")
function getTransactionsByAccount() {
    var account = document.getElementById("trxAccount").value;
    var startBlockNumber = document.getElementById("startBlock").value;
    var endBlockNumber = document.getElementById("endBlock").value;
    
  if (endBlockNumber == "") {
      endBlockNumber = web3.eth.blockNumber;
      console.log("Using endBlockNumber: " + endBlockNumber);
    }
    if (startBlockNumber == "") {
      startBlockNumber = endBlockNumber - 1000;
      console.log("Using startBlockNumber: " + startBlockNumber);
    }
    console.log("Searching for transactions to & from account: " + account + " within blocks "  + startBlockNumber + " & " + endBlockNumber);
  
    for (var i = startBlockNumber; i <= endBlockNumber; i++) {
      if (i % 1000 == 0) {
        console.log("Searching block " + i);
      }
      var block = web3.eth.getBlock(i, true);
      if (block != null && block.transactions != null) {
        block.transactions.forEach( function(e) {
          if (account == "*" || account == e.from || account == e.to) {
            console.log("  tx hash          : " + e.hash + "\n"
              + "   nonce           : " + e.nonce + "\n"
              + "   blockHash       : " + e.blockHash + "\n"
              + "   blockNumber     : " + e.blockNumber + "\n"
              + "   transactionIndex: " + e.transactionIndex + "\n"
              + "   from            : " + e.from + "\n" 
              + "   to              : " + e.to + "\n"
              + "   value           : " + e.value + "\n"
              + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
              + "   gasPrice        : " + e.gasPrice + "\n"
              + "   gas             : " + e.gas + "\n");
             // + "   input           : " + e.input);
          }
        })
      }
    }
  }

// Get transaction details by trx hash
function getTransactionDetails() {

  var hash = document.getElementById("trxHash").value;
  var trx = web3.eth.getTransaction(hash);
  var rcpt = web3.eth.getTransactionReceipt(hash);

  var tdets = [];
  
  if (trx != null || rcpt != null) {
    tdets.push(trx.hash);
    tdets.push(trx.nonce);
    tdets.push(trx.blockHash);
    tdets.push(trx.blockNumber);
    tdets.push(trx.transactionIndex);
    tdets.push(rcpt.contractAddress);
    tdets.push(trx.from);
    tdets.push(trx.to);
    tdets.push(trx.value / 1e18 +' ETH');
    // 1 eth = 1e9 Gwei. 20 Gwei (price) per gas (unit).
    tdets.push(trx.gasPrice); // 1 Wei 
    tdets.push(trx.gas); // 2000000
    tdets.push(rcpt.gasUsed); // 21000 is the gas limit for standard transactions
    tdets.push(trx.input);
  }

  return tdets;
}

// Print block details by block number
function getBlockDetails() {

    var blck = document.getElementById("blck").value;
    var block = web3.eth.getBlock(blck);

    var bdets = [];

    bdets.push(block.hash);
    bdets.push(block.parentHash);
    bdets.push(block.nonce);
    bdets.push(block.sha3Uncles);
    bdets.push(block.stateRoot);
    bdets.push(block.miner);
    bdets.push(block.difficulty);
    bdets.push(block.totalDifficulty);
    bdets.push(block.extraData);
    bdets.push(block.size +' Bytes');
    bdets.push(block.gasLimit);
    bdets.push(block.gasUsed);
    bdets.push(block.timestamp);
    bdets.push(block.transactions);

    if (block.transactions != null) {
        console.log("--- transactions ---");
        block.transactions.forEach( function(e) {
        getTransactionDetails(e);
        });
    }

  return bdets;
}

function ether (n) {
    return new web3.BigNumber(web3.toWei(n, 'ether'));
}

// Buy Medici Tokens
function buyTokens() {

    document.getElementById("trxMsg").innerHTML = "";

    var wallet = document.getElementById("wallet").value;
    var ethr = document.getElementById("ether").value;
    var gas = document.getElementById("gas").value;
    var n = document.getElementById("number").value;
   
    var rnd;
    var eth;

    try {
        if (n == "") {
            if (wallet == "") document.getElementById("trxMsg").innerHTML = "From: address empty?";
            //else if (web3.utils.isAddress(wallet) == false) document.getElementById("trxMsg").innerHTML = "From: address not recognised!";
            else if (isNaN(ethr)) document.getElementById("trxMsg").innerHTML = "Ether not a number?";
            else if (ethr == 0) document.getElementById("trxMsg").innerHTML = "Ether zero?";
            if (crowdsale.capReached.call() == true) document.getElementById("trxMsg").innerHTML = "Transaction aborted.<br> Softcap reached. <br>Pre-ICO now closed!";
            web3.eth.sendTransaction({ from: wallet, to: crowdsale.address, value: ether(ethr), gas: gas});
            //web3.eth.sendTransaction({ from: wallet, value: web3.toWei(Number(ether), 'ether'), gas: gas});
        } else {
            if (n == "") document.getElementById("volMsg").innerHTML = "No. of trxs empty?";
            else if (isNaN(n)) document.getElementById("volMsg").innerHTML = "No. of trxs not a number?";
            for (i = 0; i < n; i++) {
                rnd = Math.floor(Math.random() * 8) + 1; 
                eth = Math.floor(Math.random() * 3) + 1; 
                //console.log(rnd);
                //console.log(eth);
                web3.eth.sendTransaction({ from: web3.eth.accounts[rnd], to: crowdsale.address, value: ether(eth), gas: gas});
            }
        }
        document.getElementById("trxMsg").innerHTML = "Transaction successful ...";
    }
    catch (err) {
        //document.getElementById("trxMsg").innerHTML = err.message;
        console.log(err);
    }
}

// Send ETH
function sendETH() {

    document.getElementById("sethMsg").innerHTML = "";

    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;
    var sether = document.getElementById("sether").value;
    var sgas = document.getElementById("sgas").value;
    
    try {
            if (from == "") document.getElementById("sethMsg").innerHTML = "From: address empty?";
            else if (to == "") document.getElementById("sethMsg").innerHTML = "To: address empty?";
            else if (isNaN(sether)) document.getElementById("sethMsg").innerHTML = "Ether not a number?";
            else if (sether == 0) document.getElementById("sethMsg").innerHTML = "Ether zero?";
            web3.eth.sendTransaction({ from: from, to: to, value: ether(sether), gas: sgas});
            document.getElementById("sethMsg").innerHTML = "Transaction successful ...";
    }
    catch (err) {
        //document.getElementById("trxMsg").innerHTML = err.message;
    }
}

// Send MED
function sendMED() {
    
    document.getElementById("sethMsg").innerHTML = "";

    const med = 100;
    try {
        web3.eth.transfer({ from: web3.eth.accounts[1], to: web3.eth.accounts[2], value: med, gas: 1000000 });
    }
    catch (err) {
        document.getElementById("trxMsg").innerHTML = err.message;
    }
}

// Cap reached
function hitSoftcap() {

    document.getElementById("sethMsg").innerHTML = "";
    const cap = crowdsale.cap().toNumber() / 1e18;

    try {
        web3.eth.sendTransaction({ from: web3.eth.accounts[0], to: crowdsale.address, value: ether(cap), gas: 1000000 });
    }
    catch (err) {
        document.getElementById("trxMsg").innerHTML = err.message;
    }
}

// Finish early
function finishEarly() {
    
    var beneficiary = document.getElementById("beneficiary").value;

    document.getElementById("sethMsg").innerHTML = "";
    console.log(crowdsale.getTokensForCrowdsale().toNumber() / 1e18);
    try {
        console.log(beneficiary);
        crowdsale.finish(beneficiary).call();
    }
    catch (err) {
        document.getElementById("trxMsg").innerHTML = err.message;
    }
    console.log(crowdsale.getTokensForCrowdsale().toNumber() / 1e18);
}

// Kill contract
function killContract() {
    
    var recipient = document.getElementById("recipient").value;

    document.getElementById("sethMsg").innerHTML = "";
    
    try {
        console.log(recipient);
        crowdsale.kill(recipient).call();
        crowdsale.kill.call();
    }
    catch (err) {
        document.getElementById("trxMsg").innerHTML = err.message;
    }
}

// Get smart contract bytecode 
// https://github.com/ConsenSys/bytecode-verifier
function getBytecode() {
    console.log(web3.eth.getCode(crowdsale.address));
//"0x"
//data: '0x' + bytecode
}

function getABI() {
    /*
Here is how you get the abi by using your local solc compiler:

solc filename.sol --abi

You also need the bin code to deploy the contract, which you can get as follows:

solc filename.sol --bin

If you want a combined output, where bin is part of the abi json string, use this:

solc filename.sol --combined-json abi,bin


    */
}

// Stake Reward scheme
function stakeRewards() {
    //TBC
 }