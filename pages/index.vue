<template>
  <div style="margin-top: 200px; margin-left: 100px;">
    <!-- <img src="../test.txt" alt=""> -->
    <button @click="connectMetamask">Connect</button>
    <button @click="getAddress">Address</button>
    <button @click="switchChain">Switch</button>
    <button @click="addChain">Add</button>
    <button @click="send">Send</button>
    <button @click="testBigNumber">BigNumber</button>
    <button @click="connectSmartContract">connectSmartContract(transfer)</button>
  </div>
</template>
<script>
import { helper } from '~/helpers/index'
export default {
  methods: {
    connectMetamask() {
      helper.connect()
    },
    getAddress() {
      helper.getAddressAccounts()
    },
    addChain(){
      helper.addChainTest()
    },
    switchChain(){
      helper.switchChain(this.addChain())
    },
    send(){
      helper.sendTransaction()
    },
    testBigNumber(a)
    {
      helper.bigNumber(a)
    },
    connectSmartContract(){
      helper.connectContract()
    }
  },
  mounted(){
  }
}
</script>
