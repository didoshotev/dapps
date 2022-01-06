//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./DeffectToken.sol";
import "./DaiToken.sol";

// TODO: Implement Lending and borrowing on already deposited funds!

contract TokenFarm2 {
    string public name = "DFT Token Farm";
    DeffectToken public deffectToken;
    DaiToken public daiToken;


        struct Stake { 
            address user;
            uint256 amount;
            uint64 sinceBlock;
            uint64 untilBlock;
        }

        Stake[] stakes;
        uint256 constant public percentPerBlock = 1; // Use more granual units;
    
    event LogPayout(address user, uint256 stakedAmount, uint256 rewardAmount);

    
    constructor(DeffectToken _deffectToken, DaiToken _daiToken) {
        deffectToken = _deffectToken;
        daiToken = _daiToken;   
    }

    
    function stakeDai(uint256 _amount) public {
        
        daiToken.transferFrom(msg.sender, address(this),  _amount);
        
    }
    
    // 1. Stake Tokens. (deposit)

    // 2. Unstake Tokens. (withdraw)

    // 3. Issuing Tokens. (earn tokens as reward for staking)
}