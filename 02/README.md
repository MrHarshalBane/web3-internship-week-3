# Module 02: Inter-Contract Interoperability, Interfaces & Inheritance

## Overview
Module 02 demonstrates how smart contracts communicate with each other on the Ethereum blockchain. We construct `SkillVault.sol`, a smart contract vault that interfaces directly with both the **ERC-20 `SkillToken`** (from Week 2) and the **ERC-721 `SkillNFT`** (from Module 01).

---

## Architecture & Design Patterns

### 1. Smart Contract Interfaces
By defining `ISkillToken.sol` and `ISkillNFT.sol`, `SkillVault` can call external contract functions (`transferFrom`, `transfer`, `mintNFT`) without embedding their full source implementations.

```mermaid
graph TD
    User["User / Wallet"] -->|1. Stakes ERC-20 Tokens| Vault["SkillVault.sol"]
    Vault -->|2. transferFrom()| Token["SkillToken.sol (ERC-20)"]
    Vault -->|3. Threshold Met? mintNFT()| NFT["SkillNFT.sol (ERC-721)"]
    NFT -->|4. Certificate NFT Minted| User
```

### 2. Security Patterns
- **Reentrancy Protection (`nonReentrant`):** Protects state during external Ether transfers using a non-reentrant state lock.
- **Checks-Effects-Interactions Pattern:** Updates contract balance states *before* executing low-level `.call{value: amount}("")` Ether transfers.
- **Fallback & Receive Functions:** Standardized handling of direct Ether transfers to the contract address.

---

## Directory Structure

```text
02/
├── README.md
├── contracts/
│   ├── interfaces/
│   │   ├── ISkillToken.sol   # Interface for ERC-20 Token
│   │   └── ISkillNFT.sol     # Interface for ERC-721 NFT
│   └── SkillVault.sol        # Vault & Staking Implementation
└── tests/
    ├── test-vault.js         # Interoperability Test Runner
    └── test-report.md        # Detailed Test Report
```

---

## How to Run Tests

To execute the Vault interoperability test runner:
```bash
node 02/tests/test-vault.js
```
