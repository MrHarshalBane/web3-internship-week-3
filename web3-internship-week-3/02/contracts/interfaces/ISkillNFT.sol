// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ISkillNFT Interface
 * @dev Interface for interacting with Week 3 ERC-721 SkillNFT contract.
 */
interface ISkillNFT {
    function mintNFT(address recipient, string memory tokenURI) external returns (uint256);
    function ownerOf(uint256 tokenId) external view returns (address);
    function balanceOf(address owner) external view returns (uint256);
}
