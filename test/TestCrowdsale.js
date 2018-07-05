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

function advanceBlock () {
    return new Promise((resolve, reject) => {
      web3.currentProvider.sendAsync({
        jsonrpc: '2.0',
        method: 'evm_mine',
        id: Date.now(),
      }, (err, res) => {
        return err ? reject(err) : resolve(res);
      });
    });
  }

// https://www.epochconverter.com/
function increaseTime (dur) {
    const id = Date.now();
  }
  
  function latestTime () {
    return web3.eth.getBlock('latest').timestamp;
  }
  
  function increaseTimeTo (target) {
    let now = latestTime();
    if (target < now) throw Error(`Cannot increase current time(${now}) to a moment in the past(${target})`);
    let diff = target - now;
    return increaseTime(diff);
  }

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const MediciCrowdsale = artifacts.require('MediciCrowdsale');
const MediciToken = artifacts.require('MediciToken');

contract('MediciCrowdsale', function ([owner, wallet, investor]) {
    const RATE = new BigNumber(5000);
    const CAP = ether(20);

    before(async function () {
        // Advance to the next block to correctly read time in the solidity "now" function interpreted by ganache
        await advanceBlock();
    });

    beforeEach(async function () {
        this.openingTime = latestTime() + duration.weeks(1);
        this.closingTime = this.openingTime + duration.weeks(1);
        this.afterClosingTime = this.closingTime + duration.seconds(1);

        this.token = await MediciToken.new({ from: owner });
        this.crowdsale = await MediciCrowdsale.new(this.openingTime, this.closingTime, RATE, wallet, CAP, this.token.address);
        await this.token.transferOwnership(this.crowdsale.address);
    });

    it('should create crowdsale with correct parameters', async function () {
        this.crowdsale.should.exist;
        this.token.should.exist;

        const openingTime = await this.crowdsale.openingTime();
        const closingTime = await this.crowdsale.closingTime();
        const rate = await this.crowdsale.rate();
        const walletAddress = await this.crowdsale.wallet();
        const cap = await this.crowdsale.cap();

        openingTime.should.be.bignumber.equal(this.openingTime);
        closingTime.should.be.bignumber.equal(this.closingTime);
        rate.should.be.bignumber.equal(RATE);
        walletAddress.should.be.equal(wallet);
        cap.should.be.bignumber.equal(CAP);
    });

    it('should not accept payments before start', async function () {
        await this.crowdsale.send(ether(1)).should.be.rejectedWith('revert');
        await this.crowdsale.buyTokens(investor, { from: investor, value: ether(1) }).should.be.rejectedWith('revert');
    });
});