//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./DeffectToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    string public name = "DFT Token Farm";
    DeffectToken public deffectToken;
    DaiToken public daiToken;

    constructor(DeffectToken _deffectToken, DaiToken _daiToken) {
        deffectToken = _deffectToken;
        daiToken = _daiToken;   
    }
     
}
