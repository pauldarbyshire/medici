// https://stackoverflow.com/questions/27441803/why-does-jshint-throw-a-warning-if-i-am-using-const

const MediciCrowdsale = artifacts.require('./MediciCrowdsale.sol');
const MediciToken = artifacts.require('./MediciToken.sol');

function ether (n) {
    return new web3.BigNumber(web3.toWei(n, 'ether'));
}

const duration = {
    seconds: function (val) { return val; },
    minutes: function (val) { return val * this.seconds(60); },
    hours: function (val) { return val * this.minutes(60); },
    days: function (val) { return val * this.hours(24); },
    weeks: function (val) { return val * this.days(7); },
    years: function (val) { return val * this.days(365); },
};

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(MediciToken);
    const deployedToken = await MediciToken.deployed();
    
    const timeNow = Math.floor(Date.now() / 1000);
    const openingTime = timeNow  + duration.seconds(30);
    const closingTime = timeNow  + duration.years(1);

    const rate = 5000; // 1 ETH = 5000 MDI tokens
    const wallet = accounts[9];
    const cap = ether(100); // 100 ETH
    
    await deployer.deploy(MediciCrowdsale, openingTime, closingTime, rate, wallet, cap, deployedToken.address);
    const deployedCrowdsale = await MediciCrowdsale.deployed();
    await deployedToken.transferOwnership(deployedCrowdsale.address);
    console.log('Contracts deployed: \n', deployedCrowdsale.address, deployedToken.address)
  
    return true;
}