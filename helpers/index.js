import { ethers } from 'ethers'
import Vue from 'vue'
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
  checkAccount(address) {
    let isAccount = false
    let dataUser = JSON.parse(localStorage.getItem('dataUser'))
    console.log(window.$nuxt.$store)
    dataUser.forEach((item) => {
      if (item.address.toLowerCase() == address.toLowerCase()) {
        $nuxt.$store.dispatch('auth/loginUser', { address, user: item })
        isAccount = true
        return
      }
    })
    if (!isAccount) {
      $nuxt.$store.dispatch('auth/logoutUser')
    }
  },
  checkConnection() {
    return ethereum.request({ method: 'eth_accounts' })
  },
  processErrorAPI(err, message = 'error') {
    Vue.$toast.error(message)
    console.error(err)
  },
  processSuccessAPI(message = 'success') {
    Vue.$toast.success(message)
  }
}
