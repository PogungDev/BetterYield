# BetterYield - Local Development & Vercel Deployment Guide

## 🔧 Local Development

### 1. Start Development Server
```bash
npm run dev
```

### 2. Access Application
- Frontend: http://localhost:3000
- Check: Application should load with wallet connection

### 3. Test Features
- ✅ Wallet connection (MetaMask)
- ✅ UI components rendering
- ✅ Chainlink integration (mock data)

---

## 🌐 Vercel Deployment

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Initialize Deployment
```bash
vercel
```

### 4. Set Environment Variables
```bash
./setup-vercel-env.sh
```

Or manually in Vercel dashboard:
- NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: 4191dc81301dde2d8843c32cedaa82e2
- NEXT_PUBLIC_INFURA_API_KEY: 875acf151c3544919d6c1acf77b99626
- NEXT_PUBLIC_CHAIN_ID: 421614
- NEXT_PUBLIC_NETWORK_NAME: arbitrumSepolia
- NEXT_PUBLIC_RPC_URL: https://sepolia-rollup.arbitrum.io/rpc
- NEXT_PUBLIC_EXPLORER_URL: https://sepolia.arbiscan.io
- NEXT_PUBLIC_ENABLE_TESTNETS: true
- NEXT_PUBLIC_NETWORK: arbitrumSepolia
- NEXT_PUBLIC_PROJECT_ID: betteryield
- NODE_ENV: production

### 5. Deploy
```bash
vercel --prod
```

---

## 🎯 Post-Deployment

### 1. Update Contract Address
After smart contract deployment, update:
- NEXT_PUBLIC_CONTRACT_ADDRESS in Vercel environment

### 2. Test Production
- Verify wallet connections work
- Test Chainlink integrations
- Confirm all features functional

### 3. Domain Setup (Optional)
- Add custom domain in Vercel dashboard
- Update NEXTAUTH_URL if using authentication

---

## 🚀 Ready for Hackathon!

Your BetterYield app will be live at:
- Development: http://localhost:3000
- Production: https://your-project.vercel.app

✅ Real Chainlink Integration
✅ Professional UI/UX
✅ Complete DeFi Workflow
✅ Production Ready

