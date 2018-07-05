pragma solidity 0.4.24;

import "./MediciToken.sol";
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract MediciCrowdsale is CappedCrowdsale, RefundableCrowdsale, MintedCrowdsale {
  
  // ICO Stage
  // ============
    enum CrowdsaleStage { PreICO, Other }
    CrowdsaleStage public stage = CrowdsaleStage.PreICO;
  // =============

  // Token Distribution
  // =============================
    // 750,000,000 Tokens 
    uint256 public totalTokensMintable = 750 * 1e6 * 1e18; 
    // 375,000,000 Tokens  [45% + 5% Sale Bonus]
    uint256 public totalTokensForSale = 375 * 1e6 * 1e18; 
    // 75,000,000 Tokens   [10%]
    uint256 public tokensForStakeRewards = 75 * 1e6 * 1e18;
    // 150,000,000 Tokens  [20%]
    uint256 public tokensForFounders = 150 * 1e6 * 1e18;
    // 30,000,000 Tokens   [4%]
    uint256 public tokensForAdvisers = 30 * 1e6 * 1e18;
    // 60,000,000 Tokens   [8%]
    uint256 public tokensForMarketing = 60 * 1e6 * 1e18;
    // 22,500,000 Tokens   [3%]
    uint256 public tokensForDevelopment = 22.5 * 1e6 * 1e18;
    // 37,500,000 Tokens   [5%]
    uint256 public tokensForAirdrops = 37.5 * 1e6 * 1e18;
    // Remaining unsold Tokens 
    uint256 public tokensForCrowdsale;
  // ==============================

  // Amount raised in PreICO
  // ==================
    uint256 public ETHRaisedDuringPreICO;
  // ===================
    
  // Events
    event EthTransferred(string text);
    event EthRefunded(string text, uint256 value);

    constructor(
        uint256 _openingTime, 
        uint256 _closingTime, 
        uint256 _rate, 
        address _wallet, 
        uint256 _cap,
        MintableToken _token
    )
        Crowdsale(_rate, _wallet, _token)  
        CappedCrowdsale(_cap) 
        TimedCrowdsale(_openingTime, _closingTime) 
        RefundableCrowdsale(_cap) 
    public 
    {
    }

  // =============

  // Token Deployment
  // =================
   // function createTokenContract() internal returns (MintableToken) {
   //     return new MediciToken();
   // }
  // ==================

  // Getters & setters
  // =========================================================

    function getTokensMinted() public view returns (uint256) {
        return token.totalSupply();
    }

    function getTokensForCrowdsale() public view returns (uint256) {
        return tokensForCrowdsale;
    }

   // function setMessage(string newMessage) public {
    //        message = newMessage;
   // }

    // Change the current rate
    //function setCurrentRate(uint256 _rate) private {
    function setRate(uint256 _rate) public  {
        rate = _rate;
    }

    function setCap(uint256 _cap) public  {
        cap = _cap;
    }

// ================ End of geters & setters =====================


  // Crowdsale Stage Management
  // =========================================================

  // Change Crowdsale Stage. Available Options: PreICO, ICO
    function setCrowdsaleStage(uint value) public onlyOwner {

        CrowdsaleStage _stage;

        if (uint(CrowdsaleStage.PreICO) == value) {
            _stage = CrowdsaleStage.PreICO;
        } else if (uint(CrowdsaleStage.Other) == value) {
            _stage = CrowdsaleStage.Other;
        }

        stage = _stage;
    }

  // ================ Stage Management Over =====================

  // Token Purchase
  // =========================
  // Usually, there is a no name function to accept ether to be sent to a contract which is 
  // called a fallback function:
    function () external payable {
        uint256 tokensMintedAfterPurchase = msg.value.mul(rate);
        if ((stage == CrowdsaleStage.PreICO) && (token.totalSupply() + tokensMintedAfterPurchase > totalTokensForSale)) {
            msg.sender.transfer(msg.value); // Refund them
            // ABORT -> ERROR MSG DON'T REFUND VOID TRANSACTION!!
          // was just EthRefunded("PreICO Limit Hit");
          // https://ethereum.stackexchange.com/questions/45482/invoking-events-without-emit-prefix-is-deprecated-in-transfermsg-sender-to
            emit EthRefunded("PreICO Limit Hit", tokensMintedAfterPurchase);
            return;
        }

        buyTokens(msg.sender);

        if (stage == CrowdsaleStage.PreICO) {
            ETHRaisedDuringPreICO = ETHRaisedDuringPreICO.add(msg.value);
        }
    }

    function _forwardFunds() internal {
        wallet.transfer(msg.value);
        emit EthTransferred("forwarding funds to wallet");
    }
  // ===========================

  // Finish: Mint Extra Tokens as needed before finalising the Crowdsale.
  // ====================================================================

    function finish(address _crowdsaleTokenFund) public onlyOwner {
    //function finish(address _economyFund) public {
      
        require(!isFinalized);
        //require(hasClosed() || capReached());
        require(hasEnded() || capReached());
        
        //uint256 alreadyMinted = token.totalSupply();
        uint256 alreadyMinted = token.totalSupply();
        require(alreadyMinted < totalTokensForSale);
        
        uint256 unsoldTokens = totalTokensForSale - alreadyMinted;
        if (unsoldTokens > 0) {
            tokensForCrowdsale = unsoldTokens;
      }

// was token.mint(_economyFund, tokensForEconomy); etc.
// https://www.questarter.com/q/typeerror-member-quot-mint-quot-not-found-or-not-visible-after-argument-dependent-lookup-in-contract-erc20-29_45314.html
        MediciToken etoken = MediciToken(ERC20(token));
        etoken.mint(_crowdsaleTokenFund, tokensForCrowdsale);
        //finalize();
    }

    /**
   * @dev Transfers the current balance to the owner and terminates the contract.
   */
    function destroy() onlyOwner public {
        selfdestruct(owner);
    }

    function destroyAndSend(address _recipient) onlyOwner public {
        selfdestruct(_recipient);
    }
    // ===============================

  // REMOVE THIS FUNCTION ONCE YOU ARE READY FOR PRODUCTION
  // USEFUL FOR TESTING `finish()` FUNCTION
    function hasEnded() public view returns (bool) {
        return true;
    }
}
