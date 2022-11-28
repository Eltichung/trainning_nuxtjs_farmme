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
    let result
    if (timeDifference <= 0) {
      result = {
        day: 'Sold Out',
        hours: ''
      }
    } else {
      const millisecondsInOneSecond = 1000
      const millisecondsInOneMinute = millisecondsInOneSecond * 60
      const millisecondsInOneHour = millisecondsInOneMinute * 60
      const millisecondsInOneDay = millisecondsInOneHour * 24
      const differenceInDays = timeDifference / millisecondsInOneDay
      const remainderDifferenceInHours =
        (timeDifference % millisecondsInOneDay) / millisecondsInOneHour
      const remainderDifferenceInMinutes =
        (timeDifference % millisecondsInOneHour) / millisecondsInOneMinute
      const remainderDifferenceInSeconds =
        (timeDifference % millisecondsInOneMinute) / millisecondsInOneSecond
      let remainingDays =
        Math.floor(differenceInDays) < 10
          ? `0${Math.floor(differenceInDays)}`
          : Math.floor(differenceInDays)
      let remainingHours =
        Math.floor(remainderDifferenceInHours) < 10
          ? `0${Math.floor(remainderDifferenceInHours)}`
          : Math.floor(remainderDifferenceInHours)
      let remainingMinutes =
        Math.floor(remainderDifferenceInMinutes) < 10
          ? `0${Math.floor(remainderDifferenceInMinutes)}`
          : Math.floor(remainderDifferenceInMinutes)
      let remainingSeconds =
        Math.floor(remainderDifferenceInSeconds) < 10
          ? `0${Math.floor(remainderDifferenceInSeconds)}`
          : Math.floor(remainderDifferenceInSeconds)
      result = {
        day: `${remainingDays} DAY`,
        hours: `${remainingHours} : ${remainingMinutes} : ${remainingSeconds}`
      }
    }
    return result
  }
}
