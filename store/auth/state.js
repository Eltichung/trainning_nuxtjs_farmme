import { utils } from 'ethers'
const state = () => ({
  networkMap: {
    BSC_TESTNET: {
      chainId: utils.hexValue(97),
      chainName: 'Binance Smart Chain Testnet1',
      nativeCurrency: { name: 'tBNB', symbol: 'tBNB', decimals: 18 },
      rpcUrls: ['https://bsctestapi.terminet.io/rpc']
    },
    AURORA_TESTNET: {
      chainId: utils.hexValue(1313161555),
      chainName: 'Aurora Testnet',
      nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
      rpcUrls: ['https://testnet.aurora.dev']
    }
  },
  currentNetwork: {}
})
export default state
