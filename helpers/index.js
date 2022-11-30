import { ethers } from 'ethers'
const sha1 = require('js-sha1')
export const helper = {
  async getBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    let signer
    await provider.send('eth_requestAccounts', [])
    signer = await provider.getSigner()
    console.log(await signer.getAddress())
    return await signer.getAddress()
  },
  decodeSha1(message) {
    return sha1(message)
  },
  async checkConnection() {
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    return Boolean(accounts.length)
  },
  processErrorAPI(err) {
    console.error(err)
  }
}
