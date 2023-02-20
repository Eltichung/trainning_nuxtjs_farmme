import { BigNumber, ethers, utils } from 'ethers'
import { getAddress } from 'ethers/lib/utils'
export const helper = {
  connect() {
    if (typeof window.ethereum === 'undefined') {
      console.log('MetaMask is not installed!')
    }
    ethereum
      .request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }]
      })
      .then((permissions) => {
        console.log('eth_accounts permission successfully requested!')
      })
      .catch((error) => {
        if (error.code === 4001) {
          console.log('Permissions needed to continue.')
        } else {
          console.error(error)
        }
      })
  },
  async getAddressAccounts() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const chainId = await signer.getAddress()
    console.log(signer) 
  },
  addChainTest(){
    let chainIdAurora = {
      chainId: utils.hexValue(1313161555),
      chainName: 'Aurora Testnet',
      nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
      rpcUrls: ['https://testnet.aurora.dev']
    }
    ethereum
    .request({
      method: 'wallet_addEthereumChain',
      params: [chainIdAurora]
    })
    .catch((err) => console.log(err))
  },
  switchChain(addChainTest) {
    let chainIdAurora = {
      chainId: utils.hexValue(1313161555),
      chainName: 'Aurora Testnet',
      nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
      rpcUrls: ['https://testnet.aurora.dev']
    }
    ethereum
      .request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdAurora.chainId }]
      })
      .catch((switchError) => {
        if (switchError.code === 4902) {
          addChainTest
        }
      })
  },
  sendTransaction() {
    let transactionParam = {
      to: '0x1Bb63ca507d7C4a0407879112aed765521207343',
      from: '0x26ab9D60a13750b7C35e006679b85a5375900f0c',
      value: (0.0001 * 1e18).toString(16),
      chainId: utils.hexValue(1313161555),
    };
    console.log(transactionParam)
    ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [transactionParam]
      })
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error(error));
  },
  bigNumber(a, b) {
    let tmp = BigNumber.from(40)
    let tmp2 = BigNumber.from(20)
    let tmp3 = BigNumber.from(60)
    // console.log(tmp.add(tmp2))
    console.log(tmp3.toBigInt)
  },
  connectContract(){
    const abi = [
      "function balanceOf(address owner) view returns (uint256)",
      "function decimals() view returns (uint8)",
      "function symbol() view returns (string)",
      "function transfer(address to, uint amount) returns (bool)",
      "event Transfer(address indexed from, address indexed to, uint amount)"
  ];
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const address = "0x08B05E342C8F170ebc503B88Ee0dca441F7cFEF7";
  const erc20 = new ethers.Contract(address, abi, provider);
  const erc20_rw = new ethers.Contract(address, abi, signer);
  console.log(erc20.decimals)
  }
}
