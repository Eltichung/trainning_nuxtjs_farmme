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
  countDown(end_date) {
    const timeNow = new Date().getTime()
    const countDownToTime = new Date(end_date).getTime()
    const timeDifference = countDownToTime - timeNow
    if (timeDifference <= 0) {
      return Object.values({
        text: 'Sold Out'
      })
    } else {
      let seconds = Math.floor((timeDifference / 1000) % 60)
      let minutes = Math.floor((timeDifference / 1000 / 60) % 60)
      let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24)
      let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      //format
      seconds = seconds < 10 ? `0 ${seconds}` : seconds
      minutes = minutes < 10 ? `0 ${minutes}` : minutes
      hours = hours < 10 ? `0 ${hours}` : hours
      days = days < 10 ? `0 ${days}` : days
      return Object.values({
        day: `${days} DAY`,
        hours: `${hours} : ${minutes} : ${seconds}`
      })
    }
  }
}
