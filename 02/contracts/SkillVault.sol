// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/ISkillToken.sol";
import "./interfaces/ISkillNFT.sol";

/**
 * @title SkillVault
 * @dev Manages token staking, Ether deposits, and inter-contract calls to SkillToken and SkillNFT.
 * Implements Reentrancy Protection and Access Control.
 */
contract SkillVault {
    address public owner;
    ISkillToken public skillToken;
    ISkillNFT public skillNFT;

    uint256 public constant STAKING_THRESHOLD_FOR_BADGE = 100 * 10**18; // 100 SKILL tokens

    // Mappings
    mapping(address => uint256) public tokenStakes;
    mapping(address => uint256) public etherBalances;
    mapping(address => bool) public hasEarnedBadge;

    // Security Reentrancy Lock
    bool private _locked;

    // Events
    event EtherDeposited(address indexed sender, uint256 amount);
    event EtherWithdrawn(address indexed recipient, uint256 amount);
    event TokensStaked(address indexed user, uint256 amount);
    event TokensUnstaked(address indexed user, uint256 amount);
    event BadgeRewarded(address indexed user, uint256 tokenId);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

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
        require(_skillTokenAddress != address(0), "SkillVault: invalid token address");
        require(_skillNFTAddress != address(0), "SkillVault: invalid NFT address");
        owner = msg.sender;
        skillToken = ISkillToken(_skillTokenAddress);
        skillNFT = ISkillNFT(_skillNFTAddress);
    }

    /**
     * @notice Deposit native Ether into the vault.
     */
    function depositEther() external payable nonReentrant {
        require(msg.value > 0, "SkillVault: deposit must be greater than zero");
        etherBalances[msg.sender] += msg.value;
        emit EtherDeposited(msg.sender, msg.value);
    }

    /**
     * @notice Withdraw deposited native Ether from the vault.
     */
    function withdrawEther(uint256 amount) external nonReentrant {
        require(amount > 0, "SkillVault: withdrawal amount must be greater than zero");
        require(etherBalances[msg.sender] >= amount, "SkillVault: insufficient Ether balance");

        // Checks-Effects-Interactions pattern
        etherBalances[msg.sender] -= amount;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "SkillVault: Ether transfer failed");

        emit EtherWithdrawn(msg.sender, amount);
    }

    /**
     * @notice Stake ERC-20 Skill Tokens into the vault.
     * Interacts with external ISkillToken contract via transferFrom.
     */
    function stakeTokens(uint256 amount) external nonReentrant {
        require(amount > 0, "SkillVault: stake amount must be > 0");

        // Transfer tokens from user to vault
        bool success = skillToken.transferFrom(msg.sender, address(this), amount);
        require(success, "SkillVault: token transfer failed");

        tokenStakes[msg.sender] += amount;
        emit TokensStaked(msg.sender, amount);

        // Check if user qualifies for an NFT badge
        if (tokenStakes[msg.sender] >= STAKING_THRESHOLD_FOR_BADGE && !hasEarnedBadge[msg.sender]) {
            hasEarnedBadge[msg.sender] = true;
            string memory metadataURI = "https://ipfs.io/ipfs/QmVaultStakerBadge/metadata.json";
            
            // Inter-contract call to SkillNFT contract
            try skillNFT.mintNFT(msg.sender, metadataURI) returns (uint256 tokenId) {
                emit BadgeRewarded(msg.sender, tokenId);
            } catch {
                // Graceful fallback if NFT minting fails or permission denied
            }
        }
    }

    /**
     * @notice Unstake ERC-20 Skill Tokens from the vault.
     */
    function unstakeTokens(uint256 amount) external nonReentrant {
        require(amount > 0, "SkillVault: unstake amount must be > 0");
        require(tokenStakes[msg.sender] >= amount, "SkillVault: insufficient stake");

        tokenStakes[msg.sender] -= amount;

        bool success = skillToken.transfer(msg.sender, amount);
        require(success, "SkillVault: token return failed");

        emit TokensUnstaked(msg.sender, amount);
    }

    /**
     * @dev Receive function for incoming plain Ether transfers.
     */
    receive() external payable {
        etherBalances[msg.sender] += msg.value;
        emit EtherDeposited(msg.sender, msg.value);
    }

    /**
     * @dev Fallback function for non-matching calls with value.
     */
    fallback() external payable {
        etherBalances[msg.sender] += msg.value;
        emit EtherDeposited(msg.sender, msg.value);
    }
}
