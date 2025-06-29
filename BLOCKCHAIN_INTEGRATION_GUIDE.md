# 🔗 BetterYield Blockchain Integration Guide

## 🎯 Overview

This guide will help you transition BetterYield from simulation mode to real blockchain integration on Arbitrum Sepolia testnet.

## 📋 Prerequisites

### 1. Required Accounts & API Keys

- **MetaMask Wallet** with Arbitrum Sepolia network added
- **Arbiscan API Key**: Get from [https://arbiscan.io/apis](https://arbiscan.io/apis)
- **WalletConnect Project ID**: Get from [https://cloud.walletconnect.com](https://cloud.walletconnect.com)
- **Testnet ETH**: Get from [Arbitrum Sepolia Faucet](https://faucet.quicknode.com/arbitrum/sepolia)
- **LINK Tokens**: Get from [Chainlink Faucet](https://faucets.chain.link/arbitrum-sepolia)

### 2. Add Arbitrum Sepolia to MetaMask

```
Network Name: Arbitrum Sepolia
RPC URL: https://sepolia-rollup.arbitrum.io/rpc
Chain ID: 421614
Currency Symbol: ETH
Block Explorer: https://sepolia.arbiscan.io
```

## 🔧 Step 1: Environment Configuration

### Update your `.env` file:

```bash
# ==============================================
# BLOCKCHAIN CONFIGURATION
# ==============================================

# Your wallet private key (WITHOUT 0x prefix)
PRIVATE_KEY=your_64_character_private_key_here

# Arbiscan API key for contract verification
ARBISCAN_API_KEY=your_arbiscan_api_key_here

# ==============================================
# FRONTEND CONFIGURATION
# ==============================================

# WalletConnect project ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here

# Network configuration
NEXT_PUBLIC_CHAIN_ID=421614
NEXT_PUBLIC_RPC_URL=https://sepolia-rollup.arbitrum.io/rpc

# Contract address (will be updated after deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000

# ==============================================
# CHAINLINK CONFIGURATION
# ==============================================

# Chainlink Functions subscription ID (create this first)
CHAINLINK_FUNCTIONS_SUBSCRIPTION_ID=1

# Chainlink Automation upkeep ID (register this after deployment)
CHAINLINK_AUTOMATION_UPKEEP_ID=0
```

## 🚀 Step 2: Smart Contract Deployment

### 2.1 Compile the Contract

```bash
cd BetterYield
npm run compile
```

### 2.2 Deploy to Arbitrum Sepolia

```bash
npm run deploy
```

This will:
1. Deploy the `BetterYieldMain` contract
2. Verify it on Arbiscan
3. Return the deployed contract address

### 2.3 Update Contract Address

After deployment, update your `.env` file:

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddress
```

And update `lib/wagmi-config.ts`:

```typescript
export const CONTRACT_ADDRESSES = {
  BETTER_YIELD_MAIN: "0xYourDeployedContractAddress" as `0x${string}`,
  // ... rest of config
}
```

## 🔗 Step 3: Chainlink Functions Setup

### 3.1 Create Functions Subscription

1. Go to [Chainlink Functions](https://functions.chain.link/arbitrum-sepolia)
2. Connect your wallet
3. Create a new subscription
4. Note the subscription ID

### 3.2 Fund Subscription

1. Add LINK tokens to your subscription (minimum 2 LINK)
2. Get LINK from [Chainlink Faucet](https://faucets.chain.link/arbitrum-sepolia)

### 3.3 Add Contract as Consumer

1. In your Functions subscription
2. Add your deployed contract address as a consumer
3. Update `CHAINLINK_FUNCTIONS_SUBSCRIPTION_ID` in `.env`

## 🤖 Step 4: Chainlink Automation Setup

### 4.1 Register Upkeep

1. Go to [Chainlink Automation](https://automation.chain.link/arbitrum-sepolia)
2. Register new upkeep:
   - **Target Contract**: Your deployed contract address
   - **Admin Address**: Your wallet address
   - **Gas Limit**: 500,000
   - **Starting Balance**: 5 LINK
   - **Check Data**: `0x` (empty)

### 4.2 Update Configuration

Update your `.env` with the upkeep ID:

```bash
CHAINLINK_AUTOMATION_UPKEEP_ID=your_upkeep_id_here
```

## 🧪 Step 5: Testing the Integration

### 5.1 Start Development Server

```bash
npm run dev
```

### 5.2 Test Wallet Connection

1. Open [http://localhost:3000](http://localhost:3000)
2. Connect your MetaMask wallet
3. Ensure you're on Arbitrum Sepolia network

### 5.3 Test Contract Interactions

1. **Scan Tab**: Should fetch real positions from blockchain
2. **Price Data**: Should show real ETH price from Chainlink
3. **Optimization**: Should trigger real Chainlink Functions request
4. **Automation**: Should register for real automated rebalancing

## 📊 Step 6: Monitoring & Verification

### 6.1 Check Contract on Arbiscan

Visit: `https://sepolia.arbiscan.io/address/YOUR_CONTRACT_ADDRESS`

### 6.2 Monitor Chainlink Services

- **Functions**: [functions.chain.link](https://functions.chain.link/arbitrum-sepolia)
- **Automation**: [automation.chain.link](https://automation.chain.link/arbitrum-sepolia)
- **Data Feeds**: [data.chain.link](https://data.chain.link/arbitrum-sepolia)

### 6.3 Debug Mode

Set `DEBUG=true` in `.env` for additional logging.

## 🔄 Step 7: Transitioning from Demo to Production

### Current Status Check

The app automatically detects if the contract is deployed:

- ✅ **Contract Deployed**: Uses real blockchain interactions
- 🟡 **Demo Mode**: Falls back to simulation

### Features Available in Real Mode

- **Real Wallet Connection**: Via wagmi hooks
- **Live Price Feeds**: Chainlink ETH/USD data
- **Blockchain Position Scanning**: Real Uniswap V3 positions
- **AI Optimization**: Chainlink Functions with off-chain computation
- **Automated Rebalancing**: Chainlink Automation triggers
- **Transaction Tracking**: Real tx hashes and confirmations

## 🚨 Troubleshooting

### Common Issues

1. **Contract Compilation Error**
   ```
   Solution: Ensure PRIVATE_KEY is 64 characters (no 0x prefix)
   ```

2. **Deployment Fails**
   ```
   Solution: Check you have enough testnet ETH for gas fees
   ```

3. **Functions Not Working**
   ```
   Solution: Verify subscription has LINK tokens and contract is added as consumer
   ```

4. **Wallet Connection Issues**
   ```
   Solution: Ensure MetaMask is on Arbitrum Sepolia network
   ```

### Getting Help

- **Chainlink Discord**: [discord.gg/chainlink](https://discord.gg/chainlink)
- **Arbitrum Support**: [discord.gg/arbitrum](https://discord.gg/arbitrum)

## 🎯 Next Steps

After successful integration:

1. **Add More Pools**: Extend beyond ETH/USDC
2. **Advanced Strategies**: Implement multi-position optimization
3. **Risk Management**: Add position size limits
4. **Analytics Dashboard**: Enhanced monitoring features
5. **Mainnet Deployment**: Move to production Arbitrum

## 📈 Success Metrics

Your integration is successful when:

- ✅ Real wallet connections work
- ✅ Live price data displays
- ✅ Position scanning finds real positions
- ✅ Optimization requests execute
- ✅ Automation triggers work
- ✅ All transactions confirm on-chain

---

**🔗 Powered by Chainlink Infrastructure**

This integration uses:
- **Data Feeds** for reliable price data
- **Functions** for secure off-chain AI computation
- **Automation** for trustless position management 