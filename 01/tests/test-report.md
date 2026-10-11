# Module 01 Test Execution & Verification Report

## Overview
- **Module:** 01 - ERC-721 Non-Fungible Token Standard (`SkillNFT.sol`)
- **Compiler Version:** `Solidity 0.8.20`
- **Testing Framework:** Custom Node.js & Hardhat Test Suite
- **Environment:** Local Hardhat EVM Node / Local JS Environment

---

## Test Results Summary

| Test ID | Function / Behavior Tested | Description | Expected Outcome | Observed Result | Status |
|---|---|---|---|---|---|
| **NFT-01** | `constructor()` | Verify contract deployment, name, symbol, and owner assignment. | `name = "Skill Certificate NFT"`, `owner = deployer` | `name = "Skill Certificate NFT"`, `owner = deployer` | **PASSED** |
| **NFT-02** | `mintNFT()` | Mint a new NFT badge to a recipient address with metadata URI. | Mint succeeds, `nextTokenId` increments, `NFTMinted` event emitted | Token ID 1 minted to recipient, URI stored | **PASSED** |
| **NFT-03** | `tokenURI()` | Retrieve metadata URI for minted token ID. | Returns correct IPFS metadata link | IPFS JSON metadata URI returned | **PASSED** |
| **NFT-04** | `mintNFT()` Access Control | Non-owner attempts to call `mintNFT()`. | Transaction reverts with `"SkillNFT: caller is not the contract owner"` | Reverted with expected error message | **PASSED** |
| **NFT-05** | `transferFrom()` | Transfer token ID 1 from recipient to secondary account. | `ownerOf(1)` updates to recipient 2, balances update | Ownership successfully updated to recipient 2 | **PASSED** |
| **NFT-06** | `approve()` & `getApproved()` | Approve operator to transfer specific token ID. | Operator address approved for token ID | `getApproved(1)` returns approved operator | **PASSED** |

---

## Code Coverage & Safety Checks
- [x] Zero-address minting protection checked.
- [x] Non-existent token ID query reverted.
- [x] Ownership assertion enforced via `onlyOwner` modifier.
- [x] ERC-721 Interface compliance validated.
