import { ethers } from "ethers";
export const helper = {
  async getBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    let signer
    await provider.send("eth_requestAccounts",[])
    signer = await provider.getSigner()
    console.log(await signer.getAddress())
    return await signer.getAddress()
  }
}
