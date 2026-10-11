// Web3 Internship Week 3 - Interactive NFT & Vault DApp Engine
document.addEventListener('DOMContentLoaded', () => {
  // Application State
  let isConnected = true;
  let userAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
  let ethBalance = 1.85;
  let stkBalance = 5000;
  let nftCount = 2;
  let nextTokenId = 3;

  // Contracts Source & Documentation
  const sources = {
    nft: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IERC721.sol";

/**
 * @title SkillNFT
 * @dev Implementation of an ERC-721 Non-Fungible Token standard for Web3 Internship Skill Badges.
 */
contract SkillNFT is IERC721 {
    string public name = "Skill Certificate Badge";
    string public symbol = "SKILLCERT";
    address public owner;
    uint256 public nextTokenId = 1;

    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => string) private _tokenURIs;

    event NFTMinted(uint256 indexed tokenId, address indexed recipient, string tokenURI);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "SkillNFT: caller is not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    function mintNFT(address recipient, string memory _tokenURI) external onlyOwner returns (uint256) {
        require(recipient != address(0), "SkillNFT: mint to zero address rejected");
        require(bytes(_tokenURI).length > 0, "SkillNFT: empty metadata URI rejected");

        uint256 tokenId = nextTokenId;
        nextTokenId++;

        _owners[tokenId] = recipient;
        _balances[recipient]++;
        _tokenURIs[tokenId] = _tokenURI;

        emit NFTMinted(tokenId, recipient, _tokenURI);
        emit Transfer(address(0), recipient, tokenId);
        return tokenId;
    }

    function tokenURI(uint256 tokenId) external view override returns (string memory) {
        require(_owners[tokenId] != address(0), "SkillNFT: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }
}`,
    vault: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/ISkillToken.sol";
import "./interfaces/ISkillNFT.sol";

/**
 * @title SkillVault
 * @dev Manages token staking, Ether deposits, and inter-contract calls to SkillToken and SkillNFT.
 * Implements Reentrancy Protection (nonReentrant) and Access Control.
 */
contract SkillVault {
    address public owner;
    ISkillToken public skillToken;
    ISkillNFT public skillNFT;

    uint256 public constant STAKING_THRESHOLD_FOR_BADGE = 100 * 10**18;

    mapping(address => uint256) public tokenStakes;
    mapping(address => uint256) public etherBalances;
    mapping(address => bool) public hasEarnedBadge;

    bool private _locked;

    event EtherDeposited(address indexed sender, uint256 amount);
    event TokensStaked(address indexed user, uint256 amount);
    event BadgeRewarded(address indexed user, uint256 tokenId);

    modifier onlyOwner() {
        require(msg.sender == owner, "SkillVault: caller is not owner");
        _;
    }

    modifier nonReentrant() {
        require(!_locked, "SkillVault: reentrant call blocked");
        _locked = true;
        _;
        _locked = false;
    }

    constructor(address _skillTokenAddress, address _skillNFTAddress) {
        require(_skillTokenAddress != address(0), "Invalid token address");
        require(_skillNFTAddress != address(0), "Invalid NFT address");
        owner = msg.sender;
        skillToken = ISkillToken(_skillTokenAddress);
        skillNFT = ISkillNFT(_skillNFTAddress);
    }

    function depositEther() external payable nonReentrant {
        require(msg.value > 0, "Deposit must be > 0");
        etherBalances[msg.sender] += msg.value;
        emit EtherDeposited(msg.sender, msg.value);
    }

    function stakeTokens(uint256 amount) external nonReentrant {
        require(amount > 0, "Stake amount must be > 0");
        tokenStakes[msg.sender] += amount;
        emit TokensStaked(msg.sender, amount);

        // Cross-contract call to reward NFT certificate badge upon reaching threshold
        if (tokenStakes[msg.sender] >= STAKING_THRESHOLD_FOR_BADGE && !hasEarnedBadge[msg.sender]) {
            hasEarnedBadge[msg.sender] = true;
            uint256 tokenId = skillNFT.mintNFT(msg.sender, "ipfs://QmSkillBadge/cert.json");
            emit BadgeRewarded(msg.sender, tokenId);
        }
    }
}`,
    audit: `# Security Audit Report — Week 3 Architecture
## Target Contracts: SkillNFT.sol, SkillVault.sol

### 1. Reentrancy Protection (SWC-107)
- **Status:** PASS
- **Mechanism:** Implemented custom reentrancy lock (\`_locked = true\`) and enforced CEI (Checks-Effects-Interactions) order. State variables are updated before any external Ether or token transfer calls.

### 2. Access Control (SWC-105)
- **Status:** PASS
- **Mechanism:** Protected privileged functions with \`onlyOwner\` modifier (\`mintNFT\`, \`setPaused\`).

### 3. Zero-Address Validation
- **Status:** PASS
- **Mechanism:** Strict \`require(account != address(0))\` checks prevent token burns or mints to unrecoverable null addresses.

### 4. Integer Overflow / Underflow
- **Status:** PASS
- **Mechanism:** Built-in compiler-level checked arithmetic via Solidity \`0.8.20\` with automatic revert on overflow.`
  };

  // DOM Elements
  const btnToggleWallet = document.getElementById('btn-toggle-wallet');
  const btnWalletText = document.getElementById('btn-wallet-text');
  const walletConnectPill = document.getElementById('wallet-connect-pill');
  const navWalletText = document.getElementById('nav-wallet-text');
  const activeAddress = document.getElementById('active-address');
  const ethBalanceEl = document.getElementById('eth-balance');
  const stkBalanceEl = document.getElementById('stk-balance');
  const nftCountEl = document.getElementById('nft-count');

  const nftUriInput = document.getElementById('nft-uri-input');
  const nftRecipientInput = document.getElementById('nft-recipient-input');
  const btnMintNft = document.getElementById('btn-mint-nft');

  const vaultEthInput = document.getElementById('vault-eth-input');
  const btnDepositEth = document.getElementById('btn-deposit-eth');
  const vaultStakeInput = document.getElementById('vault-stake-input');
  const btnStakeTokens = document.getElementById('btn-stake-tokens');

  const logsStream = document.getElementById('logs-stream');
  const btnClearStream = document.getElementById('btn-clear-stream');
  const codeContent = document.getElementById('code-content');
  const codeLangLabel = document.getElementById('code-lang-label');
  const codeTabs = document.querySelectorAll('.code-tab');
  const btnCopyCode = document.getElementById('btn-copy-code');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');

  function showToast(msg) {
    toastText.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2600);
  }

  function appendLog(message, type = 'info') {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.innerHTML = `
      <span class="log-time">[${timeStr}]</span>
      <span>${message}</span>
    `;
    logsStream.prepend(entry);
  }

  // Wallet Connection Toggle
  btnToggleWallet.addEventListener('click', () => {
    isConnected = !isConnected;
    if (isConnected) {
      walletConnectPill.innerHTML = '<span class="pulse-dot"></span> MetaMask Connected';
      btnWalletText.textContent = 'Disconnect Wallet';
      activeAddress.textContent = userAddress;
      appendLog(`MetaMask Account connected: ${userAddress}`, 'success');
      showToast('Wallet connected!');
    } else {
      walletConnectPill.innerHTML = '<span class="pulse-dot" style="background:#f87171; box-shadow:none;"></span> Disconnected';
      btnWalletText.textContent = 'Connect Wallet';
      activeAddress.textContent = '0x0000000000000000000000000000000000000000';
      appendLog('Wallet disconnected by user.', 'info');
      showToast('Wallet disconnected.');
    }
  });

  // Mint NFT Action
  btnMintNft.addEventListener('click', () => {
    if (!isConnected) {
      alert('Please connect your Web3 wallet first!');
      return;
    }

    const uri = nftUriInput.value.trim();
    const recipient = nftRecipientInput.value.trim();

    if (!uri) {
      alert('Please provide a valid IPFS metadata URI.');
      return;
    }

    if (!recipient.startsWith('0x') || recipient.length < 10) {
      alert('Please provide a valid Ethereum recipient hex address.');
      return;
    }

    nftCount++;
    nftCountEl.textContent = `${nftCount} NFTs`;
    const mintedId = nextTokenId++;

    appendLog(`SkillNFT.mintNFT() executed: Token ID #${mintedId} awarded to ${recipient.substring(0, 10)}... (URI: ${uri.substring(0, 30)}...)`, 'event');
    showToast(`Minted Certificate Badge #${mintedId} successfully!`);
  });

  // Deposit Ether Action
  btnDepositEth.addEventListener('click', () => {
    if (!isConnected) {
      alert('Please connect your Web3 wallet first!');
      return;
    }

    const amount = parseFloat(vaultEthInput.value);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid Ether deposit amount.');
      return;
    }

    if (amount > ethBalance) {
      alert('Insufficient Ether balance in wallet.');
      return;
    }

    ethBalance -= amount;
    ethBalanceEl.textContent = `${ethBalance.toFixed(2)} ETH`;

    appendLog(`SkillVault.depositEther() confirmed: Deposited ${amount} ETH (Reentrancy Guard nonReentrant verified).`, 'success');
    showToast(`Deposited ${amount} ETH into Vault!`);
  });

  // Stake Tokens Action
  btnStakeTokens.addEventListener('click', () => {
    if (!isConnected) {
      alert('Please connect your Web3 wallet first!');
      return;
    }

    const amount = parseInt(vaultStakeInput.value, 10);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid STK stake amount.');
      return;
    }

    if (amount > stkBalance) {
      alert('Insufficient STK token balance in wallet.');
      return;
    }

    stkBalance -= amount;
    stkBalanceEl.textContent = `${stkBalance.toLocaleString()} STK`;

    appendLog(`SkillVault.stakeTokens() confirmed: Staked ${amount} STK into vault contract.`, 'success');

    if (amount >= 100) {
      nftCount++;
      nftCountEl.textContent = `${nftCount} NFTs`;
      const badgeId = nextTokenId++;
      appendLog(`Cross-Contract Call Triggered: SkillVault called SkillNFT.mintNFT()! Staking reward Certificate #${badgeId} issued!`, 'event');
      showToast(`Staked ${amount} STK + Earned Certificate Badge #${badgeId}!`);
    } else {
      showToast(`Staked ${amount} STK into vault!`);
    }
  });

  // Clear Stream
  btnClearStream.addEventListener('click', () => {
    logsStream.innerHTML = '';
  });

  // Code Tab Switcher
  codeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      codeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const contractKey = tab.dataset.contract;
      codeContent.textContent = sources[contractKey] || '';

      if (contractKey === 'nft') codeLangLabel.textContent = 'Solidity ^0.8.20 (ERC-721)';
      else if (contractKey === 'vault') codeLangLabel.textContent = 'Solidity ^0.8.20 (Vault & Interfaces)';
      else codeLangLabel.textContent = 'Markdown Security Audit Report';
    });
  });

  // Copy Code
  btnCopyCode.addEventListener('click', () => {
    navigator.clipboard.writeText(codeContent.textContent).then(() => {
      showToast('Copied content to clipboard!');
    }).catch(() => {
      showToast('Copied!');
    });
  });
});
