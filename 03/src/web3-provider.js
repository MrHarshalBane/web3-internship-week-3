/**
 * Web3 Provider Helper Module
 * Facilitates Ethereum wallet (MetaMask) injection, account loading, and network verification.
 */

class Web3ProviderHelper {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.userAddress = null;
    }

    /**
     * Checks if an Ethereum provider (e.g., MetaMask) is available in browser window.
     */
    isWeb3Available() {
        return typeof window !== "undefined" && typeof window.ethereum !== "undefined";
    }

    /**
     * Requests user account connection from MetaMask.
     */
    async connectWallet() {
        if (!this.isWeb3Available()) {
            throw new Error("MetaMask is not installed. Please install MetaMask to use Web3 features.");
        }

        try {
            // Request accounts via EIP-1193 RPC call
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            if (!accounts || accounts.length === 0) {
                throw new Error("No accounts returned from wallet connection request.");
            }

            this.userAddress = accounts[0];
            console.log("Wallet connected successfully:", this.userAddress);

            return {
                address: this.userAddress,
                connected: true
            };
        } catch (error) {
            console.error("Wallet connection failed:", error);
            throw error;
        }
    }

    /**
     * Retrieves current Network Chain ID.
     */
    async getChainId() {
        if (!this.isWeb3Available()) return null;
        const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
        return parseInt(chainIdHex, 16);
    }
}

if (typeof module !== "undefined") {
    module.exports = { Web3ProviderHelper };
}
