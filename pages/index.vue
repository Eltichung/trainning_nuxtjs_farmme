<template></template>
<script>
export default {
  mounted() {
    this.$router.replace('/home')
  }
}
</script>
<!-- <script>
import { ethers } from "ethers";
export default {
  name: 'IndexPage',
  created(){
  },
  async mounted(){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // const provider = new ethers.providers.JsonRpcProvider("https://rpc-bsc.bnb48.club");
    let signer

    //connect account get address
    await provider.send("eth_requestAccounts",[])
    signer = await provider.getSigner()
    console.log(await signer.getAddress());

    //get balance
    let balance = await signer.getBalance()
    console.log(balance.toString())


  }
}
</script> -->
