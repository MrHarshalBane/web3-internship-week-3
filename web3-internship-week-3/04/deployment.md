# Smart Contract Testnet & Local Deployment Guide

## Deployment Environment Requirements

- **Solidity Compiler:** `0.8.20`
- **Supported Networks:** Local EVM Node (Hardhat / Ganache), Sepolia Testnet
- **Tools:** Node.js v18+, Ethers.js v6 / Hardhat

---

## Step-by-Step Deployment Guide

### 1. Local Network Deployment (Hardhat / Ganache)

1. Launch your local Ethereum blockchain node:
   ```bash
   npx hardhat node
   ```
2. Run the deployment script targeting the local network:
   ```bash
   node 04/scripts/deploy.js
   ```

### 2. Sepolia Testnet Deployment

1. Set up testnet environment variables:
   ```bash
   SEPOLIA_RPC_URL="https://sepolia.infura.io/v3/YOUR_API_KEY"
   PRIVATE_KEY="YOUR_TESTNET_PRIVATE_KEY"
   ```
2. Execute deployment to Sepolia:
   ```bash
   npx hardhat run 04/scripts/deploy.js --network sepolia
   ```

---

## Deployment Records & Evidence Log

> [!IMPORTANT]  
> Update this section with your actual deployment output once executed on Sepolia testnet or local EVM.

### Deployment Summary
- **Network Name:** Ethereum Sepolia Testnet / Local Node
- **Compiler Version:** Solidity 0.8.20
- **Deployer Wallet Address:** `ADD YOUR REAL DEPLOYER WALLET ADDRESS HERE`

### Deployed Smart Contracts

| Contract Name | Deployed Address | Transaction Hash | Explorer Link |
|---|---|---|---|
| **SkillNFT** | `ADD YOUR REAL CONTRACT ADDRESS HERE` | `ADD YOUR REAL DEPLOYMENT HASH HERE` | `ADD YOUR REAL EXPLORER LINK HERE` |
| **SkillVault** | `ADD YOUR REAL CONTRACT ADDRESS HERE` | `ADD YOUR REAL DEPLOYMENT HASH HERE` | `ADD YOUR REAL EXPLORER LINK HERE` |
