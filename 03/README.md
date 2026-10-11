# Module 03: Web3 Frontend Integration & Ethers.js Client

## Overview
Module 03 bridges smart contract backend logic with a client-side user interface. We build an interactive **Web3 Frontend Application** using HTML5, Tailwind CSS, JavaScript, and `Ethers.js` / Web3 provider integration to interact with `SkillNFT.sol` and `SkillVault.sol`.

---

## Technical Stack & Architecture

- **Web3 Provider:** `window.ethereum` (MetaMask / EIP-1193 standard).
- **Client Library:** `Ethers.js` (v6).
- **Interface Styling:** HTML5 + Tailwind CSS.
- **Contract ABIs:** JSON definitions stored in `abi/SkillNFT.json` and `abi/SkillVault.json`.

```text
Browser User Interface (index.html)
       │
       ▼
Web3 Provider Helper (src/web3-provider.js)
       │
       ▼
MetaMask Signer / RPC Node
       │
       ▼
Smart Contracts on Ethereum EVM (SkillNFT / SkillVault)
```

---

## Directory Structure

```text
03/
├── README.md
├── package.json        # Dependencies & serve scripts
├── index.html          # Web3 DApp Dashboard UI
├── abi/
│   ├── SkillNFT.json   # Contract ABI for SkillNFT
│   └── SkillVault.json # Contract ABI for SkillVault
└── src/
    ├── app.js          # Main UI event handlers & Web3 calls
    └── web3-provider.js# Wallet connection & EIP-1193 wrapper
```

---

## Running the DApp Interface

1. Start a local HTTP server:
   ```bash
   cd 03
   npm run start
   ```
2. Open `http://localhost:3000` or `index.html` in a web browser with MetaMask installed.
3. Click **Connect MetaMask** to pair your browser wallet.
4. Interact with NFT minting and Vault deposit interfaces.
