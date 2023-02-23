import { BigNumber, ethers, utils, Wallet } from 'ethers'
import { getAddress } from 'ethers/lib/utils'
import { ContractFactory } from 'ethers';
// let dataFile = require('~/plugins/abi.json');
// let dataFile = require('~/plugins/erc20.json');
let dataFile = require('~/plugins/FMarket.json');
// let dataFile = require('~/plugins/erc20.json');
let account2 = '0x74898c98F0e5baC3ff69EFA7d6610f60cD95f3e1'
const HERO_CONTRACT_ADDRESS = '0x8940a37C6Fe3dD0371a534ad21e0A54E4bF70835'
const HERO_LAND_ADDRESS = '0x8940a37C6Fe3dD0371a534ad21e0A54E4bF70835'
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
    addressTo = await signer.getAddress()
    console.log(addressTo) 
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
    console.log(addressTo)
    let transactionParam = {
      to: '0x0aD3ae610bd06A7Ee6aAc41F87a5B34B9a29333d',
      from: addressTo,
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
    const address = "0x40Ca54da86ed8e3d3961FAa90a2C616cB813400f";
    // const address = "0x8940a37C6Fe3dD0371a534ad21e0A54E4bF70835";
    // const address = "0x0aoD3ae610bd06A7Ee6aAc41F87a5B34B9a29333d";
    const abi = dataFile.abi
    const erc20 = new ethers.Contract(address, abi, provider);
    const erc20_rw = new ethers.Contract(address, abi, signer);
   
    let totalSupply = await erc20.totalSupply()
    totalSupply = totalSupply.toNumber()
    let arrHolder = []
    const addressWallet = '0x2A0C98f2D7759222B83C1996556BD562a4e0179D'
    // const addressWallet = '0x55d484ef5a35d8cf4c5b570e98ffae47a06a0525'
    // for(let i = 0; i<totalSupply; i++)
    // {
    //   let tokenId = await erc20.tokenByIndex(i)
    //   let owner = await erc20.ownerOf(tokenId)
     
    //   // if(!arrHolder.includes(owner))
    //   //   arrHolder.push(owner)
    //   // console.log(arrHolder)
    // }
    let tmp = await erc20.balanceOf(addressWallet)
    console.log(tmp.toNumber())

 // let addressTo = '0x74898c98F0e5baC3ff69EFA7d6610f60cD95f3e1'
    // let counter = await erc20_rw.symbol()
    // console.log(counter.toString())
    // await erc20.on("Transfer", (from, to, value, event) => {
    //   let info = {
    //     from: from,
    //     to: to,
    //     value: value,
    //     data: event,
    //   };
    //   console.log(JSON.stringify(info, null, 4));
    // });
  },
  async walletSend(){
    // const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // await provider.send('eth_requestAccounts', [])
    // const signer = provider.getSigner()
    // const addressTo = await signer.getAddress()
    const addressFrom = '0x74898c98F0e5baC3ff69EFA7d6610f60cD95f3e1' //account2
    const privateKey = ''
    console.log(await provider.getBalance())
    const wallet = new ethers.Wallet(privateKey, provider)
    // walletPrivateKey = new Wallet(walletMnemonic.privateKey)
    console.log(walletMnemonic.address)
  },
  async connectLandB(){
    const contract='0x40Ca54da86ed8e3d3961FAa90a2C616cB813400f'
    let dataAbi = require('~/plugins/LandB.json');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const [account] = await ethereum.request({
        method: 'eth_requestAccounts'
    });
    const signer = provider.getSigner()
    const address = await signer.getAddress();
    const abi = dataAbi.abi
    const erc20_rw = new ethers.Contract(contract, abi, signer);
    let tokenId = await erc20_rw.tokenOfOwnerByIndex(address, 0)
    // let getNftOnSale = await erc20_rw.nftOnSales(address, tokenId)
    await erc20_rw.safeTransferFrom(address, account2, tokenId)
    // const Sequelize = require("sequelize");
    // let tmp = await erc20_rw.nftOnSales(address,1)
    // console.log(tmp.toNumber())
  }
}




// {
//   "inputs": [
//     {
//       "internalType": "address",
//       "name": "from",
//       "type": "address"
//     },
//     {
//       "internalType": "address",
//       "name": "to",
//       "type": "address"
//     },
//     {
//       "internalType": "uint256",
//       "name": "tokenId",
//       "type": "uint256"
//     },
//     {
//       "internalType": "bytes",
//       "name": "_data",
//       "type": "bytes"
//     }
//   ],
//   "name": "safeTransferFrom",
//   "outputs": [],
//   "stateMutability": "nonpayable",
//   "type": "function"
// },