<template>
  <div style="margin-top: 200px; margin-left: 100px; display: flex; gap:50px;">
    <!-- <img src="../test.txt" alt=""> -->
    <!-- <div style="margin-bottom: 200px">
      <button @click="connectMetamask">Connect</button>
      <button @click="getAddress">Address</button>
      <button @click="switchChain">Switch</button>
      <button @click="addChain">Add</button>
      <button @click="send">Send</button>
      <button @click="testBigNumber">BigNumber</button>
      <button @click="connectSmartContract">connectSmartContract(transfer)</button>
      <button @click="walletSendTransaction">connectSmartContract(transfer)</button>
    </div> -->
    <div style="margin-bottom: 200px">
      <h1>wallet</h1>
      <button @click="wallet">WalletTransaction</button>
    </div>
    <div style="margin-bottom: 200px">
      <h1>LandB</h1>
      <button @click="connectF">ConnectF</button>
    </div>
  </div>
</template>
<script>
import { helper } from '~/helpers/index'
export default {
  data () {
    return {
    }
  },
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
    },
    walletSendTransaction(){
      helper.walletSend()
    },


    wallet(){
      helper.walletSend()
    },

    connectF(){
      helper.connectLandB()
    }
  },
  mounted(){
  }
}
</script>
