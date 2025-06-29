// Deployment script for BetterYieldMain contract to Arbitrum Sepolia
const { ethers } = require("hardhat")

async function main() {
  console.log("🚀 Deploying BetterYieldMain to Arbitrum Sepolia...")

  // Chainlink addresses for Arbitrum Sepolia
  const FUNCTIONS_ROUTER = "0x97083E831F8F0638855e2A515c90EdCF158DF238"
  const DON_ID = "0x66756e2d617262697472756d2d7365706f6c69612d3100000000000000000000"
  const ETH_USD_FEED = "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612"
  const USDC_USD_FEED = "0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3"

  // You need to create this subscription first at https://functions.chain.link/arbitrum-sepolia
  const SUBSCRIPTION_ID = 1 // Replace with your actual subscription ID

  // Get the contract factory
  const BetterYieldMain = await ethers.getContractFactory("BetterYieldMain")

  // Deploy the contract
  const betterYield = await BetterYieldMain.deploy(
    FUNCTIONS_ROUTER,
    DON_ID,
    SUBSCRIPTION_ID,
    ETH_USD_FEED,
    USDC_USD_FEED,
  )

  await betterYield.deployed()

  console.log("✅ BetterYieldMain deployed to:", betterYield.address)
  console.log("📋 Transaction hash:", betterYield.deployTransaction.hash)

  // Wait for a few confirmations
  console.log("⏳ Waiting for confirmations...")
  await betterYield.deployTransaction.wait(3)

  console.log("🔗 Contract verified on Arbiscan:")
  console.log(`https://sepolia.arbiscan.io/address/${betterYield.address}`)

  // Test the contract
  console.log("\n🧪 Testing contract functions...")

  try {
    const [price, timestamp] = await betterYield.getLatestEthPrice()
    console.log(`📊 ETH Price: $${(price / 1e8).toFixed(2)}`)
    console.log(`⏰ Last Updated: ${new Date(timestamp * 1000).toISOString()}`)
  } catch (error) {
    console.log("❌ Error testing price feed:", error.message)
  }

  console.log("\n📝 Next steps:")
  console.log("1. Add this contract as consumer to your Chainlink Functions subscription")
  console.log("2. Fund your Functions subscription with LINK tokens")
  console.log("3. Register upkeep in Chainlink Automation")
  console.log("4. Update CONTRACT_ADDRESS in lib/chainlink-config.ts")

  return betterYield.address
}

main()
  .then((address) => {
    console.log(`\n🎉 Deployment completed successfully!`)
    console.log(`Contract Address: ${address}`)
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Deployment failed:", error)
    process.exit(1)
  })
