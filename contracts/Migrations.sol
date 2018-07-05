pragma solidity ^0.4.21;

contract Migrations {
    address public owner;
    uint public last_completed_migration;

    modifier restricted() {
        if (msg.sender == owner) _;
    }
  // was function Migrations() public {
    //https://ethereum.stackexchange.com/questions/47175/defining-constructors-as-functions-with-the-same-name-as-the-contract-is-depreca
    // was function Migrations() public {
    constructor() public {
        owner = msg.sender;
    }

    function setCompleted(uint completed) public restricted {
        last_completed_migration = completed;
    }

    function upgrade(address new_address) public restricted {
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_completed_migration);
    }
}
