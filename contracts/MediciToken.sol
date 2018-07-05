pragma solidity 0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

// 1 ETH = 1000000000000000000 Wei
// i ETH = 1000000000 Gwei, Shannon, Nanoether, Nano
// Most cryptocurrencies are 18 decimal places
// MintableToken, means that numbers of tokens will auto-increase as they are purchased.
contract MediciToken is MintableToken {
    string public name = "Medici";
    string public symbol = "MDI"; // https://github.com/crypti/cryptocurrencies
    uint8 public decimals = 18;
}
