const { ethers } = require("hardhat");
require("dotenv").config();

async function checkSetup() {
  console.log("🔍 Checking your setup for BetterYield deployment...\n");

  // Check private key
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey || privateKey === "your_private_key_here") {
    console.log("❌ Private key not set in .env file");
    console.log("📝 Please update PRIVATE_KEY in .env file with your wallet's private key");
    return false;
  }

  try {
    // Connect to Arbitrum Sepolia
    const provider = new ethers.JsonRpcProvider("https://sepolia-rollup.arbitrum.io/rpc");
    const wallet = new ethers.Wallet(privateKey, provider);
    
    console.log("✅ Wallet Address:", wallet.address);
    
    // Check balance
    const balance = await provider.getBalance(wallet.address);
    const ethBalance = ethers.formatEther(balance);
    
    console.log("💰 ETH Balance:", ethBalance, "ETH");
    
    if (parseFloat(ethBalance) < 0.01) {
      console.log("⚠️  Warning: Low ETH balance. You need at least 0.01 ETH for deployment");
      console.log("🔗 Get testnet ETH from: https://faucets.chain.link/arbitrum-sepolia");
      return false;
    }

    // Check network
    const network = await provider.getNetwork();
    console.log("🌐 Network:", network.name, "(Chain ID:", network.chainId.toString(), ")");
    
    if (network.chainId.toString() !== "421614") {
      console.log("❌ Wrong network. Expected Arbitrum Sepolia (421614)");
      return false;
    }

    console.log("\n✅ Setup looks good! Ready for deployment 🚀");
    return true;

  } catch (error) {
    console.log("❌ Error checking setup:", error.message);
    return false;
  }
}

checkSetup()
  .then((success) => {
    if (success) {
      console.log("\n🎯 Next steps:");
      console.log("1. Run: npm run deploy:contract");
      console.log("2. Run: npm run dev");
    } else {
      console.log("\n🔧 Please fix the issues above before continuing");
    }
  })
  .catch(console.error); 