# Week 3 Personal Reflection Log

## 1. What I Built This Week
In Week 3 of the Skill Set Go EduTech Web3 & Blockchain Internship, I advanced from basic smart contract development into **advanced token standards, multi-contract architectures, client-side Web3 interfaces, and security audits**:

1. **ERC-721 NFT Smart Contract (`SkillNFT.sol`):** Built a non-fungible certificate badge contract capable of minting unique digital credentials linked to IPFS metadata URIs.
2. **Inter-Contract Vault (`SkillVault.sol`):** Engineered a smart contract vault that calls external ERC-20 (`SkillToken`) and ERC-721 (`SkillNFT`) contracts using interfaces (`ISkillToken`, `ISkillNFT`).
3. **Web3 DApp Interface (`index.html` + `app.js` + `Ethers.js`):** Constructed a front-end client dashboard connecting MetaMask browser wallets to smart contract functions.
4. **Security Audit & Master Test Suite:** Conducted a security assessment covering ReentrancyGuard, Checks-Effects-Interactions, and automated JS unit tests.

---

## 2. Key Learning Outcomes
- **ERC-20 vs ERC-721:** Understood how fungible tokens track balances per address, whereas non-fungible tokens pair explicit `tokenId` numbers with metadata URIs.
- **Interfaces & Composability:** Learned how smart contracts invoke functions on external contracts without requiring their full source code.
- **Reentrancy Prevention:** Understood how malicious contracts exploit external Ether calls and how state-locking mutex modifiers prevent reentrancy attacks.
- **Client-Side Web3 Integration:** Mastered `window.ethereum` RPC requests, provider instantiations, and transaction signing mechanics.

---

## 3. Challenges Encountered & Engineering Solutions
- **Challenge:** Preventing reentrancy during native Ether withdrawals in `SkillVault.sol`.
  - **Solution:** Implemented the `nonReentrant` modifier and strict Checks-Effects-Interactions pattern (deducting internal balances *before* invoking external `.call{value: amount}("")`).
- **Challenge:** Managing contract state dependencies during automated testing.
  - **Solution:** Created modular Node.js test runners (`01/tests/test-nft.js`, `02/tests/test-vault.js`, `04/tests/suite.test.js`) to assert contract state changes deterministically.

---

## 4. Next Steps & Future Enhancements
- Deploy `SkillNFT` and `SkillVault` to Ethereum Sepolia testnet using Hardhat.
- Integrate decentralized storage IPFS uploading directly into the DApp frontend UI.
- Implement gas optimization strategies using custom Solidity errors (`error Unauthorized()`) instead of string revert messages.
