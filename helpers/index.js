import { BigNumber, ethers, utils } from 'ethers'
import { getAddress } from 'ethers/lib/utils'
import { ContractFactory } from 'ethers';
let dataFile = require('~/plugins/erc20.json');
let address = ''
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
    address = await signer.getAddress()
    console.log(address) 
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
          addChainTest()
        }
      })
  },
  sendTransaction() {
    console.log(address)
    let transactionParam = {
      to: '0x74898c98F0e5baC3ff69EFA7d6610f60cD95f3e1',
      from: address,
      value: (0.0001 * 1e18).toString(16),
      chainId: utils.hexValue(1313161555),
    };
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
  async connectContract(){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
    const [account] = await ethereum.request({
        method: 'eth_requestAccounts'
    });
    const signer = provider.getSigner(account);
    const address = "0x0aD3ae610bd06A7Ee6aAc41F87a5B34B9a29333d";
    const abi = dataFile
    const erc20 = new ethers.Contract(address, abi, provider);
    const erc20_rw = new ethers.Contract(address, abi, signer);
    let addressTo = '0x74898c98F0e5baC3ff69EFA7d6610f60cD95f3e1'
  // await erc20_rw.filters.Transfer(address, addressTo, 0.0001)
    // console.log(counter.toString())
    
    await erc20.on("Transfer", (from, to, value, event) => {
      let info = {
        from: from,
        to: to,
        value: (value * 1e18).toString(16),
        data: event,
      };
      console.log(JSON.stringify(info, null, 4));
    });
  },
}




