# Module 01: Advanced Smart Contracts & ERC-721 Token Standard

## Overview
This module expands smart contract capabilities from ERC-20 fungible tokens to **ERC-721 Non-Fungible Tokens (NFTs)**. In this module, we construct `SkillNFT.sol`, an ERC-721 smart contract engineered to issue digital skill certificates and internship completion badges on the Ethereum blockchain.

---

## Key Concepts & Architecture

### 1. ERC-20 vs ERC-721
- **ERC-20 (Fungible):** Each token unit is identical and interchangeable (e.g., 1 SKILL token = 1 SKILL token).
- **ERC-721 (Non-Fungible):** Every token is unique with a distinct `tokenId` and associated metadata URI pointing to proof-of-work certificates or badges.

### 2. Smart Contract Features in `SkillNFT.sol`
- **Unique Token Minting:** `mintNFT(address recipient, string memory _tokenURI)` enables the contract owner to issue unique certificates.
- **Metadata Association:** `tokenURI(uint256 tokenId)` links on-chain token IDs to decentralized metadata (IPFS JSON files).
- **Ownership & Balance Tracking:** Maintains internal `_owners` and `_balances` mappings complying with the EIP-721 standard.
- **Access Control:** Enforces strict role restriction using the `onlyOwner` modifier.

---

## Directory Structure

```text
01/
├── README.md
├── contracts/
│   ├── IERC721.sol     # ERC-721 Standard Interface
│   └── SkillNFT.sol    # Skill Certificate NFT Implementation
├── scripts/
│   └── interact-nft.js # Interaction demonstration script
└── tests/
    ├── test-nft.js     # Unit test runner
    └── test-report.md  # Detailed test execution report
```

---

## How to Run Tests & Demonstration

To execute the unit test runner:
```bash
node 01/tests/test-nft.js
```

To run the interaction script:
```bash
node 01/scripts/interact-nft.js
```
