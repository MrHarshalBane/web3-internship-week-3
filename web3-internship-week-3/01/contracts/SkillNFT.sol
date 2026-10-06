// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IERC721.sol";

/**
 * @title SkillNFT
 * @dev Implementation of an ERC-721 Non-Fungible Token standard for Web3 Internship Skill Badges.
 * Provides minting capabilities, token URI metadata mapping, ownership tracking, and access control.
 */
contract SkillNFT is IERC721 {
    // Token details
    string public name;
    string public symbol;
    address public owner;
    uint256 public nextTokenId;

    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;

    // Mapping from token ID to approved address
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    // Mapping from token ID to metadata URI string
    mapping(uint256 => string) private _tokenURIs;

    // Custom Event for NFT Minting
    event NFTMinted(uint256 indexed tokenId, address indexed recipient, string tokenURI);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    // Custom Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "SkillNFT: caller is not the contract owner");
        _;
    }

    /**
     * @dev Initializes the contract with token name and symbol.
     * Sets contract deployer as owner and initializes token counter.
     */
    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
        owner = msg.sender;
        nextTokenId = 1;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    /**
     * @notice Mints a new Skill NFT badge to a recipient address.
     * @param recipient The address receiving the minted NFT.
     * @param _tokenURI Metadata URI (IPFS / JSON string) detailing the skill certificate.
     * @return tokenId The unique ID of the newly minted NFT.
     */
    function mintNFT(address recipient, string memory _tokenURI) external onlyOwner returns (uint256) {
        require(recipient != address(0), "SkillNFT: mint to zero address");
        require(bytes(_tokenURI).length > 0, "SkillNFT: URI cannot be empty");

        uint256 tokenId = nextTokenId;
        _owners[tokenId] = recipient;
        _balances[recipient] += 1;
        _tokenURIs[tokenId] = _tokenURI;

        nextTokenId += 1;

        emit Transfer(address(0), recipient, tokenId);
        emit NFTMinted(tokenId, recipient, _tokenURI);

        return tokenId;
    }

    /**
     * @notice Returns metadata URI for a specific token ID.
     */
    function tokenURI(uint256 tokenId) external view returns (string memory) {
        require(_owners[tokenId] != address(0), "SkillNFT: URI query for non-existent token");
        return _tokenURIs[tokenId];
    }

    /**
     * @notice Returns total minted tokens count.
     */
    function totalSupply() external view returns (uint256) {
        return nextTokenId - 1;
    }

    /**
     * @dev IERC721: Returns balance of owner.
     */
    function balanceOf(address _owner) external view override returns (uint256) {
        require(_owner != address(0), "SkillNFT: balance query for zero address");
        return _balances[_owner];
    }

    /**
     * @dev IERC721: Returns owner of token ID.
     */
    function ownerOf(uint256 tokenId) public view override returns (address) {
        address tokenOwner = _owners[tokenId];
        require(tokenOwner != address(0), "SkillNFT: owner query for non-existent token");
        return tokenOwner;
    }

    /**
     * @dev IERC721: Approves an address to transfer a specific token ID.
     */
    function approve(address to, uint256 tokenId) external override {
        address tokenOwner = ownerOf(tokenId);
        require(to != tokenOwner, "SkillNFT: approval to current owner");
        require(
            msg.sender == tokenOwner || isApprovedForAll(tokenOwner, msg.sender),
            "SkillNFT: caller is not token owner nor approved operator"
        );

        _tokenApprovals[tokenId] = to;
        emit Approval(tokenOwner, to, tokenId);
    }

    /**
     * @dev IERC721: Gets approved address for a token ID.
     */
    function getApproved(uint256 tokenId) external view override returns (address) {
        require(_owners[tokenId] != address(0), "SkillNFT: approved query for non-existent token");
        return _tokenApprovals[tokenId];
    }

    /**
     * @dev IERC721: Enables or disables an operator to manage all caller assets.
     */
    function setApprovalForAll(address operator, bool approved) external override {
        require(operator != msg.sender, "SkillNFT: approve to caller");
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    /**
     * @dev IERC721: Checks if an operator is approved for an owner.
     */
    function isApprovedForAll(address _owner, address operator) public view override returns (bool) {
        return _operatorApprovals[_owner][operator];
    }

    /**
     * @dev IERC721: Transfers token ID from one address to another.
     */
    function transferFrom(address from, address to, uint256 tokenId) public override {
        require(_isApprovedOrOwner(msg.sender, tokenId), "SkillNFT: transfer caller is not owner nor approved");
        require(ownerOf(tokenId) == from, "SkillNFT: transfer from incorrect owner");
        require(to != address(0), "SkillNFT: transfer to zero address");

        // Clear approvals
        _tokenApprovals[tokenId] = address(0);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    /**
     * @dev IERC721: Safely transfers token ID.
     */
    function safeTransferFrom(address from, address to, uint256 tokenId) external override {
        transferFrom(from, to, tokenId);
    }

    /**
     * @notice Transfers ownership of contract to a new address.
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "SkillNFT: new owner is zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    /**
     * @dev Internal helper checking if spender is owner or approved.
     */
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        address tokenOwner = ownerOf(tokenId);
        return (spender == tokenOwner || _tokenApprovals[tokenId] == spender || isApprovedForAll(tokenOwner, spender));
    }
}
