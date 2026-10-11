// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ISkillToken Interface
 * @dev Interface for interacting with Week 2 ERC-20 SkillToken smart contract.
 */
interface ISkillToken {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
