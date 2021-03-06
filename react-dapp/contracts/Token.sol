//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token {
    string public name = "Deffect Token";
    string public symbol = "DFN";
    uint256 public totalSupply = 1000000;
    address public owner;
    mapping(address => uint256) balancesMapping;

    constructor() {
        // _mint(msg.sender, 10000 * 10**18);
        balancesMapping[msg.sender] = totalSupply * 10;
        owner = msg.sender;
    }

    function transfer(address _to, uint256 _amount) external {
        require(balancesMapping[msg.sender] >= _amount, "No funds!");
        balancesMapping[msg.sender] -= _amount;
        balancesMapping[_to] += _amount;
    }

    function balanceOf(address _accountAddress)
        external
        view
        returns (uint256)
    {
        return balancesMapping[_accountAddress];
    }

    function mint(address _to, uint _amount) external { }

    function burn() private { }
}
