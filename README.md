# Web3 Internship Week 3 Project Repository

**Skill Set Go EduTech Blockchain & Web3 Internship — Week 3 Execution Project**

---

## 📌 Week 3 Objectives
The primary objective of Week 3 is to build advanced smart contract systems, inter-contract interoperability architectures, client-side Web3 frontend integrations, and security auditing frameworks as a practical continuation of Week 2.

### Primary Goals Achieved:
1. **ERC-721 Non-Fungible Token Standard:** Developed `SkillNFT.sol` to issue digital skill certificate badges linked to decentralized IPFS metadata URIs.
2. **Smart Contract Interoperability & Interfaces:** Engineered `SkillVault.sol` which calls external ERC-20 (`SkillToken`) and ERC-721 (`SkillNFT`) contracts via interfaces (`ISkillToken`, `ISkillNFT`).
3. **Web3 Client-Side Frontend Integration:** Built an interactive Web3 DApp Dashboard using HTML5, Tailwind CSS, JavaScript, and `Ethers.js` paired with browser wallet extensions (MetaMask).
4. **Automated Testing & Security Audit:** Created multi-stage test suites and performed security assessments covering Reentrancy Protection (`nonReentrant`), Checks-Effects-Interactions, Access Control (`onlyOwner`), and Zero-Address Validation.

---

## 📂 Repository Directory Structure

```text
web3-internship-week-3/
├── README.md                      # Root Project Documentation
├── .gitignore                     # Git Exclusion Rules for Node/Hardhat
├── 01/                            # Module 01: ERC-721 NFT Smart Contract
│   ├── README.md                  # Module 01 Overview & Guide
│   ├── contracts/                 # IERC721.sol & SkillNFT.sol
│   ├── scripts/                   # interact-nft.js
│   └── tests/                     # test-nft.js & test-report.md
├── 02/                            # Module 02: Interoperability & Vault
│   ├── README.md                  # Module 02 Overview & Architecture
│   ├── contracts/                 # interfaces/ & SkillVault.sol
│   └── tests/                     # test-vault.js & test-report.md
├── 03/                            # Module 03: Web3 Frontend Integration
│   ├── README.md                  # Module 03 Frontend Setup Guide
│   ├── package.json               # NPM Dependencies & Scripts
│   ├── index.html                 # Interactive DApp Dashboard UI
│   ├── abi/                       # SkillNFT.json & SkillVault.json
│   └── src/                       # app.js & web3-provider.js
├── 04/                            # Module 04: Testing, Security & Deployment
│   ├── README.md                  # Module 04 Pipeline Overview
│   ├── scripts/                   # deploy.js
│   ├── tests/                     # suite.test.js
│   ├── security-audit.md          # Comprehensive Security Audit Report
│   ├── deployment.md              # Testnet Deployment Guide & Logs
│   └── test-report.md             # Master Test Execution Summary
└── evidence/                      # Submission Evidence & Checklists
    ├── week-3-checklist.md        # Requirements Verification Checklist
    ├── reflection.md              # Personal Learning & Engineering Reflection
    └── deployment-evidence-template.md # Testnet Evidence Template
```

---

## 🛠️ Technologies & Tools Used
- **Smart Contract Language:** `Solidity 0.8.20`
- **Development & Runtime Environment:** `Node.js v24.21.0`, `NPM v11.19.0`
- **Client Web3 Library:** `Ethers.js v6.11.1`
- **Frontend Technologies:** `HTML5`, `Tailwind CSS`, `JavaScript (ES6+)`
- **Wallet Provider Protocol:** `MetaMask / EIP-1193 RPC`
- **Token Standards:** `ERC-20 (Fungible)`, `ERC-721 (Non-Fungible)`
- **Security Mechanics:** `ReentrancyGuard`, `Checks-Effects-Interactions`, `AccessControl`

---

## 🚀 How to Run & Test Projects

### 1. Execute Module 01 NFT Unit Tests
```bash
node 01/tests/test-nft.js
node 01/scripts/interact-nft.js
```

### 2. Execute Module 02 Interoperability Vault Tests
```bash
node 02/tests/test-vault.js
```

### 3. Launch Module 03 Web3 Frontend DApp
```bash
cd 03
npm run start
# Open http://localhost:3000 in browser with MetaMask
```

### 4. Execute Module 04 Master Integration Test Suite
```bash
node 04/tests/suite.test.js
```

---

## 🛡️ Security & Evidence Compliance

- **No Private Keys / Secrets:** This repository strictly excludes private keys, seed phrases, API keys, or wallet credentials.
- **Evidence Honesty Policy:** All deployment fields use explicit placeholders (`ADD YOUR REAL DEPLOYMENT HASH HERE`) to avoid fake transaction hash claims prior to actual testnet execution.

---

## 🎓 Learning Outcomes Summary
- Mastered ERC-721 NFT minting, token ownership tracking, and IPFS metadata URI association.
- Designed smart contract interoperability architectures using interfaces and safe token transfers.
- Implemented Reentrancy Guards and Checks-Effects-Interactions pattern for fund security.
- Developed client-side Web3 frontend integrations using Ethers.js and window.ethereum.
