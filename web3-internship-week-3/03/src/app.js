/**
 * Main Web3 Application Script
 * Connects UI elements to Web3 Provider & Smart Contract interaction methods.
 */

// Simulated contract config placeholders
const CONFIG = {
    SKILL_NFT_ADDRESS: "0x0000000000000000000000000000000000000000", // ADD YOUR REAL CONTRACT ADDRESS HERE
    SKILL_VAULT_ADDRESS: "0x0000000000000000000000000000000000000000" // ADD YOUR REAL CONTRACT ADDRESS HERE
};

let currentAccount = null;

function logActivity(message, type = "info") {
    const logBox = document.getElementById("logBox");
    if (!logBox) {
        console.log(`[${type.toUpperCase()}] ${message}`);
        return;
    }
    const timestamp = new Date().toLocaleTimeString();
    const entry = document.createElement("div");
    entry.className = `p-1 border-b text-sm ${type === "error" ? "text-red-600 font-semibold" : "text-gray-800"}`;
    entry.innerText = `[${timestamp}] ${message}`;
    logBox.prepend(entry);
}

async function handleConnectWallet() {
    logActivity("Initiating Web3 Wallet Connection request...");
    if (typeof window.ethereum === "undefined") {
        logActivity("MetaMask provider not detected. Please install a Web3 wallet extension.", "error");
        alert("MetaMask not found! Please install MetaMask extension to test real wallet interactions.");
        return;
    }

    try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        currentAccount = accounts[0];
        document.getElementById("walletAddress").innerText = currentAccount;
        document.getElementById("statusBadge").innerText = "Connected";
        document.getElementById("statusBadge").className = "px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800";
        logActivity(`Wallet Connected: ${currentAccount}`);
    } catch (err) {
        logActivity(`Wallet Connection rejected/failed: ${err.message}`, "error");
    }
}

async function handleMintNFT() {
    if (!currentAccount) {
        alert("Please connect your wallet first!");
        return;
    }

    const uriInput = document.getElementById("nftUriInput").value.trim();
    if (!uriInput) {
        alert("Please enter a valid Token URI metadata URL.");
        return;
    }

    logActivity(`Preparing to mint NFT to ${currentAccount} with URI: ${uriInput}`);
    logActivity(`Placeholder: Transaction signing requires contract deployment on testnet/local EVM.`);
    alert(`NFT Minting triggered!\nRecipient: ${currentAccount}\nMetadata URI: ${uriInput}\n\nNote: Deploy contract to Sepolia testnet to submit live transactions.`);
}

async function handleDepositEther() {
    if (!currentAccount) {
        alert("Please connect your wallet first!");
        return;
    }

    const amount = document.getElementById("ethAmountInput").value;
    if (!amount || amount <= 0) {
        alert("Enter a valid Ether amount!");
        return;
    }

    logActivity(`Initiating Vault Ether deposit of ${amount} ETH from account ${currentAccount}`);
    alert(`Deposit triggered for ${amount} ETH into Vault.\nAdd real contract deployment to process transaction.`);
}

// Module export for CLI testing environment
if (typeof module !== "undefined") {
    module.exports = { CONFIG, handleConnectWallet, handleMintNFT, handleDepositEther };
}
