//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./DeffectToken.sol";
import "./DaiToken.sol";

// TODO: Implement Lending and borrowing on already deposited funds!

contract TokenFarm {
    string public name = "DFT Token Farm";
    DeffectToken public deffectToken;
    DaiToken public daiToken;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public isCurrentlyStaking;
    mapping(address => bool) public hasStaked;

    address[] public stakersCollection;

    constructor(DeffectToken _deffectToken, DaiToken _daiToken) {
        deffectToken = _deffectToken;
        daiToken = _daiToken;
    }

    function stakeDai(uint256 _amount) public {
        require(_amount > 0, "Too low staking amount");
        daiToken.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] = stakingBalance[msg.sender] += _amount;

        if (!hasStaked[msg.sender]) {
            stakersCollection.push(msg.sender);
        }

        isCurrentlyStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }
    
    // 1. Stake Tokens. (deposit)
    // 2. Unstake Tokens. (withdraw)
    // 3. Issuing Tokens. (earn tokens as reward for staking)
}
