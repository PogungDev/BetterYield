#!/bin/bash
# Vercel Environment Variables Setup Script

echo "🚀 Setting up Vercel environment variables..."

vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID production
vercel env add NEXT_PUBLIC_INFURA_API_KEY production  
vercel env add NEXT_PUBLIC_CHAIN_ID production
vercel env add NEXT_PUBLIC_NETWORK_NAME production
vercel env add NEXT_PUBLIC_RPC_URL production
vercel env add NEXT_PUBLIC_EXPLORER_URL production
vercel env add NEXT_PUBLIC_ENABLE_TESTNETS production
vercel env add NEXT_PUBLIC_NETWORK production
vercel env add NEXT_PUBLIC_CONTRACT_ADDRESS production
vercel env add NEXT_PUBLIC_CHAINLINK_DATA_FEEDS_ADDRESS production
vercel env add NEXT_PUBLIC_USDC_ADDRESS production
vercel env add NEXT_PUBLIC_PROJECT_ID production
vercel env add NODE_ENV production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production

echo "✅ Environment variables setup complete!"
echo "💡 Remember to update values in Vercel dashboard"
