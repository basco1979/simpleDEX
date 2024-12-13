// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "./node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract TokenA is ERC20, Ownable {
    constructor() 
    ERC20("TokenA", "TKA")
    Ownable(msg.sender)
    {
            _mint(msg.sender, 1000 * 10 ** decimals()); 
    }
}