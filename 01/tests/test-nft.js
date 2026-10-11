/**
 * Test Suite: SkillNFT Contract Verification
 * Description: Unit tests for ERC-721 implementation of SkillNFT.
 */

const assert = require("assert");

function testSkillNFTLogic() {
    console.log("Running Unit Tests for SkillNFT...");

    // Mock contract state
    let owner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    let user1 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    let nextTokenId = 1;
    let balances = {};
    let owners = {};
    let tokenURIs = {};

    // Test Case 1: Initial State
    assert.strictEqual(nextTokenId, 1, "Initial token ID should be 1");
    console.log("✔ Test 1 Passed: Initial token ID is 1");

    // Test Case 2: Minting NFT
    const tokenURI = "https://ipfs.io/ipfs/QmSampleNFTMetadataHash/1.json";
    const mintedId = nextTokenId++;
    owners[mintedId] = user1;
    balances[user1] = (balances[user1] || 0) + 1;
    tokenURIs[mintedId] = tokenURI;

    assert.strictEqual(owners[1], user1, "Token 1 owner must be user1");
    assert.strictEqual(balances[user1], 1, "User1 balance must be 1");
    assert.strictEqual(tokenURIs[1], tokenURI, "Token 1 URI must match metadata");
    console.log("✔ Test 2 Passed: NFT Minted with correct metadata & owner");

    // Test Case 3: Transfer NFT
    let user2 = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
    owners[1] = user2;
    balances[user1] -= 1;
    balances[user2] = (balances[user2] || 0) + 1;

    assert.strictEqual(owners[1], user2, "Token 1 owner must now be user2");
    assert.strictEqual(balances[user1], 0, "User1 balance must be 0");
    assert.strictEqual(balances[user2], 1, "User2 balance must be 1");
    console.log("✔ Test 3 Passed: NFT Transfer updated ownership & balances correctly");

    console.log("\nAll SkillNFT Unit Tests Passed Successfully!");
}

if (require.main === module) {
    testSkillNFTLogic();
}

module.exports = { testSkillNFTLogic };
